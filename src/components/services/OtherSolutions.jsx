import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Home, CreditCard, Building2, TrendingUp, Shield, Users, CheckCircle, ArrowRight, Sparkles, DollarSign, Percent, FileText, Lock, Calculator, Phone } from 'lucide-react';
import CTASection from '../CTASection';

const OtherSolutions = () => {
  const [activeSolution, setActiveSolution] = useState('nri');

  const heroRef = useRef(null);
  const solutionsRef = useRef(null);
  const benefitsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const solutionsInView = useInView(solutionsRef, { once: true, margin: "-100px" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" });

  const otherSolutions = [
    {
      id: 'nri',
      icon: Globe,
      title: 'NRI Investment Solutions',
      tagline: 'Invest in India from anywhere',
      description: 'Comprehensive investment and wealth management solutions tailored for Non-Resident Indians with full regulatory compliance.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      services: [
        'NRE/NRO Account opening',
        'Repatriation services',
        'FCNR investments',
        'Property investment guidance',
        'Portfolio management'
      ],
      benefits: [
        'Regulatory compliance',
        'Currency hedging options',
        'Tax optimization',
        'Remote account management',
        'Expert NRI advisors',
        'Repatriation support'
      ],
      documents: ['Passport', 'Visa/Work permit', 'PAN Card', 'Address proof abroad', 'Bank statements'],
      idealFor: ['NRIs', 'PIOs', 'OCIs', 'Foreign nationals of Indian origin']
    },
    {
      id: 'loan-against-securities',
      icon: CreditCard,
      title: 'Loan Against Securities',
      tagline: 'Unlock your portfolio value',
      description: 'Get instant liquidity by pledging your securities without selling them. Flexible tenure and competitive interest rates.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
      services: [
        'Loan against mutual funds',
        'Loan against shares',
        'Loan against bonds',
        'Loan against insurance',
        'Flexible tenure options',
        'Quick disbursement'
      ],
      benefits: [
        'Competitive interest rates',
        'No need to liquidate investments',
        'Minimal documentation',
        'Quick processing (24-48 hours)',
        'Flexible repayment',
        'Continue earning returns'
      ],
      loanDetails: {
        maxLTV: 'Up to 85%',
        interestRate: 'Starting 9% p.a.',
        processingTime: '24-48 hours',
        tenure: 'Up to 3 years'
      },
      idealFor: ['Working professionals', 'Business owners', 'Emergency funding needs', 'Short-term liquidity']
    },
    {
      id: 'home-loans',
      icon: Home,
      title: 'Home Loans',
      tagline: 'Own your dream home',
      description: 'Competitive home loan products with attractive interest rates, flexible tenure, and quick processing for your dream property.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      services: [
        'Home purchase loans',
        'Plot purchase loans',
        'Home construction loans',
        'Home extension loans',
        'Balance transfer',
        'Top-up loans'
      ],
      benefits: [
        'Competitive interest rates',
        'Up to 90% financing',
        'Tax benefits under 80C & 24',
        'Flexible repayment tenure',
        'Minimal processing fees',
        'Quick approval'
      ],
      loanDetails: {
        maxAmount: 'Up to ₹5 Crore',
        interestRate: 'Starting 8.5% p.a.',
        tenure: 'Up to 30 years',
        processing: '7-10 days'
      },
      idealFor: ['First-time home buyers', 'Property investors', 'Home upgraders', 'Self-employed professionals']
    },
    {
      id: 'pms',
      icon: TrendingUp,
      title: 'Portfolio Management Services',
      tagline: 'Professional wealth management',
      description: 'Discretionary and non-discretionary portfolio management with customized investment strategies for high net worth individuals.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      services: [
        'Discretionary PMS',
        'Non-discretionary PMS',
        'Equity portfolio management',
        'Debt portfolio management',
        'Hybrid strategies',
        'Research & advisory'
      ],
      benefits: [
        'Professional management',
        'Customized strategies',
        'Direct equity ownership',
        'Tax optimization',
        'Transparent reporting',
        'Dedicated relationship manager'
      ],
      pmsDetails: {
        minInvestment: '₹50 Lakhs',
        fees: '1-2% + performance fees',
        lockIn: 'Typically 1 year',
        reporting: 'Monthly & quarterly'
      },
      idealFor: ['HNI investors', 'Ultra HNI', 'Family offices', 'Corporate treasuries']
    },
    {
      id: 'financial-planning',
      icon: Calculator,
      title: 'Financial Planning',
      tagline: 'Holistic wealth advisory',
      description: 'End-to-end financial planning covering goals, investments, insurance, tax, and retirement for complete financial wellness.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      services: [
        'Goal-based planning',
        'Cash flow management',
        'Investment planning',
        'Insurance planning',
        'Retirement planning',
        'Legacy planning'
      ],
      benefits: [
        'Comprehensive analysis',
        'Personalized roadmap',
        'Regular reviews',
        'Life stage planning',
        'Risk profiling',
        'Ongoing support'
      ],
      planningAreas: [
        'Income & expenses analysis',
        'Emergency fund creation',
        'Debt management',
        'Investment allocation',
        'Insurance adequacy',
        'Retirement corpus'
      ],
      idealFor: ['Young professionals', 'Growing families', 'Mid-career individuals', 'Pre-retirees']
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Expert Guidance',
      description: 'AMFI certified advisors with years of experience'
    },
    {
      icon: Lock,
      title: 'Secure & Compliant',
      description: 'Full regulatory compliance and data security'
    },
    {
      icon: Users,
      title: 'Personalized Service',
      description: 'Customized solutions for your unique needs'
    },
    {
      icon: Percent,
      title: 'Competitive Rates',
      description: 'Best-in-class pricing and transparent fees'
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

  const activeSolutionData = otherSolutions.find(s => s.id === activeSolution);
  const ActiveIcon = activeSolutionData?.icon;

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=800&q=80"
            />
            <img
              src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1920&q=80"
              alt="Other Financial Solutions"
              className="w-full h-full object-cover object-center opacity-90"
              loading="eager"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80';
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
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A1616]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C9A635] rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">
                OTHER SOLUTIONS
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 sm:mb-8 leading-[1.1] tracking-tight px-2"
              variants={itemVariants}
            >
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Complete Financial{" "}
              </span>
              <span className="bg-gradient-to-r from-[#E7C76A] via-[#F8D97A] to-[#C9A635] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(201,166,53,0.5)]">
                Ecosystem
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4"
              variants={itemVariants}
            >
              From <span className="text-[#E7C76A] font-semibold">NRI investments</span> to <span className="text-[#E7C76A] font-semibold">home loans</span>, comprehensive financial services.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
              variants={itemVariants}
            >
              <a
                href="#solutions"
                className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-white text-[#7A1616] font-bold text-base sm:text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105"
              >
                View Solutions
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white hover:text-[#7A1616] transition-all duration-300 shadow-2xl"
              >
                <Phone className="w-5 h-5" />
                Get Started
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

      {/* Solutions */}
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
                <span className="text-xs sm:text-sm font-semibold text-gray-700">OUR SERVICES</span>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4">
              Financial{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#8B1A1A] bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Comprehensive services beyond traditional investments.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {otherSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.button
                  key={solution.id}
                  onClick={() => setActiveSolution(solution.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`text-left p-5 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 ${activeSolution === solution.id
                    ? 'bg-gradient-to-br from-[#7A1616] to-[#A12424] text-white shadow-2xl scale-105'
                    : 'bg-white border-2 border-gray-200 hover:border-[#C9A635]/40 hover:shadow-xl'
                    }`}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 ${activeSolution === solution.id
                    ? 'bg-white/20 backdrop-blur-md'
                    : 'bg-gradient-to-r from-[#7A1616]/10 to-[#C9A635]/10'
                    }`}>
                    <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${activeSolution === solution.id ? 'text-white' : 'text-[#7A1616]'}`} />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-extrabold mb-2 ${activeSolution === solution.id ? 'text-white' : 'text-gray-900'}`}>
                    {solution.title}
                  </h3>
                  <p className={`text-sm ${activeSolution === solution.id ? 'text-gray-200' : 'text-gray-600'}`}>
                    {solution.tagline}
                  </p>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={activeSolution}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center"
          >
            <div>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100 group">
                <img
                  src={activeSolutionData.image}
                  alt={activeSolutionData.title}
                  className="w-full h-[350px] sm:h-[450px] object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="bg-white/20 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                      {ActiveIcon && <ActiveIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />}
                    </div>
                    <div>
                      <h3 className="text-white font-extrabold text-2xl sm:text-3xl">{activeSolutionData.title}</h3>
                      <p className="text-gray-200 font-medium text-sm sm:text-base">{activeSolutionData.tagline}</p>
                    </div>
                  </div>

                  {(activeSolutionData.loanDetails || activeSolutionData.pmsDetails) && (
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {Object.entries(activeSolutionData.loanDetails || activeSolutionData.pmsDetails || {}).slice(0, 2).map(([key, value], idx) => (
                        <div key={idx} className="bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl">
                          <p className="text-gray-200 text-xs mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-white font-bold text-xs sm:text-sm">{value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  {activeSolutionData.description}
                </p>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A635]" />
                  What We Offer
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeSolutionData.services.map((service, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#7A1616] flex-shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-gray-700 font-medium">{service}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A635]" />
                  Key Benefits
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeSolutionData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm sm:text-base text-gray-700 font-medium">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {(activeSolutionData.documents || activeSolutionData.taxSections || activeSolutionData.planningAreas) && (
                <div className="bg-gradient-to-r from-[#C9A635]/10 to-[#E7C76A]/10 p-5 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-[#C9A635]/30">
                  <h4 className="text-base sm:text-lg font-bold text-[#7A1616] mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    {activeSolutionData.documents ? 'Required Documents' : activeSolutionData.taxSections ? 'Tax Saving Sections' : 'Planning Areas'}
                  </h4>
                  <div className="space-y-2">
                    {(activeSolutionData.documents || activeSolutionData.taxSections || activeSolutionData.planningAreas || []).map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#7A1616] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700 text-xs sm:text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white border-2 border-gray-200 p-5 sm:p-6 rounded-xl sm:rounded-2xl">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#C9A635]" />
                  Ideal For
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeSolutionData.idealFor.map((person, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#C9A635]/10 to-[#E7C76A]/10 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm text-gray-800 border border-[#C9A635]/20"
                    >
                      {person}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white font-bold text-sm sm:text-base rounded-xl hover:from-[#8B1A1A] hover:to-[#7A1616] transition-all duration-300 shadow-xl transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Get Started
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-[#7A1616] text-[#7A1616] font-bold text-sm sm:text-base rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Explore Our Solutions?"
        subtitle="Let our experts help you find the perfect financial solution"
        primaryCta={{ text: "Schedule Consultation", link: "/contact" }}
        secondaryCta={{ text: "View All Services", link: "/services" }}
      />
    </div>
  );
};

export default OtherSolutions;
