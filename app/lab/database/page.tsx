import type { Metadata } from "next"
import { Database } from "lucide-react"
import { profileData } from "@/data/profile"
import { projects } from "@/data/projects"

export const metadata: Metadata = {
    title: "Database Engineering — Engineering Lab",
    description: "Schema design across PostgreSQL, Supabase, and JPA — tables, migrations, and the decisions behind them.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/database` },
    openGraph: {
        title: "Database Engineering | Hen Heang",
        description: "Schema design across PostgreSQL, Supabase, and JPA — tables, migrations, and the decisions behind them.",
        url: `${profileData.portfolioUrl}/lab/database`,
        type: "website",
    },
}

export default function DatabasePage() {
    const dbProjects = projects.filter((p) => (p.dataModel?.length ?? 0) > 0)

    return (
        <div className="px-4 md:px-8 py-10 max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-fg-secondary">
                <Database size={11} aria-hidden="true" className="text-success" />
                ~/lab/database
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-fg">Database Engineering</h1>
            <p className="mt-2 max-w-2xl text-sm md:text-base leading-relaxed text-fg-secondary">
                Schema design across PostgreSQL, Supabase, and JPA — tables, migrations, and the decisions behind them.
            </p>

            <div className="mt-10 space-y-8">
                {dbProjects.map((project) => (
                    <section key={project.slug} className="rounded-2xl border border-border bg-surface p-5 md:p-6">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h2 className="text-sm font-semibold text-fg">{project.title}</h2>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                                {project.dataModel!.length} tables
                            </span>
                        </div>

                        {project.architectureNote && (
                            <p className="mt-2 max-w-3xl text-xs leading-relaxed text-fg-muted">{project.architectureNote}</p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.dataModel!.map((table) => (
                                <code
                                    key={table}
                                    className="rounded-md border border-border bg-[#0c0c0e] px-2 py-1 font-mono text-[11px] text-fg-secondary"
                                >
                                    {table}
                                </code>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}
