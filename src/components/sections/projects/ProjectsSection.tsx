"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import { ProjectCard } from "./ProjectCard"
import { projects } from "@/data/projects"
import { useRouter } from "next/navigation"
import {Project} from "@/src/lib/types";

export function ProjectsSection() {
    const router = useRouter()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const handleViewProject = (project: Project) => {
        const slug = project.title.toLowerCase().replace(/\s+/g, "-")
        router.push(`/projects/${slug}`)
    }

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-4">
                <SectionHeader
                    badge="Projects"
                    title="My Recent Work"
                    description="Here's a selection of projects I've worked on recently."
                />

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} onClick={() => handleViewProject(project)} />
                    ))}
                </motion.div>

                <div className="text-center mt-12">
                    <Button
                        variant="outline"
                        className="border-gray-300 dark:border-gray-700"
                        onClick={() => router.push("/projects")}
                    >
                        View all projects
                    </Button>
                </div>
            </div>
        </section>
    )
}
