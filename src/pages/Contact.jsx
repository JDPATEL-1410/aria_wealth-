import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { contactInfo } from '../data/mock';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: "-100px" });
  const contactInfoInView = useInView(contactInfoRef, { once: true, margin: "-100px" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const mailtoLink = `mailto:info@ariawealth.com?subject=${encodeURIComponent(formData.subject || 'Contact Form Submission')}&body=${encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n\n` +
        `Message:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoLink;
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('There was an error submitting your message. Please try again or email us directly at info@ariawealth.com');
    }
  };

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

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      info: contactInfo.phone || '+91 79775 23663',
      action: `tel:${contactInfo.phone || '+919876543210'}`,
      color: 'from-[#7A1616] to-[#A12424]'
    },
    {
      icon: Mail,
      title: 'Email Us',
      info: 'info@ariawealth.com',
      action: 'mailto:info@ariawealth.com',
      color: 'from-[#C9A635] to-[#E7C76A]'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      info: 'Quick Response',
      action: `https://wa.me/${contactInfo.whatsapp?.replace(/[^0-9]/g, '') || '917977523663'}`,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      info: 'Mon-Fri: 9 AM - 6 PM',
      action: null,
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const officeAddress = contactInfo.address || 'Mumbai Financial District, Mumbai, Maharashtra, India';
  const googleMapsSearchUrl = `https://www.google.com/maps?q=${encodeURIComponent(officeAddress)}`;
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9876543210!2d72.8776559!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjUiTiA3MsKwNTInMzkuNiJF!5e0!3m2!1sen!2sin!4v1234567890`;

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
            />
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
              alt="Contact us - Office building"
              className="w-full h-full object-cover object-center opacity-90"
              loading="eager"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80';
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
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A1616]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C9A635] rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">
                GET IN TOUCH
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 leading-[1.1] tracking-tight px-2"
              variants={itemVariants}
            >
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Let's Start Your{" "}
              </span>
              <span className="bg-gradient-to-r from-[#E7C76A] via-[#F8D97A] to-[#C9A635] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(201,166,53,0.5)]">
                Financial Journey
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4"
              variants={itemVariants}
            >
              Schedule a <span className="text-[#E7C76A] font-semibold">free consultation</span> with our AMFI certified experts.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
              variants={itemVariants}
            >
              <a
                href="#contact-form"
                className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-white text-[#7A1616] font-bold text-base sm:text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105"
              >
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`tel:${contactInfo.phone || '+919876543210'}`}
                className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white hover:text-[#7A1616] transition-all duration-300 shadow-2xl"
              >
                <Phone className="w-5 h-5" />
                Call Now
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

      {/* Contact Methods */}
      <section ref={contactInfoRef} className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
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
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#C9A635]" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">REACH US</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4">
              Multiple Ways to{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#8B1A1A] bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={contactInfoInView ? "visible" : "hidden"}
          >
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: index * 0.1
                      }
                    }
                  }}
                  whileHover={{ y: -10 }}
                >
                  {method.action ? (
                    <a 
                      href={method.action}
                      target={method.action.startsWith('http') ? '_blank' : '_self'}
                      rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="block group h-full"
                    >
                      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100 h-full p-5 sm:p-6 md:p-8 text-center group-hover:shadow-2xl group-hover:border-[#C9A635]/40 transition-all duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#7A1616]/5 to-[#C9A635]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10">
                          <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r ${method.color} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
                            <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                          </div>
                          <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#7A1616] transition-colors duration-300">
                            {method.title}
                          </h3>
                          <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{method.info}</p>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100 h-full p-5 sm:p-6 md:p-8 text-center">
                      <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r ${method.color} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-2xl`}>
                        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900 mb-2 sm:mb-3">
                        {method.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{method.info}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section id="contact-form" ref={formRef} className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-gray-100 p-6 sm:p-8 md:p-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3">
                  Send Us a{" "}
                  <span className="bg-gradient-to-r from-[#7A1616] to-[#A12424] bg-clip-text text-transparent">
                    Message
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Fill out the form and we'll get back to you within 24 hours.</p>
                
                {isSubmitted && (
                  <motion.div
                    className="mb-6 p-3 sm:p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-start space-x-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-green-800 font-semibold">
                      Thank you! Your email client will open. We'll respond within 24 hours.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-[#C9A635] focus:outline-none font-medium"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-[#C9A635] focus:outline-none font-medium"
                        placeholder=""
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-[#C9A635] focus:outline-none font-medium"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-[#C9A635] focus:outline-none font-medium"
                      placeholder="What can we help you with?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-[#C9A635] focus:outline-none font-medium resize-none"
                      placeholder="Tell us about your financial goals..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white py-3 sm:py-4 px-6 rounded-xl font-bold text-base sm:text-lg hover:from-[#8B1A1A] hover:to-[#7A1616] transition-all duration-300 disabled:opacity-50 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Send Message to info@ariawealth.com</span>
                        <span className="sm:hidden">Send Message</span>
                      </div>
                    )}
                  </button>
                  
                  <p className="text-gray-500 text-xs sm:text-sm text-center">
                    Or email us directly at{' '}
                    <a href="mailto:info@ariawealth.com" className="text-[#7A1616] font-semibold hover:underline break-all">
                      info@ariawealth.com
                    </a>
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Map & Office Info */}
            <motion.div
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Office Details */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-gray-100 p-6 sm:p-8 md:p-10">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-5 sm:mb-6">
                  Visit Our{" "}
                  <span className="bg-gradient-to-r from-[#C9A635] to-[#E7C76A] bg-clip-text text-transparent">
                    Office
                  </span>
                </h3>
                
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-gradient-to-r from-[#7A1616] to-[#A12424] p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">Address</h4>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                        {contactInfo.address || 'Mumbai Financial District\nBandra Kurla Complex\nMumbai, Maharashtra 400051'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-gradient-to-r from-[#C9A635] to-[#E7C76A] p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">Office Hours</h4>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                        {contactInfo.office_hours || 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#7A1616]/10 to-[#C9A635]/10 p-5 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-[#C9A635]/30">
                    <h4 className="font-bold text-[#7A1616] mb-2 sm:mb-3 text-base sm:text-lg">Quick Connect</h4>
                    <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                      Need immediate assistance? Call us or send a WhatsApp message for fastest response.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={`tel:${contactInfo.phone || '+919876543210'}`}
                        className="flex-1 bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl text-center text-sm sm:text-base font-bold hover:from-[#8B1A1A] hover:to-[#7A1616] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Phone className="w-4 h-4 inline mr-2" />
                        Call Now
                      </a>
                      <a
                        href={`https://wa.me/${contactInfo.whatsapp?.replace(/[^0-9]/g, '') || '919876543210'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl text-center text-sm sm:text-base font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <MessageCircle className="w-4 h-4 inline mr-2" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
                <div className="h-64 sm:h-80 md:h-96">
                  <iframe
                    title="Office Location"
                    src={googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl sm:rounded-3xl"
                  ></iframe>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50">
                  <a
                    href={googleMapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-[#7A1616] text-sm sm:text-base font-bold hover:text-[#A12424] transition-colors duration-300"
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    View on Google Maps
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
