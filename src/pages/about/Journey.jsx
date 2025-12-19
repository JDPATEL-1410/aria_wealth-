import React from "react";
import { motion } from "framer-motion";
import { Users, Target, TrendingUp, Shield } from "lucide-react";

const JOURNEY_STEPS = [
    {
        title: "Discovery & Clarity",
        description:
            "We understand your life stage, responsibilities, priorities, and what financial freedom truly means to you.",
        icon: Users,
    },
    {
        title: "Goal Mapping & Planning",
        description:
            "We map your goals—children's education, home, retirement, experiences—and align them to a realistic, disciplined plan.",
        icon: Target,
    },
    {
        title: "Portfolio Design & Execution",
        description:
            "We create a diversified, goal-based investment portfolio and help you start with the right structure and platforms.",
        icon: TrendingUp,
    },
    {
        title: "Review, Coaching & Course Correction",
        description:
            "We review, refine, and coach you through market cycles, helping you stay focused on the long game, not the noise.",
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

const Journey = () => {
    return (
        <div className="min-h-screen pt-16 md:pt-20">
            {/* Journey Section */}
            <section className="py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0 opacity-[0.03] sm:opacity-5">
                    <img
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=60"
                        alt="Journey background"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

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
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#C9A635]/20 to-[#E7C76A]/20 px-4 sm:px-5 py-2 rounded-full">
                                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-[#C9A635]" />
                                <span className="text-xs sm:text-sm font-semibold text-gray-700">YOUR ROADMAP</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4"
                            variants={itemVariants}
                        >
                            Your Journey{" "}
                            <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#F8D97A] bg-clip-text text-transparent">
                                With Us
                            </span>
                        </motion.h1>
                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
                            variants={itemVariants}
                        >
                            A seamless, personalized experience from our first conversation to your financial freedom.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="relative"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Timeline connector - Desktop only */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#C9A635] transform -translate-y-1/2 z-0" />

                        {/* Steps Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 relative z-10">
                            {JOURNEY_STEPS.map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <motion.div
                                        key={step.title}
                                        className="relative"
                                        variants={scaleUpVariants}
                                        custom={idx}
                                    >
                                        <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl border-2 border-gray-100 h-full hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500 group relative overflow-hidden">
                                            {/* Animated background */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A635]/0 to-[#E7C76A]/0 group-hover:from-[#C9A635]/10 group-hover:to-[#E7C76A]/10 transition-all duration-500" />

                                            <div className="relative z-10">
                                                {/* Icon and step number */}
                                                <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                                                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#C9A635] via-[#E7C76A] to-[#F8D97A] rounded-xl sm:rounded-2xl shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                                                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                                    </div>
                                                    <div className="text-5xl sm:text-6xl font-black bg-gradient-to-br from-[#7A1616]/10 to-[#C9A635]/10 bg-clip-text text-transparent">
                                                        {idx + 1}
                                                    </div>
                                                </div>

                                                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 sm:mb-4 group-hover:text-[#7A1616] transition-colors duration-300">
                                                    {step.title}
                                                </h3>
                                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>

                                            {/* Progress dot - Desktop only */}
                                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-[#C9A635] rounded-full hidden lg:block group-hover:scale-125 transition-transform duration-300" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Journey;
