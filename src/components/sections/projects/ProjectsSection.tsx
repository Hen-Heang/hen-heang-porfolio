"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import { ProjectCard } from "./ProjectCard"
import { projects as staticProjects } from "@/data/projects"
import { getProjects } from "@/src/lib/db/portfolio"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Project } from "@/src/lib/types"
import { Skeleton } from "@/src/components/ui/Skeleton"

export function ProjectsSection() {
    const router = useRouter()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })
    const [projects, setProjects] = useState<Project[] | null>(null)

    useEffect(() => {
        getProjects().then((data) => setProjects(data.length ? data : staticProjects))
    }, [])

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
        <section id="projects" className="section-base section-plain">
            <div className="container mx-auto px-4">
                <SectionHeader
                    badge="Projects"
                    title="My Recent Work"
                    description="Here's a selection of projects I've worked on recently."
                />

                {projects === null ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                <Skeleton className="aspect-video w-full rounded-none" />
                                <div className="p-5 space-y-3">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-3 w-full" />
                                    <Skeleton className="h-3 w-5/6" />
                                    <div className="flex gap-2 pt-1">
                                        <Skeleton className="h-5 w-16" />
                                        <Skeleton className="h-5 w-16" />
                                        <Skeleton className="h-5 w-16" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
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
                )}

                <div className="text-center mt-12">
                    <Button
                        variant="outline"
                        className="border-slate-300 dark:border-slate-700"
                        onClick={() => router.push("/projects")}
                    >
                        View all projects
                    </Button>
                </div>
            </div>
        </section>
    )
}
