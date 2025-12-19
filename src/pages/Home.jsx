import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Hero from "../components/Hero";
import { servicesData, calculatorsData, companyValues } from "../data/mock";
import * as LucideIcons from "lucide-react";
import calcChildImg from "../assets/calc-child.png";
import calcRetireImg from "../assets/calc-retire.png";
import { Link } from "react-router-dom";
import { fetchEconomicTimesArticles, getDailyArticles } from "../utils/blogUtils";

const Home = () => {
  const servicesRef = useRef(null);
  const calculatorsRef = useRef(null);

  const [dailyBlogs, setDailyBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);

  const servicesInView = useInView(servicesRef, { once: true, margin: "-50px" });
  const calculatorsInView = useInView(calculatorsRef, { once: true, margin: "-50px" });

  // Fetch blogs on component mount
  useEffect(() => {
    const loadBlogs = async () => {
      setBlogsLoading(true);
      try {
        const articles = await fetchEconomicTimesArticles();
        const selectedBlogs = getDailyArticles(articles, 3);
        setDailyBlogs(selectedBlogs);
      } catch (error) {
        console.error("Error loading blogs:", error);
        // Fallback to static blogs if fetch fails
        setDailyBlogs([
          {
            title: "Understanding SIP: A Beginner's Guide",
            excerpt: "Learn how Systematic Investment Plans can help you build wealth steadily over time with disciplined investing.",
            category: "Investment",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
            externalUrl: "/financial-wisdom"
          },
          {
            title: "Retirement Planning in Your 30s",
            excerpt: "Why starting early makes all the difference. Discover strategies to secure your financial future.",
            category: "Planning",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=800&q=80",
            externalUrl: "/financial-wisdom"
          },
          {
            title: "Tax-Saving Investment Options for 2024",
            excerpt: "Maximize your returns while minimizing tax liability with these smart investment strategies.",
            category: "Tax Planning",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1554224311-beee460201e8?auto=format&fit=crop&w=800&q=80",
            externalUrl: "/financial-wisdom"
          }
        ]);
      } finally {
        setBlogsLoading(false);
      }
    };

    loadBlogs();
  }, []);

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

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <Hero />


      {/* Services Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] sm:opacity-5">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1920&q=60"
            alt="Services background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Decorative blurs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#7A1616]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C9A635]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-[#C9A635]/10 px-5 py-2.5 rounded-full mb-6">
              <LucideIcons.Briefcase className="w-4 h-4 text-[#C9A635]" />
              <span className="text-sm font-semibold text-gray-700">OUR SERVICES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 px-4">
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#D4B547] bg-clip-text text-transparent">
                Financial Solutions
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Tailored services to help you achieve your financial goals with confidence and clarity.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {servicesData.slice(0, 6).map((service, index) => {
              const Icon = LucideIcons[service.icon] || LucideIcons.Briefcase;
              return (
                <motion.div
                  key={service.id}
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C9A635]/5 to-[#7A1616]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#C9A635] to-[#E7C76A] rounded-2xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-[#7A1616] transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <LucideIcons.CheckCircle className="w-4 h-4 text-[#C9A635] mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Number indicator */}
                  <div className="absolute top-4 right-4 text-6xl font-black text-gray-900/5 group-hover:text-[#C9A635]/10 transition-colors duration-500">
                    {index + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Explore Services Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base sm:text-lg text-white font-bold bg-gradient-to-r from-[#C9A635] to-[#E7C76A] hover:from-[#E7C76A] hover:to-[#C9A635] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <LucideIcons.Sparkles className="w-5 h-5" />
              Explore All Services
              <LucideIcons.ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Calculators Section */}
      <section
        ref={calculatorsRef}
        className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 opacity-[0.03] sm:opacity-5">
          <img
            src="https://images.unsplash.com/photo-1554224311-beee460201e8?auto=format&fit=crop&w=1920&q=60"
            alt="Calculator background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={calculatorsInView ? "visible" : "hidden"}
          >
            <motion.div className="inline-block mb-4 sm:mb-6" variants={itemVariants}>
              <div className="inline-flex items-center space-x-2 bg-[#7A1616]/10 px-4 sm:px-5 py-2 rounded-full">
                <LucideIcons.Calculator className="w-3 h-3 sm:w-4 sm:h-4 text-[#7A1616]" />
                <span className="text-xs sm:text-sm font-semibold text-[#7A1616]">
                  FINANCIAL TOOLS
                </span>
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4"
              variants={itemVariants}
            >
              Smart{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#8B1A1A] bg-clip-text text-transparent">
                Financial Calculators
              </span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
              variants={itemVariants}
            >
              Plan your goals with clarity using our powerful financial tools.
            </motion.p>
          </motion.div>

          {/* Layout */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 items-stretch"
            variants={containerVariants}
            initial="hidden"
            animate={calculatorsInView ? "visible" : "hidden"}
          >
            {/* Left Card */}
            <motion.div
              variants={scaleUpVariants}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#F8EFE0] to-[#F2E9D3] border-2 border-[#E8D9A6]/60 shadow-xl hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="p-5 sm:p-6 md:p-8 pr-4 sm:pr-6 relative z-10">
                <div className="mb-3 sm:mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#7A1616] to-[#A12424] rounded-lg sm:rounded-xl shadow-lg">
                    <LucideIcons.GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#7A1616] transition-colors duration-300">
                  Child Future Saving
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5 sm:mb-6">
                  Investing ₹15,000/month at 12% p.a. can grow to ₹35 Lakhs in 10 years.
                </p>
                <Link
                  to="/calculators/child-education"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base text-white font-bold bg-gradient-to-r from-[#7A1616] to-[#A12424] hover:from-[#A12424] hover:to-[#7A1616] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Calculate Now
                  <LucideIcons.ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* IMAGE — Desktop Only */}
              <div className="absolute bottom-0 right-0 w-[60%] opacity-90 pointer-events-none hidden md:block">
                <img src={calcChildImg} alt="Child Future Saving" className="object-contain w-full" />
              </div>
            </motion.div>

            {/* Middle List */}
            <motion.div variants={scaleUpVariants} className="flex flex-col gap-3 sm:gap-4">
              {[
                { title: "Vacation Calculator", icon: "Plane", href: "/calculators/vacation" },
                { title: "Marriage Calculator", icon: "Gem", href: "/calculators/marriage" },
                { title: "SIP Delay Calculator", icon: "Clock4", href: "/calculators/sip-delay" },
                { title: "SIP Step Up Calculator", icon: "TrendingUp", href: "/calculators/sip-step-up" },
              ].map((item, i) => {
                const Icon = LucideIcons[item.icon] || LucideIcons.Calculator;
                return (
                  <Link
                    key={i}
                    to={item.href}
                    className="group flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 bg-white p-4 sm:p-5 shadow-lg hover:shadow-xl hover:border-[#C9A635]/40 transition-all duration-300"
                  >
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#C9A635]/20 to-[#E7C76A]/20 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#7A1616]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-[#7A1616] transition-colors duration-300 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">Try a quick scenario</p>
                    </div>
                    <LucideIcons.ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#7A1616] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </Link>
                );
              })}
              <div className="text-center pt-3 sm:pt-4">
                <Link
                  to="/calculators"
                  className="inline-flex items-center gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#7A1616] to-[#A12424] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base text-white font-bold shadow-xl hover:shadow-2xl hover:from-[#A12424] hover:to-[#7A1616] transition-all duration-300 transform hover:scale-105"
                >
                  View All Calculators
                  <LucideIcons.ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              variants={scaleUpVariants}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#F5E9D9] to-[#EEDFCB] border-2 border-[#E8D9A6]/60 shadow-xl hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="p-5 sm:p-6 md:p-8 pr-4 sm:pr-6 relative z-10">
                <div className="mb-3 sm:mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#7A1616] to-[#A12424] rounded-lg sm:rounded-xl shadow-lg">
                    <LucideIcons.Palmtree className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#7A1616] transition-colors duration-300">
                  Retire Early
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5 sm:mb-6">
                  Investing ₹10,000/month at 12% p.a. can grow to ₹1 Crore in 20 years.
                </p>
                <Link
                  to="/calculators/retirement"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base text-white font-bold bg-gradient-to-r from-[#7A1616] to-[#A12424] hover:from-[#A12424] hover:to-[#7A1616] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Calculate Now
                  <LucideIcons.ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* IMAGE — Desktop Only */}
              <div className="absolute bottom-0 right-0 w-full opacity-90 pointer-events-none hidden md:block">
                <img src={calcRetireImg} alt="Retire Early" className="object-contain w-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-[#7A1616]/5 via-white to-[#C9A635]/5 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#C9A635]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#7A1616]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-[#7A1616]/10 px-5 py-2.5 rounded-full mb-6">
              <LucideIcons.BookOpen className="w-4 h-4 text-[#7A1616]" />
              <span className="text-sm font-semibold text-[#7A1616]">FINANCIAL WISDOM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 px-4">
              Latest{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#7A1616] bg-clip-text text-transparent">
                Insights & Articles
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Stay informed with expert insights on wealth management, investing, and financial planning.
            </p>
          </motion.div>

          {/* Blog Cards Grid */}
          {blogsLoading ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-4">
                <LucideIcons.Loader className="w-12 h-12 text-[#7A1616] animate-spin" />
                <p className="text-gray-600">Loading latest articles...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {dailyBlogs.map((blog, index) => (
                <motion.a
                  key={index}
                  href={blog.externalUrl || "/financial-wisdom"}
                  target={blog.externalUrl && blog.externalUrl.startsWith('http') ? "_blank" : "_self"}
                  rel={blog.externalUrl && blog.externalUrl.startsWith('http') ? "noopener noreferrer" : ""}
                  className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-gray-100 hover:shadow-2xl hover:border-[#7A1616]/40 transition-all duration-500 group block"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Blog Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80'}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-[#7A1616] text-white text-xs font-semibold rounded-full">
                        {blog.category}
                      </span>
                    </div>
                    {blog.isLive && (
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded flex items-center text-xs">
                        <LucideIcons.ExternalLink className="w-3 h-3 mr-1" />
                        Live
                      </div>
                    )}
                  </div>

                  {/* Blog Content */}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <LucideIcons.Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-[#7A1616] transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center text-[#7A1616] font-semibold group-hover:gap-2 transition-all duration-300">
                      <span>Read More</span>
                      <LucideIcons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}

          {/* Explore Financial Wisdom Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              to="/financial-wisdom"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base sm:text-lg text-white font-bold bg-gradient-to-r from-[#7A1616] to-[#A12424] hover:from-[#A12424] hover:to-[#7A1616] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <LucideIcons.BookOpen className="w-5 h-5" />
              Explore Financial Wisdom
              <LucideIcons.ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default Home;
