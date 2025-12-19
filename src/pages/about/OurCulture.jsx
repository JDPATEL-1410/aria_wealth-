import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

const OurCulture = () => {
    return (
        <div className="min-h-screen pt-16 md:pt-20">
            {/* Culture Section */}
            <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] sm:opacity-5">
                    <img
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=60"
                        alt="Culture background"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-12 sm:mb-16 md:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center space-x-2 bg-[#C9A635]/10 px-5 py-2.5 rounded-full mb-6">
                            <LucideIcons.Heart className="w-4 h-4 text-[#C9A635]" />
                            <span className="text-sm font-semibold text-gray-700">OUR CULTURE</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 px-4">
                            A Culture Rooted in{" "}
                            <span className="bg-gradient-to-r from-[#C9A635] via-[#E7C76A] to-[#C9A635] bg-clip-text text-transparent">
                                Care & Clarity
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto px-4">
                            Financial guidance should feel human — not transactional. Every conversation, every process, and every decision reflects our commitment to understanding people first and numbers second.
                        </p>
                    </motion.div>

                    {/* Culture Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {[
                            {
                                icon: "Users",
                                title: "People First, Always",
                                description: "We treat every family with the respect, patience, and attention they deserve. Your goals matter to us. Your worries matter to us. Your journey matters to us. Our culture celebrates meaningful relationships, honest conversations, and genuine understanding."
                            },
                            {
                                icon: "Eye",
                                title: "Transparency in Every Interaction",
                                description: "We communicate openly — no jargon, no hidden motives, no unrealistic promises. We explain risks clearly and set expectations responsibly. Trust is earned through clarity, and we protect that trust in everything we do."
                            },
                            {
                                icon: "Focus",
                                title: "Discipline Over Distractions",
                                description: "In a world full of noise, we stay grounded. Our culture encourages thoughtful decision-making, structured processes, and long-term thinking — not reactions to market rumours or short-term trends."
                            },
                            {
                                icon: "BookOpen",
                                title: "Learning, Improving & Growing Together",
                                description: "We believe financial awareness is a lifelong journey. Our team consistently upgrades knowledge, stays aligned with regulatory frameworks, and embraces continuous learning. This helps us guide you with deeper understanding and better clarity."
                            },
                            {
                                icon: "Shield",
                                title: "Integrity as a Daily Practice",
                                description: "Integrity is not a statement — it's a discipline. From documentation to discussions, confidentiality to compliance, we uphold ethical standards in everything we do. Your trust is our responsibility, and we honour it every day."
                            },
                            {
                                icon: "Home",
                                title: "A Calm, Supportive Environment",
                                description: "Money conversations can be emotional. Our culture is intentionally calm, patient, and supportive — helping families make decisions without pressure, fear, or confusion. We aim to create a space where you feel heard, respected, and understood."
                            },
                            {
                                icon: "MessageSquare",
                                title: "Collaboration Over Correspondence",
                                description: "At Aria Wealth, we don't believe in one-way communication. We work with you — not just for you. Your inputs guide the process, and your comfort guides the pace. Every step is a partnership."
                            },
                            {
                                icon: "Infinity",
                                title: "Commitment to Long-Term Relationships",
                                description: "We are not here for one-time transactions or short-term interactions. We are here to walk with you — through life stages, milestones, and transitions. Our culture thrives on lasting relationships built on trust, consistency, and mutual respect."
                            }
                        ].map((item, index) => {
                            const Icon = LucideIcons[item.icon] || LucideIcons.Star;
                            return (
                                <motion.div
                                    key={index}
                                    className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:border-[#C9A635]/30 transition-all duration-500 group"
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index % 2) * 0.1, duration: 0.6 }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#C9A635] to-[#E7C76A] rounded-xl sm:rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                                                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 group-hover:text-[#7A1616] transition-colors duration-300">
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
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OurCulture;
