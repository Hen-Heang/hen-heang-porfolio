"use client"

import Link from "next/link"
import { ArrowRight, PartyPopper } from "lucide-react"
import { useDevOpsProgress } from "@/src/components/lab/devops/DevOpsProgress"

/** Mirrors BackendCompletionFlow — shown once the current topic is marked complete, turning it into a next action. */
export function DevOpsCompletionFlow({ topicSlug, next }: { topicSlug: string; next: { slug: string; title: string } | null }) {
    const progress = useDevOpsProgress()
    if (!progress.has(topicSlug)) return null

    return (
        <div className="mt-8 rounded-2xl border border-success/35 bg-success/5 p-5" role="status">
            <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success"><PartyPopper size={17} aria-hidden="true" /></span>
                <div className="min-w-0">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-success">Topic completed</p>
                    {next ? (
                        <>
                            <p className="mt-1 text-base text-fg-secondary">Next: <span className="font-semibold text-fg">{next.title}</span></p>
                            <Link href={`/lab/devops/topics/${next.slug}`} className="group mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-base font-semibold text-brand-foreground transition-colors hover:bg-brand-hover">
                                Continue to next topic <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </>
                    ) : (
                        <>
                            <p className="mt-1 text-base text-fg-secondary">That&apos;s the last DevOps topic — try applying it in a hands-on lab.</p>
                            <Link href="/lab/devops/labs" className="group mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-base font-semibold text-brand-foreground transition-colors hover:bg-brand-hover">
                                Open hands-on labs <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
