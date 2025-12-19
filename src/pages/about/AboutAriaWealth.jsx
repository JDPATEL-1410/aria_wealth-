import React from "react";
import { motion } from "framer-motion";
import {
    Building2,
    Eye,
    FileText,
    Lock,
    Brain,
    TrendingUp,
    Lightbulb,
    Globe,
    LineChart,
    Shield,
    Clock,
    Briefcase,
    CreditCard,
    Handshake,
    Repeat,
    Target
} from "lucide-react";

const AboutAriaWealth = () => {
    return (
        <div className="min-h-screen pt-16 md:pt-20">
            {/* Comprehensive About Aria Wealth Section */}
            <section className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-[0.03] sm:opacity-5">
                    <img
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=60"
                        alt="Business background"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Decorative gradient orbs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#7A1616]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A635]/10 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Main Heading */}
                    <motion.div
                        className="text-center mb-12 sm:mb-16 md:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center space-x-2 bg-[#7A1616]/10 px-5 py-2.5 rounded-full mb-6">
                            <Building2 className="w-4 h-4 text-[#7A1616]" />
                            <span className="text-sm font-semibold text-[#7A1616]">ABOUT ARIA WEALTH</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 px-4">
                            Built on Trust. Driven by{" "}
                            <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#7A1616] bg-clip-text text-transparent">
                                Transparency
                            </span>
                        </h1>

                        <div className="max-w-4xl mx-auto space-y-4 px-4">
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                                Clarity. Consistency. Confidence.
                            </p>
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                At Aria Wealth, we help individuals and families make informed financial decisions with a structured and disciplined approach. Our role is to simplify concepts, bring transparency to your financial journey, and help you stay aligned with your long-term goals.
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                We believe money is personal — and so is the way you plan for it. With a focus on awareness, guidance, and process-oriented planning, we help you understand your options and stay committed through different market phases.
                            </p>
                        </div>
                    </motion.div>

                    {/* Markets Move Statement - Redesigned with Background Image */}
                    <motion.div
                        className="max-w-5xl mx-auto mb-16 sm:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=80"
                                    alt="Financial planning"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#7A1616]/95 via-[#A12424]/90 to-[#7A1616]/95" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-8 sm:p-12 md:p-16">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                                <div className="relative z-10">
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-white">
                                        Markets Move. Your Vision Matters.
                                    </h3>
                                    <p className="text-base sm:text-lg text-gray-100 leading-relaxed mb-4">
                                        Instead of reacting to short-term noise, we help you stay focused on your long-term objectives.
                                    </p>
                                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                                        Our approach is centred around financial discipline, mindful decision-making, and consistent monitoring — while always keeping suitability and risk awareness at the forefront.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* What Defines Aria Wealth */}
                    <motion.div
                        className="mb-16 sm:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 sm:mb-12 text-center">
                            What Defines{" "}
                            <span className="bg-gradient-to-r from-[#C9A635] to-[#E7C76A] bg-clip-text text-transparent">
                                Aria Wealth
                            </span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Eye,
                                    title: "Transparency First",
                                    description: "Clear communication with no unrealistic claims."
                                },
                                {
                                    icon: FileText,
                                    title: "Process-Driven Approach",
                                    description: "A structured method aligned with your goals, risk profile, and investment horizon."
                                },
                                {
                                    icon: Lock,
                                    title: "Integrity & Privacy",
                                    description: "Your data and decisions are handled with complete confidentiality."
                                },
                                {
                                    icon: Brain,
                                    title: "Behavioural Guidance",
                                    description: "Helping you avoid emotional or impulsive decisions during market fluctuations."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Life-Cycle Based Planning",
                                    description: "Supporting your financial journey across different life stages."
                                }
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:border-[#C9A635]/40 transition-all duration-500 group"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.6 }}
                                        whileHover={{ y: -10 }}
                                    >
                                        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#7A1616] to-[#A12424] rounded-2xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                                            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                        </div>
                                        <h4 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 group-hover:text-[#7A1616] transition-colors duration-300">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* What We Assist You With */}
                    <motion.div
                        className="mb-16 sm:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 sm:mb-12 text-center">
                            What We{" "}
                            <span className="bg-gradient-to-r from-[#7A1616] to-[#A12424] bg-clip-text text-transparent">
                                Assist You With
                            </span>
                        </h3>

                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: Lightbulb, text: "Personal Finance Solution Awareness" },
                                    { icon: FileText, text: "Legacy and Estate Planning Guidance including Wills & Succession" },
                                    { icon: Globe, text: "NRI Investment Solutions & Compliance" },
                                    { icon: LineChart, text: "Investment Options Simplified" },
                                    { icon: Shield, text: "Insurance and Debt Protection" },
                                    { icon: Clock, text: "Budget & Cash Flow Planning" },
                                    { icon: Briefcase, text: "Alternate Investments Access" },
                                    { icon: CreditCard, text: "Loan processes & documentation assistance" }
                                ].map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.div
                                            key={index}
                                            className="flex items-center gap-4 bg-gradient-to-r from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-200 hover:border-[#C9A635]/40 hover:shadow-lg transition-all duration-300 group"
                                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.05, duration: 0.5 }}
                                        >
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#C9A635] to-[#E7C76A] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            <p className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-[#7A1616] transition-colors duration-300">
                                                {item.text}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Our Principles */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 sm:mb-12 text-center">
                            Our{" "}
                            <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#C9A635] bg-clip-text text-transparent">
                                Principles
                            </span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            {[
                                {
                                    icon: Handshake,
                                    title: "Relationship First",
                                    description: "Every engagement begins with understanding your situation, concerns, and aspirations. We believe meaningful financial conversations always start with trust."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Strategy Over Speculation",
                                    description: "We follow a disciplined, regulated, and research-backed approach to mutual fund selection and planning support. We do not promote shortcuts, trends, or speculation."
                                },
                                {
                                    icon: Repeat,
                                    title: "Stability Over Activity",
                                    description: "Frequent switching is not a strategy. We guide you to stay aligned with your goals, risk tolerance, and time horizon."
                                },
                                {
                                    icon: Target,
                                    title: "Financial Awareness Through Every Life Stage",
                                    description: "Whether you're starting your career, planning for children's futures, approaching retirement, or thinking about legacy — we help you understand suitable solutions and stay long-term focused."
                                }
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl hover:border-[#C9A635]/40 transition-all duration-500 group"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.6 }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#C9A635] to-[#E7C76A] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                                                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-[#7A1616] transition-colors duration-300">
                                                    {item.title}
                                                </h4>
                                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
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

export default AboutAriaWealth;
