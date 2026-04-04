"use client"

import { BentoCard } from "@/src/components/dashboard/BentoCard"
import { rawAchievements } from "@/data/achievements"
import { Award, GraduationCap, Medal, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function AchievementsCard() {
    // Only show top 2-3 achievements on the dashboard card
    const topAchievements = rawAchievements.slice(0, 3)

    const getIcon = (type: string) => {
        switch (type) {
            case 'graduation': return <GraduationCap size={14} className="text-blue-500" />
            case 'award': return <Medal size={14} className="text-amber-500" />
            default: return <Award size={14} className="text-teal-500" />
        }
    }

    return (
        <BentoCard className="col-span-4 md:col-span-8 lg:col-span-8 p-6 flex flex-col group">
            <div className="flex items-center justify-between mb-6">
                <p className="text-[#52525b] text-[10px] font-semibold uppercase tracking-widest">
                    Certificates & Results
                </p>
                <Link 
                    href="/about" 
                    className="text-[#71717a] hover:text-white transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider group/link"
                >
                    View All
                    <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
            </div>

            <div className="space-y-4 flex-1">
                {topAchievements.map((achievement, i) => (
                    <motion.div 
                        key={achievement.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 group/item cursor-default"
                    >
                        <div className="mt-0.5 p-1.5 rounded-lg bg-[#1c1c1f] border border-white/5 group-hover/item:border-white/10 transition-colors">
                            {getIcon(achievement.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[11px] font-bold text-[#fafafa] leading-tight truncate group-hover/item:text-teal-400 transition-colors">
                                {achievement.title}
                            </h4>
                            <p className="text-[9px] text-[#52525b] font-medium mt-0.5 truncate">
                                {achievement.issuer} • {achievement.date}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="w-5 h-5 rounded-full bg-[#27272a] border-2 border-[#09090b] flex items-center justify-center">
                                <Award size={10} className="text-[#71717a]" />
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] font-bold text-[#71717a]">
                        {rawAchievements.length}+ Professional Credentials
                    </span>
                </div>
            </div>
        </BentoCard>
    )
}
