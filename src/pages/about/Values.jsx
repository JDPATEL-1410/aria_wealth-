import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { companyValues } from "../../data/mock";
import * as LucideIcons from "lucide-react";

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

const Values = () => {
    const valuesRef = useRef(null);
    const valuesInView = useInView(valuesRef, { once: true, margin: "-50px" });

    return (
        <div className="min-h-screen pt-16 md:pt-20">
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

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4"
                            variants={itemVariants}
                        >
                            Our Core{" "}
                            <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#D4B547] bg-clip-text text-transparent">
                                Values
                            </span>
                        </motion.h1>
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
        </div>
    );
};

export default Values;
