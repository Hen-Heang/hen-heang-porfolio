import type { Metadata } from "next"
import { Braces } from "lucide-react"
import { profileData } from "@/data/profile"
import { projects } from "@/data/projects"
import type { ApiEndpoint } from "@/src/lib/types"

export const metadata: Metadata = {
    title: "API Design — Engineering Lab",
    description: "Endpoint conventions, auth flows, and response shapes across four Spring Boot and Next.js APIs.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/api` },
    openGraph: {
        title: "API Design | Hen Heang",
        description: "Endpoint conventions, auth flows, and response shapes across four Spring Boot and Next.js APIs.",
        url: `${profileData.portfolioUrl}/lab/api`,
        type: "website",
    },
}

const METHOD_COLOR: Record<ApiEndpoint["method"], string> = {
    GET: "text-success border-success/30 bg-success/5",
    POST: "text-brand border-brand/30 bg-brand/5",
    PUT: "text-warning border-warning/30 bg-warning/5",
    PATCH: "text-warning border-warning/30 bg-warning/5",
    DELETE: "text-error border-error/30 bg-error/5",
}

export default function ApiDesignPage() {
    const apiProjects = projects.filter((p) => (p.apiEndpoints?.length ?? 0) > 0)

    return (
        <div className="px-4 md:px-8 py-10 max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fg-secondary">
                <Braces size={11} aria-hidden="true" className="text-brand" />
                ~/lab/api
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-fg">API Design</h1>
            <p className="mt-2 max-w-2xl text-base md:text-lg leading-relaxed text-fg-secondary">
                Endpoint conventions, auth flows, and response shapes — sampled from the REST APIs behind each project.
            </p>

            <div className="mt-10 space-y-8">
                {apiProjects.map((project) => (
                    <section key={project.slug} className="rounded-2xl border border-border bg-surface p-5 md:p-6">
                        <h2 className="text-base font-semibold text-fg">{project.title}</h2>
                        <div className="mt-4 space-y-2">
                            {project.apiEndpoints!.map((ep, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col gap-2 rounded-xl border border-border bg-surface-code px-4 py-3 sm:flex-row sm:items-center"
                                >
                                    <div className="flex items-center gap-2.5 sm:w-[300px] sm:shrink-0">
                                        <span
                                            className={`rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold ${METHOD_COLOR[ep.method]}`}
                                        >
                                            {ep.method}
                                        </span>
                                        <code className="truncate font-mono text-sm text-surface-code-foreground">{ep.path}</code>
                                    </div>
                                    <p className="text-sm leading-relaxed text-surface-code-foreground/70">{ep.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}
