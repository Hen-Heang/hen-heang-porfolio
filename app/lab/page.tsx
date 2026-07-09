import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { getEngineeringLabIndex } from "@/src/lib/db/engineering-lab"
import { PageLayout } from "@/src/components/layout/PageLayout"
import { EngineeringLabHubClient } from "@/src/components/lab/EngineeringLabHubClient"

export const revalidate = 60

export const metadata: Metadata = {
    title: "Engineering Lab",
    description:
        "AI-assisted backend engineering and the DevOps practices that get it into production — articles, prompts, snippets, topics, labs, and commands in one place.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab` },
    openGraph: {
        title: "Engineering Lab | Hen Heang",
        description: "AI-assisted backend engineering and the DevOps practices that get it into production.",
        url: `${profileData.portfolioUrl}/lab`,
        type: "website",
    },
}

export default async function EngineeringLabPage() {
    const { items, stats } = await getEngineeringLabIndex()

    return (
        <PageLayout showFooter={false}>
            <EngineeringLabHubClient items={items} stats={stats} />
        </PageLayout>
    )
}
