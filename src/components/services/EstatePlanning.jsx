import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollText, Users, Building2, FileText, Shield, Heart, TrendingUp, CheckCircle, ArrowRight, Sparkles, Info, Scale, Lock, BookOpen, Briefcase } from 'lucide-react';
import CTASection from '../CTASection';

const EstatePlanning = () => {
  const [activeService, setActiveService] = useState('will');
  
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });

  const estatePlanningServices = [
    {
      id: 'will',
      icon: ScrollText,
      title: 'Will Drafting',
      tagline: 'Ensure your wishes are honored',
      description: 'Professional will drafting services to ensure smooth transfer of your assets to chosen beneficiaries with legal validity.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
      features: [
        'Legal will preparation',
        'Asset distribution planning',
        'Guardian nomination',
        'Executor appointment',
        'Digital asset inclusion',
        'Regular will updates'
      ],
      benefits: [
        'Avoid family disputes',
        'Legal protection',
        'Tax efficiency',
        'Asset protection',
        'Peace of mind',
        'Quick probate process'
      ],
      whoNeeds: ['Property owners', 'Parents with minors', 'Business owners', 'HNI individuals'],
      timeline: '2-4 weeks'
    },
    {
      id: 'trust',
      icon: Building2,
      title: 'Trust Creation',
      tagline: 'Protect and preserve wealth',
      description: 'Set up private and public trusts to protect assets, minimize taxes, and ensure structured wealth transfer across generations.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      features: [
        'Private Trust setup',
        'Public Charitable Trust',
        'Revocable Living Trust',
        'Irrevocable Trust',
        'Special needs Trust',
        'Trust deed drafting'
      ],
      benefits: [
        'Asset protection',
        'Tax optimization',
        'Probate avoidance',
        'Privacy maintenance',
        'Creditor protection',
        'Generational wealth transfer'
      ],
      whoNeeds: ['Ultra HNI families', 'Business families', 'Philanthropists', 'Multi-generation wealth holders'],
      timeline: '4-8 weeks'
    },
    {
      id: 'succession',
      icon: Users,
      title: 'Succession Planning',
      tagline: 'Seamless business transition',
      description: 'Strategic planning for smooth transfer of business ownership and management to the next generation or chosen successors.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
      features: [
        'Business valuation',
        'Successor identification',
        'Leadership transition',
        'Ownership transfer plan',
        'Family governance',
        'Exit strategy planning'
      ],
      benefits: [
        'Business continuity',
        'Minimize disruption',
        'Tax-efficient transfer',
        'Family harmony',
        'Employee retention',
        'Legacy preservation'
      ],
      whoNeeds: ['Business owners', 'Family businesses', 'Entrepreneurs', 'Corporate leaders'],
      timeline: '2-6 months'
    },
    {
      id: 'power-of-attorney',
      icon: FileText,
      title: 'Power of Attorney',
      tagline: 'Designate trusted representatives',
      description: 'Grant legal authority to trusted individuals to make financial and healthcare decisions on your behalf when needed.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      features: [
        'General Power of Attorney',
        'Special Power of Attorney',
        'Durable POA',
        'Healthcare POA',
        'Financial POA',
        'Limited scope POA'
      ],
      benefits: [
        'Decision-making continuity',
        'Medical care management',
        'Financial protection',
        'Legal validity',
        'Flexibility in scope',
        'Peace of mind'
      ],
      whoNeeds: ['Senior citizens', 'Frequent travelers', 'NRIs', 'Medical patients', 'Incapacitated individuals'],
      timeline: '1-2 weeks'
    },
    {
      id: 'living-will',
      icon: Heart,
      title: 'Living Will',
      tagline: 'Define end-of-life care',
      description: 'Document your wishes for medical treatment and end-of-life care decisions to guide family and medical professionals.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      features: [
        'Medical treatment wishes',
        'Life support decisions',
        'Organ donation wishes',
        'Palliative care preferences',
        'Healthcare proxy',
        'DNR instructions'
      ],
      benefits: [
        'Autonomy in medical care',
        'Family burden reduction',
        'Clear medical directions',
        'Dignity in death',
        'Legal protection',
        'Conflict prevention'
      ],
      whoNeeds: ['Terminal illness patients', 'Senior citizens', 'Anyone concerned about medical decisions'],
      timeline: '1-2 weeks'
    },
    {
      id: 'tax-planning',
      icon: Scale,
      title: 'Estate Tax Planning',
      tagline: 'Minimize tax burden',
      description: 'Strategic planning to minimize estate taxes and ensure maximum wealth transfer to beneficiaries with legal compliance.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
      features: [
        'Tax liability assessment',
        'Gift tax planning',
        'Charitable giving strategy',
        'Life insurance planning',
        'Asset restructuring',
        'Generation-skipping transfer'
      ],
      benefits: [
        'Reduced tax liability',
        'Wealth preservation',
        'Legal compliance',
        'Charitable impact',
        'Family wealth protection',
        'Long-term tax savings'
      ],
      whoNeeds: ['High net worth individuals', 'Property owners', 'Business owners', 'Investors'],
      timeline: '2-4 weeks'
    }
  ];

  const whyEstatePlanning = [
    {
      icon: Shield,
      title: 'Asset Protection',
      description: 'Safeguard your wealth from creditors and legal disputes'
    },
    {
      icon: Users,
      title: 'Family Harmony',
      description: 'Prevent conflicts with clear distribution directives'
    },
    {
      icon: Scale,
      title: 'Tax Efficiency',
      description: 'Minimize estate taxes and maximize inheritance'
    },
    {
      icon: Lock,
      title: 'Privacy & Control',
      description: 'Maintain confidentiality and control over your assets'
    }
  ];

  const planningProcess = [
    {
      step: '01',
      icon: BookOpen,
      title: 'Initial Consultation',
      description: 'Understand your assets, family structure, and wishes'
    },
    {
      step: '02',
      icon: FileText,
      title: 'Document Preparation',
      description: 'Draft wills, trusts, and other legal documents'
    },
    {
      step: '03',
      icon: Scale,
      title: 'Legal Review',
      description: 'Ensure compliance and legal validity of all documents'
    },
    {
      step: '04',
      icon: CheckCircle,
      title: 'Execution & Filing',
      description: 'Execute documents and file with relevant authorities'
    },
    {
      step: '05',
      icon: TrendingUp,
      title: 'Regular Review',
      description: 'Periodic updates based on life changes and new laws'
    }
  ];

  const keyConsiderations = [
    {
      title: 'Asset Inventory',
      points: ['Real estate', 'Bank accounts', 'Investments', 'Business interests', 'Personal property', 'Digital assets']
    },
    {
      title: 'Beneficiaries',
      points: ['Spouse', 'Children', 'Parents', 'Siblings', 'Charities', 'Others']
    },
    {
      title: 'Legal Documents',
      points: ['Will', 'Trust deed', 'POA', 'Living will', 'Nomination forms', 'Insurance policies']
    },
    {
      title: 'Tax Planning',
      points: ['Gift tax', 'Estate tax', 'Capital gains', 'Wealth tax', 'GST implications', 'Income tax']
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

  const activeServiceData = estatePlanningServices.find(s => s.id === activeService);
  const ActiveIcon = activeServiceData?.icon;

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero Section with Background Image */}
      <section ref={heroRef} className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gray-900">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
            />
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80"
              alt="Estate Planning"
              className="w-full h-full object-cover object-center opacity-90"
              loading="eager"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80';
              }}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-[#7A1616]/50" />
          
          {/* Animated overlay pattern */}
          <div className="absolute inset-0 opacity-10 hidden md:block">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-0">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl border border-gray-200 mb-6 sm:mb-8"
              variants={itemVariants}
            >
              <ScrollText className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A1616]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C9A635] rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">
                ESTATE PLANNING
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 sm:mb-8 leading-[1.1] tracking-tight px-2"
              variants={itemVariants}
            >
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Secure Your{" "}
              </span>
              <span className="bg-gradient-to-r from-[#E7C76A] via-[#F8D97A] to-[#C9A635] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(201,166,53,0.5)]">
                Legacy
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="text-base sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4"
              variants={itemVariants}
            >
              Comprehensive <span className="text-[#E7C76A] font-semibold">estate planning services</span> including wills, trusts, succession planning, and tax optimization for <span className="text-[#E7C76A] font-semibold">generational wealth transfer</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
              variants={itemVariants}
            >
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-white text-[#7A1616] font-bold text-base sm:text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 transform hover:scale-105"
              >
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white hover:text-[#7A1616] transition-all duration-300 shadow-2xl"
              >
                Book Consultation
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
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

      {/* Why Estate Planning */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#7A1616] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
            backgroundSize: '10px 10px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyEstatePlanning.map((item, index) => {
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

      {/* Estate Planning Services */}
      <section id="services" ref={servicesRef} className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
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
              Estate Planning{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#8B1A1A] bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Comprehensive solutions for wealth preservation and transfer.
            </p>
          </motion.div>

          {/* Service Selection Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {estatePlanningServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`text-left p-5 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
                    activeService === service.id
                      ? 'bg-gradient-to-br from-[#7A1616] to-[#A12424] text-white shadow-2xl scale-105'
                      : 'bg-white border-2 border-gray-200 hover:border-[#C9A635]/40 hover:shadow-xl'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 ${
                    activeService === service.id
                      ? 'bg-white/20 backdrop-blur-md'
                      : 'bg-gradient-to-r from-[#7A1616]/10 to-[#C9A635]/10'
                  }`}>
                    <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${activeService === service.id ? 'text-white' : 'text-[#7A1616]'}`} />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-extrabold mb-2 ${activeService === service.id ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm ${activeService === service.id ? 'text-gray-200' : 'text-gray-600'}`}>
                    {service.tagline}
                  </p>
                </motion.button>
              );
            })}
          </div>

          {/* Active Service Details */}
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center"
          >
            {/* Image */}
            <div>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100 group">
                <img
                  src={activeServiceData.image}
                  alt={activeServiceData.title}
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
                      <h3 className="text-white font-extrabold text-2xl sm:text-3xl">{activeServiceData.title}</h3>
                      <p className="text-gray-200 font-medium text-sm sm:text-base">{activeServiceData.tagline}</p>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl inline-block">
                    <p className="text-gray-200 text-xs mb-1">Typical Timeline</p>
                    <p className="text-white font-bold text-sm sm:text-base">{activeServiceData.timeline}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  {activeServiceData.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A635]" />
                  What's Included
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeServiceData.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#7A1616] flex-shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-gray-700 font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A635]" />
                  Key Benefits
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeServiceData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm sm:text-base text-gray-700 font-medium">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Needs This */}
              <div className="bg-gradient-to-r from-[#C9A635]/10 to-[#E7C76A]/10 p-5 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-[#C9A635]/30">
                <h4 className="text-base sm:text-lg font-bold text-[#7A1616] mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Who Needs This Service?
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeServiceData.whoNeeds.map((person, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-2 bg-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm text-gray-800 border border-[#C9A635]/20"
                    >
                      {person}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white font-bold text-sm sm:text-base rounded-xl hover:from-[#8B1A1A] hover:to-[#7A1616] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <Briefcase className="w-5 h-5" />
                  Schedule Consultation
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

      {/* Planning Process */}
      <section ref={processRef} className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4">
              Our Planning{" "}
              <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#D4B547] bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Structured approach to comprehensive estate planning.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12 sm:mb-16">
            {planningProcess.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100 p-5 sm:p-6 text-center hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500">
                    <div className="absolute -top-5 sm:-top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-extrabold text-base sm:text-lg shadow-xl">
                      {step.step}
                    </div>
                    <div className="mt-6 sm:mt-8 mb-3 sm:mb-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-[#C9A635]/10 to-[#E7C76A]/10 rounded-xl sm:rounded-2xl">
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#7A1616]" />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Key Considerations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center">
              Key Considerations
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {keyConsiderations.map((item, index) => (
                <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-100 p-5 sm:p-6 hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-base sm:text-lg font-bold text-[#7A1616] mb-3 sm:mb-4">{item.title}</h4>
                  <ul className="space-y-2">
                    {item.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#C9A635] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="Ready to Secure Your Legacy?"
        subtitle="Let our experts help you create a comprehensive estate plan"
        primaryCta={{ text: "Book Consultation", link: "/contact" }}
        secondaryCta={{ text: "Learn More", link: "/contact" }}
      />
    </div>
  );
};

export default EstatePlanning;
