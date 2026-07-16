import Link from "next/link"
import { ArrowRight, BookOpen, CheckCircle2, CircleDot, ExternalLink, FlaskConical, LockKeyhole, ShieldCheck, Target } from "lucide-react"
import type { BackendKnowledgeItem, BackendRoadmapLevel } from "@/src/lib/types/backend-engineering"

export function BackendRoadmap({ levels, relatedByLevel }: { levels: BackendRoadmapLevel[]; relatedByLevel: Map<number, BackendKnowledgeItem[]> }) {
    return (
        <div>
            <div className="mb-8 overflow-x-auto pb-2" aria-label="Backend roadmap level sequence">
                <ol className="flex min-w-max items-center gap-2">
                    {levels.map((level, index) => (
                        <li key={level.level} className="flex items-center gap-2">
                            <a href={`#level-${level.level}`} className="flex h-10 min-w-10 items-center justify-center rounded-full border border-border bg-surface font-mono text-xs font-bold text-fg-secondary transition-colors hover:border-brand hover:text-brand" aria-label={`Jump to Level ${level.level}: ${level.title}`}>{level.level}</a>
                            {index < levels.length - 1 && <ArrowRight size={13} aria-hidden="true" className="text-border-strong" />}
                        </li>
                    ))}
                </ol>
            </div>

            <div className="space-y-5">
                {levels.map((level) => {
                    const related = relatedByLevel.get(level.level) ?? []
                    return (
                        <section key={level.level} id={`level-${level.level}`} className="scroll-mt-24 rounded-2xl border border-border bg-surface p-5 md:p-7">
                            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                <div className="max-w-3xl">
                                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">Level {level.level}</span>
                                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-fg md:text-3xl">{level.title}</h2>
                                    <p className="mt-3 text-sm leading-7 text-fg-secondary">{level.summary}</p>
                                </div>
                                <div className="flex shrink-0 flex-wrap gap-2 lg:max-w-72 lg:justify-end">
                                    {related.map((item) => item.status === "published" ? (
                                        <Link key={item.id} href={`/lab/backend/${item.slug}`} className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/5 px-2.5 py-1 font-mono text-[10px] uppercase text-success"><CheckCircle2 size={10} aria-hidden="true" /> {item.title}</Link>
                                    ) : (
                                        <span key={item.id} className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase text-fg-muted"><LockKeyhole size={9} aria-hidden="true" /> planned</span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 grid gap-5 md:grid-cols-2">
                                <RoadmapList icon={Target} title="Learning goals" items={level.learningGoals} />
                                <RoadmapList icon={CircleDot} title="Prerequisites" items={level.requiredPrerequisites} />
                                <RoadmapList icon={BookOpen} title="Core concepts" items={level.coreConcepts} />
                                <RoadmapList icon={FlaskConical} title="Hands-on labs" items={level.handsOnLabs} />
                            </div>

                            <details className="mt-6 rounded-xl border border-border bg-background p-4">
                                <summary className="cursor-pointer list-none text-sm font-semibold text-fg marker:content-none">Review examples, mistakes, interview prompts, and production concerns</summary>
                                <div className="mt-5 grid gap-5 md:grid-cols-2">
                                    <RoadmapList icon={CircleDot} title="Practical examples" items={level.practicalExamples} />
                                    <RoadmapList icon={CircleDot} title="Common mistakes" items={level.commonMistakes} />
                                    <RoadmapList icon={CircleDot} title="Interview questions" items={level.interviewQuestions} />
                                    <RoadmapList icon={ShieldCheck} title="Production considerations" items={level.productionConsiderations} />
                                </div>
                                <div className="mt-5 border-t border-border pt-4">
                                    <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-fg-muted">Primary references</p>
                                    <div className="mt-2 flex flex-wrap gap-2">{level.references.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-fg-muted hover:text-fg">{source.publisher}: {source.title}<ExternalLink size={10} aria-hidden="true" /></a>)}</div>
                                </div>
                            </details>
                        </section>
                    )
                })}
            </div>
        </div>
    )
}

function RoadmapList({ icon: Icon, title, items }: { icon: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>; title: string; items: string[] }) {
    return (
        <div>
            <h3 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-fg-muted"><Icon size={13} className="text-brand" />{title}</h3>
            <ul className="mt-3 space-y-2">{items.map((item) => <li key={item} className="text-sm leading-6 text-fg-secondary">{item}</li>)}</ul>
        </div>
    )
}
