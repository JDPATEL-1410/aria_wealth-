import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Filter,
  Search,
  Sparkles,
  ExternalLink,
  Loader,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import CTASection from '../components/CTASection';

// --- INTERNAL MOCK DATA (So the component works standalone) ---
const STATIC_DATA = [
  {
    id: 1,
    title: "The Psychology of Money",
    excerpt: "Understanding how your behavior impacts your financial success is more important than raw intelligence.",
    category: "Beginner",
    readTime: "5 min read",
    publishDate: "2024-03-15",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    source: "Internal"
  },
  {
    id: 2,
    title: "Building Your First Portfolio",
    excerpt: "A step-by-step guide to asset allocation and risk management for new investors.",
    category: "Wealth Builder",
    readTime: "8 min read",
    publishDate: "2024-03-10",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
    source: "Internal"
  },
  {
    id: 3,
    title: "FIRE: Financial Independence, Retire Early",
    excerpt: "Strategies to accelerate your savings rate and achieve financial freedom decades early.",
    category: "Freedom Seeker",
    readTime: "10 min read",
    publishDate: "2024-03-05",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    source: "Internal"
  }
];

const FinancialWisdom = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [liveArticles, setLiveArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const heroRef = useRef(null);
  const articlesRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const articlesInView = useInView(articlesRef, { once: true, margin: "-100px" });

  const categories = ['All', 'Beginner', 'Wealth Builder', 'Freedom Seeker', 'Live Articles'];

  // --- HELPERS ---

  const categorizeArticle = (title, description) => {
    const content = `${title} ${description}`.toLowerCase();

    // Explicit keywords for categorization
    if (content.match(/beginner|start|basic|guide|intro|student|simple/)) return 'Beginner';
    if (content.match(/retire|freedom|passive|pension|fire|estate/)) return 'Freedom Seeker';
    if (content.match(/invest|stock|mutual|fund|market|portfolio|wealth|tax|gold|equity/)) return 'Wealth Builder';

    return 'Live Articles'; // Default for news
  };

  const stripHtml = (html = "") => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  };

  const extractFirstImageFromHtml = (html = "") => {
    try {
      const match = html.match(/<img[^>]+src="([^">]+)"/i);
      return match && match[1] ? match[1] : null;
    } catch { return null; }
  };

  const getReadTime = (text) => {
    const words = stripHtml(text).split(' ').length;
    return `${Math.max(3, Math.ceil(words / 200))} min read`;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Wealth Builder': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Freedom Seeker': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Live Articles': return 'bg-gradient-to-r from-[#C9A635]/20 to-[#E7C76A]/20 text-[#7A1616] border-[#C9A635] shadow-sm';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // --- INTEGRATION LOGIC ---

  const fetchEconomicTimesArticles = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);
    setFetchError(null);

    console.log("Fetching Economic Times Articles...");

    // RSS Feeds (Validated URLs)
    const etSources = [
      { url: 'https://economictimes.indiatimes.com/wealth/rssfeeds/837555174.cms', name: 'ET Wealth' },
      { url: 'https://economictimes.indiatimes.com/mutual-funds/rssfeeds/19418729.cms', name: 'ET Mutual Funds' },
      { url: 'https://economictimes.indiatimes.com/wealth/personal-finance-news/rssfeeds/42861216.cms', name: 'ET Personal Finance' }
    ];

    try {
      // Create an array of fetch promises
      const promises = etSources.map(async (source) => {
        // Using rss2json service to convert XML to JSON
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status !== 'ok') {
          console.warn(`Failed to fetch ${source.name}:`, data.message);
          return [];
        }

        return data.items.map(item => {
          const cleanDesc = stripHtml(item.description);
          const category = categorizeArticle(item.title, cleanDesc);

          return {
            id: `et-${item.guid || Math.random()}`,
            title: item.title,
            excerpt: cleanDesc.substring(0, 150) + "...",
            // Priority: Thumbnail from feed -> Enclosure -> Regex match -> Fallback
            image: item.thumbnail || item.enclosure?.link || extractFirstImageFromHtml(item.description) || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
            category: category === 'Live Articles' ? 'Live Articles' : category,
            readTime: getReadTime(cleanDesc),
            publishDate: item.pubDate,
            externalUrl: item.link, // THIS IS THE LINK FOR REDIRECTION
            source: source.name,
            isLive: true
          };
        });
      });

      const results = await Promise.all(promises);
      const allNews = results.flat();

      // Filter duplicates based on title
      const uniqueNews = allNews.filter((v, i, a) => a.findIndex(t => (t.title === v.title)) === i);

      // Sort by date (newest first)
      uniqueNews.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

      console.log(`Successfully loaded ${uniqueNews.length} articles`);
      setLiveArticles(uniqueNews);
      setLastRefreshTime(new Date());

    } catch (error) {
      console.error("Error fetching articles:", error);
      setFetchError("Unable to load latest news. Please check your connection.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEconomicTimesArticles();
  }, []);

  const handleManualRefresh = () => fetchEconomicTimesArticles(true);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Combine Static & Live Data
  const allArticles = [...liveArticles, ...STATIC_DATA];

  // Filtering Logic
  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const s = searchTerm.toLowerCase();
    const matchesSearch = article.title.toLowerCase().includes(s) || article.excerpt.toLowerCase().includes(s);

    // If "Live Articles" tab is selected, only show API fetched items
    if (selectedCategory === 'Live Articles' && !article.isLive) return false;

    return matchesCategory && matchesSearch;
  });

  // --- RENDER ---

  return (
    <div className="min-h-screen pt-16 md:pt-20">

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
            />
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80"
              alt="Financial education and wisdom"
              className="w-full h-full object-cover object-center opacity-90"
              loading="eager"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80';
              }}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-[#7A1616]/50" />

          <div className="absolute inset-0 opacity-10 hidden md:block">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-0">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <motion.div
              className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl border border-gray-200 mb-6 sm:mb-8"
              variants={itemVariants}
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A1616]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C9A635] rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">
                FINANCIAL EDUCATION
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 leading-[1.1] tracking-tight px-2"
              variants={itemVariants}
            >
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Financial Wisdom{" "}
              </span>
              <span className="bg-gradient-to-r from-[#E7C76A] via-[#F8D97A] to-[#C9A635] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(201,166,53,0.5)]">
                Hub
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4"
              variants={itemVariants}
            >
              Empower your financial journey with <span className="text-[#E7C76A] font-semibold">expert insights and smart investment strategies</span>.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
              variants={itemVariants}
            >
              <a
                href="#articles"
                className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-white text-[#7A1616] font-bold text-base sm:text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105"
              >
                Explore Articles
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#newsletter"
                className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white hover:text-[#7A1616] transition-all duration-300 shadow-2xl"
              >
                Subscribe
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Live Status Bar */}
      <div className="bg-[#7A1616] text-white py-3 shadow-md relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E7C76A]" />
            <span className="font-semibold text-sm md:text-base">
              {liveArticles.length > 0
                ? `${liveArticles.length} Live Articles from Economic Times`
                : "Connecting to Financial News Feed..."}
            </span>
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Feed'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <section id="articles" className="sticky top-16 z-30 bg-white shadow-sm border-b py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-4 items-center">

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedCategory === cat
                  ? 'bg-[#7A1616] text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:border-[#7A1616]"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section ref={articlesRef} className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white via-gray-50 to-white max-w-7xl mx-auto px-4">

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-[#7A1616] animate-spin mb-4" />
            <p className="text-gray-500">Fetching latest market updates...</p>
          </div>
        )}

        {fetchError && !loading && liveArticles.length === 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{fetchError}</p>
            </div>
          </div>
        )}

        {!loading && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={articlesInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden bg-gray-200">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80'}
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                  </div>
                  {article.isLive && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded flex items-center text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      {article.source}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {article.readTime}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(article.publishDate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-[#7A1616] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {article.excerpt}
                  </p>

                  <a
                    href={article.externalUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full group flex items-center justify-center gap-2 bg-gray-50 hover:bg-[#7A1616] text-gray-800 hover:text-white py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-200 hover:border-[#7A1616]"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </section>

      <CTASection
        title="Need Personalized Financial Advice?"
        subtitle="Our expert advisors are here to help you make informed financial decisions"
        primaryCta={{ text: "Schedule Consultation", link: "/contact" }}
        secondaryCta={{ text: "Explore Our Services", link: "/services" }}
      />
    </div>
  );
};

export default FinancialWisdom;
