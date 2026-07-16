import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Clock } from "lucide-react"
import { profileData } from "@/data/profile"
import { roadmap, getRoadmapTopic } from "@/data/lab/devops/roadmap"
import { getLearningCard } from "@/data/lab/devops/topics"
import { DifficultyBadge } from "@/src/components/ai-engineering/DifficultyBadge"
import { LearningCardView } from "@/src/components/lab/devops/LearningCardView"

export async function generateStaticParams() {
    return roadmap.filter((t) => t.hasCard).map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const topic = getRoadmapTopic(slug)
    if (!topic) return {}
    const url = `${profileData.portfolioUrl}/lab/devops/topics/${topic.slug}`
    return {
        title: `${topic.title} — DevOps Basics`,
        description: topic.description,
        alternates: { canonical: url },
        openGraph: { title: topic.title, description: topic.description, url, type: "article" },
    }
}

export default async function DevOpsTopicPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const topic = getRoadmapTopic(slug)
    const card = getLearningCard(slug)
    if (!topic || !card) notFound()

    return (
        <div className="px-4 md:px-8 py-10 max-w-3xl mx-auto">
            <header className="mb-8">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                    <DifficultyBadge difficulty={topic.difficulty} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-success">{topic.category}</span>
                </div>
                <h1 className="mb-3 text-2xl md:text-4xl font-bold leading-tight tracking-tight text-fg">{topic.title}</h1>
                <p className="mb-4 text-sm md:text-base leading-relaxed text-fg-secondary">{topic.description}</p>
                <span className="flex items-center gap-1 text-xs text-fg-muted">
                    <Clock size={12} />
                    {topic.estimatedTime}
                </span>
            </header>

            <LearningCardView card={card} />
        </div>
    )
}
