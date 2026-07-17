import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { projects } from "@/data/projects"
import { currentFocus } from "@/data/lab/overview"
import { roadmap as devopsRoadmap } from "@/data/lab/devops/roadmap"
import { getEngineeringLabIndex } from "@/src/lib/db/engineering-lab"
import { getBackendSummaries } from "@/src/lib/backend/catalog"
import { LabHero } from "@/src/components/lab/home/LabHero"
import { LabCategoryNav } from "@/src/components/lab/home/LabCategoryNav"
import { LabFeaturedWork } from "@/src/components/lab/home/LabFeaturedWork"
import { LabSearchClient } from "@/src/components/lab/home/LabSearchClient"
import { LabLearningDashboard } from "@/src/components/lab/home/LabLearningDashboard"

export const revalidate = 60

export const metadata: Metadata = {
    title: "Engineering Lab",
    description:
        "Exploring backend systems, architecture, AI engineering, and modern software development practices — how I design, build, test, and operate software.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab` },
    openGraph: {
        title: "Engineering Lab | Hen Heang",
        description: "Exploring backend systems, architecture, AI engineering, and modern software development practices.",
        url: `${profileData.portfolioUrl}/lab`,
        type: "website",
    },
}

export default async function EngineeringLabPage() {
    const { items } = await getEngineeringLabIndex()
    const backendItems = getBackendSummaries()

    const featured = projects
        .filter((p) => p.featured)
        .map((p) => ({
            slug: p.slug,
            title: p.title,
            description: p.description,
            architecture: p.architecture ?? [],
        }))

    return (
        <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
            <LabHero currentFocus={currentFocus} />
            <LabLearningDashboard backendItems={backendItems} devopsTopics={devopsRoadmap} />
            <LabSearchClient items={items}>
                <LabCategoryNav />
                <LabFeaturedWork featured={featured} />
            </LabSearchClient>
        </div>
    )
}
