import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Clock, Calendar, ArrowRight, Filter, Search, TrendingUp, Sparkles, ExternalLink, Target, DollarSign, Loader, RefreshCw } from 'lucide-react';
import { financialWisdomData } from '../data/mock';
import CTASection from '../components/CTASection';

const FinancialWisdom = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [liveArticles, setLiveArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);

  const heroRef = useRef(null);
  const articlesRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const articlesInView = useInView(articlesRef, { once: true, margin: "-100px" });

  const categories = ['All', 'Beginner', 'Wealth Builder', 'Freedom Seeker', 'Live Articles'];

  // Topic categories for filtering
  const topicCategories = [
    { title: "SIP Investment", count: 12, color: "from-[#7A1616] to-[#A12424]", icon: TrendingUp, keywords: ['sip', 'systematic investment', 'mutual fund sip', 'monthly investment'] },
    { title: "Retirement Planning", count: 8, color: "from-green-500 to-green-600", icon: Target, keywords: ['retirement', 'pension', 'retirement planning', 'post-retirement', 'senior citizen'] },
    { title: "Tax Optimization", count: 6, color: "from-[#C9A635] to-[#E7C76A]", icon: DollarSign, keywords: ['tax', 'tax saving', 'tax optimization', 'tax planning', '80c', 'deduction'] },
    { title: "Wealth Building", count: 10, color: "from-blue-500 to-blue-600", icon: BookOpen, keywords: ['wealth', 'wealth building', 'wealth creation', 'investment strategy', 'portfolio'] }
  ];

  // Generate thumbnail based on article keywords
  const generateThumbnail = (title, category) => {
    const keywords = title.toLowerCase();

    // Category-specific thumbnails
    const thumbnailMap = {
      'sip': 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
      'retirement': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
      'tax': 'https://images.unsplash.com/photo-1554224311-beee460201e8?auto=format&fit=crop&w=800&q=80',
      'wealth': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      'investment': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'stock': 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
      'mutual fund': 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&w=800&q=80',
      'insurance': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
      'loan': 'https://images.unsplash.com/photo-1554224311-beee460201e8?auto=format&fit=crop&w=800&q=80',
      'savings': 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&w=800&q=80'
    };

    for (const [key, url] of Object.entries(thumbnailMap)) {
      if (keywords.includes(key)) return url;
    }

    // Default fallback based on category
    const categoryFallbacks = {
      'Beginner': 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=800&q=80',
      'Wealth Builder': 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
      'Freedom Seeker': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
      'Live Articles': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80'
    };

    return categoryFallbacks[category] || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80';
  };

  // Categorize article based on keywords
  const categorizeArticle = (title, description) => {
    const content = `${title} ${description}`.toLowerCase();

    // Check topic categories first
    for (const topic of topicCategories) {
      if (topic.keywords.some(keyword => content.includes(keyword))) {
        return topic.title;
      }
    }

    // Beginner keywords
    const beginnerKeywords = ['beginner', 'basics', 'introduction', 'getting started', 'guide', 'how to start', 'first time', 'learn', 'understanding', 'explained'];
    // Wealth Builder keywords
    const wealthKeywords = ['investment', 'portfolio', 'stocks', 'mutual fund', 'diversification', 'asset allocation', 'growth', 'compound'];
    // Freedom Seeker keywords
    const freedomKeywords = ['financial freedom', 'passive income', 'fire', 'early retirement', 'financial independence', 'long-term', 'legacy', 'estate planning'];

    if (beginnerKeywords.some(keyword => content.includes(keyword))) {
      return 'Beginner';
    } else if (freedomKeywords.some(keyword => content.includes(keyword))) {
      return 'Freedom Seeker';
    } else if (wealthKeywords.some(keyword => content.includes(keyword))) {
      return 'Wealth Builder';
    }

    return 'Live Articles';
  };

  // Fetch financial articles from multiple sources
  const fetchFinancialArticles = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      // Multiple RSS sources for diverse content
      const sources = [
        // Medium finance tags
        { type: 'medium', tag: 'finance', limit: 5 },
        { type: 'medium', tag: 'investment', limit: 5 },
        { type: 'medium', tag: 'personal-finance', limit: 4 },
        { type: 'medium', tag: 'wealth-management', limit: 3 },
        { type: 'medium', tag: 'mutual-funds', limit: 3 },
        { type: 'medium', tag: 'retirement-planning', limit: 3 },
        { type: 'medium', tag: 'sip-investment', limit: 3 },
        { type: 'medium', tag: 'tax-planning', limit: 2 },
      ];

      const fetchPromises = sources.map(async (source) => {
        try {
          if (source.type === 'medium') {
            const response = await fetch(
              `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/tag/${source.tag}/feed&count=${source.limit}`
            );
            const data = await response.json();

            return (data.items || []).map((article) => {
              const cleanDescription = article.description?.replace(/<[^>]*>/g, '').trim() || '';
              const excerpt = cleanDescription.substring(0, 200) + (cleanDescription.length > 200 ? '...' : '');

              // Intelligent categorization
              const category = categorizeArticle(article.title, cleanDescription);

              // Auto-generate thumbnail
              let thumbnail = article.thumbnail || article.enclosure?.link;
              if (!thumbnail) {
                thumbnail = generateThumbnail(article.title, category);
              }

              return {
                id: `medium-${source.tag}-${article.guid}`,
                title: article.title,
                excerpt: excerpt || 'Read the full article to learn more about this financial topic.',
                image: thumbnail,
                category: category,
                readTime: Math.max(3, Math.min(10, Math.ceil(cleanDescription.split(' ').length / 200))) + ' min read',
                publishDate: article.pubDate,
                externalUrl: article.link,
                source: 'Medium',
                author: article.author || 'Financial Expert'
              };
            });
          }
          return [];
        } catch (error) {
          console.error(`Error fetching from ${source.type}:`, error);
          return [];
        }
      });

      const results = await Promise.all(fetchPromises);
      const allArticles = results.flat();

      // Remove duplicates based on title similarity
      const uniqueArticles = allArticles.reduce((acc, current) => {
        const isDuplicate = acc.some(item =>
          item.title.toLowerCase() === current.title.toLowerCase() ||
          item.externalUrl === current.externalUrl
        );
        if (!isDuplicate) {
          acc.push(current);
        }
        return acc;
      }, []);

      // Sort by publish date and limit
      const sortedArticles = uniqueArticles
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 24);

      setLiveArticles(sortedArticles);
      setLastRefreshTime(new Date());
      console.log(`✅ Fetched ${sortedArticles.length} financial articles`);
    } catch (error) {
      console.error('Error fetching financial articles:', error);
      setLiveArticles([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Manual refresh handler
  const handleManualRefresh = () => {
    fetchFinancialArticles(true);
  };

  // Handle topic category click
  const handleTopicClick = (topicTitle) => {
    setSelectedCategory('All');
    setSearchTerm(topicTitle);
    // Scroll to articles section
    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch financial articles with auto-refresh
  useEffect(() => {
    // Initial fetch
    fetchFinancialArticles();

    // Auto-refresh every 5 minutes (300000ms)
    const refreshInterval = setInterval(() => {
      console.log('🔄 Auto-refreshing financial articles...');
      fetchFinancialArticles();
    }, 300000);

    // Cleanup interval on unmount
    return () => clearInterval(refreshInterval);
  }, []);

  const allArticles = [...liveArticles, ...financialWisdomData];

  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  const getCategoryColor = (category) => {
    // Check if it's a topic category
    const topicCategory = topicCategories.find(t => t.title === category);
    if (topicCategory) {
      return 'bg-gradient-to-r from-[#C9A635]/20 to-[#E7C76A]/20 text-[#7A1616] border-[#C9A635] shadow-sm';
    }

    switch (category) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Wealth Builder':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Freedom Seeker':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Live Articles':
        return 'bg-gradient-to-r from-[#C9A635]/20 to-[#E7C76A]/20 text-[#7A1616] border-[#C9A635] shadow-sm';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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

      {/* Live Articles Indicator */}
      {liveArticles.length > 0 && (
        <section className="py-3 sm:py-4 bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#C9A635]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 text-white flex-1 justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <p className="font-bold text-xs sm:text-sm md:text-base">
                  🔥 {liveArticles.length} Fresh Financial Articles Loaded
                </p>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {lastRefreshTime && (
                  <span className="text-white/90 text-xs hidden sm:block">
                    Updated: {lastRefreshTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
                <button
                  onClick={handleManualRefresh}
                  disabled={refreshing}
                  className="flex items-center gap-1 sm:gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Refresh articles"
                >
                  <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <section id="articles" className="py-6 sm:py-8 md:py-12 bg-white border-b-2 border-gray-200 sticky top-16 md:top-20 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search financial wisdom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-[#C9A635] focus:outline-none text-gray-900 font-medium"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center w-full lg:w-auto">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hidden sm:block" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => { setSelectedCategory(category); setSearchTerm(''); }}
                  className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === category
                    ? 'bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
                    }`}
                >
                  {category}
                  {category === 'Live Articles' && liveArticles.length > 0 && (
                    <span className="ml-1 sm:ml-2 bg-[#C9A635] text-white px-1.5 sm:px-2 py-0.5 rounded-full text-xs">
                      {liveArticles.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section ref={articlesRef} className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 hidden md:block">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(30deg, #7A1616 12%, transparent 12.5%, transparent 87%, #7A1616 87.5%, #7A1616), linear-gradient(150deg, #7A1616 12%, transparent 12.5%, transparent 87%, #7A1616 87.5%, #7A1616)',
            backgroundSize: '80px 140px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20">
              <Loader className="w-10 h-10 sm:w-12 sm:h-12 text-[#7A1616] animate-spin mb-4" />
              <p className="text-sm sm:text-base text-gray-600 font-semibold">Loading fresh financial insights...</p>
            </div>
          )}

          {/* Articles Grid - Equal Height Cards */}
          {!loading && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={articlesInView ? "visible" : "hidden"}
            >
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: index * 0.1
                      }
                    }
                  }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <a
                    href={article.externalUrl || '#'}
                    target={article.externalUrl ? '_blank' : '_self'}
                    rel={article.externalUrl ? 'noopener noreferrer' : ''}
                    className="flex flex-col h-full bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500 group"
                  >
                    {/* Article Image - Fixed Height */}
                    <div className="relative overflow-hidden h-48 sm:h-56 flex-shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = generateThumbnail(article.title, article.category);
                        }}
                      />
                      {article.externalUrl && (
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 text-xs font-bold text-[#7A1616] shadow-lg">
                          <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span className="hidden sm:inline">{article.source || 'External'}</span>
                        </div>
                      )}
                      {article.category === 'Live Articles' && (
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-[#C9A635] to-[#E7C76A] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 text-xs font-bold text-white shadow-lg animate-pulse">
                          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          LIVE
                        </div>
                      )}
                    </div>

                    {/* Article Content - Flexible Height */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      {/* Category & Read Time */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold border-2 ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-500 text-xs sm:text-sm font-medium">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      {/* Article Title - Fixed Lines */}
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#7A1616] transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                        {article.title}
                      </h3>

                      {/* Article Excerpt - Fixed Lines */}
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>

                      {/* Footer - Always at Bottom */}
                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
                        <div className="flex items-center space-x-1 text-gray-500 text-xs sm:text-sm">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{new Date(article.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>

                        <div className="inline-flex items-center space-x-1 sm:space-x-2 text-[#7A1616] hover:text-[#A12424] font-bold text-xs sm:text-sm transition-colors duration-200">
                          <span>Read</span>
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* No Results */}
          {!loading && filteredArticles.length === 0 && (
            <motion.div
              className="text-center py-16 sm:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-600 mb-2 sm:mb-3">
                No articles found
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                Try adjusting your search terms or category filters.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Topics - Clickable Cards */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 sm:mb-6">
              <div className="inline-flex items-center space-x-2 bg-[#C9A635]/10 px-4 sm:px-5 py-2 rounded-full">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#C9A635]" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">POPULAR TOPICS</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4">
              Trending{" "}
              <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#D4B547] bg-clip-text text-transparent">
                Financial Topics
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Explore popular financial topics and investment strategies.
            </p>
          </motion.div>

          {/* Topic Cards - 2 Columns on Mobile, 4 on Desktop */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {topicCategories.map((topic, index) => {
              const Icon = topic.icon;
              const topicArticles = allArticles.filter(article =>
                topic.keywords.some(keyword =>
                  article.title.toLowerCase().includes(keyword) ||
                  article.excerpt.toLowerCase().includes(keyword)
                )
              );
              const actualCount = topicArticles.length;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => handleTopicClick(topic.title)}
                  className="cursor-pointer"
                >
                  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100 p-5 sm:p-6 md:p-8 text-center group hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500 relative overflow-hidden h-full flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7A1616]/5 to-[#C9A635]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col items-center flex-1">
                      <div className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r ${topic.color} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
                        <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#7A1616] transition-colors duration-300">
                        {topic.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 font-semibold">
                        {actualCount} Article{actualCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="newsletter" className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#7A1616] via-[#A12424] to-[#7A1616] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=60"
            alt="Newsletter background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 sm:mb-8 leading-tight px-2">
              Stay Updated with<br />
              <span className="bg-gradient-to-r from-[#E7C76A] via-[#F8D97A] to-[#C9A635] bg-clip-text text-transparent">
                Financial Insights
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto px-4">
              Get the latest financial wisdom delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto px-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-[#C9A635] transition-all duration-300"
              />
              <button className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-white text-[#7A1616] font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105">
                Subscribe
              </button>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm mt-4 sm:mt-6 px-4">
              No spam, unsubscribe at any time. Your privacy is our priority.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
