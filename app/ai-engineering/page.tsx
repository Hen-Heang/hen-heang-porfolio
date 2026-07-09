import { Suspense } from "react"
import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { getAIArticles, getAICategories, getAIPrompts, getAISnippets, getAllTags, getAllTechnologies } from "@/src/lib/db/ai-engineering"
import { PageLayout } from "@/src/components/layout/PageLayout"
import { AIEngineeringHubClient } from "@/src/components/ai-engineering/AIEngineeringHubClient"

export const revalidate = 60

export const metadata: Metadata = {
    title: "AI Engineering",
    description:
        "Backend engineering, AI workflows, architecture notes, prompt engineering, code reviews, experiments, and technical learning.",
    alternates: {
        canonical: `${profileData.portfolioUrl}/ai-engineering`,
    },
    openGraph: {
        title: "AI Engineering | Hen Heang",
        description:
            "Backend engineering, AI workflows, architecture notes, prompt engineering, code reviews, experiments, and technical learning.",
        url: `${profileData.portfolioUrl}/ai-engineering`,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Engineering | Hen Heang",
        description:
            "Backend engineering, AI workflows, architecture notes, prompt engineering, code reviews, experiments, and technical learning.",
    },
}

export default async function AIEngineeringPage() {
    const [articles, categories, prompts, snippets] = await Promise.all([
        getAIArticles(),
        getAICategories(),
        getAIPrompts(),
        getAISnippets(),
    ])

    return (
        <PageLayout showFooter={false}>
            <Suspense>
                <AIEngineeringHubClient
                    articles={articles}
                    categories={categories}
                    allTags={getAllTags(articles)}
                    allTechnologies={getAllTechnologies(articles)}
                    promptCount={prompts.length}
                    snippetCount={snippets.length}
                />
            </Suspense>
        </PageLayout>
    )
}
