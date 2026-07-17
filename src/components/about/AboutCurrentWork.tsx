import Link from "next/link"
import { ArrowRight, Bot, Box, Languages, ServerCog, type LucideIcon } from "lucide-react"
import { activeProjects, progressItems, type ProgressItem } from "@/data/progress"
import { Section } from "@/src/components/system/Section"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"

const ICONS: Record<ProgressItem["id"], LucideIcon> = {
    backend: ServerCog,
    devops: Box,
    ai: Bot,
    korean: Languages,
}

const STATUS_CLASSES: Record<ProgressItem["status"], string> = {
    Building: "border-brand/25 bg-brand/10 text-brand",
    Learning: "border-warning/25 bg-warning/10 text-warning",
    Practicing: "border-success/25 bg-success/10 text-success",
    Completed: "border-success/25 bg-success/10 text-success",
}

export function AboutCurrentWork() {
    return (
        <Section
            id="about-current-work"
            eyebrow="In Progress"
            title="What I’m Working On"
            description="I’m continuously improving my backend engineering, AI-assisted development, DevOps, and Korean communication skills while building practical projects."
            className="bg-surface"
        >
            <div className="grid gap-5 lg:grid-cols-2">
                {progressItems.map((item) => {
                    const Icon = ICONS[item.id]

                    return (
                        <article key={item.id}>
                            <Card className="h-full border-border bg-background shadow-none hover:shadow-none">
                                <CardHeader className="p-6 pb-0">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand">
                                            <Icon size={18} aria-hidden />
                                        </span>
                                        <span
                                            className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] ${STATUS_CLASSES[item.status]}`}
                                        >
                                            {item.statusLabel}
                                        </span>
                                    </div>
                                    <div className="pt-4">
                                        <h3 className="text-xl font-semibold tracking-tight text-fg">{item.title}</h3>
                                        <p className="mt-1 font-mono text-xs text-brand">{item.subtitle}</p>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6 pt-4">
                                    <p className="text-sm leading-relaxed text-fg-secondary">{item.description}</p>

                                    <div className="mt-5 border-t border-border pt-4">
                                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
                                            Current focus
                                        </p>
                                        <p className="mt-2 text-sm font-medium leading-relaxed text-fg">{item.currentFocus}</p>
                                    </div>

                                    <div className="mt-5 flex flex-wrap gap-1.5">
                                        {item.technologies.map((technology) => (
                                            <span
                                                key={technology}
                                                className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-[10px] text-fg-muted"
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </article>
                    )
                })}
            </div>

            <div className="mt-16 border-t border-border pt-12">
                <div className="max-w-2xl">
                    <p className="font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-brand">
                        Active Projects
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                        Building while I learn
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-secondary sm:text-base">
                        Practical products where I apply backend engineering, AI workflows, Korean learning, and steady iteration.
                    </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {activeProjects.map((project) => (
                        <Link key={project.id} href={project.href} className="group block h-full">
                            <Card className="h-full border-border bg-background shadow-none transition-colors hover:border-border-strong hover:shadow-none">
                                <CardHeader className="p-5 sm:p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <h4 className="text-lg font-semibold tracking-tight text-fg transition-colors group-hover:text-brand">
                                            {project.name}
                                        </h4>
                                        <span className="shrink-0 rounded-full border border-brand/20 bg-brand/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-brand">
                                            {project.status}
                                        </span>
                                    </div>
                                    <p className="pt-2 text-sm leading-relaxed text-fg-secondary">{project.description}</p>
                                    <span className="inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-fg transition-colors group-hover:text-brand">
                                        View project
                                        <ArrowRight
                                            size={15}
                                            className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                                            aria-hidden
                                        />
                                    </span>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>

                <Link
                    href="/journey"
                    className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-brand"
                >
                    View the full milestone journey
                    <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                        aria-hidden
                    />
                </Link>
            </div>
        </Section>
    )
}
