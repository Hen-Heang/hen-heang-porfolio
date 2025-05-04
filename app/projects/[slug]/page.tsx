"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { Project } from "@/types"

interface ProjectDetailProps {
    params: {
        slug: string
    }
}

export default function ProjectDetail({}: ProjectDetailProps) {
    const params = useParams()
    const router = useRouter()
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const slug = params.slug as string;
        console.log("Slug from params:", slug);

        const foundProject = projects.find(
            (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug
        );

        if (foundProject) {
            setProject(foundProject);
        } else {
            console.warn(`Project not found for slug: ${slug}`);
        }

        setLoading(false);
    }, [params.slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f172a]">
                <div className="w-16 h-16 border-4 border-t-teal-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 p-4">
                <h1 className="text-3xl font-bold mb-4">Project not found</h1>
                <p className="mb-8">The project you&#39;re looking for doesn&#39;t exist.</p>
                <Button onClick={() => router.push("/")} className="bg-gradient-to-r from-teal-500 to-indigo-500">
                    Back to Home
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100">
            <div className="container mx-auto px-4 py-20">
                <Button
                    variant="ghost"
                    onClick={() => router.push("/#projects")}
                    className="mb-8 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <ArrowLeft size={16} />
                    Back to Projects
                </Button>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="relative w-full h-[40vh] mb-8 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 z-10"></div>
                        <Image
                            src={project.image}
                            alt={project.title || "Project Image"}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold mb-4">{project.title || "Untitled Project"}</h1>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies && project.technologies.map((tech: string) => (
                                <Badge
                                    key={tech}
                                    variant="outline"
                                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0"
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{project.description || "No description available"}</p>

                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <h2>Project Overview</h2>
                            <p>
                                This is an expanded description of the project. In a real portfolio, you would include details about the
                                project&#39;s goals, your role, challenges faced, and solutions implemented.
                            </p>

                            <h2>Key Features</h2>
                            <ul>
                                <li>Feature one with detailed explanation</li>
                                <li>Feature two with detailed explanation</li>
                                <li>Feature three with detailed explanation</li>
                            </ul>

                            <h2>Technical Details</h2>
                            <p>
                                Explain the technical aspects of the project, including architecture decisions, technologies used, and
                                any interesting implementation details.
                            </p>
                        </div>

                        <div className="flex gap-4 mt-12">
                            <Button className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600">
                                View Live Demo
                            </Button>
                            <Button variant="outline">View Source Code</Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}