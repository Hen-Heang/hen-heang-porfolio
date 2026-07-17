"use client"

import Link from "next/link"
import { ArrowRight, BookOpenCheck, Braces, Check, FlaskConical, Sparkles, Terminal } from "lucide-react"
import type { BackendItemSummary } from "@/src/lib/types/backend-engineering"
import type { RoadmapTopic } from "@/src/lib/types/devops-lab"
import { useBackendProgress } from "@/src/components/lab/backend/BackendProgress"
import { useDevOpsProgress } from "@/src/components/lab/devops/DevOpsProgress"

const pathStages = {
    backend: ["Understand the request lifecycle", "Build secure Spring APIs", "Operate production systems"],
    devops: ["Learn delivery foundations", "Containerize and automate", "Deploy and observe"],
    ai: ["Study practical patterns", "Apply prompts to real code", "Review and document decisions"],
}

export function LabLearningDashboard({ backendItems, devopsTopics }: { backendItems: BackendItemSummary[]; devopsTopics: RoadmapTopic[] }) {
    const backendProgress = useBackendProgress()
    const devopsProgress = useDevOpsProgress()
    const publishedBackend = backendItems.filter((item) => item.status === "published")
    const availableDevOps = devopsTopics.filter((topic) => topic.hasCard)
    const nextBackend = publishedBackend.find((item) => !backendProgress.has(item.id))
    const nextDevOps = availableDevOps.find((topic) => !devopsProgress.has(topic.slug))

    const backendDone = publishedBackend.filter((item) => backendProgress.has(item.id)).length
    const devopsDone = availableDevOps.filter((topic) => devopsProgress.has(topic.slug)).length

    return (
        <section id="learning-paths" className="mb-14 scroll-mt-24" aria-labelledby="learning-paths-heading">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-brand">Start or continue</p>
                    <h2 id="learning-paths-heading" className="mt-1 text-2xl font-bold tracking-tight text-fg md:text-3xl">Choose one path and keep moving</h2>
                    <p className="mt-2 max-w-2xl text-base leading-6 text-fg-secondary">Each path follows the same learning loop: understand the idea, apply it in code, then review the result.</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                    <Check size={11} className="text-success" aria-hidden="true" /> Progress stays on this device
                </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <LearningPathCard
                    icon={Braces}
                    eyebrow="Recommended path"
                    title="Backend Engineering"
                    description="A structured Java and Spring Boot curriculum from foundations to secure, observable production services."
                    stages={pathStages.backend}
                    completed={backendDone}
                    total={publishedBackend.length}
                    href={nextBackend ? `/lab/backend/${nextBackend.slug}` : "/lab/backend/roadmap"}
                    action={nextBackend ? `Continue: ${nextBackend.title}` : "Review the backend roadmap"}
                    accent="brand"
                />
                <LearningPathCard
                    icon={Terminal}
                    eyebrow="Delivery path"
                    title="DevOps for Backend"
                    description="Learn the tools that move an application from local code to a reachable and recoverable service."
                    stages={pathStages.devops}
                    completed={devopsDone}
                    total={availableDevOps.length}
                    href={nextDevOps ? `/lab/devops/topics/${nextDevOps.slug}` : "/lab/devops/labs"}
                    action={nextDevOps ? `Continue: ${nextDevOps.title}` : "Practice with a hands-on lab"}
                    accent="success"
                />
                <LearningPathCard
                    icon={Sparkles}
                    eyebrow="Workflow path"
                    title="AI-Assisted Engineering"
                    description="Use AI as a careful engineering partner for research, implementation, testing, review, and documentation."
                    stages={pathStages.ai}
                    href="/ai-engineering"
                    action="Start with practical articles"
                    accent="warning"
                />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link href="/lab/devops/labs" className="group flex min-h-14 items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-4 py-3 transition-colors hover:border-border-strong">
                    <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-success/10 text-success"><FlaskConical size={17} aria-hidden="true" /></span>
                        <span><span className="block text-base font-semibold text-fg">Ready to build?</span><span className="block text-sm text-fg-muted">Open a guided, checkable hands-on lab</span></span>
                    </span>
                    <ArrowRight size={15} className="shrink-0 text-fg-muted transition-transform group-hover:translate-x-1 group-hover:text-brand" aria-hidden="true" />
                </Link>
                <Link href="/lab/backend/roadmap" className="group flex min-h-14 items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-4 py-3 transition-colors hover:border-border-strong">
                    <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand"><BookOpenCheck size={17} aria-hidden="true" /></span>
                        <span><span className="block text-base font-semibold text-fg">Need the full sequence?</span><span className="block text-sm text-fg-muted">See all 13 backend levels and prerequisites</span></span>
                    </span>
                    <ArrowRight size={15} className="shrink-0 text-fg-muted transition-transform group-hover:translate-x-1 group-hover:text-brand" aria-hidden="true" />
                </Link>
            </div>
        </section>
    )
}

function LearningPathCard({
    icon: Icon,
    eyebrow,
    title,
    description,
    stages,
    completed,
    total,
    href,
    action,
    accent,
}: {
    icon: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>
    eyebrow: string
    title: string
    description: string
    stages: string[]
    completed?: number
    total?: number
    href: string
    action: string
    accent: "brand" | "success" | "warning"
}) {
    const accentClasses = {
        brand: "bg-brand/10 text-brand",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
    }[accent]
    const progress = total ? Math.round(((completed ?? 0) / total) * 100) : null

    return (
        <article className="flex h-full flex-col rounded-3xl border border-border bg-gradient-to-b from-surface to-background p-5">
            <div className="flex items-start justify-between gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${accentClasses}`}><Icon size={19} aria-hidden={true} /></span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">{eyebrow}</span>
            </div>
            <h3 className="mt-5 text-2xl font-bold text-fg">{title}</h3>
            <p className="mt-2 text-base leading-6 text-fg-secondary">{description}</p>

            <ol className="mt-5 space-y-2.5">
                {stages.map((stage, index) => (
                    <li key={stage} className="flex items-start gap-2.5 text-base text-fg-secondary">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-[10px] text-fg-muted">{index + 1}</span>
                        {stage}
                    </li>
                ))}
            </ol>

            {progress !== null && (
                <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-fg-muted"><span>Local progress</span><span>{completed}/{total}</span></div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-elevated"><div className="h-full rounded-full bg-brand transition-[width]" style={{ width: `${progress}%` }} /></div>
                </div>
            )}

            <Link href={href} className="group mt-6 flex min-h-11 items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-base font-semibold text-fg transition-colors hover:border-border-strong">
                <span className="line-clamp-1">{action}</span>
                <ArrowRight size={14} className="shrink-0 text-fg-muted transition-transform group-hover:translate-x-1 group-hover:text-brand" aria-hidden="true" />
            </Link>
        </article>
    )
}
