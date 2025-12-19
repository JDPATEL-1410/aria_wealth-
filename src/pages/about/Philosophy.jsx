import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, TrendingUp, Target } from "lucide-react";

const philosophyPillars = [
    {
        title: "Relationship First",
        subtitle: "We listen before we plan.",
        description:
            "Every strategy begins with trust, transparency, and understanding—because meaningful planning starts with genuine connection.",
        icon: Users,
    },
    {
        title: "Strategy Over Speculation",
        subtitle: "Discipline, not distraction.",
        description:
            "We focus on what truly builds wealth: thoughtful asset allocation, disciplined investing, and the quiet strength of compounding.",
        icon: TrendingUp,
    },
    {
        title: "Built Around You",
        subtitle: "Your goals. Your life.",
        description:
            "Portfolios are tailored to reflect your aspirations so your financial strategy is systematic, personal, and deeply aligned with your life stages.",
        icon: Target,
    },
    {
        title: "Staying the Course",
        subtitle: "Wisdom over hype.",
        description:
            "We help you tune out noise—from markets, media, and emotions—so you can stay focused on what matters, with clarity, consistency, and a steady hand.",
        icon: Shield,
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

const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const Philosophy = () => {
    return (
        <div className="min-h-screen pt-16 md:pt-20">
            {/* Philosophy Section */}
            <section className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-br from-[#7A1616]/5 via-white to-[#C9A635]/5 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#C9A635]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#7A1616]/10 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        className="text-center mb-12 sm:mb-16 md:mb-20"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="inline-block mb-4 sm:mb-6"
                            variants={itemVariants}
                        >
                            <div className="inline-flex items-center space-x-2 bg-[#7A1616]/10 px-4 sm:px-5 py-2 rounded-full">
                                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-[#7A1616]" />
                                <span className="text-xs sm:text-sm font-semibold text-[#7A1616]">OUR APPROACH</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4"
                            variants={itemVariants}
                        >
                            Our{" "}
                            <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#7A1616] bg-clip-text text-transparent">
                                Philosophy
                            </span>
                        </motion.h1>

                        <motion.div
                            className="max-w-4xl mx-auto mt-8 sm:mt-12 p-8 sm:p-10 md:p-12 bg-white rounded-[2.5rem] shadow-2xl border border-[#C9A635]/20 relative overflow-hidden group"
                            variants={scaleUpVariants}
                        >
                            {/* Decorative background gradients */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#C9A635]/10 to-transparent rounded-full blur-3xl opacity-60" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#7A1616]/5 to-transparent rounded-full blur-3xl opacity-60" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#7A1616] mb-6 leading-tight">
                                    "Guidance that's personal. <br className="hidden sm:block" />
                                    <span className="text-[#C9A635]">Wisdom over noise.</span>"
                                </h3>

                                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed font-light max-w-3xl">
                                    Our philosophy is rooted in building a <span className="font-semibold text-gray-900">lifelong partnership</span> across generations. From education to retirement, from today's needs to tomorrow's legacy—<span className="italic text-[#7A1616]">we stand by you at every life stage.</span>
                                </p>

                                {/* Decorative quote marks */}
                                <div className="absolute top-6 left-8 text-8xl text-[#C9A635]/10 font-serif leading-none select-none">"</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Pillars Grid */}
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {philosophyPillars.map((pillar, index) => {
                            const Icon = pillar.icon;
                            return (
                                <motion.div
                                    key={pillar.title}
                                    className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:border-[#C9A635]/40 group relative overflow-hidden"
                                    variants={scaleUpVariants}
                                >
                                    {/* Hover gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#7A1616]/5 to-[#C9A635]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className="mb-4 sm:mb-5 md:mb-6">
                                            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#7A1616] via-[#A12424] to-[#7A1616] shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                                <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                            </div>
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#7A1616] transition-colors duration-300">
                                            {pillar.title}
                                        </h3>

                                        <p className="text-sm font-semibold text-[#C9A635] mb-3 sm:mb-4">
                                            {pillar.subtitle}
                                        </p>

                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                            {pillar.description}
                                        </p>
                                    </div>

                                    {/* Number indicator - Hidden on mobile */}
                                    <div className="hidden sm:block absolute top-4 right-4 text-5xl sm:text-6xl font-black text-gray-900/5 group-hover:text-[#C9A635]/10 transition-colors duration-500">
                                        {index + 1}
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

export default Philosophy;
