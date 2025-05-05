"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { navItems } from "@/data/navigation"
import { useThemeToggle } from "@/hooks/useThemeToggle"
import {ProjectCard} from "@/components/projects/ProjectCard";
import {Header} from "@/components/header/Header";
import {Footer} from "@/components/shared/Footer";


// Extract unique technologies from all projects
const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.technologies)))

export default function ProjectsPage() {
    const router = useRouter()
    const [filter, setFilter] = useState("All")
    const { darkMode, toggleTheme } = useThemeToggle()
    const [activeSection] = useState("projects")

    const filteredProjects =
        filter === "All" ? projects : projects.filter((project) => project.technologies.includes(filter))

    // Handle navigation
    const handleNavigation = (sectionId: string) => {
        if (sectionId === "projects") {
            return true // Already on projects page
        }
        if (sectionId === "about") {
            router.push("/about")
            return true
        }
        if (sectionId === "contact") {
            router.push("/contact")
            return true
        }
        if (sectionId === "home" || sectionId === "education") {
            router.push(`/#${sectionId}`)
            return true
        }
        return false
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100">
            <Header
                navItems={navItems}
                activeSection={activeSection}
                darkMode={darkMode}
                toggleTheme={toggleTheme}
                onNavItemClick={handleNavigation}
            />

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

            <Footer />
        </div>
    )
}
