import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Heart, Briefcase, Car, Home, Users, TrendingUp, CheckCircle, ArrowRight, Sparkles, Info, FileText, Phone, AlertCircle } from 'lucide-react';
import CTASection from '../CTASection';

const InsuranceProtection = () => {
  const [activeInsurance, setActiveInsurance] = useState('life');
  
  const heroRef = useRef(null);
  const insuranceRef = useRef(null);
  const featuresRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const insuranceInView = useInView(insuranceRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const insuranceProducts = [
    {
      id: 'life',
      icon: Heart,
      title: 'Life Insurance',
      tagline: 'Secure your family\'s future',
      description: 'Comprehensive life insurance solutions including term plans, whole life, and endowment policies to protect your loved ones financially.',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
      coverage: '₹50 Lakh - ₹10 Crore',
      premiumRange: 'Starting ₹500/month',
      features: [
        'Term Insurance Plans',
        'Whole Life Insurance',
        'Endowment Plans',
        'Money Back Policies',
        'Child Insurance Plans',
        'Retirement Plans'
      ],
      benefits: [
        'Financial security for family',
        'Tax benefits under 80C & 10(10D)',
        'Death benefit payout',
        'Maturity benefits',
        'Loan facility available',
        'Flexible premium payment'
      ],
      whoCovered: ['Primary breadwinner', 'Working professionals', 'Business owners', 'Parents with dependents']
    },
    {
      id: 'health',
      icon: Shield,
      title: 'Health Insurance',
      tagline: 'Protect against medical expenses',
      description: 'Comprehensive health coverage including hospitalization, critical illness, and preventive care for you and your family.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      coverage: '₹5 Lakh - ₹1 Crore',
      premiumRange: 'Starting ₹800/month',
      features: [
        'Individual Health Plans',
        'Family Floater Plans',
        'Critical Illness Cover',
        'Senior Citizen Plans',
        'Top-up & Super Top-up',
        'Maternity Coverage'
      ],
      benefits: [
        'Cashless hospitalization',
        'Pre & post hospitalization',
        'Day care procedures',
        'Ambulance charges',
        'Tax benefits under 80D',
        'No claim bonus'
      ],
      whoCovered: ['Individuals', 'Families', 'Senior citizens', 'New parents', 'Chronic illness patients']
    },
    {
      id: 'motor',
      icon: Car,
      title: 'Motor Insurance',
      tagline: 'Drive worry-free',
      description: 'Complete vehicle protection including third-party liability, own damage, and comprehensive coverage for cars and two-wheelers.',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
      coverage: 'As per IDV',
      premiumRange: 'Starting ₹2,500/year',
      features: [
        'Third-Party Liability',
        'Comprehensive Cover',
        'Zero Depreciation',
        'Engine Protection',
        'Road Side Assistance',
        'Personal Accident Cover'
      ],
      benefits: [
        'Accident damage coverage',
        'Theft protection',
        'Natural calamity coverage',
        'Cashless garage network',
        'Quick claim settlement',
        'Add-on covers available'
      ],
      whoCovered: ['Car owners', 'Two-wheeler owners', 'Commercial vehicle owners', 'Fleet operators']
    },
    {
      id: 'home',
      icon: Home,
      title: 'Home Insurance',
      tagline: 'Safeguard your dwelling',
      description: 'Protect your home and belongings against fire, theft, natural disasters, and other unforeseen events.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      coverage: '₹10 Lakh - ₹5 Crore',
      premiumRange: 'Starting ₹1,500/year',
      features: [
        'Structure Coverage',
        'Contents Insurance',
        'Personal Liability',
        'Temporary Accommodation',
        'Natural Disaster Cover',
        'Jewelry & Valuables'
      ],
      benefits: [
        'Fire & explosion coverage',
        'Burglary & theft protection',
        'Natural calamity coverage',
        'Electrical & mechanical breakdown',
        'Public liability coverage',
        'Renovation cost included'
      ],
      whoCovered: ['Homeowners', 'Tenants', 'Landlords', 'Property investors']
    },
    {
      id: 'travel',
      icon: Briefcase,
      title: 'Travel Insurance',
      tagline: 'Travel with confidence',
      description: 'International and domestic travel insurance covering medical emergencies, trip cancellations, and lost baggage.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      coverage: 'Up to $1 Million',
      premiumRange: 'Starting ₹300/trip',
      features: [
        'Medical Emergency Cover',
        'Trip Cancellation',
        'Lost Baggage',
        'Flight Delay',
        'Passport Loss',
        'Personal Accident'
      ],
      benefits: [
        'Emergency medical expenses',
        'Trip cancellation refund',
        'Baggage delay compensation',
        'Emergency evacuation',
        'Adventure sports cover',
        '24/7 assistance'
      ],
      whoCovered: ['International travelers', 'Frequent flyers', 'Adventure enthusiasts', 'Business travelers']
    },
    {
      id: 'business',
      icon: Users,
      title: 'Business Insurance',
      tagline: 'Protect your enterprise',
      description: 'Comprehensive business insurance including liability, property, and employee coverage for SMEs and corporations.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      coverage: 'Customized',
      premiumRange: 'Customized pricing',
      features: [
        'Public Liability Insurance',
        'Professional Indemnity',
        'Business Property',
        'Group Health Insurance',
        'Directors & Officers',
        'Cyber Insurance'
      ],
      benefits: [
        'Legal liability protection',
        'Business interruption cover',
        'Employee benefits',
        'Asset protection',
        'Compliance with regulations',
        'Risk management support'
      ],
      whoCovered: ['Business owners', 'Startups', 'SMEs', 'Corporations', 'Professionals']
    }
  ];

  const whyInsurance = [
    {
      icon: Shield,
      title: 'Financial Security',
      description: 'Protect yourself and family from unexpected financial burdens'
    },
    {
      icon: Heart,
      title: 'Peace of Mind',
      description: 'Live worry-free knowing you\'re covered for emergencies'
    },
    {
      icon: TrendingUp,
      title: 'Tax Benefits',
      description: 'Save on taxes with premiums under 80C, 80D & other sections'
    },
    {
      icon: Users,
      title: 'Family Protection',
      description: 'Ensure your loved ones are financially secure'
    }
  ];

  const claimProcess = [
    {
      step: '01',
      title: 'Notify Insurer',
      description: 'Inform your insurance company immediately after the incident'
    },
    {
      step: '02',
      title: 'Submit Documents',
      description: 'Provide necessary documents and evidence for claim'
    },
    {
      step: '03',
      title: 'Claim Assessment',
      description: 'Insurance company evaluates and verifies your claim'
    },
    {
      step: '04',
      title: 'Claim Settlement',
      description: 'Approved claim amount is disbursed to your account'
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

  const activeProduct = insuranceProducts.find(p => p.id === activeInsurance);
  const ActiveIcon = activeProduct?.icon;

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80"
            />
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80"
              alt="Insurance Protection"
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
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A1616]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C9A635] rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">
                INSURANCE PROTECTION
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 sm:mb-8 leading-[1.1] tracking-tight px-2"
              variants={itemVariants}
            >
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Protect What{" "}
              </span>
              <span className="bg-gradient-to-r from-[#E7C76A] via-[#F8D97A] to-[#C9A635] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(201,166,53,0.5)]">
                Matters Most
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4"
              variants={itemVariants}
            >
              Comprehensive <span className="text-[#E7C76A] font-semibold">insurance solutions</span> for life, health, vehicle, home, and business protection.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
              variants={itemVariants}
            >
              <a
                href="#insurance-products"
                className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-white text-[#7A1616] font-bold text-base sm:text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105"
              >
                View Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white hover:text-[#7A1616] transition-all duration-300 shadow-2xl"
              >
                <Phone className="w-5 h-5" />
                Get Quote
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

      {/* Why Insurance */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#7A1616] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
            backgroundSize: '10px 10px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyInsurance.map((item, index) => {
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

      {/* Insurance Products */}
      <section id="insurance-products" ref={insuranceRef} className="py-16 sm:py-20 lg:py-24 bg-white">
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
                <span className="text-xs sm:text-sm font-semibold text-gray-700">OUR PRODUCTS</span>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4">
              Insurance{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#8B1A1A] bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Complete protection for every aspect of your life.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {insuranceProducts.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.button
                  key={product.id}
                  onClick={() => setActiveInsurance(product.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`text-left p-5 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
                    activeInsurance === product.id
                      ? 'bg-gradient-to-br from-[#7A1616] to-[#A12424] text-white shadow-2xl scale-105'
                      : 'bg-white border-2 border-gray-200 hover:border-[#C9A635]/40 hover:shadow-xl'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 ${
                    activeInsurance === product.id
                      ? 'bg-white/20 backdrop-blur-md'
                      : 'bg-gradient-to-r from-[#7A1616]/10 to-[#C9A635]/10'
                  }`}>
                    <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${activeInsurance === product.id ? 'text-white' : 'text-[#7A1616]'}`} />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-extrabold mb-2 ${activeInsurance === product.id ? 'text-white' : 'text-gray-900'}`}>
                    {product.title}
                  </h3>
                  <p className={`text-sm ${activeInsurance === product.id ? 'text-gray-200' : 'text-gray-600'}`}>
                    {product.tagline}
                  </p>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={activeInsurance}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center"
          >
            <div>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100 group">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.title}
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
                      <h3 className="text-white font-extrabold text-2xl sm:text-3xl">{activeProduct.title}</h3>
                      <p className="text-gray-200 font-medium text-sm sm:text-base">{activeProduct.tagline}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl">
                      <p className="text-gray-200 text-xs mb-1">Coverage</p>
                      <p className="text-white font-bold text-xs sm:text-sm">{activeProduct.coverage}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl">
                      <p className="text-gray-200 text-xs mb-1">Premium</p>
                      <p className="text-white font-bold text-xs sm:text-sm">{activeProduct.premiumRange}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  {activeProduct.description}
                </p>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A635]" />
                  Coverage Features
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeProduct.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#7A1616] flex-shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-gray-700 font-medium">{feature}</p>
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
                  {activeProduct.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm sm:text-base text-gray-700 font-medium">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#C9A635]/10 to-[#E7C76A]/10 p-5 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-[#C9A635]/30">
                <h4 className="text-base sm:text-lg font-bold text-[#7A1616] mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Who Should Buy This?
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.whoCovered.map((person, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-2 bg-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm text-gray-800 border border-[#C9A635]/20"
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
                  Get Free Quote
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-[#7A1616] text-[#7A1616] font-bold text-sm sm:text-base rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  Compare Plans
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Claim Process */}
      <section ref={featuresRef} className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4">
              Simple Claim{" "}
              <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#D4B547] bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Fast and hassle-free claim settlement in 4 steps.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {claimProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100 p-6 sm:p-8 text-center hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500">
                  <div className="absolute -top-5 sm:-top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-extrabold text-base sm:text-lg shadow-xl">
                    {step.step}
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < claimProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-[#C9A635]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 bg-yellow-50 border-2 border-yellow-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 flex items-start gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-yellow-900 mb-2 text-sm sm:text-base">Important Note</h4>
              <p className="text-yellow-800 leading-relaxed text-sm sm:text-base">
                Always read policy documents carefully. Keep all records ready for smooth claim processing.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="Ready to Secure Your Future?"
        subtitle="Get personalized insurance recommendations from our certified advisors"
        primaryCta={{ text: "Get Free Quote", link: "/contact" }}
        secondaryCta={{ text: "Compare Plans", link: "/contact" }}
      />
    </div>
  );
};

export default InsuranceProtection;
