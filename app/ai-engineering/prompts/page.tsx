import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { getAIPrompts } from "@/src/lib/db/ai-engineering"
import { PageLayout } from "@/src/components/layout/PageLayout"
import { PromptsPageClient } from "@/src/components/ai-engineering/PromptsPageClient"

export const revalidate = 60

export const metadata: Metadata = {
    title: "Prompt Library",
    description: "Copy-ready prompts for backend development, API design, database work, code review, and learning — with expected outputs and best practices.",
    alternates: {
        canonical: `${profileData.portfolioUrl}/ai-engineering/prompts`,
    },
}

export default async function PromptsPage() {
    const prompts = await getAIPrompts()
    return (
        <PageLayout showFooter={false}>
            <PromptsPageClient prompts={prompts} />
        </PageLayout>
    )
}
