import Link from "next/link"
import { ArrowRight, Bot, Box, Languages, ServerCog, type LucideIcon } from "lucide-react"
import { progressItems, type ProgressItem } from "@/data/progress"
import { Section } from "@/src/components/system/Section"
import { Button } from "@/src/components/ui/button"
import { MagicCard } from "@/src/components/ui/magic-card"

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

function formatUpdatedAt(value: string): string {
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(
        new Date(`${value}T00:00:00Z`),
    )
}

export function CurrentProgress() {
    return (
        <Section
            id="current-progress"
            eyebrow="In Progress"
            title="What I’m working on"
            description="I’m continuously improving my backend engineering, AI-assisted development, DevOps, and Korean communication skills through practical work."
            className="bg-surface"
        >
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {progressItems.map((item) => {
                    const Icon = ICONS[item.id]

                    return (
                        <MagicCard
                            key={item.id}
                            className="h-full rounded-xl"
                            gradientFrom="#2dd4bf"
                            gradientTo="#38bdf8"
                            gradientOpacity={0.12}
                        >
                            <article className="flex h-full min-h-[23rem] flex-col p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-brand">
                                        <Icon size={18} aria-hidden />
                                    </span>
                                    <span
                                        className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] ${STATUS_CLASSES[item.status]}`}
                                    >
                                        {item.statusLabel}
                                    </span>
                                </div>

                                <h3 className="mt-6 text-lg font-semibold tracking-tight text-fg">{item.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{item.description}</p>

                                <div className="mt-5 border-t border-border pt-4">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">Current focus</p>
                                    <p className="mt-2 text-sm font-medium leading-relaxed text-fg">{item.currentFocus}</p>
                                </div>

                                <div className="mt-auto pt-5">
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.technologies.slice(0, 3).map((technology) => (
                                            <span
                                                key={technology}
                                                className="rounded-md border border-border bg-background px-2 py-1 font-mono text-[10px] text-fg-muted"
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                    </div>
                                    <time
                                        dateTime={item.updatedAt}
                                        className="mt-4 block font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted"
                                    >
                                        Updated {formatUpdatedAt(item.updatedAt)}
                                    </time>
                                </div>
                            </article>
                        </MagicCard>
                    )
                })}
            </div>

            <div className="mt-10">
                <Button asChild className="bg-brand text-brand-foreground hover:bg-brand-hover">
                    <Link href="/journey">
                        View my journey
                        <ArrowRight aria-hidden />
                    </Link>
                </Button>
            </div>
        </Section>
    )
}
