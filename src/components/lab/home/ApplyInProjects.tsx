import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export interface AppliedProject {
    slug: string
    title: string
    description: string
    /** Short topic labels for what the project actually demonstrates (Project.engineeringFocus) — not the full tech stack. */
    conceptsDemonstrated: string[]
}

/**
 * "Apply what you learn" — one or two real projects that put the paths above
 * into practice. Deliberately capped to avoid competing with the
 * learning-path actions above it for attention.
 */
export function ApplyInProjects({ projects }: { projects: AppliedProject[] }) {
    if (projects.length === 0) return null

    return (
        <section className="mb-10" aria-labelledby="apply-projects-heading">
            <div className="mb-4 flex items-center justify-between">
                <h2 id="apply-projects-heading" className="text-xl font-bold tracking-tight text-fg">Apply what you learn</h2>
                <Link href="/projects" className="flex items-center gap-1 font-mono text-sm text-fg-muted transition-colors hover:text-fg">
                    all projects <ArrowUpRight size={12} aria-hidden="true" />
                </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
                {projects.map((project) => (
                    <Link key={project.slug} href={`/projects/${project.slug}`} className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong">
                        <div className="mb-2 flex items-start justify-between gap-3">
                            <h3 className="text-lg font-semibold text-fg">{project.title}</h3>
                            <ArrowUpRight size={14} aria-hidden="true" className="shrink-0 text-border-strong transition-colors group-hover:text-brand" />
                        </div>
                        <p className="mb-3 text-base leading-relaxed text-fg-secondary line-clamp-2">{project.description}</p>
                        {project.conceptsDemonstrated.length > 0 && (
                            <>
                                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">Concepts demonstrated</p>
                                <p className="mt-1 text-sm text-fg-secondary">{project.conceptsDemonstrated.join(" · ")}</p>
                            </>
                        )}
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">View engineering case study</span>
                    </Link>
                ))}
            </div>
        </section>
    )
}
