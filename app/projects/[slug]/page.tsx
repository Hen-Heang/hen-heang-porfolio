"use client"

import { Button } from "@/src/components/ui/button"
import { projects } from "@/data/projects"
import { Badge } from "@/src/components/ui/badge"
import Image from "next/image"
import { PageLayout } from "@/components/layout/PageLayout"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { use } from "react"

interface ProjectDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const router = useRouter()
    const { slug } = use(params)
    const project = projects.find(
        (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug
    )

    if (!project) {
        return (
            <PageLayout>
                <div className="container mx-auto px-4 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            The project you&apos;re looking for doesn&apos;t exist.
                        </p>
                        <Button onClick={() => router.push("/projects")}>
                            Back to Projects
                        </Button>
                    </div>
                </div>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Back Button */}
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/projects")}
                        className="mb-8 flex items-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        Back to Projects
                    </Button>

                    {/* Project Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech: string) => (
                                <Badge key={tech} variant="secondary">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Project Image */}
                    {project.image && (
                        <div className="mb-8">
                            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Project Details */}
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {/* Main Content */}
                        <div className="md:col-span-2">
                            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                {project.technicalDetails}
                            </p>

                            {project.features && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                        {project.features.map((feature: string, index: number) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Project Links */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h3 className="text-lg font-semibold mb-4">Project Links</h3>
                                <div className="space-y-3">
                                    {project.liveUrl && (
                                        <Button
                                            onClick={() => window.open(project.liveUrl, "_blank")}
                                            className="w-full flex items-center gap-2"
                                        >
                                            <ExternalLink size={16} />
                                            Live Demo
                                        </Button>
                                    )}
                                    {project.githubUrl && (
                                        <Button
                                            variant="outline"
                                            onClick={() => window.open(project.githubUrl, "_blank")}
                                            className="w-full flex items-center gap-2"
                                        >
                                            <Github size={16} />
                                            View Code
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h3 className="text-lg font-semibold mb-4">Project Info</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-500 dark:text-gray-400">Status:</span>
                                        <span className="ml-2">{project.status}</span>
                                    </div>
                                    {project.duration && (
                                        <div>
                                            <span className="font-medium text-gray-500 dark:text-gray-400">Duration:</span>
                                            <span className="ml-2">{project.duration}</span>
                                        </div>
                                    )}
                                    {project.role && (
                                        <div>
                                            <span className="font-medium text-gray-500 dark:text-gray-400">Role:</span>
                                            <span className="ml-2">{project.role}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}