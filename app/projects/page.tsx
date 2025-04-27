import { projects } from "@/data/projects"
import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/animations/scroll-reveal"
import StaggerChildren from "@/components/animations/stagger-children"
import StaggerItem from "@/components/animations/stagger-item"
import HoverCard from "@/components/animations/hover-card"

export default function ProjectsPage() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            A comprehensive collection of my work. These projects demonstrate my skills and experience in web
                            development.
                        </p>
                    </div>
                </ScrollReveal>

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <StaggerItem key={project.id}>
                            <HoverCard className="bg-white rounded-lg overflow-hidden shadow-md h-full">
                                <div className="relative h-48 w-full">
                                    <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, index) => (
                                            <span key={index} className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-xs">
                        {tech}
                      </span>
                                        ))}
                                    </div>

                                    <Link href={`/projects/${project.id}`} className="text-blue-600 font-medium hover:text-blue-800">
                                        View Details →
                                    </Link>
                                </div>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </StaggerChildren>
            </div>
        </section>
    )
}
