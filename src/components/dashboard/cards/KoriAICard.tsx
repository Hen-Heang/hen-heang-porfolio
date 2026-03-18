"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { deployedProjects } from "@/data/dashboard"

export function KoriAICard() {
    const project = deployedProjects[0]

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className="glow-border col-span-4 md:col-span-8 row-span-2 relative overflow-hidden rounded-[20px] md:rounded-[24px] border p-6 md:p-10 flex flex-col justify-between min-h-[400px]"
            style={{
                background: "linear-gradient(145deg, #0c1929, #0f2744)",
                borderColor: project.borderColor,
            }}
            whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}
            transition={{ duration: 0.2 }}
        >
            {/* Decorative orb */}
            <div
                className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-20"
                style={{
                    background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
                }}
            />

            {/* Top row: badges + link */}
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-2.5">
                    <span className="live-badge inline-flex items-center gap-1.5 bg-[#22d3ee]/10 text-[#22d3ee] border border-[#22d3ee]/30 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-[#22d3ee] rounded-full shadow-[0_0_8px_#22d3ee]" />
                        LIVE
                    </span>
                    <span className="hidden xs:inline-flex items-center bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        AI-Engineered
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#a1a1aa] hover:text-[#fafafa] transition-colors border border-white/5"
                        >
                            <Github size={18} />
                        </a>
                    )}
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card flex items-center gap-2 bg-white/5 hover:bg-white/10 text-[#fafafa] text-xs md:text-sm font-bold px-5 py-2.5 rounded-xl border border-white/10 transition-all active:scale-95"
                    >
                        Visit <span className="hidden sm:inline">Platform</span>
                        <span className="arrow-link inline-block">→</span>
                    </a>
                </div>
            </div>

            {/* Main content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center">
                <div className="text-5xl md:text-7xl mb-6">{project.emoji}</div>
                <h2 className="text-[#fafafa] text-[32px] md:text-[48px] font-extrabold tracking-tighter leading-none mb-2">
                    {project.title}
                </h2>
                <p className="text-[#22d3ee] text-base md:text-xl font-semibold mb-5 tracking-tight">{project.subtitle}</p>
                <p className="text-[#a1a1aa] text-sm md:text-lg leading-relaxed max-w-2xl mb-8 font-medium">
                    {project.description}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-8">
                    {project.stats?.map((stat, i) => (
                        <div key={i} className="flex items-center gap-3">
                            {i > 0 && <span className="hidden sm:inline text-[#1e3a5f] text-2xl select-none">/</span>}
                            <div className="flex flex-col">
                                <span className="text-[#fafafa] text-lg md:text-2xl font-bold tracking-tight">{stat.value}</span>
                                <span className="text-[#52525b] text-[10px] md:text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2.5">
                    {project.tech.map((tech) => {
                        const name = typeof tech === "string" ? tech : tech.name;
                        return (
                            <span
                                key={name}
                                className="bg-white/5 border border-white/10 text-[#a1a1aa] text-[11px] md:text-xs font-bold px-4 py-2 rounded-xl hover:bg-white/10 transition-colors"
                            >
                                {name}
                            </span>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    )
}
