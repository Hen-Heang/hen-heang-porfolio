"use client"

import { BentoCard } from "@/src/components/dashboard/BentoCard"
import { deployedProjects, profile } from "@/data/dashboard"

export function StatsGrid() {
    const stats = [
        { value: String(deployedProjects.length), label: "Projects", accent: "#6366f1" },
        { value: profile.yearsExperience, label: "Years Exp.", accent: "#8b5cf6" },
        { value: "🇰🇷", label: "Seoul", accent: "#22d3ee" },
        { value: "Now", label: "Webcash", accent: "#22c55e" },
    ]

    return (
        <BentoCard className="col-span-4 md:col-span-4 p-4 md:p-6">
            <div className="grid grid-cols-2 gap-3 md:gap-4 h-full">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-[#09090b] rounded-2xl p-4 md:p-5 flex flex-col justify-between border border-[#27272a] hover:border-[#3f3f46] transition-all hover:bg-[#111113] group"
                    >
                        <span
                            className="text-2xl md:text-3xl font-bold tracking-tight group-hover:scale-110 transition-transform origin-left duration-300"
                            style={{ color: stat.accent }}
                        >
                            {stat.value}
                        </span>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2 text-[#52525b] group-hover:text-[#a1a1aa] transition-colors">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </BentoCard>
    )
}
