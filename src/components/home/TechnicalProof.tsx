import React from "react"
import { Section } from "@/src/components/system/Section"
import type { Project } from "@/src/lib/types"
import type { ProfileContentParsed } from "@/src/lib/schemas/content"

/** Restrained proof section — only stats derivable from real project/profile data. */
export function TechnicalProof({ projects, profile }: { projects: Project[]; profile: ProfileContentParsed }) {
    const liveCount = projects.filter((p) => p.demo && p.demo !== "#").length
    const endpointCount = projects.reduce((sum, p) => sum + (p.apiEndpoints?.length ?? 0), 0)

    const stats: { label: string; value: string }[] = [
        { label: "Projects shipped", value: String(projects.length) },
        { label: "Live deployments", value: String(liveCount) },
        { label: "Documented API endpoints", value: String(endpointCount) },
        { label: "Years of experience", value: profile.yearsExperience },
        { label: "Countries worked in", value: "2" },
        { label: "Languages spoken", value: String(profile.languages?.length ?? 0) },
    ]

    return (
        <Section eyebrow="Technical Proof" title="What the numbers are, plainly">
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
