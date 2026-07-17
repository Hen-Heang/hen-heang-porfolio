import React from "react"
import { Section } from "@/src/components/system/Section"
import type { Project } from "@/src/lib/types"
import type { ProfileContentParsed } from "@/src/lib/schemas/content"

/** Restrained proof section — only stats derivable from real project/profile data. */
export function TechnicalProof({ projects, profile }: { projects: Project[]; profile: ProfileContentParsed }) {
    const liveCount = projects.filter((p) => p.demo && p.demo !== "#").length
    const endpointCount = projects.reduce((sum, p) => sum + (p.apiEndpoints?.length ?? 0), 0)
    const modelCount = projects.reduce((sum, p) => sum + (p.dataModel?.length ?? 0), 0)
    const architectureCount = projects.filter((p) => p.architecture?.length).length
    const javaSpringCount = projects.filter((project) =>
        project.technologies.some((technology) => /java|spring boot/i.test(technology))
    ).length

    const stats: { label: string; value: string }[] = [
        { label: "Java / Spring systems", value: String(javaSpringCount) },
        { label: "Documented API endpoints", value: String(endpointCount) },
        { label: "Modeled entities & tables", value: String(modelCount) },
        { label: "Architecture maps", value: String(architectureCount) },
        { label: "Live deployments", value: String(liveCount) },
        { label: "Years in enterprise teams", value: profile.yearsExperience },
    ]

    return (
        <Section
            eyebrow="Backend Proof"
            title="The evidence is in the systems"
            description="Counts are derived from the case studies in this portfolio—not generic skill percentages."
        >
            <dl className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
                {stats.map((stat) => (
                    <div key={stat.label}>
                        <dd className="font-mono text-3xl font-semibold tracking-tight text-fg">{stat.value}</dd>
                        <dt className="mt-2 text-sm text-fg-secondary">{stat.label}</dt>
                    </div>
                ))}
            </dl>
        </Section>
    )
}
