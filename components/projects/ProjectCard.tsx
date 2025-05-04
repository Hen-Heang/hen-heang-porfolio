"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/types"

interface ProjectCardProps {
    project: Project
    index: number
    onClick?: () => void
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={onClick}
            className={onClick ? "cursor-pointer" : ""}
        >
            <Card className="overflow-hidden h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="relative">
                    <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                        <div className="flex gap-3">
                            <a
                                href={project.github}
                                className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github size={18} className="text-white" />
                            </a>
                            <a
                                href={project.demo}
                                className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={18} className="text-white" />
                            </a>
                        </div>
                    </div>
                </div>
                <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <Badge
                                key={tech}
                                variant="outline"
                                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0"
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
