"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { projects } from "@/data/projects"
import { Button } from "@/src/components/ui/button"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/PageLayout"
import { ProjectCard } from "@/src/components/sections/projects/ProjectCard"

// Extract unique technologies from all projects
const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.technologies)))

export default function ProjectsPage() {
    const router = useRouter()
    const [filter, setFilter] = useState("All")

    const filteredProjects =
        filter === "All" ? projects : projects.filter((project) => project.technologies.includes(filter))

    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>

                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        <Button
                            variant={filter === "All" ? "default" : "outline"}
                            onClick={() => setFilter("All")}
                            className={filter === "All" ? "bg-gradient-to-r from-teal-500 to-indigo-500" : ""}
                        >
                            All
                        </Button>
                        {allTechnologies.map((tech) => (
                            <Button
                                key={tech}
                                variant={filter === tech ? "default" : "outline"}
                                onClick={() => setFilter(tech)}
                                className={filter === tech ? "bg-gradient-to-r from-teal-500 to-indigo-500" : ""}
                            >
                                {tech}
                            </Button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                project={project}
                                index={index}
                                onClick={() => {
                                    const slug = project.title.toLowerCase().replace(/\s+/g, "-")
                                    router.push(`/projects/${slug}`)
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
