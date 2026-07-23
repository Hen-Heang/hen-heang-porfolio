import React from "react"
import { Container } from "@/src/components/system/Container"
import type { Project } from "@/src/lib/types"
import type { ProfileContentParsed } from "@/src/lib/schemas/content"

/**
 * Compact credibility strip directly below the hero — four facts derived
 * from real project/profile data, no skill percentages or weak counts.
 * Deliberately not a `Section` (no big heading/whitespace): thin borders,
 * tight padding, no shadows or animation.
 */
export function EngineeringProofStrip({ projects, profile }: { projects: Project[]; profile: ProfileContentParsed }) {
    const javaSpringCount = projects.filter((project) =>
        project.technologies.some((technology) => /java|spring boot/i.test(technology))
    ).length
    const documentedCount = projects.filter((p) => p.architecture?.length || p.apiEndpoints?.length).length

    const facts = [
        { value: `${profile.yearsExperience} years`, label: "In enterprise teams" },
        { value: `${javaSpringCount} systems`, label: "Built with Java / Spring Boot" },
        { value: `${documentedCount} case studies`, label: "With documented architecture & APIs" },
        { value: "Cambodia → Korea", label: "International engineering experience" },
    ]

    return (
        <section className="border-y border-border" aria-labelledby="engineering-at-a-glance">
            <Container>
                <h2 id="engineering-at-a-glance" className="sr-only">
                    Engineering at a glance
                </h2>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-6 py-8 lg:grid-cols-4 lg:gap-y-0">
                    {facts.map((fact) => (
                        <div key={fact.label}>
                            <dt className="font-mono text-lg font-semibold tracking-tight text-fg sm:text-xl">
                                {fact.value}
                            </dt>
                            <dd className="mt-1 text-sm text-fg-secondary">{fact.label}</dd>
                        </div>
                    ))}
                </dl>
            </Container>
        </section>
    )
}
