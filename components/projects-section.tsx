import { projects } from "@/data/projects"
import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/animations/scroll-reveal"
import StaggerChildren from "@/components/animations/stagger-children"
import StaggerItem from "@/components/animations/stagger-item"
import HoverCard from "@/components/animations/hover-card"

export default function ProjectsSection() {
    // Only show the first 3 projects on the homepage
    const featuredProjects = projects.slice(0, 3)

    return (
        <section className="py-16 bg-gray-50 dark:bg-[#0f0730]">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Check out some of my recent work. These projects demonstrate my skills and experience in web development.
                        </p>
                    </div>
                </ScrollReveal>

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project) => (
                        <StaggerItem key={project.id}>
                            <HoverCard className="bg-white dark:bg-[#1a103f] rounded-lg overflow-hidden shadow-md dark:shadow-purple-900/30 h-full border border-gray-200 dark:border-purple-900/20">
                                <div className="relative h-48 w-full">
                                    <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200 rounded-full px-3 py-1 text-xs"
                                            >
                        {tech}
                      </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/projects/${project.id}`}
                                        className="text-purple-700 dark:text-purple-300 font-medium hover:text-purple-800 dark:hover:text-purple-200"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </StaggerChildren>

                <ScrollReveal direction="up" className="text-center mt-12">
                    <Link
                        href="/projects"
                        className="px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors"
                    >
                        View All Projects
                    </Link>
                </ScrollReveal>
            </div>
        </section>
    )
}
