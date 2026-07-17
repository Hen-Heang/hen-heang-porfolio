import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, CheckCircle2, Clock3, GitBranch, Layers3 } from "lucide-react"
import type { BackendAdjacentItems } from "@/src/lib/backend/navigation"
import type { BackendKnowledgeItem, BackendPublishedItem } from "@/src/lib/types/backend-engineering"
import { BackendChecklistContent, BackendInterviewContent, BackendLabContent, BackendNarrativeContent, BackendRelatedLinks, BackendSources } from "@/src/components/lab/backend/BackendContentRenderer"
import { BackendProgressButton } from "@/src/components/lab/backend/BackendProgress"
import { OnPageNav } from "@/src/components/lab/ui/OnPageNav"

export function BackendDetail({ item, prerequisites, related, adjacent }: { item: BackendPublishedItem; prerequisites: BackendKnowledgeItem[]; related: BackendKnowledgeItem[]; adjacent: BackendAdjacentItems }) {
    const sections = item.type === "lab" ? item.overview : item.type === "checklist" || item.type === "interview" ? [] : item.sections

    return (
        <article className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-10">
            <Link href="/lab/backend" className="inline-flex items-center gap-1.5 text-base text-fg-muted transition-colors hover:text-fg"><ArrowLeft size={14} aria-hidden="true" /> Backend Engineering</Link>
            <header className="mt-6 border-b border-border pb-8">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg-muted">
                    <span className="text-brand">Level {item.level}</span><span>·</span><span>{item.category.replaceAll("-", " ")}</span><span>·</span><span>{item.type}</span><span>·</span><span>{item.difficulty}</span>
                </div>
                <h1 className="mt-4 text-2xl md:text-4xl font-bold leading-tight tracking-tight text-fg">{item.title}</h1>
                <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-fg-secondary">{item.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-fg-muted">
                    {item.estimatedMinutes && <span className="inline-flex items-center gap-1.5"><Clock3 size={13} aria-hidden="true" /> {item.estimatedMinutes} minutes</span>}
                    <span className="inline-flex items-center gap-1.5"><Layers3 size={13} aria-hidden="true" /> {item.versionScope}</span>
                    <span className="inline-flex items-center gap-1.5"><GitBranch size={13} aria-hidden="true" /> Updated {item.updatedAt}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">{item.technologies.map((technology) => <span key={technology} className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-[11px] text-fg-secondary">{technology}</span>)}</div>
            </header>

            <div className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_240px]">
                <div className="min-w-0">
                    <section id="learning-objectives" aria-labelledby="objectives-heading" className="mb-8 scroll-mt-24 rounded-2xl border border-brand/30 bg-brand/5 p-5">
                        <h2 id="objectives-heading" className="font-mono text-sm font-semibold uppercase tracking-wider text-brand">Learning objectives</h2>
                        <ul className="mt-3 space-y-2">{item.learningObjectives.map((objective) => <li key={objective} className="flex items-start gap-2 text-base leading-6 text-fg-secondary"><CheckCircle2 size={14} className="mt-1 shrink-0 text-brand" aria-hidden="true" />{objective}</li>)}</ul>
                    </section>

                    {item.type === "lab" ? <BackendLabContent item={item} /> : item.type === "checklist" ? <BackendChecklistContent item={item} /> : item.type === "interview" ? <BackendInterviewContent item={item} /> : <BackendNarrativeContent item={item} />}
                    <section id="knowledge-check" aria-labelledby="knowledge-check-heading" className="my-10 scroll-mt-24 rounded-2xl border border-warning/30 bg-warning/5 p-5">
                        <div className="flex items-start gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning"><Brain size={17} aria-hidden="true" /></span>
                            <div>
                                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-warning">Retrieval check</p>
                                <h2 id="knowledge-check-heading" className="mt-1 text-xl font-bold text-fg">Before you continue</h2>
                            </div>
                        </div>
                        <ul className="mt-4 space-y-2 text-base leading-6 text-fg-secondary">
                            <li>Explain the main idea in your own words without rereading the page.</li>
                            <li>Name one production problem this knowledge helps prevent.</li>
                            <li>Describe where you would apply it in a Spring Boot project.</li>
                        </ul>
                        <div className="mt-5"><BackendProgressButton itemId={item.id} /></div>
                    </section>
                    <BackendSources sources={item.sources} />
                    <BackendRelatedLinks items={related} />
                </div>

                <aside className="order-first lg:order-last">
                    <div className="space-y-5 lg:sticky lg:top-20">
                        <div className="rounded-2xl border border-border bg-surface p-4">
                            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">Prerequisites</p>
                            {prerequisites.length ? <ul className="mt-3 space-y-2">{prerequisites.map((prerequisite) => <li key={prerequisite.id}><Link href={prerequisite.status === "published" ? `/lab/backend/${prerequisite.slug}` : "/lab/backend/roadmap"} className="text-base leading-5 text-fg-secondary hover:text-fg">{prerequisite.title}</Link></li>)}</ul> : <p className="mt-2 text-base text-fg-muted">Start here; no published prerequisite.</p>}
                        </div>
                        <OnPageNav sections={[{ id: "learning-objectives", title: "Learning objectives" }, ...sections.map((section) => ({ id: section.id, title: section.title })), { id: "knowledge-check", title: "Knowledge check" }]} />
                    </div>
                </aside>
            </div>

            <nav aria-label="Backend curriculum pagination" className="grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
                {adjacent.previous ? <Link href={`/lab/backend/${adjacent.previous.slug}`} className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"><span className="inline-flex items-center gap-1 text-sm text-fg-muted"><ArrowLeft size={12} aria-hidden="true" /> Previous</span><p className="mt-1 text-base font-semibold text-fg">{adjacent.previous.title}</p></Link> : <span />}
                {adjacent.next && <Link href={`/lab/backend/${adjacent.next.slug}`} className="rounded-xl border border-border bg-surface p-4 text-right transition-colors hover:border-border-strong"><span className="inline-flex items-center gap-1 text-sm text-fg-muted">Next <ArrowRight size={12} aria-hidden="true" /></span><p className="mt-1 text-base font-semibold text-fg">{adjacent.next.title}</p></Link>}
            </nav>
        </article>
    )
}
