import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calculator,
  ArrowLeft,
  TrendingUp,
  PiggyBank,
  GraduationCap,
  Home as HomeIcon,
  Gem,
  Plane,
  Clock,
  Baby,
  Building2,
  Target,
  Heart,
  ArrowRight
} from 'lucide-react';
import { calculatorsData } from '../data/mock';
import CalculatorCard from '../components/CalculatorCard';

// Calculator Components
import SIPCalculator from '../components/calculators/SIPCalculator';
import LumpsumCalculator from '../components/calculators/LumpsumCalculator';
import RetirementCalculator from '../components/calculators/RetirementCalculator';
import InflationCalculator from '../components/calculators/InflationCalculator';
import DreamGoalCalculator from '../components/calculators/DreamGoalCalculator';
import ChildEducationCalculator from '../components/calculators/ChildEducationCalculator';
import HomePurchaseCalculator from '../components/calculators/HomePurchaseCalculator';
import MarriageCalculator from '../components/calculators/MarriageCalculator';
import VacationCalculator from '../components/calculators/VacationCalculator';
import SIPDelayCalculator from '../components/calculators/SIPDelayCalculator';
import SIPStepUpCalculator from '../components/calculators/SIPStepUpCalculator';
import ChildBirthCalculator from '../components/calculators/ChildBirthCalculator';

const CalculatorLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Header */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-white via-gray-50 to-[#C9A635]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center space-x-2 sm:space-x-4 mb-4 sm:mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/calculators"
              className="inline-flex items-center space-x-2 text-[#7A1616] hover:text-[#8B1A1A] transition-colors duration-200 font-semibold text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Back to Calculators</span>
            </Link>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-2">
              {title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Plan your financial future with our expert calculators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Content */}
      <section className="py-8 sm:py-12">
        {children}
      </section>
    </div>
  );
};

const CalculatorsHome = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const allCalculators = [
    {
      id: 'sip',
      title: 'SIP Calculator',
      description: 'Calculate returns on your Systematic Investment Plan',
      icon: TrendingUp,
      link: '/calculators/sip',
      color: 'from-[#7A1616] to-[#A12424]'
    },
    {
      id: 'lumpsum',
      title: 'Lumpsum Calculator',
      description: 'Project growth on one-time investments',
      icon: PiggyBank,
      link: '/calculators/lumpsum',
      color: 'from-[#C9A635] to-[#E7C76A]'
    },
    {
      id: 'retirement',
      title: 'Retirement Calculator',
      description: 'Plan your retirement corpus and monthly pension',
      icon: Target,
      link: '/calculators/retirement',
      color: 'from-[#7A1616] to-[#8B1A1A]'
    },
    {
      id: 'child-education',
      title: 'Child Education Calculator',
      description: 'Save smartly for your child\'s education goals',
      icon: GraduationCap,
      link: '/calculators/child-education',
      color: 'from-[#C9A635] to-[#D4B547]'
    },
    {
      id: 'home-purchase',
      title: 'Home Purchase Calculator',
      description: 'Calculate savings needed for your dream home',
      icon: HomeIcon,
      link: '/calculators/home-purchase',
      color: 'from-[#7A1616] to-[#A12424]'
    },
    {
      id: 'marriage',
      title: 'Marriage Calculator',
      description: 'Plan and save for wedding expenses',
      icon: Gem,
      link: '/calculators/marriage',
      color: 'from-[#C9A635] to-[#E7C76A]'
    },
    {
      id: 'vacation',
      title: 'Vacation Calculator',
      description: 'Save for your dream vacation destinations',
      icon: Plane,
      link: '/calculators/vacation',
      color: 'from-[#7A1616] to-[#8B1A1A]'
    },
    {
      id: 'sip-delay',
      title: 'SIP Delay Calculator',
      description: 'See the cost of delaying your SIP investments',
      icon: Clock,
      link: '/calculators/sip-delay',
      color: 'from-[#C9A635] to-[#D4B547]'
    },
    {
      id: 'sip-step-up',
      title: 'SIP Step Up Calculator',
      description: 'Calculate benefits of increasing SIP annually',
      icon: TrendingUp,
      link: '/calculators/sip-step-up',
      color: 'from-[#7A1616] to-[#A12424]'
    },
    {
      id: 'inflation',
      title: 'Inflation Calculator',
      description: 'Understand inflation impact on your savings',
      icon: Building2,
      link: '/calculators/inflation',
      color: 'from-[#C9A635] to-[#E7C76A]'
    },
    {
      id: 'child-birth',
      title: 'Child Birth Planning',
      description: 'Plan for expenses from birth to education',
      icon: Baby,
      link: '/calculators/child-birth',
      color: 'from-[#7A1616] to-[#8B1A1A]'
    },
    {
      id: 'dream-goal',
      title: 'Dream Goal Calculator',
      description: 'Plan and achieve your dream aspirations',
      icon: Heart,
      link: '/calculators/dream-goal',
      color: 'from-[#C9A635] to-[#D4B547]'
    },
  ];

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gray-900">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
            />
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80"
              alt="Financial planning and calculators"
              className="w-full h-full object-cover object-center opacity-90"
              loading="eager"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=80';
              }}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-[#7A1616]/40" />

          {/* Pattern - Hidden on mobile */}
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
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl border border-gray-200 mb-6 sm:mb-8"
              variants={itemVariants}
            >
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A1616]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C9A635] rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">
                FINANCIAL CALCULATORS
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 leading-[1.1] tracking-tight px-2"
              variants={itemVariants}
            >
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Smart Financial{" "}
              </span>
              <span className="bg-gradient-to-r from-[#E7C76A] via-[#F8D97A] to-[#C9A635] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(201,166,53,0.5)]">
                Calculators
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4"
              variants={itemVariants}
            >
              Make informed investment decisions with our comprehensive suite of financial calculators.{" "}
              <span className="text-[#E7C76A] font-semibold">Plan your SIPs, retirement, and achieve your goals.</span>
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="flex justify-center px-4"
              variants={itemVariants}
            >
              <a
                href="#calculators"
                className="group inline-flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-[#A12424] text-white font-bold text-base sm:text-lg rounded-xl hover:bg-[#7A1616] transition-all duration-300 shadow-2xl transform hover:scale-105"
              >
                Explore Calculators
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
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

      {/* Calculators Grid */}
      <section id="calculators" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern - Hidden on mobile */}
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
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-4 sm:mb-6"
              variants={itemVariants}
            >
              <div className="inline-flex items-center space-x-2 bg-[#C9A635]/10 px-4 sm:px-5 py-2 rounded-full">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-[#C9A635]" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">CHOOSE YOUR CALCULATOR</span>
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4"
              variants={itemVariants}
            >
              Plan Your{" "}
              <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#D4B547] bg-clip-text text-transparent">
                Financial Goals
              </span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
              variants={itemVariants}
            >
              Select from our range of specialized calculators.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {allCalculators.map((calculator, index) => {
              const Icon = calculator.icon;
              return (
                <motion.div
                  key={calculator.id}
                  variants={scaleUpVariants}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={calculator.link} className="block h-full">
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500 p-6 sm:p-8 group h-full flex flex-col">
                      <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${calculator.color} rounded-xl sm:rounded-2xl shadow-xl mb-5 sm:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#7A1616] transition-colors duration-300">
                        {calculator.title}
                      </h3>

                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5 sm:mb-6 flex-1">
                        {calculator.description}
                      </p>

                      <div className="flex items-center text-[#7A1616] font-semibold text-sm sm:text-base group-hover:gap-3 gap-2 transition-all duration-300">
                        Calculate Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white relative overflow-hidden">
        {/* Background - Reduced opacity on mobile */}
        <div className="absolute inset-0 opacity-[0.03] sm:opacity-5">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=60"
            alt="Benefits background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 sm:mb-6">
              <div className="inline-flex items-center space-x-2 bg-[#7A1616]/10 px-4 sm:px-5 py-2 rounded-full">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-[#7A1616]" />
                <span className="text-xs sm:text-sm font-semibold text-[#7A1616]">WHY USE OUR TOOLS</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4">
              Why Use Our{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#8B1A1A] bg-clip-text text-transparent">
                Calculators?
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Designed by financial experts for accurate projections.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
          >
            {[
              {
                title: "Accurate Projections",
                description: "Get precise calculations based on current market scenarios and historical data trends.",
                icon: Calculator,
                color: "from-[#7A1616] to-[#A12424]"
              },
              {
                title: "Goal-Based Planning",
                description: "Plan specific financial goals with customized investment strategies tailored to your needs.",
                icon: Target,
                color: "from-[#C9A635] to-[#E7C76A]"
              },
              {
                title: "Expert Insights",
                description: "Benefit from insights and recommendations from our AMFI certified financial experts.",
                icon: TrendingUp,
                color: "from-[#7A1616] to-[#8B1A1A]"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100 p-6 sm:p-8 md:p-10 text-center group hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#7A1616]/5 to-[#C9A635]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br ${benefit.color} rounded-xl sm:rounded-2xl mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
                    <benefit.icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 sm:mb-5 group-hover:text-[#7A1616] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#7A1616] via-[#A12424] to-[#7A1616] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=60"
            alt="CTA background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 sm:mb-8 leading-tight px-2">
              Need Help Interpreting<br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#E7C76A] via-[#F8D97A] to-[#C9A635] bg-clip-text text-transparent">
                Your Results?
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto px-4">
              Our financial experts can help you understand your calculations and create a personalized investment plan.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-stretch sm:items-center px-4">
              <Link
                to="/contact"
                className="group w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-white text-[#7A1616] font-bold text-base sm:text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Consult Our Experts
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white hover:text-[#7A1616] transition-all duration-300 shadow-2xl transform hover:scale-105 flex items-center justify-center"
              >
                Explore Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const Calculators = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<CalculatorsHome />} />
      <Route
        path="/sip"
        element={
          <CalculatorLayout title="SIP Calculator">
            <SIPCalculator />
          </CalculatorLayout>
        }
      />
      <Route
        path="/lumpsum"
        element={
          <CalculatorLayout title="Lumpsum Calculator">
            <LumpsumCalculator />
          </CalculatorLayout>
        }
      />
      <Route
        path="/retirement"
        element={
          <CalculatorLayout title="Retirement Goal Calculator">
            <RetirementCalculator />
          </CalculatorLayout>
        }
      />
      <Route
        path="/inflation"
        element={
          <CalculatorLayout title="Inflation Calculator">
            <InflationCalculator />
          </CalculatorLayout>
        }
      />
      <Route
        path="/dream-goal"
        element={
          <CalculatorLayout title="Dream Goal Calculator">
            <DreamGoalCalculator />
          </CalculatorLayout>
        }
      />
      <Route
        path="/child-education"
        element={
          <CalculatorLayout title="Child Education Calculator">
            <ChildEducationCalculator />
          </CalculatorLayout>
        }
      />
      <Route
        path="/home-purchase"
        element={
          <CalculatorLayout title="Home Purchase Calculator">
            <HomePurchaseCalculator />
          </CalculatorLayout>
        }
      />
      <Route
        path="/marriage"
        element={
          <CalculatorLayout title="Marriage Calculator">
            <MarriageCalculator />
          </CalculatorLayout>
        }
      />
      <Route
        path="/vacation"
        element={
          <CalculatorLayout title="Vacation Calculator">
            <VacationCalculator />
          </CalculatorLayout>
        }
      />
      <Route
        path="/sip-delay"
        element={
          <CalculatorLayout title="SIP Delay Calculator">
            <SIPDelayCalculator />
          </CalculatorLayout>
        }
      />
      <Route
        path="/sip-step-up"
        element={
          <CalculatorLayout title="SIP Step Up Calculator">
            <SIPStepUpCalculator />
          </CalculatorLayout>
        }
      />
      <Route
        path="/child-birth"
        element={
          <CalculatorLayout title="Child Birth Planning Calculator">
            <ChildBirthCalculator />
          </CalculatorLayout>
        }
      />
    </Routes>
  );
};

export default Calculators;
