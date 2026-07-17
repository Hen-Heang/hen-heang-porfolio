"use client"

import { useMemo, useSyncExternalStore } from "react"
import { Check, Circle, PartyPopper } from "lucide-react"
import type { LabStep } from "@/src/lib/types/devops-lab"
import { CodeBlock } from "@/src/components/ai-engineering/CodeBlock"

const STORAGE_KEY = "henheang:lab:devops:steps:v1"
const CHANGE_EVENT = "henheang:devops-lab-steps-change"

function languageFor(command: string): string {
    if (command.trimStart().startsWith("FROM ") || command.includes("ENTRYPOINT")) return "dockerfile"
    if (command.trimStart().startsWith("name:") || command.includes("services:") || command.includes("jobs:")) return "yaml"
    if (command.trimStart().startsWith("server {") || command.trimStart().startsWith("location ")) return "nginx"
    return "bash"
}

function subscribe(callback: () => void): () => void {
    window.addEventListener("storage", callback)
    window.addEventListener(CHANGE_EVENT, callback)
    return () => {
        window.removeEventListener("storage", callback)
        window.removeEventListener(CHANGE_EVENT, callback)
    }
}

function getSnapshot(): string {
    return window.localStorage.getItem(STORAGE_KEY) ?? "{}"
}

function getServerSnapshot(): string {
    return "{}"
}

function readLabProgress(serialized: string, labSlug: string): Set<number> {
    try {
        const parsed: unknown = JSON.parse(serialized)
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return new Set<number>()
        const values = (parsed as Record<string, unknown>)[labSlug]
        return new Set(Array.isArray(values) ? values.filter((value): value is number => Number.isInteger(value) && value >= 0) : [])
    } catch {
        return new Set<number>()
    }
}

export function LabStepsProgress({ labSlug, steps }: { labSlug: string; steps: LabStep[] }) {
    const serialized = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
    const completed = useMemo(() => readLabProgress(serialized, labSlug), [labSlug, serialized])
    const completedCount = steps.filter((_, index) => completed.has(index)).length
    const percentage = steps.length ? Math.round((completedCount / steps.length) * 100) : 0

    function toggleStep(index: number) {
        const next = new Set(completed)
        if (next.has(index)) next.delete(index)
        else next.add(index)

        try {
            const parsed = JSON.parse(serialized) as Record<string, unknown>
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsed, [labSlug]: [...next].sort((a, b) => a - b) }))
            window.dispatchEvent(new Event(CHANGE_EVENT))
        } catch {
            try {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ [labSlug]: [...next].sort((a, b) => a - b) }))
                window.dispatchEvent(new Event(CHANGE_EVENT))
            } catch {
                // Keep the lab usable when browser storage is unavailable.
            }
        }
    }

    return (
        <section aria-labelledby="lab-steps-heading">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-brand">Build checklist</p>
                    <h2 id="lab-steps-heading" className="mt-1 text-xl font-bold text-fg">Steps</h2>
                </div>
                <p className="font-mono text-sm text-fg-muted" aria-live="polite">{completedCount} of {steps.length} complete</p>
            </div>

            <div className="mb-6 h-2 overflow-hidden rounded-full bg-surface-elevated" aria-hidden="true">
                <div className="h-full rounded-full bg-brand transition-[width] duration-300" style={{ width: `${percentage}%` }} />
            </div>

            <div className="space-y-4">
                {steps.map((step, index) => {
                    const isComplete = completed.has(index)
                    return (
                        <article
                            key={`${index}-${step.title}`}
                            id={`step-${index + 1}`}
                            className={`scroll-mt-24 rounded-2xl border p-4 transition-colors md:p-5 ${
                                isComplete ? "border-success/35 bg-success/5" : "border-border bg-surface"
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <button
                                    type="button"
                                    onClick={() => toggleStep(index)}
                                    aria-pressed={isComplete}
                                    aria-label={isComplete ? `Mark step ${index + 1} incomplete` : `Mark step ${index + 1} complete`}
                                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                                        isComplete
                                            ? "border-success bg-success text-background"
                                            : "border-border-strong text-fg-muted hover:border-brand hover:text-brand"
                                    }`}
                                >
                                    {isComplete ? <Check size={15} strokeWidth={3} aria-hidden="true" /> : <Circle size={14} aria-hidden="true" />}
                                </button>
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">Step {index + 1}</span>
                                        {isComplete && <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-success">Done</span>}
                                    </div>
                                    <h3 className="mt-1 text-base font-semibold text-fg">{step.title}</h3>
                                    {step.description && <p className="mt-2 text-base leading-relaxed text-fg-secondary">{step.description}</p>}
                                    {step.command && <div className="mt-3"><CodeBlock code={step.command} language={languageFor(step.command)} /></div>}
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>

            {completedCount === steps.length && steps.length > 0 && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-success/35 bg-success/10 p-4 text-success" role="status">
                    <PartyPopper size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                        <p className="text-base font-semibold">Build complete</p>
                        <p className="mt-1 text-base text-fg-secondary">Compare your output with the expected result, then write down one decision or mistake you would handle differently next time.</p>
                    </div>
                </div>
            )}
        </section>
    )
}
