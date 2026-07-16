import { PageLayout } from "@/src/components/layout/PageLayout"
import { Hero } from "@/src/components/home/Hero"
import { SelectedWork } from "@/src/components/home/SelectedWork"
import { Capabilities } from "@/src/components/home/Capabilities"
import { ExperienceStory } from "@/src/components/home/ExperienceStory"
import { LabDirectory } from "@/src/components/home/LabDirectory"
import { TechnicalProof } from "@/src/components/home/TechnicalProof"
import { ContactCTASection } from "@/src/components/home/ContactCTASection"
import { getEducation, getExperience, getProjects, getSiteContent } from "@/src/lib/db/portfolio"
import { getAIArticles } from "@/src/lib/db/ai-engineering"

// Re-render at most once a minute so admin edits show up without a redeploy.
export const revalidate = 60

export default async function HomePage() {
    const [profile, projects, experience, education, articles] = await Promise.all([
        getSiteContent("profile"),
        getProjects(),
        getExperience(),
        getEducation(),
        getAIArticles(),
    ])

    return (
        <PageLayout>
            <Hero profile={profile} projects={projects} />
            <SelectedWork projects={projects} />
            <Capabilities />
            <ExperienceStory experience={experience} education={education} />
            <LabDirectory articles={articles} />
            <TechnicalProof projects={projects} profile={profile} />
            <ContactCTASection />
        </PageLayout>
    )
}
