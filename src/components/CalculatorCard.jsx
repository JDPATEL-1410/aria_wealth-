import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const CalculatorCard = ({ calculator, index, inView = true }) => {
  const IconComponent = LucideIcons[calculator.icon] || LucideIcons.Calculator;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -90 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        delay: index * 0.1 + 0.2,
        duration: 0.4,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      className="group relative"
    >
      <Link to={calculator.path} className="block">
        <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full">
          {/* Background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7A1616]/5 via-transparent to-[#C9A635]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative p-5 sm:p-6 md:p-8">
            {/* Icon */}
            <motion.div
              className="mb-4 sm:mb-6"
              variants={iconVariants}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#7A1616] to-[#8B1A1A] rounded-lg sm:rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#7A1616] transition-colors duration-300 line-clamp-2">
                {calculator.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
                {calculator.description}
              </p>
            </div>

            {/* Try Now Button */}
            <div className="mt-6 sm:mt-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#C9A635] to-[#D4B547] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base group-hover:from-[#D4B547] group-hover:to-[#C9A635] transition-all duration-300 transform group-hover:scale-105 shadow-md group-hover:shadow-lg">
                <span>Try Calculator</span>
                <LucideIcons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

            {/* Decorative elements - Hidden on mobile */}
            <div className="hidden sm:block absolute top-4 right-4 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-[#C9A635]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="hidden sm:block absolute -bottom-2 -right-2 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-tl from-[#7A1616]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CalculatorCard;
