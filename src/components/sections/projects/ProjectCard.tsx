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
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { 
                    duration: 0.3,
                    ease: "easeOut"
                } 
            }}
            onClick={onClick}
            className={onClick ? "cursor-pointer" : ""}
        >
            <Card className="overflow-hidden h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:border-teal-300 dark:hover:border-teal-600 transition-all duration-300 group">
                <div className="relative overflow-hidden">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image 
                            src={project.image || "/image/placeholder_image.png"} 
                            alt={project.title} 
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover transition-transform duration-500"
                        />
                    </motion.div>
                    
                    {/* Enhanced overlay with better animations */}
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between p-4"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                    >
                        <div className="flex gap-3">
                            <motion.a
                                href={project.github}
                                className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border border-white/20"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Github size={18} className="text-white" />
                            </motion.a>
                            <motion.a
                                href={project.demo}
                                className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border border-white/20"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ExternalLink size={18} className="text-white" />
                            </motion.a>
                        </div>
                        
                        {/* View project button */}
                        <motion.button
                            className="px-4 py-2 bg-teal-500/80 hover:bg-teal-500 text-white rounded-full text-sm font-medium backdrop-blur-sm border border-teal-400/50 transition-all duration-300 flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.stopPropagation()
                                if (onClick) onClick()
                            }}
                        >
                            <Eye size={16} />
                            View Details
                        </motion.button>
                    </motion.div>
                </div>
                
                <CardContent className="p-6">
                    <motion.h3 
                        className="text-xl font-semibold mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        {project.title}
                    </motion.h3>
                    
                    <motion.p 
                        className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                    >
                        {project.description}
                    </motion.p>
                    
                    <motion.div 
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {project.technologies.map((tech, techIndex) => (
                            <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: techIndex * 0.05 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                            >
                                <Badge
                                    variant="outline"
                                    className="bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-teal-900/20 dark:to-indigo-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700 hover:from-teal-100 hover:to-indigo-100 dark:hover:from-teal-900/40 dark:hover:to-indigo-900/40 transition-all duration-300"
                                >
                                    {tech}
                                </Badge>
                            </motion.div>
                        ))}
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    )
}