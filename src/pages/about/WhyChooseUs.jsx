import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Briefcase } from "lucide-react";

const WHY_CHOOSE = [
    {
        title: "SEBI Registered",
        description: "Fully compliant and regulated financial advisory services",
        icon: CheckCircle,
    },
    {
        title: "Fiduciary Standard",
        description: "Your interests always come first in every recommendation",
        icon: Shield,
    },
    {
        title: "Holistic Approach",
        description: "Comprehensive wealth management across all life stages",
        icon: Briefcase,
    },
];

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

const WhyChooseUs = () => {
    return (
        <div className="min-h-screen pt-16 md:pt-20">
            {/* Why Choose Us Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12 sm:mb-16"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4"
                            variants={itemVariants}
                        >
                            Why Choose{" "}
                            <span className="bg-gradient-to-r from-[#7A1616] to-[#A12424] bg-clip-text text-transparent">
                                ARIA WEALTH
                            </span>
                        </motion.h1>
                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
                            variants={itemVariants}
                        >
                            Committed to your financial success with integrity and excellence.
                        </motion.p>
                    </motion.div>

                    {/* Grid - Equal Height Boxes */}
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {WHY_CHOOSE.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    className="h-full"
                                    variants={itemVariants}
                                >
                                    <div className="h-full bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center">
                                        <div className="flex-shrink-0 mb-4 sm:mb-6">
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#C9A635] to-[#E7C76A] rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                                <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
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
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default WhyChooseUs;
