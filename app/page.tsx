import { PageLayout } from "@/src/components/layout/PageLayout"
import { Hero } from "@/src/components/home/Hero"
import { EngineeringProofStrip } from "@/src/components/home/EngineeringProofStrip"
import { SelectedWork } from "@/src/components/home/SelectedWork"
import { ProfessionalExperience } from "@/src/components/home/ProfessionalExperience"
import { TechnicalCapabilities } from "@/src/components/home/TechnicalCapabilities"
import { EngineeringLabPreview } from "@/src/components/home/EngineeringLabPreview"
import { CurrentFocus } from "@/src/components/home/CurrentFocus"
import { ContactCTASection } from "@/src/components/home/ContactCTASection"
import { getExperience, getProjects, getSiteContent } from "@/src/lib/db/portfolio"
import { getAIArticles } from "@/src/lib/db/ai-engineering"

// Re-render at most once a minute so admin edits show up without a redeploy.
export const revalidate = 60

// Recruiter-focused order: identity, credibility, and verified professional
// work first; active learning (CurrentFocus) stays near the bottom, after
// the engineering proof — never before it.
export default async function HomePage() {
    const [profile, projects, experience, articles] = await Promise.all([
        getSiteContent("profile"),
        getProjects(),
        getExperience(),
        getAIArticles(),
    ])

    return (
        <PageLayout>
            <Hero profile={profile} projects={projects} />
            <EngineeringProofStrip projects={projects} profile={profile} />
            <SelectedWork projects={projects} />
            <ProfessionalExperience experience={experience} />
            <TechnicalCapabilities />
            <EngineeringLabPreview articles={articles} />
            <CurrentFocus />
            <ContactCTASection />
        </PageLayout>
    )
}
