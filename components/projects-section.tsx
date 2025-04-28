import {projects} from "@/data/projects"
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
        <section className="py-16 bg-gray-50 dark:bg-github-bg-dark">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-github-text-primary">Featured Projects</h2>
                        <p className="text-gray-600 dark:text-github-text-secondary max-w-2xl mx-auto">
                            Check out some of my recent work. These projects demonstrate my skills and experience in web
                            development.
                        </p>
                    </div>
                </ScrollReveal>

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project) => (
                        <StaggerItem key={project.id}>
                            <HoverCard
                                className="bg-white dark:bg-github-bg-light rounded-lg overflow-hidden shadow-md dark:shadow-github border border-gray-200 dark:border-github-border h-full">
                                <div className="relative h-48 w-full">
                                    <Image src={project.image || "/placeholder.svg"} alt={project.title} fill
                                           className="object-cover"/>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-github-text-primary">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-github-text-secondary mb-4 line-clamp-3">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="bg-github-purple/10 text-github-purple dark:bg-github-purple/20 dark:text-github-purple-light rounded-full px-3 py-1 text-xs"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/projects/${project.id}`}
                                        className="text-github-purple dark:text-github-purple-light font-medium hover:text-github-purple-dark dark:hover:text-white"
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
                        className="px-6 py-3 bg-github-purple text-white font-medium rounded-md hover:bg-github-purple-dark transition-colors">
                        View All Projects
                    </Link>
                </ScrollReveal>
            </div>
        </section>
    )
}