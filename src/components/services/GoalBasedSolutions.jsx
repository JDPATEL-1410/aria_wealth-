import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, GraduationCap, Home, Baby, Plane, Heart, Sparkles, TrendingUp, Shield, Clock, ArrowRight, CheckCircle, Calculator, Users, Briefcase } from 'lucide-react';

const GoalBasedSolutions = () => {
  const [activeGoal, setActiveGoal] = useState('retirement');
  
  const heroRef = useRef(null);
  const goalsRef = useRef(null);
  const processRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const goalsInView = useInView(goalsRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });

  const lifeGoals = [
    {
      id: 'retirement',
      icon: Users,
      title: 'Retirement Planning',
      tagline: 'Secure your golden years',
      description: 'Build a retirement corpus that ensures financial independence and maintains your lifestyle post-retirement.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
      timeline: '20-30 years',
      investmentType: 'Long-term equity & debt mix',
      features: [
        'Retirement corpus calculation',
        'Inflation-adjusted planning',
        'Systematic withdrawal strategy',
        'Healthcare cost planning',
        'Tax-efficient retirement income',
        'Legacy planning'
      ],
      calculatorLink: '/calculators/retirement',
      recommended: ['Equity Mutual Funds', 'NPS', 'PPF', 'Pension Plans']
    },
    {
      id: 'child-education',
      icon: GraduationCap,
      title: 'Child Education',
      tagline: 'Invest in their future',
      description: 'Plan for your child\'s higher education expenses with inflation-beating investment strategies.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      timeline: '10-18 years',
      investmentType: 'Balanced growth portfolio',
      features: [
        'Education cost forecasting',
        'Study abroad planning',
        'Scholarship guidance',
        'Education loans backup',
        'Flexible investment options',
        'Goal-based SIPs'
      ],
      calculatorLink: '/calculators/child-education',
      recommended: ['Child Plans', 'ELSS Funds', 'PPF', 'Sukanya Samriddhi']
    },
    {
      id: 'home-purchase',
      icon: Home,
      title: 'Dream Home',
      tagline: 'Own your space',
      description: 'Accumulate the down payment for your dream home with disciplined saving and smart investing.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      timeline: '5-10 years',
      investmentType: 'Debt & balanced funds',
      features: [
        'Down payment planning',
        'Home loan assistance',
        'Property valuation guidance',
        'Registration cost planning',
        'Interior budget allocation',
        'Monthly EMI affordability'
      ],
      calculatorLink: '/calculators/home-purchase',
      recommended: ['Debt Funds', 'Balanced Funds', 'Fixed Deposits', 'Bonds']
    },
    {
      id: 'marriage',
      icon: Heart,
      title: 'Marriage Planning',
      tagline: 'Celebrate without stress',
      description: 'Plan for wedding expenses with targeted savings ensuring a memorable celebration.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      timeline: '2-5 years',
      investmentType: 'Short to medium term',
      features: [
        'Wedding budget planning',
        'Vendor payment schedule',
        'Jewelry investment',
        'Honeymoon planning',
        'Emergency buffer',
        'Post-wedding financial setup'
      ],
      calculatorLink: '/calculators/marriage',
      recommended: ['Liquid Funds', 'Short Duration Funds', 'Fixed Deposits', 'Gold ETFs']
    },
    {
      id: 'vacation',
      icon: Plane,
      title: 'Dream Vacation',
      tagline: 'Travel the world',
      description: 'Save systematically for that dream international vacation or adventure trip.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      timeline: '1-3 years',
      investmentType: 'Short-term stable returns',
      features: [
        'Travel cost estimation',
        'Multi-destination planning',
        'Currency fluctuation buffer',
        'Travel insurance inclusion',
        'Visa and documentation costs',
        'Shopping and activities budget'
      ],
      calculatorLink: '/calculators/vacation',
      recommended: ['Liquid Funds', 'Ultra Short Duration Funds', 'Savings Account', 'Fixed Deposits']
    },
    {
      id: 'child-birth',
      icon: Baby,
      title: 'Child Birth Planning',
      tagline: 'Welcome your bundle of joy',
      description: 'Prepare for childbirth expenses and first-year costs with comprehensive financial planning.',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      timeline: '9 months - 2 years',
      investmentType: 'Safe & liquid investments',
      features: [
        'Delivery cost planning',
        'Baby essentials budgeting',
        'Healthcare expenses',
        'Vaccination schedule costs',
        'Emergency medical fund',
        'First year expense planning'
      ],
      calculatorLink: '/calculators/child-birth',
      recommended: ['Liquid Funds', 'Fixed Deposits', 'Savings Account', 'Health Insurance']
    }
  ];

  const planningProcess = [
    {
      step: '01',
      icon: Target,
      title: 'Define Your Goal',
      description: 'Identify your financial goals with specific amounts and timelines'
    },
    {
      step: '02',
      icon: Calculator,
      title: 'Calculate Requirements',
      description: 'Use our calculators to determine exact investment needed'
    },
    {
      step: '03',
      icon: TrendingUp,
      title: 'Choose Investments',
      description: 'Select appropriate investment products based on your risk profile'
    },
    {
      step: '04',
      icon: Shield,
      title: 'Regular Monitoring',
      description: 'Track progress and rebalance portfolio as needed'
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

  const activeGoalData = lifeGoals.find(g => g.id === activeGoal);
  const ActiveIcon = activeGoalData?.icon;

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
            />
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1920&q=80"
              alt="Goal-based planning"
              className="w-full h-full object-cover object-center opacity-90"
              loading="eager"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1920&q=80';
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
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A1616]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C9A635] rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">
                GOAL-BASED PLANNING
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 sm:mb-8 leading-[1.1] tracking-tight px-2"
              variants={itemVariants}
            >
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Achieve Every{" "}
              </span>
              <span className="bg-gradient-to-r from-[#E7C76A] via-[#F8D97A] to-[#C9A635] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(201,166,53,0.5)]">
                Life Goal
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4"
              variants={itemVariants}
            >
              From <span className="text-[#E7C76A] font-semibold">retirement planning</span> to your <span className="text-[#E7C76A] font-semibold">child's education</span>, we create customized investment strategies.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
              variants={itemVariants}
            >
              <a
                href="#goals"
                className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-white text-[#7A1616] font-bold text-base sm:text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105"
              >
                Explore Goals
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/calculators"
                className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white hover:text-[#7A1616] transition-all duration-300 shadow-2xl"
              >
                <Calculator className="w-5 h-5" />
                Calculators
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

      {/* Quick Stats */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#7A1616] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
            backgroundSize: '10px 10px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2">6+</div>
              <p className="text-gray-200 font-semibold text-sm sm:text-base">Life Goals Covered</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2">100%</div>
              <p className="text-gray-200 font-semibold text-sm sm:text-base">Personalized Plans</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2">24/7</div>
              <p className="text-gray-200 font-semibold text-sm sm:text-base">Portfolio Tracking</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Life Goals */}
      <section id="goals" ref={goalsRef} className="py-16 sm:py-20 lg:py-24 bg-white">
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
                <span className="text-xs sm:text-sm font-semibold text-gray-700">YOUR LIFE GOALS</span>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4">
              Plan for Every{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#8B1A1A] bg-clip-text text-transparent">
                Milestone
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Select your life goal and discover customized strategies.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {lifeGoals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <motion.button
                  key={goal.id}
                  onClick={() => setActiveGoal(goal.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`text-left p-5 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
                    activeGoal === goal.id
                      ? 'bg-gradient-to-br from-[#7A1616] to-[#A12424] text-white shadow-2xl scale-105'
                      : 'bg-white border-2 border-gray-200 hover:border-[#C9A635]/40 hover:shadow-xl'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 ${
                    activeGoal === goal.id
                      ? 'bg-white/20 backdrop-blur-md'
                      : 'bg-gradient-to-r from-[#7A1616]/10 to-[#C9A635]/10'
                  }`}>
                    <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${activeGoal === goal.id ? 'text-white' : 'text-[#7A1616]'}`} />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-extrabold mb-2 ${activeGoal === goal.id ? 'text-white' : 'text-gray-900'}`}>
                    {goal.title}
                  </h3>
                  <p className={`text-sm ${activeGoal === goal.id ? 'text-gray-200' : 'text-gray-600'}`}>
                    {goal.tagline}
                  </p>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={activeGoal}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center"
          >
            <div>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100 group">
                <img
                  src={activeGoalData.image}
                  alt={activeGoalData.title}
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
                      <h3 className="text-white font-extrabold text-2xl sm:text-3xl">{activeGoalData.title}</h3>
                      <p className="text-gray-200 font-medium text-sm sm:text-base">{activeGoalData.tagline}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    <div className="bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl">
                      <Clock className="w-4 h-4 text-white inline mr-2" />
                      <span className="text-white font-semibold text-xs sm:text-sm">{activeGoalData.timeline}</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl">
                      <TrendingUp className="w-4 h-4 text-white inline mr-2" />
                      <span className="text-white font-semibold text-xs sm:text-sm">{activeGoalData.investmentType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  {activeGoalData.description}
                </p>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A635]" />
                  What We Cover
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeGoalData.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#7A1616] rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm sm:text-base text-gray-700 font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A635]" />
                  Recommended Products
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {activeGoalData.recommended.map((product, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#C9A635]/10 to-[#E7C76A]/10 border-2 border-[#C9A635]/30 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm text-gray-800"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                <a
                  href={activeGoalData.calculatorLink}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white font-bold text-sm sm:text-base rounded-xl hover:from-[#8B1A1A] hover:to-[#7A1616] transition-all duration-300 shadow-xl transform hover:scale-105"
                >
                  <Calculator className="w-5 h-5" />
                  Use Calculator
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-[#7A1616] text-[#7A1616] font-bold text-sm sm:text-base rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  Get Advice
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
              Simple, transparent, and effective approach.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100 p-6 sm:p-8 text-center hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500">
                    <div className="absolute -top-5 sm:-top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-extrabold text-base sm:text-lg shadow-xl">
                      {step.step}
                    </div>
                    <div className="mt-6 mb-4 sm:mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#C9A635]/10 to-[#E7C76A]/10 rounded-xl sm:rounded-2xl">
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#7A1616]" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < planningProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-[#C9A635]" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default GoalBasedSolutions;
