"use client"

import { BentoCard } from "@/src/components/dashboard/BentoCard"
import { journey } from "@/data/dashboard"
import { motion } from "framer-motion"
import { Briefcase, MapPin, GraduationCap, Building2 } from "lucide-react"

// Map companies/locations to icons
const getStepIcon = (company: string) => {
    const name = company.toLowerCase()
    if (name.includes("hrd") || name.includes("university")) return <GraduationCap size={14} />
    if (name.includes("bizplay") || name.includes("kosign")) return <Building2 size={14} />
    return <Briefcase size={14} />
}

export function JourneyTimeline() {
    return (
        <BentoCard className="col-span-4 md:col-span-8 lg:col-span-8 p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <p className="text-[#52525b] text-[10px] font-semibold uppercase tracking-widest">
                    My Journey
                </p>
                <div className="flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
                    <span className="text-[9px] text-[#71717a] font-bold uppercase tracking-wider">Timeline</span>
                </div>
            </div>

            {/* Timeline container */}
            <div className="relative flex flex-col md:flex-row items-start justify-between px-2 gap-8 md:gap-0">
                {/* Connector Line (Horizontal md+) */}
                <div className="absolute top-[22px] left-8 right-8 h-[2px] hidden md:block bg-gradient-to-r from-[#27272a] via-[#6366f1]/30 to-[#6366f1]" />
                
                {/* Connector Line (Vertical mobile) */}
                <div className="absolute top-8 bottom-8 left-[30px] w-[2px] md:hidden bg-gradient-to-b from-[#27272a] via-[#6366f1]/30 to-[#6366f1]" />

                {journey.map((item, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="relative flex flex-row md:flex-col items-center md:items-center text-left md:text-center z-10 flex-1 w-full gap-5 md:gap-0"
                    >
                        {/* Interactive Dot with Icon */}
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`w-11 h-11 shrink-0 rounded-2xl border-2 flex items-center justify-center md:mb-4 transition-all duration-300 ${
                                item.current 
                                ? "bg-[#6366f1] border-[#8b5cf6] text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] shadow-[#6366f1]/20" 
                                : "bg-[#18181b] border-[#27272a] text-[#71717a] hover:border-[#3f3f46] hover:bg-[#27272a]/50"
                            }`}
                        >
                            <div className="flex flex-col items-center">
                                {getStepIcon(item.company)}
                                <span className="text-[8px] font-black mt-0.5 leading-none">{item.year.slice(2)}</span>
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <div className="flex flex-col md:items-center">
                            <span className={`text-[11px] font-bold leading-tight mb-1 transition-colors ${
                                item.current ? "text-[#fafafa]" : "text-[#a1a1aa]"
                            }`}>
                                {item.company}
                            </span>
                            
                            <div className="flex items-center gap-1.5">
                                {item.current ? (
                                    <span className="flex items-center gap-1 text-[9px] font-black text-[#6366f1] uppercase tracking-tighter bg-[#6366f1]/10 px-1.5 py-0.5 rounded border border-[#6366f1]/20">
                                        Active
                                    </span>
                                ) : (
                                    <div className="flex items-center gap-1 text-[10px] text-[#52525b]">
                                        <MapPin size={10} className="shrink-0" />
                                        <span className="truncate max-w-[80px] md:max-w-none">{item.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Current indicator for horizontal mobile view */}
                        {item.current && (
                            <div className="absolute -left-1 md:left-auto md:-top-1 w-1.5 h-1.5 rounded-full bg-[#6366f1] md:hidden" />
                        )}
                    </motion.div>
                ))}
            </div>
        </BentoCard>
    )
}
