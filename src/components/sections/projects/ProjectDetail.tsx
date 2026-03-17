"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink, ArrowLeft } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { useRouter } from "next/navigation"
import type { Project } from "@/src/lib/types"
import Image from "next/image"

export function ProjectDetail({ project }: { project: Project }) {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            <div className="container mx-auto px-4 py-20 max-w-4xl">
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-10 text-sm"
                >
                    <ArrowLeft size={16} /> Back to Projects
                </motion.button>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    {/* Hero Image */}
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-10 border border-zinc-200 dark:border-zinc-800">
                        <Image
                            src={project.image || "/image/placeholder_image.png"}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                            <div className="flex flex-wrap gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                {project.role && <span>{project.role}</span>}
                                {project.duration && <><span>·</span><span>{project.duration}</span></>}
                                {project.teamSize && <><span>·</span><span>{project.teamSize}</span></>}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {project.github && project.github !== "#" && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm">
                                    <Github size={16} /> GitHub
                                </a>
                            )}
                            {project.demo && project.demo !== "#" && (
                                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 transition-opacity text-sm">
                                    <ExternalLink size={16} /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline"
                                className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                                {tech}
                            </Badge>
                        ))}
                    </div>

                    <div className="space-y-10">
                        {/* Overview */}
                        {project.overview && (
                            <section>
                                <h2 className="text-xl font-semibold mb-3">Overview</h2>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{project.overview}</p>
                            </section>
                        )}

                        {/* Features */}
                        {project.features && project.features.length > 0 && (
                            <section>
                                <h2 className="text-xl font-semibold mb-3">Features</h2>
                                <ul className="space-y-2">
                                    {project.features.map((f, i) => (
                                        <li key={i} className="flex gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                                            <span className="text-zinc-400 dark:text-zinc-600 mt-0.5">→</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Technical Details */}
                        {project.technicalDetails && (
                            <section>
                                <h2 className="text-xl font-semibold mb-3">Technical Details</h2>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{project.technicalDetails}</p>
                            </section>
                        )}

                        {/* Challenges & Solutions */}
                        {project.challenges && project.challenges.length > 0 && (
                            <section className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-3">Challenges</h2>
                                    <ul className="space-y-2">
                                        {project.challenges.map((c, i) => (
                                            <li key={i} className="flex gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                                                <span className="text-red-400 mt-0.5">✕</span> {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {project.solutions && project.solutions.length > 0 && (
                                    <div>
                                        <h2 className="text-xl font-semibold mb-3">Solutions</h2>
                                        <ul className="space-y-2">
                                            {project.solutions.map((s, i) => (
                                                <li key={i} className="flex gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                                                    <span className="text-green-400 mt-0.5">✓</span> {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </section>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
