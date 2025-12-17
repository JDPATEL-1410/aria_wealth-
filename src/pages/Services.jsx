import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Shield,
  Target,
  Users,
  FileText,
  Globe,
  ArrowRight,
  CheckCircle,
  Heart,
  Building2
} from 'lucide-react';

const Services = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const whyChooseRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-50px" });
  const processInView = useInView(processRef, { once: true, margin: "-50px" });
  const whyChooseInView = useInView(whyChooseRef, { once: true, margin: "-50px" });

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

  const serviceCategories = [
    {
      id: 'investment',
      title: 'Investment Solutions',
      subtitle: 'Build wealth systematically',
      description: 'Diversified investment options tailored to your risk profile and financial goals.',
      icon: TrendingUp,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      link: '/services/investment-solutions',
      services: ['Mutual Funds', 'Bonds', 'AIF', 'SIF', 'Unlisted Shares'],
      color: 'from-[#7A1616] to-[#A12424]'
    },
    {
      id: 'goals',
      title: 'Goal-Based Solutions',
      subtitle: 'Plan for what matters most',
      description: 'Customized financial planning for retirement, education, home buying, and more.',
      icon: Target,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
      link: '/services/goal-based-solutions',
      services: ['Retirement Planning', 'Child Education', 'Home Purchase', 'Wealth Creation'],
      color: 'from-[#C9A635] to-[#E7C76A]'
    },
    {
      id: 'insurance',
      title: 'Insurance & Protection',
      subtitle: 'Secure your loved ones',
      description: 'Comprehensive insurance solutions to protect what matters most to you.',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      link: '/services/insurance-protection',
      services: ['Life Insurance', 'Health Insurance', 'Term Insurance', 'Family Protection'],
      color: 'from-[#7A1616] to-[#8B1A1A]'
    },
    {
      id: 'estate',
      title: 'Estate Planning',
      subtitle: 'Legacy for generations',
      description: 'Professional will writing and estate planning services for your peace of mind.',
      icon: FileText,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      link: '/services/estate-planning',
      services: ['Will Writing Services', 'Estate Distribution', 'Legacy Planning'],
      color: 'from-[#C9A635] to-[#D4B547]'
    },
    {
      id: 'other',
      title: 'Other Solutions',
      subtitle: 'Specialized services',
      description: 'NRI solutions, loan against securities, and home loan assistance.',
      icon: Globe,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      link: '/services/other-solutions',
      services: ['NRI Solutions', 'Loan Against Securities', 'Home Loans'],
      color: 'from-[#7A1616] to-[#A12424]'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Discovery & Clarity",
      description: "Understanding your financial goals, risk appetite, and current situation through deep conversation",
      icon: Users,
      color: "from-[#7A1616] to-[#A12424]"
    },
    {
      step: 2,
      title: "Goal Mapping & Planning",
      description: "Creating a customized investment strategy aligned with your life objectives and timeline",
      icon: Target,
      color: "from-[#C9A635] to-[#E7C76A]"
    },
    {
      step: 3,
      title: "Portfolio Design & Execution",
      description: "Implementing the investment plan with regular monitoring and strategic adjustments",
      icon: TrendingUp,
      color: "from-[#7A1616] to-[#8B1A1A]"
    },
    {
      step: 4,
      title: "Review, Coaching & Course Correction",
      description: "Continuous portfolio review and optimization with behavioral coaching for long-term success",
      icon: Shield,
      color: "from-[#C9A635] to-[#D4B547]"
    }
  ];

  const whyChoosePoints = [
    {
      icon: CheckCircle,
      title: "ARN Certified Excellence",
      description: "ARN 100804 - AMFI registered with proven expertise in wealth management and financial planning",
      color: "bg-[#7A1616]"
    },
    {
      icon: Users,
      title: "Personalized Approach",
      description: "Every strategy is tailored to your unique financial goals, life stage, and risk tolerance",
      color: "bg-[#C9A635]"
    },
    {
      icon: Shield,
      title: "Complete Transparency",
      description: "No hidden fees or charges. Complete clarity in all recommendations and investment processes",
      color: "bg-[#7A1616]"
    },
    {
      icon: Heart,
      title: "Continuous Support",
      description: "Regular portfolio reviews, rebalancing, and lifetime advisory partnership for your peace of mind",
      color: "bg-[#C9A635]"
    }
  ];

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0">
          {/* Custom Background Image */}
          <img
            src={require('../assets/services_hero_bg.jpg')}
            alt="Comprehensive Financial Solutions"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-[#7A1616]/40" />

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
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A1616]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C9A635] rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">
                OUR SERVICES
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 leading-[1.1] tracking-tight px-2"
              variants={itemVariants}
            >
              <span className="block text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Comprehensive
              </span>
              <span className="block bg-gradient-to-r from-[#E7C76A] via-[#F8D97A] to-[#C9A635] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(201,166,53,0.5)]">
                Financial
              </span>
              <span className="block text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Solutions
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4"
              variants={itemVariants}
            >
              Complete financial services designed to help you achieve your wealth goals.{" "}
              <span className="text-[#E7C76A] font-semibold">Strategy that lasts a lifetime.</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-stretch sm:items-center px-4"
              variants={itemVariants}
            >
              <Link
                to="/contact"
                className="group w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-[#A12424] text-white font-bold text-base sm:text-lg rounded-xl hover:bg-[#7A1616] transition-all duration-300 shadow-2xl transform hover:scale-105 flex items-center justify-center"
              >
                <span className="flex items-center gap-2">
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/calculators"
                className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white/95 backdrop-blur-md text-[#7A1616] font-bold text-base sm:text-lg rounded-xl hover:bg-white transition-all duration-300 shadow-2xl border-2 border-white/50 flex items-center justify-center"
              >
                Explore Calculators
              </Link>
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

      {/* Services Grid */}
      <section ref={servicesRef} className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 hidden md:block">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(30deg, #7A1616 12%, transparent 12.5%, transparent 87%, #7A1616 87.5%, #7A1616), linear-gradient(150deg, #7A1616 12%, transparent 12.5%, transparent 87%, #7A1616 87.5%, #7A1616)',
            backgroundSize: '80px 140px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            <motion.div
              className="inline-block mb-4 sm:mb-6"
              variants={itemVariants}
            >
              <div className="inline-flex items-center space-x-2 bg-[#7A1616]/10 px-4 sm:px-5 py-2 rounded-full">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-[#7A1616]" />
                <span className="text-xs sm:text-sm font-semibold text-[#7A1616]">WHAT WE OFFER</span>
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4"
              variants={itemVariants}
            >
              Our{" "}
              <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#D4B547] bg-clip-text text-transparent">
                Services
              </span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
              variants={itemVariants}
            >
              Expert financial solutions tailored to your unique needs.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            {serviceCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  variants={scaleUpVariants}
                  className="group"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={category.link} className="block h-full">
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
                        <picture>
                          <source
                            media="(max-width: 640px)"
                            srcSet={category.image.replace('w=800', 'w=600')}
                          />
                          <img
                            src={category.image}
                            alt={category.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        </picture>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                        {/* Icon Badge */}
                        <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${category.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6 md:p-8 flex-1 flex flex-col">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-[#7A1616] transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-[#C9A635] mb-3 sm:mb-4">
                          {category.subtitle}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 leading-relaxed">
                          {category.description}
                        </p>

                        {/* Services List */}
                        <div className="space-y-2 mb-5 sm:mb-6 flex-1">
                          {category.services.slice(0, 3).map((service, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A635] flex-shrink-0" />
                              {service}
                            </div>
                          ))}
                          {category.services.length > 3 && (
                            <div className="text-xs sm:text-sm text-[#7A1616] font-medium">
                              +{category.services.length - 3} more
                            </div>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center text-[#7A1616] font-semibold text-sm sm:text-base group-hover:gap-3 gap-2 transition-all duration-300 mt-auto">
                          Learn More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] sm:opacity-5">
          <img
            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1920&q=60"
            alt="Process background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
          >
            <motion.div
              className="inline-block mb-4 sm:mb-6"
              variants={itemVariants}
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#C9A635]/20 to-[#E7C76A]/20 px-4 sm:px-5 py-2 rounded-full">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-[#C9A635]" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">OUR APPROACH</span>
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4"
              variants={itemVariants}
            >
              Our{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#7A1616] bg-clip-text text-transparent">
                Process
              </span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
              variants={itemVariants}
            >
              A systematic approach to building and managing your wealth.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
          >
            {/* Timeline connector - Desktop only */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#C9A635] transform -translate-y-1/2 z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 relative z-10">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={index}
                    className="relative"
                    variants={scaleUpVariants}
                    custom={index}
                  >
                    <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-gray-100 h-full hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500 group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A635]/0 to-[#E7C76A]/0 group-hover:from-[#C9A635]/10 group-hover:to-[#E7C76A]/10 transition-all duration-500" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-5 sm:mb-6">
                          <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${step.color} rounded-xl sm:rounded-2xl shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500`}>
                            <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                          </div>
                          <div className="text-5xl sm:text-6xl font-black bg-gradient-to-br from-[#7A1616]/10 to-[#C9A635]/10 bg-clip-text text-transparent">
                            {index + 1}
                          </div>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 sm:mb-4 group-hover:text-[#7A1616] transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-[#C9A635] rounded-full hidden lg:block group-hover:scale-125 transition-transform duration-300" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyChooseRef} className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#7A1616]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 h-56 sm:w-96 sm:h-96 bg-[#C9A635]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div className="inline-block mb-4 sm:mb-6">
                <div className="inline-flex items-center space-x-2 bg-[#7A1616]/10 px-4 sm:px-5 py-2 rounded-full">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#7A1616]" />
                  <span className="text-xs sm:text-sm font-semibold text-[#7A1616]">WHY CHOOSE US</span>
                </div>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 sm:mb-8">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#8B1A1A] bg-clip-text text-transparent">
                  ARIA WEALTH
                </span>
              </h2>

              <div className="space-y-5 sm:space-y-6">
                {whyChoosePoints.map((point, idx) => {
                  const IconComponent = point.icon;
                  return (
                    <div key={idx} className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`${point.color} p-2.5 sm:p-3 rounded-lg sm:rounded-xl mt-1 flex-shrink-0 shadow-lg`}>
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-1 sm:mb-2">
                          {point.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-[#7A1616] to-[#A12424] rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '30px 30px'
                  }} />
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center text-white">Service Highlights</h3>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-semibold text-sm sm:text-base">ARN Registration</span>
                        <span className="text-[#E7C76A] font-bold text-base sm:text-lg">ARN 100804</span>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-semibold text-sm sm:text-base">Portfolio Review</span>
                        <span className="text-[#E7C76A] font-bold text-base sm:text-lg">Quarterly</span>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-semibold text-sm sm:text-base">Investment Options</span>
                        <span className="text-[#E7C76A] font-bold text-base sm:text-lg">500+ Funds</span>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-semibold text-sm sm:text-base">Client Support</span>
                        <span className="text-[#E7C76A] font-bold text-base sm:text-lg truncate">Lifetime Advisory</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements - Hidden on mobile */}
              <motion.div
                className="hidden md:block absolute -top-6 -right-6 bg-[#C9A635] p-4 rounded-2xl shadow-2xl"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                className="hidden md:block absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <Shield className="w-8 h-8 text-[#7A1616]" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
