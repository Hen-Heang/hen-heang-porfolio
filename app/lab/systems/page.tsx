import type { Metadata } from "next"
import Link from "next/link"
import { Network, ArrowUpRight, TriangleAlert, CircleCheck, Lightbulb } from "lucide-react"
import { profileData } from "@/data/profile"
import { systemDesigns } from "@/data/lab/systems"
import { ArchitectureDiagram } from "@/src/components/lab/ui/ArchitectureDiagram"
import { Callout } from "@/src/components/ai-engineering/Callout"
import { Tag } from "@/src/components/ai-engineering/Tag"

export const metadata: Metadata = {
    title: "System Design — Engineering Lab",
    description: "How four production systems are structured — from request to database, and the trade-offs behind each decision.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/systems` },
    openGraph: {
        title: "System Design | Hen Heang",
        description: "How four production systems are structured, and the trade-offs behind each decision.",
        url: `${profileData.portfolioUrl}/lab/systems`,
        type: "website",
    },
}

export default function SystemDesignPage() {
    return (
        <div className="px-4 md:px-8 py-10 max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fg-secondary">
                <Network size={11} aria-hidden="true" className="text-brand" />
                ~/lab/systems
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-fg">System Design</h1>
            <p className="mt-2 max-w-2xl text-base md:text-lg leading-relaxed text-fg-secondary">
                How four production systems are structured — from request to database — and the trade-offs behind each
                architectural decision.
            </p>

            <div className="mt-10 space-y-10">
                {systemDesigns.map((system) => (
                    <section key={system.slug} className="rounded-2xl border border-border bg-surface p-5 md:p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-semibold text-fg">{system.title}</h2>
                                <p className="mt-1 max-w-2xl text-base leading-relaxed text-fg-muted">{system.description}</p>
                            </div>
                            <Link
                                href={`/projects/${system.slug}`}
                                className="flex shrink-0 items-center gap-1 rounded-lg border border-border px-2.5 py-1 font-mono text-xs text-fg-secondary hover:border-border-strong hover:text-fg transition-colors"
                            >
                                case study
                                <ArrowUpRight size={12} aria-hidden="true" />
                            </Link>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {system.technologies.map((t) => (
                                <Tag key={t} label={t} />
                            ))}
                        </div>

                        <ArchitectureDiagram steps={system.steps} />

                        {system.architectureNote && <Callout variant="info" title="Architecture decision" text={system.architectureNote} />}

                        {(system.challenges.length > 0 || system.solutions.length > 0) && (
                            <div className="mt-2 grid gap-4 md:grid-cols-2">
                                {system.challenges.length > 0 && (
                                    <div>
                                        <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
                                            <TriangleAlert size={12} aria-hidden="true" className="text-warning" />
                                            Challenges
                                        </p>
                                        <ul className="space-y-2">
                                            {system.challenges.map((c, i) => (
                                                <li key={i} className="text-sm leading-relaxed text-fg-secondary">
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {system.solutions.length > 0 && (
                                    <div>
                                        <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
                                            <CircleCheck size={12} aria-hidden="true" className="text-success" />
                                            Solutions
                                        </p>
                                        <ul className="space-y-2">
                                            {system.solutions.map((s, i) => (
                                                <li key={i} className="text-sm leading-relaxed text-fg-secondary">
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {system.lessonsLearned.length > 0 && (
                            <div className="mt-5 border-t border-border pt-4">
                                <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
                                    <Lightbulb size={12} aria-hidden="true" className="text-brand" />
                                    Lessons learned
                                </p>
                                <ul className="space-y-1.5">
                                    {system.lessonsLearned.map((l, i) => (
                                        <li key={i} className="text-sm leading-relaxed text-fg-secondary">
                                            {l}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </div>
    )
}
