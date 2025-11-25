import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  Users,
  TrendingUp,
  Shield,
  Target,
  Heart,
  Clock,
  Building2,
  Briefcase,
  LineChart,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { TEAM } from "./TEAM";

/** ——— Animation helpers ——— */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const VALUES = [
  {
    title: "Built Around You",
    icon: Heart,
    description:
      "Advice that reflects your life, not just markets. We listen first, then plan—so your strategy is tailored and personal.",
    color: "from-rose-500 to-red-600",
  },
  {
    title: "Authenticity",
    icon: Shield,
    description:
      "Transparent, honest guidance that respects your emotions and goals. Money is never just numbers.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Abundance",
    icon: TrendingUp,
    description:
      "Disciplined, data-driven investing aligned with your aspirations to build lasting wealth.",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Integrity",
    icon: Award,
    description:
      "Highest standards in every recommendation. Your privacy is respected and your data is handled with care.",
    color: "from-purple-500 to-violet-600",
  },
  {
    title: "Behavioural Coaching",
    icon: Target,
    description:
      "The real challenge is sticking to the plan. We coach you to stay the course across cycles, headlines and fads.",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Trends change. Your goals don't.",
    icon: Users,
    description:
      "No hype. We avoid unnecessary reshuffling and focus on compounding through thoughtful, disciplined planning.",
    color: "from-cyan-500 to-teal-600",
  },
];

const STATS = [
  { 
    icon: Users, 
    value: "2000+", 
    label: "Happy Clients", 
    color: "from-blue-500 to-blue-600",
    subtext: "Across India" 
  },
  { 
    icon: TrendingUp, 
    value: "₹50Cr+", 
    label: "Assets Under Management", 
    color: "from-green-500 to-green-600",
    subtext: "Growing steadily" 
  },
  { 
    icon: Award, 
    value: "15+", 
    label: "Years of Excellence", 
    color: "from-purple-500 to-purple-600",
    subtext: "In financial advisory" 
  },
  { 
    icon: Shield, 
    value: "100%", 
    label: "Client Satisfaction", 
    color: "from-red-500 to-red-600",
    subtext: "Verified reviews" 
  },
];

const philosophyPillars = [
  {
    title: "Relationship First",
    subtitle: "We listen before we plan.",
    description:
      "Every strategy begins with trust, transparency, and understanding—because meaningful planning starts with genuine connection.",
    icon: Users,
  },
  {
    title: "Strategy Over Speculation",
    subtitle: "Discipline, not distraction.",
    description:
      "We focus on what truly builds wealth: thoughtful asset allocation, disciplined investing, and the quiet strength of compounding.",
    icon: TrendingUp,
  },
  {
    title: "Built Around You",
    subtitle: "Your goals. Your life.",
    description:
      "Portfolios are tailored to reflect your aspirations so your financial strategy is systematic, personal, and deeply aligned with your life stages.",
    icon: Target,
  },
  {
    title: "Staying the Course",
    subtitle: "Wisdom over hype.",
    description:
      "We help you tune out noise—from markets, media, and emotions—so you can stay focused on what matters, with clarity, consistency, and a steady hand.",
    icon: Shield,
  },
];

const JOURNEY_STEPS = [
  {
    title: "Discovery & Clarity",
    description:
      "We understand your life stage, responsibilities, priorities, and what financial freedom truly means to you.",
    icon: Users,
  },
  {
    title: "Goal Mapping & Planning",
    description:
      "We map your goals—children's education, home, retirement, experiences—and align them to a realistic, disciplined plan.",
    icon: Target,
  },
  {
    title: "Portfolio Design & Execution",
    description:
      "We create a diversified, goal-based investment portfolio and help you start with the right structure and platforms.",
    icon: TrendingUp,
  },
  {
    title: "Review, Coaching & Course Correction",
    description:
      "We review, refine, and coach you through market cycles, helping you stay focused on the long game, not the noise.",
    icon: Shield,
  },
];

const WHY_CHOOSE = [
  {
    title: "SEBI Registered",
    description: "Fully compliant and regulated financial advisory services",
    icon: CheckCircle,
  },
  {
    title: "Fiduciary Standard",
    description: "Your interests always come first in every recommendation",
    icon: Shield,
  },
  {
    title: "Holistic Approach",
    description: "Comprehensive wealth management across all life stages",
    icon: Briefcase,
  },
  {
    title: "Transparent Pricing",
    description: "Clear, upfront fee structure with no hidden costs",
    icon: LineChart,
  },
];

const About = () => {
  const heroRef = useRef(null);
  const philosophyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);
  const journeyRef = useRef(null);
  const whyChooseRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const philosophyInView = useInView(philosophyRef, { once: true, margin: "-50px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-50px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-50px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });
  const journeyInView = useInView(journeyRef, { once: true, margin: "-50px" });
  const whyChooseInView = useInView(whyChooseRef, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero Section - Mobile Optimized */}
      <section
        ref={heroRef}
        className="relative min-h-[75vh] sm:min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=80"
            />
            <img
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1920&q=80"
              alt="Indian professional team meeting"
              className="w-full h-full object-cover object-center"
              loading="eager"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1920&q=80';
              }}
            />
          </picture>

          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-[#7A1616]/45" />
          
          {/* Animated overlay pattern - Hidden on mobile for performance */}
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
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A1616]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C9A635] rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">
                SEBI REGISTERED INVESTMENT ADVISOR
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 leading-[1.1] tracking-tight px-2"
              variants={itemVariants}
            >
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Building{" "}
              </span>
              <span className="bg-gradient-to-r from-[#E7C76A] via-[#F8D97A] to-[#C9A635] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(201,166,53,0.5)]">
                Wealth
              </span>
              <br />
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Through{" "}
              </span>
              <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#F8D97A] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(201,166,53,0.5)]">
                Trust
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4"
              variants={itemVariants}
            >
              Authentic relationships. Discipline over noise. A lifelong partnership
              through every life cycle.{" "}
              <span className="text-[#E7C76A] font-semibold">We listen before we plan</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-stretch sm:items-center px-4"
              variants={itemVariants}
            >
              <Link to="/contact" className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-[#A12424] text-white font-bold text-base sm:text-lg rounded-xl hover:bg-[#7A1616] transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95">
                  <span className="flex items-center justify-center gap-2">
                    Schedule a Consultation
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>

              <Link to="/services" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-white/95 backdrop-blur-md text-[#7A1616] font-bold text-base sm:text-lg rounded-xl hover:bg-white transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95 border-2 border-white/50">
                  Explore Our Services
                </button>
              </Link>
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

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern - Hidden on mobile */}
        <div className="absolute inset-0 opacity-5 hidden md:block">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(30deg, #7A1616 12%, transparent 12.5%, transparent 87%, #7A1616 87.5%, #7A1616), linear-gradient(150deg, #7A1616 12%, transparent 12.5%, transparent 87%, #7A1616 87.5%, #7A1616)',
            backgroundSize: '80px 140px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  className="relative text-center group"
                  variants={scaleUpVariants}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C9A635]/10 to-[#7A1616]/10 md:from-[#C9A635]/20 md:to-[#7A1616]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 group-hover:shadow-2xl group-hover:border-[#C9A635]/30 transition-all duration-300">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br ${s.color} rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                      {s.value}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">{s.label}</div>
                    <div className="text-xs text-gray-500 hidden sm:block">{s.subtext}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-br from-[#7A1616]/5 via-white to-[#C9A635]/5 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#C9A635]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#7A1616]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={philosophyInView ? "visible" : "hidden"}
          >
            <motion.div
              className="inline-block mb-4 sm:mb-6"
              variants={itemVariants}
            >
              <div className="inline-flex items-center space-x-2 bg-[#7A1616]/10 px-4 sm:px-5 py-2 rounded-full">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-[#7A1616]" />
                <span className="text-xs sm:text-sm font-semibold text-[#7A1616]">OUR APPROACH</span>
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4"
              variants={itemVariants}
            >
              Our{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#7A1616] bg-clip-text text-transparent">
                Philosophy
              </span>
            </motion.h2>

            <motion.div className="max-w-3xl mx-auto space-y-2 sm:space-y-3 px-4" variants={itemVariants}>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium">
                Guidance that's personal. Strategy that lasts.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Financial freedom through all life cycles —{" "}
                <span className="text-[#7A1616] font-semibold">from first salary to legacy planning.</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Pillars Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={philosophyInView ? "visible" : "hidden"}
          >
            {philosophyPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:border-[#C9A635]/40 group relative overflow-hidden"
                  variants={scaleUpVariants}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7A1616]/5 to-[#C9A635]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="mb-4 sm:mb-5 md:mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#7A1616] via-[#A12424] to-[#7A1616] shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#7A1616] transition-colors duration-300">
                      {pillar.title}
                    </h3>

                    <p className="text-sm font-semibold text-[#C9A635] mb-3 sm:mb-4">
                      {pillar.subtitle}
                    </p>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Number indicator - Hidden on mobile */}
                  <div className="hidden sm:block absolute top-4 right-4 text-5xl sm:text-6xl font-black text-gray-900/5 group-hover:text-[#C9A635]/10 transition-colors duration-500">
                    {index + 1}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section ref={journeyRef} className="py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-[0.03] sm:opacity-5">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=60"
            alt="Journey background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={journeyInView ? "visible" : "hidden"}
          >
            <motion.div
              className="inline-block mb-4 sm:mb-6"
              variants={itemVariants}
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#C9A635]/20 to-[#E7C76A]/20 px-4 sm:px-5 py-2 rounded-full">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-[#C9A635]" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">YOUR ROADMAP</span>
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4"
              variants={itemVariants}
            >
              Your Journey{" "}
              <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#F8D97A] bg-clip-text text-transparent">
                With Us
              </span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
              variants={itemVariants}
            >
              A seamless, personalized experience from our first conversation to your financial freedom.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate={journeyInView ? "visible" : "hidden"}
          >
            {/* Timeline connector - Desktop only */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#C9A635] transform -translate-y-1/2 z-0" />

            {/* Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
              {JOURNEY_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    className="relative"
                    variants={scaleUpVariants}
                    custom={idx}
                  >
                    <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl border-2 border-gray-100 h-full hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500 group relative overflow-hidden">
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A635]/0 to-[#E7C76A]/0 group-hover:from-[#C9A635]/10 group-hover:to-[#E7C76A]/10 transition-all duration-500" />

                      <div className="relative z-10">
                        {/* Icon and step number */}
                        <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#C9A635] via-[#E7C76A] to-[#F8D97A] rounded-xl sm:rounded-2xl shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                          </div>
                          <div className="text-5xl sm:text-6xl font-black bg-gradient-to-br from-[#7A1616]/10 to-[#C9A635]/10 bg-clip-text text-transparent">
                            {idx + 1}
                          </div>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 sm:mb-4 group-hover:text-[#7A1616] transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Progress dot - Desktop only */}
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-[#C9A635] rounded-full hidden lg:block group-hover:scale-125 transition-transform duration-300" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyChooseRef} className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={whyChooseInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4"
              variants={itemVariants}
            >
              Why Choose{" "}
              <span className="bg-gradient-to-r from-[#7A1616] to-[#A12424] bg-clip-text text-transparent">
                ARIA WEALTH
              </span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
              variants={itemVariants}
            >
              Committed to your financial success with integrity and excellence.
            </motion.p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={whyChooseInView ? "visible" : "hidden"}
          >
            {WHY_CHOOSE.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                  variants={itemVariants}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#C9A635] to-[#E7C76A] rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-white via-[#C9A635]/5 to-white relative overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#7A1616]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 h-56 sm:w-96 sm:h-96 bg-[#C9A635]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#C9A635]" />
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
              The principles that guide every decision at ARIA WEALTH.
            </motion.p>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            {VALUES.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100 p-6 sm:p-8 md:p-10 text-center group hover:shadow-2xl transition-all duration-500 hover:border-transparent hover:ring-4 hover:ring-[#C9A635]/20 relative overflow-hidden"
                  variants={scaleUpVariants}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br ${v.color} rounded-xl sm:rounded-2xl mb-6 sm:mb-7 md:mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
                      <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 sm:mb-5 group-hover:text-[#7A1616] transition-colors duration-300">
                      {v.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

     {/* Team Section */}
<section
  ref={teamRef}
  className="py-14 sm:py-18 md:py-22 bg-gradient-to-br from-white to-gray-50 relative"
>
  {/* Soft background texture */}
  <div className="absolute inset-0 opacity-[0.02] sm:opacity-5 pointer-events-none">
    <img
      src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=60"
      alt="Team background"
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Heading */}
    <motion.div
      className="text-center mb-10 sm:mb-14 md:mb-16"
      variants={containerVariants}
      initial="hidden"
      animate={teamInView ? "visible" : "hidden"}
    >
      <motion.div
        className="inline-block mb-4 sm:mb-5"
        variants={itemVariants}
      >
        <div className="inline-flex items-center space-x-2 bg-[#7A1616]/10 px-4 sm:px-5 py-2 rounded-full">
          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-[#7A1616]" />
          <span className="text-xs sm:text-sm font-semibold text-[#7A1616]">
            LEADERSHIP
          </span>
        </div>
      </motion.div>

      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-4"
        variants={itemVariants}
      >
        Meet Our{" "}
        <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#8B1A1A] bg-clip-text text-transparent">
          Team
        </span>
      </motion.h2>

      <motion.p
        className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto px-4"
        variants={itemVariants}
      >
        Experienced professionals dedicated to your financial success.
      </motion.p>
    </motion.div>

    {/* Team Grid */}
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8 md:gap-10 max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={teamInView ? "visible" : "hidden"}
    >
      {TEAM.map((m, index) => (
        <motion.div
          key={m.id}
          className="h-full flex flex-col bg-white rounded-3xl 
                     shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
                     overflow-hidden group transition-all duration-500 
                     hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                     hover:-translate-y-1"
          variants={scaleUpVariants}
        >
          {/* Portrait block with circular image */}
          <div className="relative flex flex-col items-center justify-center pt-10 pb-6 px-6
                          bg-gradient-to-b from-gray-50 to-white">
            
            {/* Circular image container */}
            <div className="relative mb-5">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br 
                              from-[#7A1616]/10 to-[#C9A635]/10 
                              scale-110 blur-xl" />
              
              {/* Main circular image */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 
                              rounded-full overflow-hidden
                              bg-gradient-to-br from-gray-100 to-gray-50
                              border-4 border-white
                              shadow-[0_8px_24px_rgba(0,0,0,0.12)]
                              transition-all duration-500
                              group-hover:shadow-[0_12px_32px_rgba(122,22,22,0.2)]
                              group-hover:scale-105">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover object-top"
                  style={{ 
                    backgroundColor: 'transparent'
                  }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Name and Position - Centered */}
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2
                             group-hover:text-[#7A1616] transition-colors">
                {m.name}
              </h3>

              <div className="inline-block px-4 py-1.5 rounded-full
                              bg-gradient-to-r from-[#7A1616] to-[#A12424]
                              text-white text-sm sm:text-base font-semibold
                              shadow-sm">
                {m.position}
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 flex flex-col p-6 sm:p-7 bg-white">
            
            {/* Experience badge */}
            <div className="flex items-center justify-center gap-2 
                            text-sm text-gray-600 mb-5
                            bg-gray-50 px-4 py-2 rounded-full 
                            border border-gray-100 w-fit mx-auto">
              <Clock className="w-4 h-4 text-[#7A1616]" />
              <span className="font-medium">{m.experience}</span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 text-center 
                          leading-relaxed mb-5">
              {m.description}
            </p>

            {/* Specialization */}
            <div className="mt-auto pt-5 border-t border-gray-100">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#7A1616]" />
                  <span className="text-xs font-bold text-[#7A1616] 
                                   uppercase tracking-wide">
                    Specialization
                  </span>
                </div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">
                  {m.specialization}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>



      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-[#7A1616] via-[#A12424] to-[#7A1616] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=60"
            />
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80"
              alt="Financial planning"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </picture>
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#C9A635]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C9A635] rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-white">START YOUR JOURNEY TODAY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 sm:mb-8 leading-tight px-2">
              Ready to Start Your<br />
              <span className="bg-gradient-to-r from-[#E7C76A] via-[#F8D97A] to-[#C9A635] bg-clip-text text-transparent">
                Wealth Journey?
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto px-4">
              Let's build a personalized financial plan that grows with you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 justify-center items-stretch sm:items-center px-4">
              <Link to="/contact" className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-white text-[#7A1616] font-bold text-base sm:text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95">
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    Book Your Free Consultation
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>

              <Link to="/services" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-transparent border-2 sm:border-3 border-white text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white hover:text-[#7A1616] transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95">
                  Download Our Brochure
                </button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 sm:mt-14 md:mt-16 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-semibold">SEBI Registered</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full" />
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-semibold">15+ Years Experience</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-semibold">2000+ Happy Clients</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
