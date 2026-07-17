"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Terminal, FlaskConical, BookOpen, ArrowRight, ArrowLeft } from "lucide-react"
import type { RoadmapTopic } from "@/src/lib/types/devops-lab"
import { Roadmap } from "@/src/components/lab/devops/Roadmap"
import { DiagramViewer } from "@/src/components/lab/devops/DiagramViewer"
import { deploymentPipelineDiagram, requestFlowDiagram } from "@/data/lab/devops/diagrams"
import { NumberTicker } from "@/src/components/ui/NumberTicker"

const quickLinks = [
    { href: "/lab/devops/labs", icon: FlaskConical, title: "Hands-on Labs", description: "Dockerize an app, wire up Nginx, ship a CI/CD pipeline" },
    { href: "/lab/devops/commands", icon: Terminal, title: "Command Reference", description: "Searchable Git, Docker, Maven, and PostgreSQL commands" },
    { href: "/lab/devops/infrastructure", icon: BookOpen, title: "Backend Infrastructure", description: "Reverse proxy, load balancer, caching, health checks — explained" },
]

export function DevOpsLabHubClient({ topics }: { topics: RoadmapTopic[] }) {
    const cardsAvailable = topics.filter((t) => t.hasCard).length

    return (
        <div className="px-4 md:px-8 py-10 max-w-6xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-fg-muted">
                <Link href="/lab" className="hover:text-fg transition-colors">
                    Engineering Lab
                </Link>
                <span>/</span>
                <span className="text-fg-secondary">DevOps Basics</span>
            </nav>

            {/* Hero */}
            <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative mb-14 overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 md:px-12 md:py-20 text-center"
            >
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-success/20 blur-[100px]" />
                    <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-brand/10 blur-[100px]" />
                </div>

                <span className="relative inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-fg-secondary">
                    <Terminal size={11} className="text-success" />
                    Engineering Lab
                </span>

                <h1 className="relative mt-5 text-4xl md:text-5xl font-bold tracking-tight text-fg">
                    DevOps for Backend Developers
                </h1>
                <p className="relative mt-3 text-lg md:text-xl leading-relaxed text-fg-secondary">
                    Learning how modern backend applications are built, deployed, monitored, and maintained.
                </p>
                <p className="relative mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-fg-muted">
                    I&apos;m a backend developer, not a DevOps engineer — but understanding the software delivery
                    lifecycle is what turns &quot;the code works&quot; into &quot;the service is live, reachable, and
                    recoverable.&quot; This is what I&apos;ve learned about Docker, CI/CD, reverse proxies, and deployment,
                    focused on what a Java/Spring Boot and Next.js stack actually needs.
                </p>

                <div className="relative mt-8 flex justify-center gap-8">
                    {[
                        { label: "Topics", value: topics.length },
                        { label: "With Full Guides", value: cardsAvailable },
                        { label: "Hands-on Labs", value: 4 },
                    ].map((s) => (
                        <div key={s.label} className="text-center">
                            <p className="text-2xl font-bold text-fg">
                                <NumberTicker value={s.value} />
                            </p>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-fg-muted">{s.label}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Quick links */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
                {quickLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface px-5 py-4 hover:border-border-strong transition-colors"
                    >
                        <link.icon size={18} className="text-success" />
                        <div>
                            <p className="text-base font-semibold text-fg">{link.title}</p>
                            <p className="text-sm text-fg-muted">{link.description}</p>
                        </div>
                    </Link>
                ))}
            </motion.div>

            {/* Roadmap */}
            <section className="mb-14">
                <h2 className="mb-1 text-xl font-bold text-fg">Learning Roadmap</h2>
                <p className="mb-5 text-sm text-fg-muted">Track what you&apos;ve learned — progress is saved in your browser.</p>
                <Roadmap topics={topics} />
            </section>

            {/* Architecture diagrams */}
            <section className="mb-14">
                <h2 className="mb-5 text-xl font-bold text-fg">Architecture</h2>
                <div className="grid gap-4 lg:grid-cols-2">
                    <DiagramViewer diagram={deploymentPipelineDiagram} />
                    <DiagramViewer diagram={requestFlowDiagram} />
                </div>
            </section>

            {/* Back to the unified hub */}
            <Link
                href="/lab"
                className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 hover:border-border-strong transition-colors"
            >
                <span className="flex items-center gap-2 text-base font-medium text-fg-secondary group-hover:text-fg">
                    <ArrowLeft size={14} />
                    Search across AI Engineering and DevOps Basics together in Engineering Lab
                </span>
                <ArrowRight size={13} className="text-border-strong group-hover:text-brand group-hover:translate-x-1 transition-all" />
            </Link>
        </div>
    )
}
