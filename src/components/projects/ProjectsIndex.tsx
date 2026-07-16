import React from "react"
import { Container } from "@/src/components/system/Container"
import { Eyebrow } from "@/src/components/system/Eyebrow"
import { SectionHeading } from "@/src/components/system/SectionHeading"
import { ProjectFilterBar, type ProjectFilter } from "@/src/components/projects/ProjectFilterBar"
import { ProjectCard } from "@/src/components/projects/ProjectCard"
import type { Project } from "@/src/lib/types"

function isBackend(project: Project): boolean {
    return project.technologies.some((t) => /spring|java|mybatis/i.test(t))
}

function isFullStack(project: Project): boolean {
    return isBackend(project) && project.technologies.some((t) => /next\.?js|react/i.test(t))
}

function isLive(project: Project): boolean {
    return Boolean(project.demo && project.demo !== "#")
}

function matchesFilter(project: Project, filter: ProjectFilter): boolean {
    switch (filter) {
        case "backend":
            return isBackend(project)
        case "full-stack":
            return isFullStack(project)
        case "live":
            return isLive(project)
        default:
            return true
    }
}

export function ProjectsIndex({ projects, filter }: { projects: Project[]; filter: ProjectFilter }) {
    const counts: Record<ProjectFilter, number> = {
        all: projects.length,
        backend: projects.filter(isBackend).length,
        "full-stack": projects.filter(isFullStack).length,
        live: projects.filter(isLive).length,
    }

    const filtered = projects.filter((p) => matchesFilter(p, filter))

    return (
        <div className="py-section pt-16 md:pt-20">
            <Container>
                <Eyebrow className="mb-4">Projects</Eyebrow>
                <SectionHeading as="h1" size="display">
                    Everything I&apos;ve built
                </SectionHeading>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-secondary">
                    Personal projects and enterprise work — each one a full engineering case study,
                    not just a screenshot.
                </p>

                <div className="mt-10">
                    <ProjectFilterBar active={filter} counts={counts} />
                </div>

                {filtered.length === 0 ? (
                    <p className="mt-16 text-center text-fg-muted">
                        No projects in this category yet.
                    </p>
                ) : (
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((project, i) => (
                            <ProjectCard key={project.slug} project={project} index={i + 1} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}
