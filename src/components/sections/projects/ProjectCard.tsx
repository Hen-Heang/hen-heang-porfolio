"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink, Eye } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import Image from "next/image"
import type { Project } from "@/src/lib/types"

interface ProjectCardProps {
    project: Project
    index: number
    onClick?: () => void
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true, margin: "-40px" }}
            onClick={onClick}
            className={onClick ? "cursor-pointer" : ""}
            whileHover={{ y: -6 }}
        >
            <Card className="overflow-hidden h-full surface-card group hover:shadow-2xl">
                <div className="relative overflow-hidden">
                    <Image
                        src={project.image || "/image/placeholder_image.png"}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                        <div className="flex gap-2">
                            <a
                                href={project.github}
                                className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors border border-white/20"
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github size={17} className="text-white" />
                            </a>
                            <a
                                href={project.demo}
                                className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors border border-white/20"
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink size={17} className="text-white" />
                            </a>
                        </div>

                        <button
                            className="px-3 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
                            onClick={(e) => {
                                e.stopPropagation()
                                if (onClick) onClick()
                            }}
                        >
                            <Eye size={14} />
                            Details
                        </button>
                    </div>
                </div>

                <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <Badge
                                key={tech}
                                variant="outline"
                                className="bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
