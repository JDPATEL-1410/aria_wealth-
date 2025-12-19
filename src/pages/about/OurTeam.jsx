import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Target, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { TEAM } from "../TEAM";

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

const OurTeam = () => {
    const teamRef = useRef(null);
    const teamInView = useInView(teamRef, { once: true, margin: "-50px" });

    return (
        <div className="min-h-screen pt-16 md:pt-20">
            {/* Team Section */}
            <section
                ref={teamRef}
                className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden"
            >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 opacity-[0.03] sm:opacity-5">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
                        alt="Team background"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-[#7A1616]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C9A635]/10 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Heading */}
                    <motion.div
                        className="text-center mb-12 sm:mb-16 md:mb-20"
                        variants={containerVariants}
                        initial="hidden"
                        animate={teamInView ? "visible" : "hidden"}
                    >
                        <motion.div
                            className="inline-block mb-4 sm:mb-6"
                            variants={itemVariants}
                        >
                            <div className="inline-flex items-center space-x-2 bg-[#7A1616]/10 px-5 py-2.5 rounded-full">
                                <Users className="w-4 h-4 text-[#7A1616]" />
                                <span className="text-sm font-semibold text-[#7A1616]">
                                    LEADERSHIP
                                </span>
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-4"
                            variants={itemVariants}
                        >
                            Meet Our{" "}
                            <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#7A1616] bg-clip-text text-transparent">
                                Team
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
                            variants={itemVariants}
                        >
                            Experienced professionals dedicated to your financial success.
                        </motion.p>
                    </motion.div>

                    {/* Team Grid */}
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-5xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        animate={teamInView ? "visible" : "hidden"}
                    >
                        {TEAM.map((m, index) => (
                            <motion.div
                                key={m.id}
                                className="h-full flex flex-col bg-white rounded-3xl 
                     shadow-[0_8px_32px_rgba(0,0,0,0.1)] 
                     overflow-hidden group transition-all duration-500 
                     hover:shadow-[0_16px_48px_rgba(122,22,22,0.15)]
                     hover:-translate-y-2
                     border border-gray-100"
                                variants={scaleUpVariants}
                            >
                                {/* Portrait block with circular image */}
                                <div className="relative flex flex-col items-center justify-center pt-12 pb-8 px-6
                          bg-gradient-to-b from-gray-50 to-white">

                                    {/* Circular image container */}
                                    <div className="relative mb-6">
                                        {/* Outer decorative ring */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br 
                              from-[#7A1616]/20 to-[#C9A635]/20 
                              scale-110 blur-2xl" />

                                        {/* Main circular image */}
                                        <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 
                              rounded-full overflow-hidden
                              bg-gradient-to-br from-gray-100 to-gray-50
                              border-4 border-white
                              shadow-[0_12px_32px_rgba(0,0,0,0.15)]
                              transition-all duration-500
                              group-hover:shadow-[0_16px_48px_rgba(122,22,22,0.3)]
                              group-hover:scale-105
                              ring-4 ring-[#C9A635]/20">
                                            <img
                                                src={m.image}
                                                alt={m.name}
                                                className="w-full h-full object-cover object-top"
                                                style={{
                                                    backgroundColor: 'transparent'
                                                }}
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>

                                    {/* Name and Position - Centered */}
                                    <div className="text-center">
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3
                             group-hover:text-[#7A1616] transition-colors">
                                            {m.name}
                                        </h3>

                                        <div className="inline-block px-5 py-2 rounded-full
                              bg-gradient-to-r from-[#7A1616] to-[#A12424]
                              text-white text-sm sm:text-base font-semibold
                              shadow-lg">
                                            {m.position}
                                        </div>
                                    </div>
                                </div>

                                {/* Content area */}
                                <div className="flex-1 flex flex-col p-6 sm:p-8 bg-white">

                                    {/* Experience badge */}
                                    <div className="flex items-center justify-center gap-2 
                            text-sm text-gray-600 mb-6
                            bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-3 rounded-full 
                            border border-gray-200 w-fit mx-auto">
                                        <Clock className="w-4 h-4 text-[#7A1616]" />
                                        <span className="font-medium">{m.experience}</span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm sm:text-base text-gray-600 text-center 
                          leading-relaxed mb-6">
                                        {m.description}
                                    </p>

                                    {/* Specialization */}
                                    <div className="mt-auto pt-6 border-t-2 border-gray-100">
                                        <div className="flex flex-col items-center gap-3 text-center">
                                            <div className="flex items-center gap-2">
                                                <Target className="w-5 h-5 text-[#7A1616]" />
                                                <span className="text-xs font-bold text-[#7A1616] 
                                   uppercase tracking-wide">
                                                    Specialization
                                                </span>
                                            </div>
                                            <div className="text-sm sm:text-base text-gray-700 font-medium">
                                                {m.specialization}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default OurTeam;
