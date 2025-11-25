import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Shield, Target, Briefcase, Building2, Globe, LineChart, PieChart, BarChart3, ArrowRight, CheckCircle, Sparkles, Info, DollarSign, Home } from 'lucide-react';
import CTASection from '../CTASection';

const InvestmentSolutions = () => {
  const [activeTab, setActiveTab] = useState('mutual-funds');
  
  const heroRef = useRef(null);
  const solutionsRef = useRef(null);
  const featuresRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const solutionsInView = useInView(solutionsRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const investmentSolutions = [
    {
      id: 'mutual-funds',
      icon: PieChart,
      title: 'Mutual Funds',
      description: 'Diversified portfolio management with expert fund selection and regular rebalancing.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
      features: [
        'Equity Funds for long-term growth',
        'Debt Funds for stable returns',
        'Hybrid Funds for balanced approach',
        'Tax-saving ELSS options',
        'SIP & lumpsum investments',
        'Regular portfolio review'
      ],
      benefits: [
        'Professional fund management',
        'Diversification across assets',
        'Low minimum investment',
        'High liquidity',
        'Tax efficiency',
        'Transparent reporting'
      ]
    },
    {
      id: 'bonds',
      icon: LineChart,
      title: 'Bonds',
      description: 'Fixed-income securities offering stable returns with capital preservation.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      features: [
        'Government Securities',
        'Corporate Bonds',
        'Tax-free Bonds',
        'PSU Bonds',
        'Infrastructure Bonds',
        'Fixed Maturity Plans'
      ],
      benefits: [
        'Predictable income stream',
        'Lower risk than equities',
        'Capital protection',
        'Tax benefits available',
        'Portfolio diversification',
        'Suitable for conservative investors'
      ]
    },
    {
      id: 'aif',
      icon: Briefcase,
      title: 'AIF',
      description: 'Sophisticated investment strategies for HNI clients seeking higher returns.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      features: [
        'Category I AIFs (Venture/SME)',
        'Category II AIFs (PE/Debt)',
        'Category III AIFs (Hedge Funds)',
        'Real Estate Funds',
        'Infrastructure Funds',
        'Specialized strategies'
      ],
      benefits: [
        'Access to exclusive opportunities',
        'Professional fund managers',
        'Portfolio diversification',
        'Potential for alpha generation',
        'Structured investments',
        'Long-term wealth creation'
      ]
    },
    {
      id: 'sif',
      icon: Building2,
      title: 'SIF',
      description: 'Customized structured products with defined risk-reward parameters.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      features: [
        'Principal protected structures',
        'Yield enhancement products',
        'Market-linked debentures',
        'Capital guarantee notes',
        'Customized payoff structures',
        'Risk-adjusted returns'
      ],
      benefits: [
        'Defined risk parameters',
        'Tailored solutions',
        'Professional structuring',
        'Transparent terms',
        'Flexible tenure options',
        'Suitable for specific goals'
      ]
    },
    {
      id: 'unlisted',
      icon: TrendingUp,
      title: 'Unlisted Shares',
      description: 'Pre-IPO opportunities and private equity investments in growth companies.',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
      features: [
        'Pre-IPO investments',
        'Growth stage companies',
        'Employee stock options',
        'Private placement shares',
        'Start-up investments',
        'Exit strategy planning'
      ],
      benefits: [
        'Early-stage entry advantage',
        'High growth potential',
        'Portfolio diversification',
        'Strategic opportunities',
        'Expert due diligence',
        'Potential listing gains'
      ]
    },
    {
      id: 'others',
      icon: Globe,
      title: 'Others',
      description: 'Comprehensive financial services including NRI solutions and secured lending.',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=800&q=80',
      features: [
        'NRI Investment Solutions',
        'Loan Against Securities',
        'Home Loans',
        'Portfolio Management Services',
        'Wealth Management',
        'Financial Planning'
      ],
      benefits: [
        'Holistic financial solutions',
        'Competitive interest rates',
        'Flexible loan options',
        'NRI-specific services',
        'End-to-end support',
        'Personalized approach'
      ]
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'AMFI Certified',
      description: 'ARN: 100804 | Valid till Feb 2027'
    },
    {
      icon: Target,
      title: 'Goal-Based Approach',
      description: 'Investments aligned with your life goals'
    },
    {
      icon: BarChart3,
      title: 'Portfolio Diversification',
      description: 'Balanced across asset classes'
    },
    {
      icon: CheckCircle,
      title: 'Transparent Reporting',
      description: 'Regular updates and performance reviews'
    }
  ];

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

  const activeInvestment = investmentSolutions.find(s => s.id === activeTab);
  const ActiveIcon = activeInvestment?.icon;

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80"
            />
            <img
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1920&q=80"
              alt="Investment Solutions"
              className="w-full h-full object-cover object-center opacity-90"
              loading="eager"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1920&q=80';
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
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A1616]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C9A635] rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">
                INVESTMENT SOLUTIONS
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 sm:mb-8 leading-[1.1] tracking-tight px-2"
              variants={itemVariants}
            >
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Grow Your Wealth{" "}
              </span>
              <span className="bg-gradient-to-r from-[#E7C76A] via-[#F8D97A] to-[#C9A635] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(201,166,53,0.5)]">
                Strategically
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4"
              variants={itemVariants}
            >
              Diversified investment portfolios tailored to your <span className="text-[#E7C76A] font-semibold">financial goals</span> and <span className="text-[#E7C76A] font-semibold">risk appetite</span>.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
              variants={itemVariants}
            >
              <a
                href="#solutions"
                className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-white text-[#7A1616] font-bold text-base sm:text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105"
              >
                Explore Solutions
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white hover:text-[#7A1616] transition-all duration-300 shadow-2xl"
              >
                Get Consultation
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

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#7A1616] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
            backgroundSize: '10px 10px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-white/20 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-200 text-sm">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Solutions Tabs */}
      <section id="solutions" ref={solutionsRef} className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 sm:mb-6">
              <div className="inline-flex items-center space-x-2 bg-[#C9A635]/10 px-4 sm:px-5 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-[#C9A635]" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">OUR OFFERINGS</span>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4">
              Investment{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#8B1A1A] bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Comprehensive options for every investor profile.
            </p>
          </motion.div>

          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto pb-4 mb-8 sm:mb-12 gap-2 sm:gap-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {investmentSolutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <button
                  key={solution.id}
                  onClick={() => setActiveTab(solution.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                    activeTab === solution.id
                      ? 'bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white shadow-xl'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  {solution.title}
                </button>
              );
            })}
          </div>

          {/* Active Solution Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center"
          >
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100 group">
                <img
                  src={activeInvestment.image}
                  alt={activeInvestment.title}
                  className="w-full h-[300px] sm:h-[400px] object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-white/20 backdrop-blur-md p-2 sm:p-3 rounded-lg sm:rounded-xl">
                      {ActiveIcon && <ActiveIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
                    </div>
                    <h3 className="text-white font-extrabold text-xl sm:text-2xl">{activeInvestment.title}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4">
                  {activeInvestment.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  {activeInvestment.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A635]" />
                  Key Features
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeInvestment.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#7A1616] rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm sm:text-base text-gray-700 font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A635]" />
                  Benefits
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeInvestment.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-gray-700 font-medium">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 sm:pt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white font-bold text-sm sm:text-base rounded-xl hover:from-[#8B1A1A] hover:to-[#7A1616] transition-all duration-300 shadow-xl transform hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
};

export default InvestmentSolutions;
