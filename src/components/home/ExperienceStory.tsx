import React from "react"
import { Section } from "@/src/components/system/Section"
import { Timeline } from "@/src/components/system/Timeline"
import { Reveal } from "@/src/components/system/Reveal"
import { TextLink } from "@/src/components/system/TextLink"
import { buildCareerTimeline } from "@/src/lib/utils/timeline"
import type { EducationItem, ExperienceItem } from "@/src/lib/types"

/**
 * Cambodia → Korea progression built from real education + experience data:
 * university, bootcamp, KOSIGN, Bizplay, then the current direction.
 */
export function ExperienceStory({
    experience,
    education,
}: {
    experience: ExperienceItem[]
    education: EducationItem[]
}) {
    const items = buildCareerTimeline(experience, education).map((item) => ({
        ...item,
        highlights: item.highlights?.slice(0, 3),
    }))

    return (
        <Section
            id="experience"
            eyebrow="Experience"
            title="From Phnom Penh to Seoul"
            description="Trained in Cambodia, hired into Korean enterprise teams — each step moved closer to the systems side of software."
            className="bg-surface"
        >
            <Reveal>
                <Timeline items={items} />
            </Reveal>
            <div className="mt-12">
                <TextLink href="/about">More about me</TextLink>
            </div>
        </Section>
    )
}
