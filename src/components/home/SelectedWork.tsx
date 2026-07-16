import React from "react"
import { Section } from "@/src/components/system/Section"
import { ProjectFeature } from "@/src/components/system/ProjectFeature"
import { Reveal } from "@/src/components/system/Reveal"
import { TextLink } from "@/src/components/system/TextLink"
import type { Project } from "@/src/lib/types"

/** Up to three featured projects as large alternating editorial panels. */
export function SelectedWork({ projects }: { projects: Project[] }) {
    const featured = projects.filter((p) => p.featured)
    const rest = projects.filter((p) => !p.featured)
    const selected = [...featured, ...rest].slice(0, 3)

    if (selected.length === 0) return null

    return (
        <Section
            id="work"
            eyebrow="Selected Work"
            title="Systems built end to end"
            description="Each project is a full engineering case study — business problem, architecture, data model, and the trade-offs behind them."
        >
            <div className="flex flex-col gap-20 md:gap-28">
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
