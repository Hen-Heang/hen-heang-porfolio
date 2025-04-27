"use client"

import { projects } from "@/data/projects"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import FadeIn from "@/components/animations/fade-in"

export default function ProjectClientPage({ params }: { params: { id: string } }) {
    const project = projects.find((p) => p.id === params.id)

    if (!project) {
        notFound()
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <FadeIn direction="up">
                        <Link href="/projects" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
                            ← Back to Projects
                        </Link>
                    </FadeIn>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-lg overflow-hidden shadow-lg"
                    >
                        <div className="relative h-80 w-full">
                            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                        </div>

                        <div className="p-8">
                            <FadeIn direction="up" delay={0.2}>
                                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                            </FadeIn>

                            <FadeIn direction="up" delay={0.3}>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm">
                      {tech}
                    </span>
                                    ))}
                                </div>
                            </FadeIn>

                            <div className="prose max-w-none">
                                <FadeIn direction="up" delay={0.4}>
                                    <p className="text-lg mb-6">{project.description}</p>
                                </FadeIn>

                                <FadeIn direction="up" delay={0.5}>
                                    <h2 className="text-2xl font-bold mt-8 mb-4">Project Overview</h2>
                                    <p>{project.longDescription}</p>
                                </FadeIn>

                                <FadeIn direction="up" delay={0.6}>
                                    <h2 className="text-2xl font-bold mt-8 mb-4">Key Features</h2>
                                    <ul className="list-disc pl-5 space-y-2">
                                        {project.features.map((feature, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.7 + index * 0.1 }}
                                            >
                                                {feature}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </FadeIn>

                                {project.demoUrl && (
                                    <FadeIn direction="up" delay={0.8} className="mt-8">
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors inline-block mr-4"
                                        >
                                            Live Demo
                                        </a>

                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors inline-block"
                                            >
                                                View Code
                                            </a>
                                        )}
                                    </FadeIn>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
