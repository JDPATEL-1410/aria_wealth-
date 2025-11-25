import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, FileText, AlertTriangle, Info, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { complianceData } from '../data/mock';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import CTASection from '../components/CTASection';

const Compliance = () => {
  const heroRef = useRef(null);
  const disclaimerRef = useRef(null);
  const guidelinesRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const disclaimerInView = useInView(disclaimerRef, { once: true, margin: "-100px" });
  const guidelinesInView = useInView(guidelinesRef, { once: true, margin: "-100px" });

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

  const complianceCards = [
    {
      icon: Shield,
      title: "SEBI Compliance",
      description: "We operate under strict SEBI guidelines to ensure investor protection and market integrity.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FileText,
      title: "AMFI Registration",
      description: "Registered with AMFI as a Mutual Fund Distributor with valid certification.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: CheckCircle,
      title: "KYC Compliance",
      description: "Mandatory KYC compliance for all investments as per regulatory requirements.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: DollarSign,
      title: "Fee Transparency",
      description: "Complete transparency in all fees, charges, and commission structures.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const operationalPolicies = [
    {
      icon: Clock,
      title: "SIP Bounce Policy",
      details: "Maximum 3 consecutive bounces allowed. After 3 bounces, SIP will be discontinued.",
      color: "text-red-600"
    },
    {
      icon: FileText,
      title: "Exit Load Policy",
      details: "Exit loads as per scheme information document. Typically 1% for equity funds if redeemed within 1 year.",
      color: "text-blue-600"
    },
    {
      icon: CheckCircle,
      title: "Redemption TAT",
      details: "T+2 working days for equity funds, T+1 working day for debt funds.",
      color: "text-green-600"
    },
    {
      icon: DollarSign,
      title: "Investment Limits",
      details: "Minimum ₹500 per month for SIP, ₹5,000 for lump sum investments.",
      color: "text-purple-600"
    }
  ];

  const riskFactors = [
    "Mutual Fund investments are subject to market risks",
    "Past performance is not indicative of future results",
    "Please read all scheme related documents carefully before investing",
    "Investor should deal only with Registered Mutual Funds",
    "For investor complaints, contact respective AMCs or SEBI at scores.gov.in",
    "Investment in securities market are subject to market risks"
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 bg-gradient-to-br from-white via-gray-50 to-[#C9A635]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100 mb-6"
              variants={itemVariants}
            >
              <div className="w-2 h-2 bg-[#C9A635] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600">Regulatory Compliance</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Compliance & 
              <span className="bg-gradient-to-r from-[#7A1616] to-[#8B1A1A] bg-clip-text text-transparent"> Disclosures</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed"
              variants={itemVariants}
            >
              We maintain the highest standards of regulatory compliance to protect your investments 
              and ensure transparent operations in accordance with SEBI and AMFI guidelines.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Compliance Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our 
              <span className="bg-gradient-to-r from-[#C9A635] to-[#D4B547] bg-clip-text text-transparent"> Commitments</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Regulatory compliance and investor protection are at the core of our operations.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {complianceCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${card.color} rounded-xl mb-4 shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {card.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SEBI Disclaimer */}
      <section ref={disclaimerRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={disclaimerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Important Disclaimer</h2>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="font-semibold text-yellow-800 mb-3 text-lg">
                      SEBI Disclaimer
                    </h3>
                    <p className="text-yellow-700 text-lg font-medium">
                      {complianceData.sebi_disclaimer}
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-800 mb-3 text-lg">
                      AMFI Registration
                    </h3>
                    <p className="text-blue-700 font-medium">
                      {complianceData.amfi_registration}
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="font-semibold text-red-800 mb-4 text-lg">
                      Risk Factors
                    </h3>
                    <div className="space-y-2">
                      {riskFactors.map((risk, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-red-700">{risk}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Operating Guidelines */}
      <section ref={guidelinesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={guidelinesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Operating 
              <span className="bg-gradient-to-r from-[#7A1616] to-[#8B1A1A] bg-clip-text text-transparent"> Guidelines</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key operational policies and procedures for transparent and efficient service delivery.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={guidelinesInView ? "visible" : "hidden"}
          >
            {operationalPolicies.map((policy, index) => {
              const IconComponent = policy.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`${policy.color} p-3 bg-gray-100 rounded-lg`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            {policy.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {policy.details}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Additional Guidelines */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={guidelinesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-[#7A1616] to-[#8B1A1A] text-white">
                <h3 className="text-xl font-bold flex items-center space-x-2">
                  <Info className="w-5 h-5" />
                  <span>Additional Operating Guidelines</span>
                </h3>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {complianceData.operating_guidelines.map((guideline, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#C9A635] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{guideline}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Investor Grievance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-[#C9A635] to-[#D4B547] text-white text-center">
                <h2 className="text-2xl font-bold">Investor Grievance & Support</h2>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <div className="space-y-6">
                  <p className="text-gray-600 text-lg">
                    For any investment-related queries, complaints, or grievances, you can reach out to us 
                    through multiple channels.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Direct Contact</h4>
                      <p className="text-blue-700 text-sm">Call us at +91 79775 23663 or email info@ariawealth.com</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">SEBI SCORES</h4>
                      <p className="text-green-700 text-sm">Register complaints at scores.gov.in for faster resolution</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">AMC Support</h4>
                      <p className="text-purple-700 text-sm">Contact respective Asset Management Companies directly</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="Have Questions About Compliance?"
        subtitle="Our compliance team is here to address all your regulatory and policy-related queries"
        primaryCta={{ text: "Contact Compliance Team", link: "/contact" }}
        secondaryCta={{ text: "View Our Services", link: "/services" }}
        bgVariant="secondary"
      />
    </div>
  );
};

export default Compliance;