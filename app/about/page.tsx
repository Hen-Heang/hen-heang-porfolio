import type { Metadata } from "next"
import { getSkills, getEducation, getExperience, getAchievements, getSiteContent } from "@/src/lib/db/portfolio"
import { profileData } from "@/data/profile"
import { PageLayout } from "@/src/components/layout/PageLayout"
import { AboutIntro } from "@/src/components/about/AboutIntro"
import { Philosophy } from "@/src/components/about/Philosophy"
import { AboutCurrentWork } from "@/src/components/about/AboutCurrentWork"
import { AboutTimeline } from "@/src/components/about/AboutTimeline"
import { SkillsOverview } from "@/src/components/about/SkillsOverview"
import { ContactCTASection } from "@/src/components/home/ContactCTASection"

// Re-render at most once a minute so admin edits show up without a redeploy
export const revalidate = 60

const title = "About"
const description = "Backend developer building REST APIs and enterprise applications in Korea with Java, Spring Boot, MyBatis, and PostgreSQL/Oracle."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${profileData.portfolioUrl}/about`,
    },
    openGraph: {
        title,
        description,
        url: `${profileData.portfolioUrl}/about`,
    },
}

export default async function AboutPage() {
    const [profile, skills, education, experience, achievements] = await Promise.all([
        getSiteContent("profile"),
        getSkills(),
        getEducation(),
        getExperience(),
        getAchievements(),
    ])

    return (
        <PageLayout>
            <AboutIntro profile={profile} />
            <Philosophy />
            <AboutCurrentWork />
            <AboutTimeline experience={experience} education={education} achievements={achievements} />
            <SkillsOverview skills={skills} />
            <ContactCTASection />
        </PageLayout>
    )
}
