"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { projects } from "@/data/projects"
import { PageLayout } from "@/src/components/layout/PageLayout"
import Image from "next/image"
import type { Project } from "@/src/lib/types"

// Filter categories
const filters = [
    { label: "All",        fn: () => true },
    { label: "Live",       fn: (p: Project) => !!p.demo && p.demo !== "#" },
    { label: "Personal",   fn: (p: Project) => !["WeBill365", "EasyCart", "Warehouse"].some(w => p.title.includes(w)) },
    { label: "Work",       fn: (p: Project) => ["WeBill365", "EasyCart", "Warehouse"].some(w => p.title.includes(w)) },
]

// Real stats
const stats = [
    { value: `${projects.length}`,  label: "Total Projects" },
    { value: `${projects.filter(p => p.demo && p.demo !== "#").length}`, label: "Live" },
    { value: "2+",  label: "Years Exp." },
    { value: "Seoul 🇰🇷", label: "Location" },
]

const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.35, delay: i * 0.06 } }),
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const router = useRouter()
    const isLive = !!project.demo && project.demo !== "#"
    const slug = project.title.toLowerCase().replace(/\s+/g, "-")

    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}
            transition={{ duration: 0.2 }}
            onClick={() => router.push(`/projects/${slug}`)}
            className="group cursor-pointer bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] rounded-2xl overflow-hidden flex flex-col transition-colors duration-200"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-[#09090b]">
                <Image
                    src={project.image || "/image/placeholder_image.png"}
                    alt={project.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                {/* Live badge */}
                {isLive && (
                    <div className="absolute top-3 left-3">
                        <span className="live-badge inline-flex items-center gap-1.5 bg-[#09090b]/80 backdrop-blur-sm text-[#22c55e] border border-[#22c55e]/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                            <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full" />
                            Live
                        </span>
                    </div>
                )}
                {/* Quick action icons on hover */}
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="w-7 h-7 rounded-lg bg-[#09090b]/80 backdrop-blur-sm border border-[#27272a] flex items-center justify-center text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                        >
                            <Github size={13} />
                        </a>
                    )}
                    {isLive && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="w-7 h-7 rounded-lg bg-[#09090b]/80 backdrop-blur-sm border border-[#27272a] flex items-center justify-center text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                        >
                            <ExternalLink size={13} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-[#fafafa] text-base font-semibold mb-1.5 leading-tight group-hover:text-white transition-colors">
                    {project.title}
                </h3>
                <p className="text-[#71717a] text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
                    {project.description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map(tech => (
                            <span key={tech} className="bg-[#27272a] text-[#71717a] text-[10px] font-medium px-2 py-0.5 rounded-md">
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="text-[#52525b] text-[10px] px-1 py-0.5">
                                +{project.technologies.length - 3}
                            </span>
                        )}
                    </div>
                    <ArrowRight size={14} className="text-[#3f3f46] group-hover:text-[#6366f1] group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-2" />
                </div>
            </div>
        </motion.div>
    )
}

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState("All")

    const filtered = projects.filter(
        filters.find(f => f.label === activeFilter)?.fn ?? (() => true)
    )

    return (
        <PageLayout showFooter={false}>
            <div className="px-4 md:px-8 py-10 max-w-6xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                >
                    <h1 className="text-[#fafafa] text-3xl font-bold mb-1">Projects</h1>
                    <p className="text-[#71717a] text-sm">Everything I&apos;ve built — personal projects and enterprise work.</p>
                </motion.div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
                >
                    {stats.map((s, i) => (
                        <div key={i} className="bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 flex flex-col gap-0.5">
                            <span className="text-[#fafafa] text-xl font-bold">{s.value}</span>
                            <span className="text-[#52525b] text-[10px] font-semibold uppercase tracking-wider">{s.label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Filter pills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="flex items-center gap-2 mb-8 flex-wrap"
                >
                    {filters.map(f => (
                        <button
                            key={f.label}
                            onClick={() => setActiveFilter(f.label)}
                            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                activeFilter === f.label
                                    ? "bg-[#6366f1] text-white"
                                    : "bg-[#18181b] border border-[#27272a] text-[#71717a] hover:text-[#fafafa] hover:border-[#3f3f46]"
                            }`}
                        >
                            {f.label}
                            <span className={`ml-1.5 text-[10px] ${activeFilter === f.label ? "text-white/70" : "text-[#3f3f46]"}`}>
                                {projects.filter(filters.find(x => x.label === f.label)?.fn ?? (() => true)).length}
                            </span>
                        </button>
                    ))}
                </motion.div>

                {/* Grid */}
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, i) => (
                            <ProjectCard key={project.title} project={project} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 text-[#52525b] text-sm">
                        No projects in this category.
                    </div>
                )}
            </div>
        </PageLayout>
    )
}
