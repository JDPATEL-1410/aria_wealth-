import React from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp } from "lucide-react";

const MissionVision = () => {
    return (
        <div className="min-h-screen pt-16 md:pt-20">
            {/* Mission & Vision Section */}
            <section className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-[0.03] sm:opacity-5">
                    <img
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=60"
                        alt="Office background"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Decorative gradient orbs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#7A1616]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A635]/10 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-12 sm:mb-16 md:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center space-x-2 bg-[#7A1616]/10 px-5 py-2.5 rounded-full mb-6">
                            <Target className="w-4 h-4 text-[#7A1616]" />
                            <span className="text-sm font-semibold text-[#7A1616]">OUR PURPOSE</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 px-4">
                            Mission &{" "}
                            <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#7A1616] bg-clip-text text-transparent">
                                Vision
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            Guiding principles that drive everything we do at ARIA WEALTH
                        </p>
                    </motion.div>

                    {/* Mission & Vision Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                        {/* Mission Card */}
                        <motion.div
                            className="group relative"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A635]/30 to-[#E7C76A]/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl border border-white/20 group-hover:shadow-[0_20px_60px_rgba(201,166,53,0.3)] transition-all duration-500 h-full">
                                {/* Icon */}
                                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#7A1616] via-[#A12424] to-[#7A1616] rounded-2xl mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                                    <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                </div>

                                {/* Title */}
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 group-hover:text-[#7A1616] transition-colors duration-300">
                                    Our Mission
                                </h2>

                                {/* Content */}
                                <div className="space-y-4">
                                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                        Our mission is to build a{" "}
                                        <span className="font-bold text-[#7A1616]">financially literate India</span>{" "}
                                        by guiding families with simplified personal finance knowledge through structured solutions and disciplined investing suited to their unique purpose in Life.
                                    </p>
                                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                        By enabling families to make{" "}
                                        <span className="font-bold text-[#7A1616]">confident, informed decisions</span>, we enhance their quality of life and bring peace of mind across every life stage of their financial journey.
                                    </p>
                                </div>

                                {/* Decorative element */}
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#C9A635]/10 to-transparent rounded-tl-full" />
                            </div>
                        </motion.div>

                        {/* Vision Card */}
                        <motion.div
                            className="group relative"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#7A1616]/30 to-[#A12424]/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl border border-white/20 group-hover:shadow-[0_20px_60px_rgba(122,22,22,0.3)] transition-all duration-500 h-full">
                                {/* Icon */}
                                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#C9A635] via-[#E7C76A] to-[#F8D97A] rounded-2xl mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                                    <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                </div>

                                {/* Title */}
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 group-hover:text-[#7A1616] transition-colors duration-300">
                                    Our Vision
                                </h2>

                                {/* Content */}
                                <div className="space-y-4">
                                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                        To build an{" "}
                                        <span className="font-bold text-[#7A1616]">enduring financial practice</span>{" "}
                                        that is valued and trusted by clients and peers.
                                    </p>
                                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                        A firm with{" "}
                                        <span className="font-bold text-[#7A1616]">high standards</span>{" "}
                                        that inspires other personal finance professionals and contributes to the growth and development of the profession.
                                    </p>
                                </div>

                                {/* Decorative element */}
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#7A1616]/10 to-transparent rounded-tl-full" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom decorative line */}
                    <motion.div
                        className="mt-12 sm:mt-16 md:mt-20 flex justify-center"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <div className="h-1 w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#C9A635] to-transparent rounded-full" />
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default MissionVision;
