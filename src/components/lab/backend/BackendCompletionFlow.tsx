"use client"

import Link from "next/link"
import { ArrowRight, Map, PartyPopper } from "lucide-react"
import { useBackendProgress } from "@/src/components/lab/backend/BackendProgress"

/**
 * Shown only once the current lesson is marked complete — turns completion
 * into a next action instead of leaving the visitor at a dead end. The
 * static previous/next pagination further down the page still works
 * regardless of completion state; this is the strongest, most obvious action.
 */
export function BackendCompletionFlow({ itemId, next }: { itemId: string; next: { slug: string; title: string } | null }) {
    const progress = useBackendProgress()
    if (!progress.has(itemId)) return null

    return (
        <div className="mb-8 rounded-2xl border border-success/35 bg-success/5 p-5" role="status">
            <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success"><PartyPopper size={17} aria-hidden="true" /></span>
                <div className="min-w-0">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-success">Lesson completed</p>
                    {next ? (
                        <>
                            <p className="mt-1 text-base text-fg-secondary">Next: <span className="font-semibold text-fg">{next.title}</span></p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <Link href={`/lab/backend/${next.slug}`} className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-base font-semibold text-brand-foreground transition-colors hover:bg-brand-hover">
                                    Continue to next lesson <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link href="/lab/backend/roadmap" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-base font-semibold text-fg-secondary transition-colors hover:border-border-strong hover:text-fg">
                                    <Map size={15} aria-hidden="true" /> Return to roadmap
                                </Link>
                            </div>
                        </>
                    ) : (
                        <p className="mt-1 text-base text-fg-secondary">That&apos;s the last published lesson — review the roadmap for what&apos;s next.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
