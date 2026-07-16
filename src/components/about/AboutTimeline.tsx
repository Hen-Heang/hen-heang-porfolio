import React from "react"
import { Section } from "@/src/components/system/Section"
import { Timeline } from "@/src/components/system/Timeline"
import { buildCareerTimeline } from "@/src/lib/utils/timeline"
import type { EducationItem, ExperienceItem } from "@/src/lib/types"

export function AboutTimeline({
    experience,
    education,
}: {
    experience: ExperienceItem[]
    education: EducationItem[]
}) {
    const items = buildCareerTimeline(experience, education)

    return (
        <Section
            id="experience"
            eyebrow="Experience"
            title="Cambodia to Korea"
            description="University in Phnom Penh, a Korean-language development bootcamp, then two enterprise teams in the Korean tech sector."
            className="bg-surface"
        >
            <Timeline items={items} />
        </Section>
    )
}
