import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, Clock } from "lucide-react"
import { profileData } from "@/data/profile"
import { roadmap, getRoadmapTopic } from "@/data/lab/devops/roadmap"
import { getLearningCard } from "@/data/lab/devops/topics"
import { DifficultyBadge } from "@/src/components/ai-engineering/DifficultyBadge"
import { LearningCardView } from "@/src/components/lab/devops/LearningCardView"
import { OnPageNav } from "@/src/components/lab/ui/OnPageNav"
import { ReadingProgressBar } from "@/src/components/lab/ui/ReadingProgressBar"
import { SaveForLaterButton } from "@/src/components/lab/ui/SaveForLaterButton"
import { TrackLabVisit } from "@/src/components/lab/ui/TrackLabVisit"
import { DevOpsProgressButton } from "@/src/components/lab/devops/DevOpsProgress"
import { DevOpsCompletionFlow } from "@/src/components/lab/devops/DevOpsCompletionFlow"

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
    const availableTopics = roadmap.filter((item) => item.hasCard)
    const topicIndex = availableTopics.findIndex((item) => item.slug === topic.slug)
    const previous = topicIndex > 0 ? availableTopics[topicIndex - 1] : null
    const next = topicIndex >= 0 && topicIndex < availableTopics.length - 1 ? availableTopics[topicIndex + 1] : null

    const navSections = [
        { id: "overview", title: "Overview" },
        { id: "why-it-matters", title: "Why it matters" },
        { id: "how-backend-devs-use-it", title: "How backend developers use it" },
        { id: "common-mistakes", title: "Common mistakes" },
        { id: "example-commands", title: "Example commands" },
        ...(card.resources.length > 0 ? [{ id: "resources", title: "Resources" }] : []),
        { id: "knowledge-check", title: "Knowledge check" },
    ]

    return (
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
            <ReadingProgressBar />
            <TrackLabVisit itemId={topic.slug} href={`/lab/devops/topics/${topic.slug}`} title={topic.title} path="devops" />
            <Link href="/lab/devops" className="mb-6 inline-flex items-center gap-1.5 text-base text-fg-muted transition-colors hover:text-fg"><ArrowLeft size={14} aria-hidden="true" /> DevOps learning path</Link>
            <header className="mb-8">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                    <DifficultyBadge difficulty={topic.difficulty} />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-success">{topic.category}</span>
                </div>
                <h1 className="mb-3 text-2xl md:text-4xl font-bold leading-tight tracking-tight text-fg">{topic.title}</h1>
                <p className="mb-4 text-base md:text-lg leading-relaxed text-fg-secondary">{topic.description}</p>
                <span className="flex items-center gap-1 text-sm text-fg-muted">
                    <Clock size={12} aria-hidden="true" />
                    {topic.estimatedTime}
                </span>
            </header>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
                <div className="min-w-0">
                    <LearningCardView card={card} />
                    <section id="knowledge-check" aria-labelledby="devops-knowledge-check-heading" className="mt-10 scroll-mt-24 rounded-2xl border border-warning/30 bg-warning/5 p-5">
                        <div className="flex items-start gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning"><Brain size={17} aria-hidden="true" /></span>
                            <div><p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-warning">Retrieval check</p><h2 id="devops-knowledge-check-heading" className="mt-1 text-xl font-bold text-fg">Before you continue</h2></div>
                        </div>
                        <ul className="mt-4 space-y-2 text-base leading-6 text-fg-secondary">
                            <li>Explain what this tool or practice changes in the delivery lifecycle.</li>
                            <li>Name one common failure it helps you diagnose or prevent.</li>
                            <li>Repeat one example command from memory, then verify it.</li>
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <DevOpsProgressButton topicSlug={topic.slug} />
                            <SaveForLaterButton itemId={topic.slug} />
                        </div>
                    </section>
                    <DevOpsCompletionFlow topicSlug={topic.slug} next={next} />
                </div>
                <aside className="order-first lg:order-last">
                    <div className="lg:sticky lg:top-20">
                        <OnPageNav sections={navSections} />
                    </div>
                </aside>
            </div>

            <nav aria-label="DevOps topic pagination" className="mt-10 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
                {previous ? <Link href={`/lab/devops/topics/${previous.slug}`} className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"><span className="inline-flex items-center gap-1 text-sm text-fg-muted"><ArrowLeft size={12} aria-hidden="true" /> Previous topic</span><p className="mt-1 text-base font-semibold text-fg">{previous.title}</p></Link> : <span />}
                {next ? <Link href={`/lab/devops/topics/${next.slug}`} className="rounded-xl border border-border bg-surface p-4 text-right transition-colors hover:border-border-strong"><span className="inline-flex items-center gap-1 text-sm text-fg-muted">Next topic <ArrowRight size={12} aria-hidden="true" /></span><p className="mt-1 text-base font-semibold text-fg">{next.title}</p></Link> : <Link href="/lab/devops/labs" className="rounded-xl border border-success/30 bg-success/5 p-4 text-right transition-colors hover:border-success/50"><span className="inline-flex items-center gap-1 text-sm text-success">Apply what you learned <ArrowRight size={12} aria-hidden="true" /></span><p className="mt-1 text-base font-semibold text-fg">Open hands-on labs</p></Link>}
            </nav>
        </div>
    )
}
