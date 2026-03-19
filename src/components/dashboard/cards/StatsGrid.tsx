"use client"

import { BentoCard } from "@/src/components/dashboard/BentoCard"
import { deployedProjects, profile } from "@/data/dashboard"
import { motion } from "framer-motion"

export function StatsGrid() {
    const stats = [
        { value: String(deployedProjects.length), label: "Projects", accent: "#6366f1", sub: "Deployed" },
        { value: profile.yearsExperience, label: "Experience", accent: "#8b5cf6", sub: "Years+" },
        { value: "🇰🇷", label: "Seoul", accent: "#22d3ee", sub: "Location" },
        { value: "Now", label: "Webcash", accent: "#22c55e", sub: "Company" },
    ]

    return (
        <BentoCard className="col-span-4 md:col-span-4 p-4 md:p-6 group">
            <div className="grid grid-cols-2 gap-3 md:gap-4 h-full">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="relative bg-[#111113] rounded-3xl p-5 md:p-6 flex flex-col justify-between border border-white/5 hover:border-white/10 transition-all overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/20"
                    >
                        {/* Subtle background glow on hover */}
                        <div 
                            className="absolute -right-4 -top-4 w-12 h-12 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" 
                            style={{ backgroundColor: stat.accent }}
                        />
                        
                        <span
                            className="text-2xl md:text-3xl font-black tracking-tighter transition-all duration-300 drop-shadow-sm"
                            style={{ color: stat.accent }}
                        >
                            {stat.value}
                        </span>
                        
                        <div className="flex flex-col mt-2">
                            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-[#fafafa] leading-none">
                                {stat.label}
                            </span>
                            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-[#52525b] mt-1">
                                {stat.sub}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </BentoCard>
    )
}
