import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { projects } from "@/data/projects"
import { systemStatus, currentFocus, engineeringPhilosophy } from "@/data/lab/overview"
import { getEngineeringLabIndex } from "@/src/lib/db/engineering-lab"
import { LabDashboardClient, type LabMetric } from "@/src/components/lab/LabDashboardClient"

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
    const { items, stats } = await getEngineeringLabIndex()

    const techCount = new Set(projects.flatMap((p) => p.technologies)).size
    const metrics: LabMetric[] = [
        { label: "Projects built", value: projects.length },
        { label: "Technologies", value: techCount, suffix: "+" },
        { label: "Articles & Snippets", value: stats.aiArticles + stats.aiPrompts + stats.aiSnippets },
        { label: "DevOps topics & labs", value: stats.devopsTopics + stats.devopsLabs },
    ]

    const featured = projects
        .filter((p) => p.featured)
        .map((p) => ({
            slug: p.slug,
            title: p.title,
            description: p.description,
            architecture: p.architecture ?? [],
        }))

    return (
        <LabDashboardClient
            items={items}
            metrics={metrics}
            featured={featured}
            systemStatus={systemStatus}
            currentFocus={currentFocus}
            philosophy={engineeringPhilosophy}
        />
    )
}
