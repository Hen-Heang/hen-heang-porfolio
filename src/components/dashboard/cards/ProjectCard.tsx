"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github } from "lucide-react"
import { BentoProject } from "@/data/dashboard"

interface ProjectCardProps {
    project: BentoProject
}

const techColors: Record<string, { bg: string; text: string; border: string }> = {
    "Next.js":    { bg: "#ffffff12", text: "#e4e4e7", border: "#ffffff30" },
    "TypeScript": { bg: "#3178c615", text: "#60a5fa", border: "#3178c640" },
    "Tailwind":   { bg: "#06b6d415", text: "#22d3ee", border: "#06b6d440" },
    "OpenAI":     { bg: "#10a37f15", text: "#34d399", border: "#10a37f40" },
    "Spring Boot":{ bg: "#6db33f15", text: "#86efac", border: "#6db33f40" },
    "PostgreSQL": { bg: "#33679115", text: "#93c5fd", border: "#33679140" },
    "React":      { bg: "#61dafb15", text: "#67e8f9", border: "#61dafb40" },
}

export function ProjectCard({ project }: ProjectCardProps) {
    const accent = project.accentColor || "#6366f1"
    
    return (
        <motion.div
            onClick={() => window.open(project.url, "_blank")}
            className="group col-span-4 relative overflow-hidden rounded-3xl border border-white/5 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 cursor-pointer bg-[#111113] hover:bg-[#141416]"
        >
            {/* Screenshot preview */}
            <div className="relative h-[140px] overflow-hidden shrink-0">
                {project.screenshot ? (
                    <Image
                        src={project.screenshot}
                        alt={project.title}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                   <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-4xl">
                       {project.emoji}
                   </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#111113]/20 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">Live</span>
                </div>

                {/* Links */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-zinc-400 hover:text-white transition-colors backdrop-blur-sm border border-white/5"
                        >
                            <Github size={14} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3 relative z-10 flex-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{project.emoji}</span>
                        <h3 className="text-white text-base font-black tracking-tight leading-tight group-hover:text-[#6366f1] transition-colors">
                            {project.title}
                        </h3>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: accent }}>
                        {project.subtitle}
                    </p>
                </div>
                
                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 font-medium">
                    {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {project.tech.slice(0, 3).map((tech) => {
                        const name = typeof tech === "string" ? tech : tech.name
                        const colors = techColors[name] ?? { bg: "#ffffff08", text: "#a1a1aa", border: "#ffffff15" }
                        return (
                            <span
                                key={name}
                                className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-md border"
                                style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
                            >
                                {name}
                            </span>
                        )
                    })}
                </div>
            </div>

            {/* Hover Spotlight */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
        </motion.div>
    )
}
