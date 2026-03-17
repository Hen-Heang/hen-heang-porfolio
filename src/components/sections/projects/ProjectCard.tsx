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
            <Card className="overflow-hidden h-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm transition-all duration-300 hover:shadow-md group">
                <div className="relative overflow-hidden aspect-video">
                    <Image
                        src={project.image || "/image/placeholder_image.png"}
                        alt={project.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover grayscale-[0.2] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                </div>

                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                            {project.title}
                        </h3>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                            <a
                                href={project.github}
                                className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github size={16} className="text-zinc-700 dark:text-zinc-300" />
                            </a>
                            <a
                                href={project.demo}
                                className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink size={16} className="text-zinc-700 dark:text-zinc-300" />
                            </a>
                        </div>
                    </div>

                    <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                            <Badge
                                key={tech}
                                variant="outline"
                                className="bg-zinc-50 dark:bg-zinc-900 text-[10px] text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800"
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
