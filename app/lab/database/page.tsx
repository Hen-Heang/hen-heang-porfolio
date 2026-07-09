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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#27272a] bg-[#18181b] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#a1a1aa]">
                <Database size={11} aria-hidden="true" className="text-[#22c55e]" />
                ~/lab/database
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-[#fafafa]">Database Engineering</h1>
            <p className="mt-2 max-w-2xl text-sm md:text-base leading-relaxed text-[#a1a1aa]">
                Schema design across PostgreSQL, Supabase, and JPA — tables, migrations, and the decisions behind them.
            </p>

            <div className="mt-10 space-y-8">
                {dbProjects.map((project) => (
                    <section key={project.slug} className="rounded-2xl border border-[#27272a] bg-[#18181b] p-5 md:p-6">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h2 className="text-sm font-semibold text-[#fafafa]">{project.title}</h2>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-[#52525b]">
                                {project.dataModel!.length} tables
                            </span>
                        </div>

                        {project.architectureNote && (
                            <p className="mt-2 max-w-3xl text-xs leading-relaxed text-[#71717a]">{project.architectureNote}</p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.dataModel!.map((table) => (
                                <code
                                    key={table}
                                    className="rounded-md border border-[#27272a] bg-[#0c0c0e] px-2 py-1 font-mono text-[11px] text-[#a1a1aa]"
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
