import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const ServiceCard = ({ service, index, inView = true }) => {
  const IconComponent = LucideIcons[service.icon] || LucideIcons.Star;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        delay: index * 0.1 + 0.3,
        duration: 0.5,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7A1616]/5 via-transparent to-[#C9A635]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
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
            {service.title}
          </h3>
          
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
            {service.description}
          </p>

          {/* Features */}
          <div className="space-y-2">
            {service.features.slice(0, 4).map((feature, featureIndex) => (
              <motion.div
                key={featureIndex}
                className="flex items-start space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 + 0.5 + featureIndex * 0.1 }}
              >
                <div className="w-1.5 h-1.5 bg-[#C9A635] rounded-full mt-1.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700 leading-snug">{feature}</span>
              </motion.div>
            ))}
            {service.features.length > 4 && (
              <p className="text-xs text-gray-500 italic pl-3.5">
                +{service.features.length - 4} more features
              </p>
            )}
          </div>
        </div>

        {/* Learn More Link */}
        <motion.div 
          className="mt-5 sm:mt-6 pt-4 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.8 }}
        >
          <button className="group/btn inline-flex items-center space-x-2 text-[#7A1616] hover:text-[#8B1A1A] font-medium text-sm transition-colors duration-200">
            <span>Learn More</span>
            <LucideIcons.ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </button>
        </motion.div>

        {/* Decorative elements - Hidden on mobile */}
        <div className="hidden sm:block absolute top-4 right-4 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-[#C9A635]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="hidden sm:block absolute bottom-4 left-4 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-tr from-[#7A1616]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
