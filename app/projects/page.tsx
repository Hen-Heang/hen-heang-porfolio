import type { Metadata } from "next"
import { getProjects } from "@/src/lib/db/portfolio"
import { PageLayout } from "@/src/components/layout/PageLayout"
import { ProjectsIndex } from "@/src/components/projects/ProjectsIndex"
import type { ProjectFilter } from "@/src/components/projects/ProjectFilterBar"
import { ContactCTASection } from "@/src/components/home/ContactCTASection"
import { profileData } from "@/data/profile"

const title = "Projects"
const description = "Everything I've built — personal projects and enterprise work."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${profileData.portfolioUrl}/projects`,
    },
    openGraph: {
        title,
        description,
        url: `${profileData.portfolioUrl}/projects`,
    },
}

// Re-render at most once a minute so admin edits show up without a redeploy
export const revalidate = 60

const VALID_FILTERS: ProjectFilter[] = ["all", "backend", "full-stack", "live"]

export default async function ProjectsPage({
    searchParams,
}: {
    searchParams: Promise<{ filter?: string }>
}) {
    const [projects, params] = await Promise.all([getProjects(), searchParams])
    const filter: ProjectFilter = VALID_FILTERS.includes(params.filter as ProjectFilter)
        ? (params.filter as ProjectFilter)
        : "all"

    return (
        <PageLayout showFooter={false}>
            <ProjectsIndex projects={projects} filter={filter} />
            <ContactCTASection />
        </PageLayout>
    )
}
