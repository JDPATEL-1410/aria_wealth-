import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Linkedin, Instagram, Youtube } from "lucide-react";
import { contactInfo, socialLinks } from "../data/mock";
import logo from "../assets/logo.png";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const socialIcons = [
    {
      icon: Linkedin,
      href: socialLinks.linkedin,
      label: "LinkedIn",
      hoverColor: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
    },
    {
      icon: Instagram,
      href: socialLinks.instagram,
      label: "Instagram",
      hoverColor:
        "hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-pink-500",
    },
    {
      icon: Youtube,
      href: socialLinks.youtube,
      label: "YouTube",
      hoverColor: "hover:bg-[#FF0000] hover:border-[#FF0000]",
    },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Financial Wisdom", path: "/financial-wisdom" },
    { name: "Calculators", path: "/calculators" },
    { name: "Contact", path: "/contact" },
  ];

  const serviceLinks = [
    { name: "Investment Solutions", path: "/services/investment-solutions" },
    { name: "Goal-Based Planning", path: "/services/goal-based-solutions" },
    { name: "Insurance & Protection", path: "/services/insurance-protection" },
    { name: "Estate Planning", path: "/services/estate-planning" },
    { name: "Other Solutions", path: "/services/other-solutions" },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#F5EDE8] via-white to-[#FAF7F2] text-gray-900 border-t border-[#C9A635]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <motion.div
          className="py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Brand - Left Side */}
            <motion.div
              className="lg:col-span-4 text-center lg:text-left"
              variants={itemVariants}
            >
              <img src={logo} alt="ARIA WEALTH" className="h-24 mx-auto lg:mx-0" />
              <p className="mt-4 text-lg font-semibold text-[#7A1616]">
                Authentic Relationships Inspiring Abundance
              </p>
              <p className="text-gray-700 mt-2 max-w-md mx-auto lg:mx-0 leading-relaxed">
                AMFI Registered Mutual Fund Distributor committed to empowering families through holistic financial planning and disciplined investing.
              </p>

              <div className="mt-6 bg-gradient-to-r from-[#C9A635]/10 to-transparent p-4 rounded-lg border border-[#C9A635]/30">
                <h4 className="text-[#7A1616] font-semibold mb-2">Need Guidance?</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Talk to our AMFI certified advisors to start your financial journey.
                </p>
                <Link
                  to="/contact"
                  className="inline-block bg-gradient-to-r from-[#7A1616] to-[#8B1A1A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-[#8B1A1A] hover:to-[#7A1616] transition-all duration-300 transform hover:scale-105"
                >
                  Schedule a Call
                </Link>
              </div>
            </motion.div>

            {/* Quick Links & Services - Middle */}
            <motion.div
              className="lg:col-span-4 grid md:grid-cols-2 gap-8 text-center lg:text-left"
              variants={itemVariants}
            >
              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold text-[#7A1616] mb-4">Quick Links</h3>
                <div className="grid gap-3">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-gray-700 hover:text-[#7A1616] font-medium transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-xl font-bold text-[#7A1616] mb-4">Our Services</h3>
                <div className="grid gap-3">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-gray-700 hover:text-[#7A1616] font-medium transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Info & Social - Right Side */}
            <motion.div
              className="lg:col-span-4 text-center lg:text-left"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-[#7A1616] mb-4">Get In Touch</h3>
              
              {/* Contact Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="bg-[#C9A635]/20 p-2 rounded-lg">
                    <Phone className="w-4 h-4 text-[#7A1616]" />
                  </div>
                  <a href="tel:7977523663" className="text-gray-700 hover:text-[#7A1616] font-medium">
                    +91 79775 23663
                  </a>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="bg-[#C9A635]/20 p-2 rounded-lg">
                    <Mail className="w-4 h-4 text-[#7A1616]" />
                  </div>
                  <a href="mailto:care@ariawealth.in" className="text-gray-700 hover:text-[#7A1616] font-medium">
                    care@ariawealth.in
                  </a>
                </div>
                <div className="flex items-start justify-center lg:justify-start gap-3">
                  <div className="bg-[#C9A635]/20 p-2 rounded-lg">
                    <MapPin className="w-4 h-4 text-[#7A1616] mt-0.5" />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    C-4104, Oberoi Garden Estate,<br />
                    Chandivali Farm Road,<br />
                    Chandivali, Mumbai - 400072
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mb-6 bg-[#7A1616]/5 p-4 rounded-lg border border-[#7A1616]/10">
                <h4 className="font-bold text-[#7A1616] mb-2">Office Hours</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Mon - Fri: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 2:00 PM<br />
                  Sunday: Closed
                </p>
              </div>

              {/* Social Icons */}
              <div>
                <h4 className="font-semibold text-[#7A1616] mb-3">Follow Us</h4>
                <div className="flex gap-3 justify-center lg:justify-start">
                  {socialIcons.map(({ icon: Icon, href, label, hoverColor }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`border-2 border-[#C9A635] p-3 rounded-lg text-[#7A1616] bg-white hover:text-white transition-all duration-300 transform hover:scale-110 ${hoverColor}`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}

                  {/* WhatsApp */}
                  <motion.a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-[#25D366] p-3 rounded-lg text-[#25D366] bg-white hover:bg-[#25D366] hover:text-white transition-all duration-300 transform hover:scale-110"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Sub-Footer Disclaimer (Full Width) */}
      <div className="w-full bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-gray-200 border-t border-[#C9A635]/30 shadow-inner px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Regulator Links */}
          <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold text-[#C9A635] mb-4">
            {[
              { name: "NSE", url: "https://www.nseindia.com/" },
              { name: "BSE", url: "https://www.bseindia.com/" },
              { name: "SEBI", url: "https://www.sebi.gov.in/" },
              { name: "RBI", url: "https://www.rbi.org.in/" },
              { name: "CDSL", url: "https://www.cdslindia.com/" },
              { name: "NSDL", url: "https://nsdl.co.in/" },
              { name: "NCDEX", url: "https://www.ncdex.com/" },
              { name: "MCX", url: "https://www.mcxindia.com/" },
            ].map((link, idx) => (
              <React.Fragment key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline-offset-2 hover:underline transition-all"
                >
                  {link.name}
                </a>
                {idx < 7 && <span className="text-gray-500">|</span>}
              </React.Fragment>
            ))}
          </div>

          <p className="text-gray-300 text-sm leading-relaxed text-justify">
            <span className="font-bold text-[#C9A635]">Risk Factors –</span> Investments in
            Mutual Funds are subject to Market Risks. Read all scheme related documents
            carefully before investing. Mutual Fund Schemes do not assure or guarantee any
            returns. Past performance may or may not be sustained in future. Option of
            Direct Plan is available for all schemes offering lower expense ratio. We deal
            only in Regular Plans and earn a trailing commission.
          </p>

          <div className="mt-5 text-sm text-gray-300 space-y-2 text-center">
            <p>
              <span className="text-[#C9A635] font-semibold">
                AMFI Registered Mutual Fund Distributor
              </span>{" "}
              | ARN: <span className="font-bold">100804</span> | Date of Registration:{" "}
              <span className="font-semibold">20/02/2024</span> | Valid till:{" "}
              <span className="font-semibold">20/02/2027</span>
            </p>

            <p className="text-gray-400 text-xs">
              © 2025 ARIA WEALTH. All Rights Reserved. |
              <Link
                to="/commission-disclosure"
                className="text-[#C9A635] hover:text-white transition-colors mx-1"
              >
                Commission Disclosure
              </Link>
              |
              <Link
                to="https://www.sebi.gov.in/filings/mutual-funds.html"
                className="text-[#C9A635] hover:text-white transition-colors mx-1"
              >
                SID/SAI/KIM
              </Link>
              |
              <Link
                to="/privacy-policy"
                className="text-[#C9A635] hover:text-white transition-colors mx-1"
              >
                Privacy Policy
              </Link>
              |
             <a
  href="/AMFI_Code-of-Conduct.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="text-[#C9A635] hover:text-white transition-colors mx-1"
>
  Code of Conduct
</a>

            </p>

            <p className="text-gray-400 text-xs mt-2">
              <span className="font-semibold text-white">Grievance Officer:</span> ANIL KUMAR. P.V | 
              For any grievance, please contact:{" "}
              <span className="font-medium text-white">
                +91 79775 23663
              </span>{" "}
              or email at{" "}
              <a
                href="mailto:care@ariawealth.in"
                className="text-[#C9A635] hover:text-white transition-colors"
              >
                care@ariawealth.in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#C9A635]/30 py-6 text-center space-y-3 bg-[#F5EDE8]/80">
        <p className="text-sm text-gray-700">
          © 2025 ARIA WEALTH | AMFI Registered Mutual Fund Distributor | ARN: 100804
        </p>
        <p className="text-xs text-[#7A1616] font-medium">
          Investments in Mutual Funds are subject to market risks. Read all
          scheme-related documents carefully before investing.
        </p>
        
        {/* Designed By */}
        <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
          Designed & Developed by{" "}
          <a
            href="https://ainatech.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7A1616] hover:text-[#C9A635] font-semibold transition-colors duration-300 flex items-center gap-1"
          >
            AINA TECH SERVICES LLP
            <svg 
              className="w-3 h-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
