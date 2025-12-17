import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Hero from "../components/Hero";
import { servicesData, calculatorsData, companyValues } from "../data/mock";
import * as LucideIcons from "lucide-react";
import calcChildImg from "../assets/calc-child.png";
import calcRetireImg from "../assets/calc-retire.png";
import { Link } from "react-router-dom";

const Home = () => {
  const servicesRef = useRef(null);
  const calculatorsRef = useRef(null);
  const valuesRef = useRef(null);

  const servicesInView = useInView(servicesRef, { once: true, margin: "-50px" });
  const calculatorsInView = useInView(calculatorsRef, { once: true, margin: "-50px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-50px" });

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

      {/* Services Preview Section */}
      <section ref={servicesRef} className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={require('../assets/services_header.png')}
            alt="Financial Advisory Services"
            className="w-full h-full object-cover"
          />
          {/* Overlay to match the warm/dark tone of the original design */}
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-20">
          <motion.div
            className="max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg"
              variants={itemVariants}
            >
              Our Services.
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-16 max-w-2xl font-light leading-relaxed drop-shadow-md"
              variants={itemVariants}
            >
              From portfolio management to legacy planning, we support
              every step of your financial journey.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
              variants={containerVariants}
            >
              {/* Service 1 */}
              <motion.div className="flex flex-col items-start space-y-4 group" variants={itemVariants}>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <LucideIcons.BarChart2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white group-hover:text-[#E7C76A] transition-colors">
                  Comprehensive<br />Financial Planning
                </h3>
              </motion.div>

              {/* Service 2 */}
              <motion.div className="flex flex-col items-start space-y-4 group" variants={itemVariants}>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <LucideIcons.Sprout className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white group-hover:text-[#E7C76A] transition-colors">
                  Legacy Planning<br />& Will Writing
                </h3>
              </motion.div>

              {/* Service 3 */}
              <motion.div className="flex flex-col items-start space-y-4 group" variants={itemVariants}>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <LucideIcons.ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white group-hover:text-[#E7C76A] transition-colors">
                  Risk Management<br />(insurance)
                </h3>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
        {/* Background Pattern - Hidden on mobile */}
        <div className="absolute inset-0 opacity-5 hidden md:block">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(30deg, #7A1616 12%, transparent 12.5%, transparent 87%, #7A1616 87.5%, #7A1616), linear-gradient(150deg, #7A1616 12%, transparent 12.5%, transparent 87%, #7A1616 87.5%, #7A1616)',
            backgroundSize: '80px 140px'
          }} />
        </div>

        {/* Decorative blurs - Smaller on mobile */}
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#C9A635]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 h-56 sm:w-96 sm:h-96 bg-[#7A1616]/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            <motion.div
              className="inline-block mb-4 sm:mb-6"
              variants={itemVariants}
            >
              <div className="inline-flex items-center space-x-2 bg-[#C9A635]/10 px-4 sm:px-5 py-2 rounded-full">
                <LucideIcons.Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#C9A635]" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">WHAT DRIVES US</span>
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4"
              variants={itemVariants}
            >
              Our Core{" "}
              <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#D4B547] bg-clip-text text-transparent">
                Values
              </span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
              variants={itemVariants}
            >
              We grow relationships, not transactions — rooted in transparency and your long-term success.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            {companyValues.map((value, index) => {
              const Icon = LucideIcons[value.icon] || LucideIcons.Star;
              return (
                <motion.div
                  key={index}
                  variants={scaleUpVariants}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100 hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500 p-6 sm:p-8 md:p-10 text-center group relative overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7A1616]/5 to-[#C9A635]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex justify-center mb-5 sm:mb-6 md:mb-8">
                      <div className="bg-gradient-to-br from-[#7A1616] to-[#A12424] p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 sm:mb-4 md:mb-5 group-hover:text-[#7A1616] transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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

    </div>
  );
};

export default Home;
