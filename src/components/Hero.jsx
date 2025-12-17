import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, TrendingUp, Users, Shield } from 'lucide-react';
import { heroData } from '../data/mock';
import heroImage from '../assets/Herosection.png';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const statsData = [
    { icon: Users, value: '200+', label: 'Families on the Path to Financial Freedom' },
    { icon: TrendingUp, value: '₹50Cr+', label: 'Assets Under Management' },
    { icon: Shield, value: '15+', label: 'Years of Creating Wealth' },
  ];

  return (
    <section
      className="relative flex items-center justify-start min-h-[90vh] sm:min-h-screen overflow-hidden bg-cover bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: 'center right',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 flex justify-start">
        <motion.div
          className="max-w-3xl flex flex-col items-start text-left space-y-6 md:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 bg-white/90 px-5 py-2 rounded-full shadow-md border border-gray-200"
            variants={itemVariants}
          >
            <div className="w-2 h-2 bg-[#C9A635] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600">
              AMFI Registered Mutual Fund Distributor
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-[#7A1616] to-[#8B1A1A] bg-clip-text text-transparent">
              Your Goals Stay
            </span>
            <br />
            <span className="text-gray-800">
              the{' '}
              <span className="bg-gradient-to-r from-[#C9A635] to-[#D4B547] bg-clip-text text-transparent">
                Course
              </span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl text-gray-700 max-w-2xl leading-relaxed"
            variants={itemVariants}
          >
            {heroData.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-5 pt-4"
            variants={itemVariants}
          >
            {/* Primary CTA - Updated */}
            <Link
              to="/services"
              className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#7A1616] to-[#8B1A1A] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-[#8B1A1A] hover:to-[#7A1616] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span>Explore Our Solutions</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            {/* Contact CTA */}
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center space-x-2 border-2 border-[#C9A635] text-[#7A1616] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#C9A635] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Let’s Connect</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-6 md:gap-10 pt-10 md:pt-16 border-t border-gray-200/70 mt-6"
            variants={itemVariants}
          >
            {statsData.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-start text-left space-y-1"
                >
                  <div className="bg-gradient-to-r from-[#7A1616] to-[#8B1A1A] p-3 rounded-xl mb-2">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
