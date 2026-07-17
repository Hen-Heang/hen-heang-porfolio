import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ArchitectureDiagramCompact, stepsFromLabels } from "@/src/components/lab/ui/ArchitectureDiagram"
import type { FeaturedWork } from "@/src/lib/types/engineering-lab"

/** Real, practical entry points into the lab — shown before any dashboard-style metrics. */
export function LabFeaturedWork({ featured }: { featured: FeaturedWork[] }) {
    if (featured.length === 0) return null

    return (
        <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-mono text-base font-semibold uppercase tracking-wider text-fg-muted">Featured engineering work</h2>
                <Link
                    href="/projects"
                    className="flex items-center gap-1 font-mono text-sm text-fg-muted hover:text-fg transition-colors"
                >
                    all projects
                    <ArrowUpRight size={12} aria-hidden="true" />
                </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
                {featured.map((work) => (
                    <Link
                        key={work.slug}
                        href={`/projects/${work.slug}`}
                        className="group rounded-2xl border border-border bg-surface p-5 hover:border-border-strong transition-colors"
                    >
                        <div className="mb-2 flex items-start justify-between gap-3">
                            <h3 className="text-lg font-semibold text-fg">{work.title}</h3>
                            <ArrowUpRight size={14} aria-hidden="true" className="shrink-0 text-border-strong group-hover:text-brand transition-colors" />
                        </div>
                        <p className="mb-3 text-base leading-relaxed text-fg-secondary line-clamp-2">{work.description}</p>
                        <ArchitectureDiagramCompact steps={stepsFromLabels(work.architecture.slice(0, 4))} />
                    </Link>
                ))}
            </div>
        </section>
    )
}
