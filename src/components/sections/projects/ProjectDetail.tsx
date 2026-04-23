"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink, ArrowLeft, Briefcase, Clock, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Project } from "@/src/lib/types"
import Image from "next/image"
import { DashboardHeader } from "@/src/components/dashboard/DashboardHeader"
import { MobileDock } from "@/src/components/dashboard/MobileDock"
import { Footer } from "@/src/components/ui/Footer"

export function ProjectDetail({ project }: { project: Project }) {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100">
            <DashboardHeader />
            <MobileDock />

            <main className="container mx-auto px-4 py-24 max-w-5xl">
                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-zinc-500 hover:text-zinc-100 transition-colors mb-10 text-sm"
                >
                    <ArrowLeft size={16} /> Back to Projects
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    {/* Hero image */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800">
                        <Image
                            src={project.image || "/image/placeholder_image.png"}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                                {project.title}
                            </h1>
                            {project.demo && project.demo !== "#" && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/90 text-white text-xs font-semibold backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    Live
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
                        {project.role && (
                            <span className="inline-flex items-center gap-2">
                                <Briefcase size={15} className="text-zinc-500" />
                                {project.role}
                            </span>
                        )}
                        {project.duration && (
                            <span className="inline-flex items-center gap-2">
                                <Clock size={15} className="text-zinc-500" />
                                {project.duration}
                            </span>
                        )}
                        {project.teamSize && (
                            <span className="inline-flex items-center gap-2">
                                <Users size={15} className="text-zinc-500" />
                                {project.teamSize}
                            </span>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3">
                        {project.github && project.github !== "#" && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition-colors text-sm font-medium"
                            >
                                <Github size={16} /> GitHub
                            </a>
                        )}
                        {project.demo && project.demo !== "#" && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-colors text-sm font-semibold text-white"
                            >
                                <ExternalLink size={16} /> Live Demo
                            </a>
                        )}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium hover:border-zinc-600 transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Content sections */}
                    <div className="grid gap-6">
                        {project.overview && (
                            <div className="rounded-2xl border border-zinc-800 bg-[#18181b] p-6 space-y-3">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Overview</h2>
                                <p className="text-zinc-300 leading-relaxed">{project.overview}</p>
                            </div>
                        )}

                        {project.features && project.features.length > 0 && (
                            <div className="rounded-2xl border border-zinc-800 bg-[#18181b] p-6 space-y-3">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Features</h2>
                                <ul className="space-y-2">
                                    {project.features.map((f, i) => (
                                        <li key={i} className="flex gap-3 text-zinc-300 text-sm">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {project.technicalDetails && (
                            <div className="rounded-2xl border border-zinc-800 bg-[#18181b] p-6 space-y-3">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Technical Details</h2>
                                <p className="text-zinc-300 leading-relaxed text-sm">{project.technicalDetails}</p>
                            </div>
                        )}

                        {(project.challenges?.length || project.solutions?.length) ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                {project.challenges && project.challenges.length > 0 && (
                                    <div className="rounded-2xl border border-zinc-800 bg-[#18181b] p-6 space-y-3">
                                        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Challenges</h2>
                                        <ul className="space-y-2">
                                            {project.challenges.map((c, i) => (
                                                <li key={i} className="flex gap-3 text-zinc-300 text-sm">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {project.solutions && project.solutions.length > 0 && (
                                    <div className="rounded-2xl border border-zinc-800 bg-[#18181b] p-6 space-y-3">
                                        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Solutions</h2>
                                        <ul className="space-y-2">
                                            {project.solutions.map((s, i) => (
                                                <li key={i} className="flex gap-3 text-zinc-300 text-sm">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    )
}
