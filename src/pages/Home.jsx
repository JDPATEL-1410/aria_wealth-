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
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
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

      {/* Philosophy Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-[#7A1616]/5 via-white to-[#C9A635]/5 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#C9A635]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#7A1616]/10 rounded-full blur-3xl" />

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
              <LucideIcons.Sparkles className="w-4 h-4 text-[#7A1616]" />
              <span className="text-sm font-semibold text-[#7A1616]">OUR PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 px-4">
              Built on Trust. Guided by{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#7A1616] bg-clip-text text-transparent">
                Clarity
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto px-4 mb-6">
              At Aria Wealth, we believe financial planning is not about predicting markets — it's about understanding people.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Your goals, your responsibilities, your emotions, and your lived experiences shape the way you make financial decisions.
            </p>
          </motion.div>

          {/* Philosophy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "Handshake",
                title: "Relationship First",
                subtitle: "We listen before we plan.",
                description: "Every conversation begins with understanding your needs, concerns, and aspirations. We value honesty, empathy, and transparency — because meaningful guidance can only come from meaningful connection."
              },
              {
                icon: "TrendingUp",
                title: "Strategy Over Speculation",
                subtitle: "We do not chase trends, shortcuts, or noise.",
                description: "Our approach is structured, research-backed, and aligned with your risk profile and time horizon. We keep the focus on discipline and suitability — helping you stay consistent through different market movements."
              },
              {
                icon: "Repeat",
                title: "Stability Over Activity",
                subtitle: "We believe stability creates long-term value.",
                description: "Frequent changes driven by emotion or market buzz rarely help. Our role is to guide you with calmness, help you avoid reactive decisions, and keep your plan aligned with your long-term goals."
              },
              {
                icon: "Brain",
                title: "Behavioural Guidance Matters",
                subtitle: "Financial success is as much about behaviour as it is about products.",
                description: "During uncertain times, emotions can take over. We support you with behavioural insights and steady guidance so you can stay focused, disciplined, and confident."
              },
              {
                icon: "Sprout",
                title: "Abundance Through Discipline",
                subtitle: "We believe wealth grows through patience.",
                description: "Our approach helps you understand risks, plan systematically, and build financial habits that support long-term well-being through consistent effort and thoughtful choices — not shortcuts."
              },
              {
                icon: "Lock",
                title: "Integrity & Transparency",
                subtitle: "Your trust is our greatest responsibility.",
                description: "We operate with complete confidentiality, follow all regulatory norms, and ensure every recommendation is suitability-driven and clearly explained in everything we do."
              }
            ].map((item, index) => {
              const Icon = LucideIcons[item.icon] || LucideIcons.Star;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#7A1616] to-[#A12424] rounded-2xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-[#7A1616] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#C9A635] mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Statement */}
          <motion.div
            className="mt-12 sm:mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7A1616]/5 via-[#C9A635]/5 to-[#7A1616]/5 rounded-full border border-[#C9A635]/20">
              <LucideIcons.Target className="w-5 h-5 text-[#7A1616]" />
              <span className="text-sm sm:text-base font-semibold text-gray-700">
                A Lifelong, Evolving Partnership
              </span>
            </div>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mt-4 px-4">
              Life changes. Goals evolve. Plans need adjustments. We stay with you through every stage — from starting a career to building a family, preparing for retirement, or planning your legacy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] sm:opacity-5">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=60"
            alt="Culture background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

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
              <LucideIcons.Heart className="w-4 h-4 text-[#C9A635]" />
              <span className="text-sm font-semibold text-gray-700">OUR CULTURE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 px-4">
              A Culture Rooted in{" "}
              <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#C9A635] bg-clip-text text-transparent">
                Care & Clarity
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto px-4">
              Financial guidance should feel human — not transactional. Every conversation, every process, and every decision reflects our commitment to understanding people first and numbers second.
            </p>
          </motion.div>

          {/* Culture Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: "Users",
                title: "People First, Always",
                description: "We treat every family with the respect, patience, and attention they deserve. Your goals matter to us. Your worries matter to us. Your journey matters to us. Our culture celebrates meaningful relationships, honest conversations, and genuine understanding."
              },
              {
                icon: "Eye",
                title: "Transparency in Every Interaction",
                description: "We communicate openly — no jargon, no hidden motives, no unrealistic promises. We explain risks clearly and set expectations responsibly. Trust is earned through clarity, and we protect that trust in everything we do."
              },
              {
                icon: "Focus",
                title: "Discipline Over Distractions",
                description: "In a world full of noise, we stay grounded. Our culture encourages thoughtful decision-making, structured processes, and long-term thinking — not reactions to market rumours or short-term trends."
              },
              {
                icon: "BookOpen",
                title: "Learning, Improving & Growing Together",
                description: "We believe financial awareness is a lifelong journey. Our team consistently upgrades knowledge, stays aligned with regulatory frameworks, and embraces continuous learning. This helps us guide you with deeper understanding and better clarity."
              },
              {
                icon: "Shield",
                title: "Integrity as a Daily Practice",
                description: "Integrity is not a statement — it's a discipline. From documentation to discussions, confidentiality to compliance, we uphold ethical standards in everything we do. Your trust is our responsibility, and we honour it every day."
              },
              {
                icon: "Home",
                title: "A Calm, Supportive Environment",
                description: "Money conversations can be emotional. Our culture is intentionally calm, patient, and supportive — helping families make decisions without pressure, fear, or confusion. We aim to create a space where you feel heard, respected, and understood."
              },
              {
                icon: "MessageSquare",
                title: "Collaboration Over Correspondence",
                description: "At Aria Wealth, we don't believe in one-way communication. We work with you — not just for you. Your inputs guide the process, and your comfort guides the pace. Every step is a partnership."
              },
              {
                icon: "Infinity",
                title: "Commitment to Long-Term Relationships",
                description: "We are not here for one-time transactions or short-term interactions. We are here to walk with you — through life stages, milestones, and transitions. Our culture thrives on lasting relationships built on trust, consistency, and mutual respect."
              }
            ].map((item, index) => {
              const Icon = LucideIcons[item.icon] || LucideIcons.Star;
              return (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:border-[#C9A635]/30 transition-all duration-500 group"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 2) * 0.1, duration: 0.6 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#C9A635] to-[#E7C76A] rounded-xl sm:rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 group-hover:text-[#7A1616] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-white via-[#C9A635]/5 to-white overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#7A1616]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 h-56 sm:w-96 sm:h-96 bg-[#C9A635]/10 rounded-full blur-3xl" />

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
              <LucideIcons.Compass className="w-4 h-4 text-[#C9A635]" />
              <span className="text-sm font-semibold text-gray-700">OUR PURPOSE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 px-4">
              A Purpose Rooted in{" "}
              <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#D4B547] bg-clip-text text-transparent">
                Clarity & Care
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto px-4 mb-4">
              To help individuals and families make informed financial decisions with confidence, clarity, and peace of mind.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              We exist to bring structure where there is confusion, calm where there is noise, and confidence where there is doubt.
            </p>
          </motion.div>

          {/* Purpose Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {[
              {
                icon: "Lightbulb",
                title: "Empower Through Understanding",
                description: "We believe people make better decisions when they truly understand their choices. Our purpose is to simplify financial concepts and bring clarity to every discussion — without jargon, pressure, or unrealistic promises."
              },
              {
                icon: "Target",
                title: "Build Disciplined, Long-Term Habits",
                description: "True progress comes from consistency. We help families adopt disciplined, goal-aligned habits that support long-term financial well-being, without getting swayed by short-term market noise."
              },
              {
                icon: "Heart",
                title: "Guidance That Feels Human",
                description: "Your financial life is personal, emotional, and unique. Our purpose is to guide with empathy — to listen, understand, and support without judgement or assumptions."
              },
              {
                icon: "ShieldCheck",
                title: "Uphold Trust & Transparency",
                description: "Every conversation and every decision is rooted in ethics and responsibility. We follow regulatory standards, communicate openly, and ensure your trust is protected at every step."
              },
              {
                icon: "Layers",
                title: "Create Stability Across Life Stages",
                description: "Life evolves — careers shift, families grow, priorities change. Our purpose is to help you stay prepared, informed, and grounded across every chapter of life."
              },
              {
                icon: "Anchor",
                title: "Be a Steady Companion",
                description: "Markets fluctuate. News changes daily. But our purpose remains constant — to be a calm, steady, reliable partner who helps you stay aligned with your long-term goals."
              }
            ].map((item, index) => {
              const Icon = LucideIcons[item.icon] || LucideIcons.Star;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500 group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#C9A635] to-[#E7C76A] rounded-2xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 group-hover:text-[#7A1616] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Final Statement */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="inline-block bg-gradient-to-r from-[#7A1616]/5 via-[#C9A635]/5 to-[#7A1616]/5 rounded-2xl px-8 py-6 border-2 border-[#C9A635]/20">
              <p className="text-lg sm:text-xl font-semibold text-gray-900">
                We believe financial clarity shouldn't be complicated or intimidating.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mt-2">
                Our purpose is to create a safe, transparent, and comfortable environment where every family can make thoughtful decisions for their future.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
