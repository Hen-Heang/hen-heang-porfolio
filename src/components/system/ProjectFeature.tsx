import React from "react"
import { Github } from "lucide-react"
import { ArchitecturePreview } from "@/src/components/system/ArchitecturePreview"
import { StatusBadge } from "@/src/components/system/StatusBadge"
import { TextLink } from "@/src/components/system/TextLink"
import type { Project } from "@/src/lib/types"

interface ProjectFeatureProps {
    index: number
    project: Project
    reverse?: boolean
}

/**
 * Large editorial project panel for the homepage's Selected Work section:
 * numbered, problem → solution narrative, real stack and architecture.
 */
export function ProjectFeature({ index, project, reverse = false }: ProjectFeatureProps) {
    const isLive = Boolean(project.demo && project.demo !== "#")
    const shortTitle = project.title.split("—")[0].trim()

    return (
        <article className="group grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={reverse ? "lg:order-2" : undefined}>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-fg-muted" aria-hidden>
                        {String(index).padStart(2, "0")}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                        {isLive ? (
                            <StatusBadge status="live">Live</StatusBadge>
                        ) : (
                            <StatusBadge status="archived">Source available</StatusBadge>
                        )}
                    </div>
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    {project.title}
                </h3>

                {project.businessProblem && (
                    <div className="mt-6">
                        <p className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">Problem</p>
                        <p className="mt-2 leading-relaxed text-fg-secondary">{project.businessProblem}</p>
                    </div>
                )}

                <div className="mt-5">
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">Solution</p>
                    <p className="mt-2 leading-relaxed text-fg-secondary">{project.description}</p>
                </div>

                {(project.role || project.duration) && (
                    <p className="mt-5 text-sm text-fg-muted">
                        {[project.role, project.duration].filter(Boolean).join(" · ")}
                    </p>
                )}

                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${shortTitle} technologies`}>
                    {project.technologies.slice(0, 6).map((tech) => (
                        <li
                            key={tech}
                            className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-fg-secondary"
                        >
                            {tech}
                        </li>
                    ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-5">
                    <TextLink href={`/projects/${project.slug}`}>
                        View case study: {shortTitle}
                    </TextLink>
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-secondary transition-colors hover:text-fg"
                        >
                            <Github size={15} aria-hidden />
                            GitHub
                        </a>
                    )}
                    {isLive && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-fg-secondary transition-colors hover:text-fg"
                        >
                            Live site
                        </a>
                    )}
                </div>
            </div>

            <div className={reverse ? "lg:order-1" : undefined}>
                {project.architecture?.length ? (
                    <ArchitecturePreview
                        layers={project.architecture}
                        note={project.architectureNote}
                        className="transition-all duration-300 group-hover:border-brand/30 group-hover:shadow-lg group-hover:shadow-black/5"
                    />
                ) : null}
            </div>
        </article>
    )
}
