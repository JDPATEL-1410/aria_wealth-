import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import { navigationLinks } from "../data/mock";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const location = useLocation();

  const aboutSubMenu = [
    { name: 'About', path: '/about/about-aria-wealth' },
    { name: 'Our Team', path: '/about/team' },
    { name: 'Vision & Mission', path: '/about/mission-vision' },
    { name: 'Our Philosophy', path: '/about/philosophy' },
    { name: 'Our Values', path: '/about/values' },
    { name: 'Your Journey', path: '/about/journey' },
    { name: 'Our Culture', path: '/about/our-culture' },
  ];

  useEffect(() => {
    setIsOpen(false);
    setAboutDropdownOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 relative z-10">
              <img
                src={logo}
                alt="ARIA WEALTH"
                className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationLinks.map((link) => {
                const isActive = location.pathname === link.path;

                // Special handling for About Us with dropdown
                if (link.name === 'About Us') {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setAboutDropdownOpen(true)}
                      onMouseLeave={() => setAboutDropdownOpen(false)}
                    >
                      <Link
                        to={link.path}
                        className={`relative px-5 py-2.5 text-[15px] font-semibold transition-all duration-300 rounded-lg flex items-center gap-1 ${isActive
                          ? "text-[#7A1616] bg-[#C9A635]/15"
                          : "text-gray-700 hover:text-[#7A1616] hover:bg-[#C9A635]/10"
                          }`}
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-5 right-5 h-1 rounded-full bg-[#C9A635]"
                            transition={{ duration: 0.25 }}
                          />
                        )}
                      </Link>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {aboutDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                          >
                            {aboutSubMenu.map((item) => (
                              <Link
                                key={item.name}
                                to={item.path}
                                className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-[#C9A635]/10 hover:text-[#7A1616] transition-all duration-200 border-b border-gray-50 last:border-b-0"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-5 py-2.5 text-[15px] font-semibold transition-all duration-300 rounded-lg ${isActive
                      ? "text-[#7A1616] bg-[#C9A635]/15"
                      : "text-gray-700 hover:text-[#7A1616] hover:bg-[#C9A635]/10"
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-5 right-5 h-1 rounded-full bg-[#C9A635]"
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7A1616] to-[#8B1A1A] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-[#8B1A1A] hover:to-[#7A1616] transform hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Let's Talk</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden relative z-10">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-[#7A1616] hover:bg-[#C9A635]/10 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Portal */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <div className="lg:hidden">
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-gradient-to-b from-white to-gray-50 shadow-2xl z-[70] flex flex-col border-l border-[#C9A635]/20"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#C9A635]/20">
                <img
                  src={logo}
                  alt="ARIA WEALTH"
                  className="h-12 w-auto object-contain"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-[#7A1616] hover:bg-[#C9A635]/10 transition-all duration-200"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
                {navigationLinks.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-5 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-300 ${isActive
                          ? "text-white bg-gradient-to-r from-[#7A1616] to-[#8B1A1A] shadow-lg"
                          : "text-[#7A1616] hover:bg-[#C9A635]/15 hover:translate-x-1"
                          }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <div className="p-5 border-t border-[#C9A635]/20 space-y-3 bg-white">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#7A1616] to-[#8B1A1A] text-white px-6 py-4 rounded-xl font-bold hover:shadow-lg hover:from-[#8B1A1A] hover:to-[#7A1616] transition-all duration-300 transform active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Let's Talk</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
