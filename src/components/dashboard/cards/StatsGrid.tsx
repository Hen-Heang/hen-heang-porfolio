"use client"

import { BentoCard } from "@/src/components/dashboard/BentoCard"
import { useDashboardContent, useProfile } from "@/src/providers/site-content-provider"
import { motion } from "framer-motion"
import { NumberTicker } from "@/src/components/ui/NumberTicker"

export function StatsGrid() {
    const { deployedProjects } = useDashboardContent()
    const profileData = useProfile()
    const stats = [
        { num: deployedProjects.length, suffix: "",  label: "Projects",   accent: "#6366f1" },
        { num: parseInt(profileData.yearsExperience), suffix: "+", label: "Experience", accent: "#8b5cf6" },
        { num: null, text: profileData.locationEmoji, suffix: "",  label: profileData.location.split(",")[0].trim(), accent: "#22d3ee" },
        { num: null, text: "Now",        suffix: "",  label: profileData.company, accent: "#22c55e" },
    ]

    return (
        <BentoCard className="col-span-4 md:col-span-4 p-4 md:p-6 group">
            <div className="grid grid-cols-2 gap-3 md:gap-4 h-full">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="relative bg-[#111113] rounded-3xl p-5 md:p-6 flex flex-col justify-center gap-3 border border-white/5 hover:border-white/10 transition-all overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/20 animate-in fade-in zoom-in-90 fill-mode-both motion-reduce:animate-none"
                        style={{ animationDelay: `${i * 100}ms`, animationDuration: "400ms" }}
                    >
                        {/* Subtle background glow on hover */}
                        <div
                            className="absolute -right-4 -top-4 w-12 h-12 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity"
                            style={{ backgroundColor: stat.accent }}
                        />

                        <span
                            className="text-3xl md:text-4xl font-black tracking-tighter transition-all duration-300 drop-shadow-sm"
                            style={{ color: stat.accent }}
                        >
                            {stat.num !== null
                                ? <><NumberTicker value={stat.num} delay={i * 0.1} />{stat.suffix}</>
                                : stat.text
                            }
                        </span>

                        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-[#fafafa] leading-none mt-2">
                            {stat.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </BentoCard>
    )
}
