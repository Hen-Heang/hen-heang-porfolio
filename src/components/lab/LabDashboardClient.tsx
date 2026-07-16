"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    Search,
    Sparkles,
    Terminal,
    ArrowRight,
    ArrowUpRight,
    MessageSquareCode,
    FileCode2,
    FlaskConical,
    BookOpen,
    ScrollText,
    Quote,
} from "lucide-react"
import type { EngineeringLabSearchItem } from "@/src/lib/types/engineering-lab"
import type { SystemStatusEntry } from "@/data/lab/overview"
import { Tag } from "@/src/components/ai-engineering/Tag"
import { StatusIndicator } from "@/src/components/lab/ui/StatusIndicator"
import { MetricCard } from "@/src/components/lab/ui/MetricCard"
import { TechCard } from "@/src/components/lab/ui/TechCard"
import { Terminal as TerminalPanel } from "@/src/components/lab/ui/Terminal"
import { ArchitectureDiagramCompact, stepsFromLabels } from "@/src/components/lab/ui/ArchitectureDiagram"

export interface LabMetric {
    label: string
    value: number
    suffix?: string
}

export interface FeaturedWork {
    slug: string
    title: string
    description: string
    architecture: string[]
}

interface LabDashboardClientProps {
    items: EngineeringLabSearchItem[]
    metrics: LabMetric[]
    featured: FeaturedWork[]
    systemStatus: SystemStatusEntry[]
    currentFocus: string[]
    philosophy: string
}

const browseLinks = [
    { href: "/lab/backend", icon: BookOpen, label: "Roadmap & Curriculum", group: "Backend Engineering" },
    { href: "/ai-engineering", icon: Sparkles, label: "AI Articles", group: "AI Engineering" },
    { href: "/ai-engineering/prompts", icon: MessageSquareCode, label: "Prompt Library", group: "AI Engineering" },
    { href: "/ai-engineering/snippets", icon: FileCode2, label: "Code Snippets", group: "AI Engineering" },
    { href: "/lab/devops", icon: Terminal, label: "Roadmap & Topics", group: "DevOps" },
    { href: "/lab/devops/labs", icon: FlaskConical, label: "Hands-on Labs", group: "DevOps" },
    { href: "/lab/devops/commands", icon: ScrollText, label: "Commands", group: "DevOps" },
    { href: "/lab/devops/infrastructure", icon: BookOpen, label: "Infrastructure", group: "DevOps" },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-fg-muted">{children}</h2>
}

export function LabDashboardClient({ items, metrics, featured, systemStatus, currentFocus, philosophy }: LabDashboardClientProps) {
    const [query, setQuery] = useState("")

    const coreStack = useMemo(() => {
        const seen = new Set<string>()
        const stack: { name: string; category: string }[] = []
        for (const entry of systemStatus) {
            for (const tech of entry.tech.split("·").map((t) => t.trim())) {
                if (seen.has(tech)) continue
                seen.add(tech)
                stack.push({ name: tech, category: entry.area })
            }
        }
        return stack
    }, [systemStatus])

    const results = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return []
        return items
            .filter(
                (item) =>
                    item.title.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q) ||
                    item.tags.some((t) => t.toLowerCase().includes(q))
            )
            .slice(0, 24)
    }, [items, query])

    return (
        <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
            {/* Hero */}
            <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mb-10"
            >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-fg-secondary">
                    <Terminal size={11} aria-hidden="true" className="text-brand" />
                    ~/lab — engineering workspace
                </span>
                <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-fg">Engineering Lab</h1>
                <p className="mt-2 max-w-2xl text-base md:text-lg leading-relaxed text-fg-secondary">
                    Exploring backend systems, architecture, AI engineering, and modern software development practices —
                    how I design, build, test, and operate software.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 font-mono text-xs uppercase tracking-wider text-fg-muted">Current focus</span>
                    {currentFocus.map((f) => (
                        <span key={f} className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-xs text-fg-secondary">
                            {f}
                        </span>
                    ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href="/lab/backend"
                        className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand transition-colors"
                    >
                        Explore Backend Engineering
                        <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    <Link
                        href="/ai-engineering"
                        className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-fg hover:border-border-strong transition-colors"
                    >
                        AI Engineering
                        <Sparkles size={14} aria-hidden="true" className="text-brand" />
                    </Link>
                </div>

                <div className="mt-6 max-w-lg">
                    <TerminalPanel
                        title="~/lab — whoami"
                        lines={[
                            { type: "command", text: "whoami" },
                            { type: "output", text: "Hen Heang — backend-leaning full-stack engineer" },
                            { type: "command", text: "cat focus.txt" },
                            { type: "output", text: currentFocus.join(", ") },
                            { type: "command", text: "status" },
                            { type: "success", text: "● online — always building" },
                        ]}
                    />
                </div>
            </motion.section>

            {/* Search */}
            <div className="relative mb-10 max-w-xl">
                <Search size={16} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search everything — Docker, JWT, MyBatis, CI/CD..."
                    aria-label="Search Engineering Lab"
                    className="w-full rounded-2xl border border-border bg-surface py-3 pl-11 pr-4 text-sm text-fg placeholder:text-fg-muted outline-none focus:border-brand transition-colors"
                />
            </div>

            <AnimatePresence mode="wait">
                {query.trim() ? (
                    <motion.section key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-14">
                        <p className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-fg-muted">
                            {results.length} result{results.length === 1 ? "" : "s"}
                        </p>
                        {results.length === 0 ? (
                            <div className="py-16 text-center text-sm text-fg-muted">Nothing matches yet — try a different term.</div>
                        ) : (
                            <div className="grid sm:grid-cols-2 gap-3">
                                {results.map((item, i) => (
                                    <Link
                                        key={`${item.href}-${item.title}-${i}`}
                                        href={item.href}
                                        className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-4 hover:border-border-strong transition-colors"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span
                                                className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${
                                                    item.source === "AI Engineering" ? "text-brand" : "text-success"
                                                }`}
                                            >
                                                {item.source} · {item.type}
                                            </span>
                                            <ArrowRight size={13} aria-hidden="true" className="shrink-0 text-border-strong group-hover:text-brand group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <h3 className="text-base font-semibold text-fg group-hover:text-white">{item.title}</h3>
                                        <p className="text-sm leading-relaxed text-fg-muted line-clamp-2">{item.description}</p>
                                        {item.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.tags.slice(0, 3).map((t) => (
                                                    <Tag key={t} label={t} />
                                                ))}
                                            </div>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </motion.section>
                ) : (
                    <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {/* System status */}
                        <section className="mb-12">
                            <SectionTitle>System status</SectionTitle>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {systemStatus.map((entry) => (
                                    <div key={entry.area} className="rounded-2xl border border-border bg-surface p-4">
                                        <div className="mb-2 flex items-center justify-between gap-2">
                                            <p className="text-base font-semibold text-fg">{entry.area}</p>
                                            <StatusIndicator status={entry.status} />
                                        </div>
                                        <p className="mb-2 font-mono text-xs text-brand">{entry.tech}</p>
                                        <p className="text-sm leading-relaxed text-fg-muted">{entry.detail}</p>
                                    </div>
                                ))}

                                {/* Philosophy card fills the grid */}
                                <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-[#131316] p-4">
                                    <div className="mb-2 flex items-center gap-2">
                                        <Quote size={13} aria-hidden="true" className="text-brand" />
                                        <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Engineering philosophy</p>
                                    </div>
                                    <p className="text-sm leading-relaxed text-fg-secondary">{philosophy}</p>
                                </div>
                            </div>
                        </section>

                        {/* Metrics */}
                        <section className="mb-12">
                            <SectionTitle>Lab metrics</SectionTitle>
                            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                                {metrics.map((m) => (
                                    <MetricCard key={m.label} label={m.label} value={m.value} suffix={m.suffix} />
                                ))}
                            </div>
                        </section>

                        {/* Core stack */}
                        <section className="mb-12">
                            <SectionTitle>Core stack</SectionTitle>
                            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                                {coreStack.map((tech) => (
                                    <TechCard key={tech.name} name={tech.name} category={tech.category} />
                                ))}
                            </div>
                        </section>

                        {/* Featured engineering work */}
                        <section className="mb-12">
                            <div className="mb-4 flex items-center justify-between">
                                <SectionTitle>Featured engineering work</SectionTitle>
                                <Link
                                    href="/projects"
                                    className="flex items-center gap-1 font-mono text-xs text-fg-muted hover:text-fg transition-colors"
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
                                            <h3 className="text-base font-semibold text-fg group-hover:text-white">{work.title}</h3>
                                            <ArrowUpRight size={14} aria-hidden="true" className="shrink-0 text-border-strong group-hover:text-brand transition-colors" />
                                        </div>
                                        <p className="mb-3 text-sm leading-relaxed text-fg-muted line-clamp-2">{work.description}</p>
                                        <ArchitectureDiagramCompact steps={stepsFromLabels(work.architecture.slice(0, 4))} />
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Browse the lab */}
                        <section className="mb-6">
                            <SectionTitle>Browse the lab</SectionTitle>
                            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                                {browseLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="group flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-3 hover:border-border-strong transition-colors"
                                    >
                                        <link.icon size={15} aria-hidden="true" className={link.group === "AI Engineering" ? "text-brand" : "text-success"} />
                                        <span className="min-w-0">
                                            <span className="block truncate text-sm font-medium text-fg">{link.label}</span>
                                            <span className="block font-mono text-[10px] uppercase tracking-wider text-fg-muted">{link.group}</span>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
