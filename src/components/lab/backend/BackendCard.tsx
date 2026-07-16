import Link from "next/link"
import { ArrowRight, Check, Clock3, LockKeyhole } from "lucide-react"
import type { BackendItemSummary } from "@/src/lib/types/backend-engineering"

const categoryLabels: Record<string, string> = {
    foundations: "Foundations",
    java: "Java",
    http: "Web & HTTP",
    database: "Database",
    spring: "Spring Boot",
    api: "API",
    security: "Security",
    testing: "Testing",
    performance: "Performance",
    "distributed-systems": "Distributed Systems",
    devops: "DevOps",
    observability: "Operations",
    capstone: "Capstone",
}

export function BackendCard({ item, complete = false }: { item: BackendItemSummary; complete?: boolean }) {
    const body = (
        <>
            <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
                    <span className="text-brand">Level {item.level}</span>
                    <span className="text-fg-muted">{categoryLabels[item.category]}</span>
                    <span className="rounded-full border border-border px-2 py-0.5 text-fg-muted">{item.type}</span>
                </div>
                {item.status === "planned" ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-fg-muted">
                        <LockKeyhole size={10} aria-hidden="true" /> planned
                    </span>
                ) : complete ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-success/40 bg-success/10 px-2 py-0.5 font-mono text-[10px] uppercase text-success">
                        <Check size={10} aria-hidden="true" /> complete
                    </span>
                ) : (
                    <ArrowRight size={15} aria-hidden="true" className="text-fg-muted transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                )}
            </div>
            <h3 className="mt-3 text-lg font-semibold text-fg transition-colors group-hover:text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
                {item.technologies.slice(0, 4).map((technology) => (
                    <span key={technology} className="rounded-md bg-background px-2 py-1 font-mono text-[10px] text-fg-secondary">
                        {technology}
                    </span>
                ))}
                {item.estimatedMinutes && (
                    <span className="ml-auto inline-flex items-center gap-1 text-xs text-fg-muted">
                        <Clock3 size={11} aria-hidden="true" /> {item.estimatedMinutes} min
                    </span>
                )}
            </div>
        </>
    )

    if (item.status === "planned") {
        return <article className="rounded-2xl border border-border/70 bg-surface/50 p-5 opacity-80">{body}</article>
    }

    return (
        <Link href={`/lab/backend/${item.slug}`} className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong">
            {body}
        </Link>
    )
}
