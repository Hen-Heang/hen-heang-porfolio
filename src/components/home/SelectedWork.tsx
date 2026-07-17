import React from "react"
import { Section } from "@/src/components/system/Section"
import { ProjectFeature } from "@/src/components/system/ProjectFeature"
import { Reveal } from "@/src/components/system/Reveal"
import { TextLink } from "@/src/components/system/TextLink"
import type { Project } from "@/src/lib/types"

/** Two backend-first projects keep the homepage positioning clear; the index holds the full catalog. */
export function SelectedWork({ projects }: { projects: Project[] }) {
    const backend = projects.filter((project) =>
        project.technologies.some((technology) => /java|spring boot/i.test(technology))
    )
    const featured = projects.filter((p) => p.featured)
    const ordered = [...backend.filter((p) => p.featured), ...backend, ...featured, ...projects]
    const selected = ordered.filter((project, index) =>
        ordered.findIndex((candidate) => candidate.slug === project.slug) === index
    ).slice(0, 2)

    if (selected.length === 0) return null

    return (
        <Section
            id="work"
            eyebrow="Selected Work"
            title="Backend systems, explained end to end"
            description="Not just screenshots: each case study opens the API contract, architecture, data model, security decisions, and trade-offs behind the product."
        >
            <div className="flex flex-col gap-16 md:gap-20">
                {selected.map((project, i) => (
                    <Reveal key={project.slug}>
                        <ProjectFeature index={i + 1} project={project} reverse={i % 2 === 1} />
                    </Reveal>
                ))}
            </div>
            <div className="mt-16">
                <TextLink href="/projects">Browse all projects</TextLink>
            </div>
        </Section>
    )
}
