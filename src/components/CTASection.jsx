import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, Calendar } from 'lucide-react';

const CTASection = ({ 
  title = "Ready to Start Your Wealth Journey?",
  subtitle = "Get personalized financial advice from our AMFI certified experts",
  primaryCta = { text: "Schedule Free Consultation", link: "/contact" },
  secondaryCta = { text: "Explore Our Services", link: "/services" },
  bgVariant = "primary" // "primary" or "secondary"
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const bgClass = bgVariant === "primary" 
    ? "bg-gradient-to-br from-[#7A1616] via-[#8B1A1A] to-[#7A1616]" 
    : "bg-gradient-to-br from-gray-900 via-[#7A1616] to-gray-900";

  return (
    <section className={`relative py-16 sm:py-20 overflow-hidden ${bgClass}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-[#C9A635]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-[#C9A635]/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-4"
              variants={itemVariants}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4"
              variants={itemVariants}
            >
              <Link
                to={primaryCta.link}
                className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#C9A635] to-[#D4B547] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-[#D4B547] hover:to-[#C9A635] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl w-full sm:w-auto"
              >
                <Calendar className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{primaryCta.text}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </Link>
              
              <Link
                to={secondaryCta.link}
                className="group inline-flex items-center justify-center space-x-2 border-2 border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm w-full sm:w-auto"
              >
                <span className="truncate">{secondaryCta.text}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </Link>
            </motion.div>

            {/* Contact Options */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto px-4"
              variants={itemVariants}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-[#C9A635] p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">Call Us Now</h4>
                    <a 
                      href="tel:+919876543210"
                      className="text-[#C9A635] hover:text-white transition-colors duration-200 text-sm sm:text-base truncate block"
                    >
                      +91 79775 23663
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-[#C9A635] p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">Email Us</h4>
                    <a 
                      href="mailto:info@ariawealth.com"
                      className="text-[#C9A635] hover:text-white transition-colors duration-200 text-sm sm:text-base truncate block"
                    >
                      info@ariawealth.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="mt-8 sm:mt-12 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-3 sm:gap-8 text-gray-300 px-4"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#C9A635] rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm">AMFI Registered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#C9A635] rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm">2000+ Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#C9A635] rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm">15+ Years</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#C9A635] rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm">₹50Cr+ AUM</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
