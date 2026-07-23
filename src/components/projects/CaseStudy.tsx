import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Briefcase, Clock, Database, Github, Lightbulb, Users } from "lucide-react"
import { Container } from "@/src/components/system/Container"
import { StatusBadge } from "@/src/components/system/StatusBadge"
import { ArchitecturePreview } from "@/src/components/system/ArchitecturePreview"
import { ProcessTimeline } from "@/src/components/system/ProcessTimeline"
import { CaseStudyTOC, type TocItem } from "@/src/components/projects/CaseStudyTOC"
import { ScreenshotGallery } from "@/src/components/projects/ScreenshotGallery"
import { cn } from "@/src/lib/utils/utils"
import type { Project } from "@/src/lib/types"

type AdjacentProject = Pick<Project, "slug" | "title"> | null

const methodColor: Record<string, string> = {
    GET: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    POST: "bg-success/10 text-success",
    PUT: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    PATCH: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    DELETE: "bg-red-500/10 text-red-500",
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} className="scroll-mt-24 rounded-xl border border-border bg-surface p-6">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">{title}</h2>
            <div className="mt-4">{children}</div>
        </section>
    )
}

export function CaseStudy({ project, nextProject }: { project: Project; nextProject?: AdjacentProject }) {
    const isLive = Boolean(project.demo && project.demo !== "#")

    const toc: TocItem[] = [
        project.businessProblem && { id: "problem", text: "The Problem" },
        project.overview && { id: "overview", text: "Overview" },
        project.screenshots?.length && { id: "screenshots", text: "Screenshots" },
        project.process?.length && { id: "process", text: "How I Built It" },
        project.features?.length && { id: "features", text: "Features" },
        project.technicalDetails && { id: "technical-details", text: "Technical Details" },
        project.architecture?.length && { id: "architecture", text: "Architecture" },
        project.dataModel?.length && { id: "data-model", text: "Data Model" },
        project.apiEndpoints?.length && { id: "api-endpoints", text: "API Endpoints" },
        (project.challenges?.length || project.solutions?.length) && { id: "challenges", text: "Challenges & Solutions" },
        project.lessonsLearned?.length && { id: "lessons", text: "Lessons Learned" },
    ].filter(Boolean) as TocItem[]

    return (
        <Container>
            <div className="py-section pt-12 md:pt-16">
                <Link
                    href="/projects"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                    <ArrowLeft size={16} aria-hidden /> Back to Projects
                </Link>

                <div
                    className={cn(
                        "relative aspect-video overflow-hidden rounded-xl border border-border",
                        project.imageFit === "contain" && "bg-[#000611]",
                    )}
                >
                    <Image
                        src={project.image || "/image/placeholder_image.png"}
                        alt={project.title}
                        fill
                        priority
                        className={project.imageFit === "contain" ? "object-contain" : "object-cover"}
                    />
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        {(project.category || project.ownership) && (
                            <p className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">
                                {[project.category, project.ownership].filter(Boolean).join(" · ")}
                            </p>
                        )}
                        <h1 className="mt-2 text-display-sm text-fg">{project.title}</h1>
                        <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-fg-secondary">
                            {project.role && (
                                <span className="inline-flex items-center gap-2">
                                    <Briefcase size={15} className="text-fg-muted" aria-hidden /> {project.role}
                                </span>
                            )}
                            {project.duration && (
                                <span className="inline-flex items-center gap-2">
                                    <Clock size={15} className="text-fg-muted" aria-hidden /> {project.duration}
                                </span>
                            )}
                            {project.teamSize && (
                                <span className="inline-flex items-center gap-2">
                                    <Users size={15} className="text-fg-muted" aria-hidden /> {project.teamSize}
                                </span>
                            )}
                        </div>
                    </div>
                    {isLive ? <StatusBadge status="live" pulse>Live</StatusBadge> : <StatusBadge status="archived">Source available</StatusBadge>}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-surface-hover"
                        >
                            <Github size={16} aria-hidden /> GitHub
                        </a>
                    )}
                    {isLive && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 items-center rounded-lg bg-brand px-4 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
                        >
                            Live Demo
                        </a>
                    )}
                </div>

                {project.confidential && (
                    <p className="mt-4 text-sm italic text-fg-muted">
                        Project details and source code are private due to company confidentiality.
                    </p>
                )}

                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                    {project.technologies.map((tech) => (
                        <li key={tech} className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-fg-secondary">
                            {tech}
                        </li>
                    ))}
                </ul>

                <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_220px] lg:gap-16">
                    <div className="flex flex-col gap-6">
                        {project.businessProblem && (
                            <Block id="problem" title="The Problem">
                                <p className="leading-relaxed text-fg-secondary">{project.businessProblem}</p>
                            </Block>
                        )}

                        {project.overview && (
                            <Block id="overview" title="Overview">
                                <p className="leading-relaxed text-fg-secondary">{project.overview}</p>
                            </Block>
                        )}

                        {project.screenshots && project.screenshots.length > 0 && (
                            <Block id="screenshots" title="Screenshots">
                                <ScreenshotGallery images={project.screenshots} title={project.title} />
                            </Block>
                        )}

                        {project.process && project.process.length > 0 && (
                            <Block id="process" title="How I Built It">
                                <ProcessTimeline steps={project.process} />
                            </Block>
                        )}

                        {project.features && project.features.length > 0 && (
                            <Block id="features" title="Features">
                                <ul className="space-y-2.5">
                                    {project.features.map((f, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-fg-secondary">
                                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </Block>
                        )}

                        {project.technicalDetails && (
                            <Block id="technical-details" title="Technical Details">
                                <p className="text-sm leading-relaxed text-fg-secondary">{project.technicalDetails}</p>
                            </Block>
                        )}

                        {project.architecture && project.architecture.length > 0 && (
                            <section id="architecture" className="scroll-mt-24">
                                <ArchitecturePreview layers={project.architecture} note={project.architectureNote} />
                            </section>
                        )}

                        {project.dataModel && project.dataModel.length > 0 && (
                            <Block id="data-model" title="Data Model">
                                <div className="flex flex-wrap gap-2">
                                    {project.dataModel.map((table) => (
                                        <span
                                            key={table}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-xs text-fg-secondary"
                                        >
                                            <Database size={12} className="text-fg-muted" aria-hidden />
                                            {table}
                                        </span>
                                    ))}
                                </div>
                            </Block>
                        )}

                        {project.apiEndpoints && project.apiEndpoints.length > 0 && (
                            <Block id="api-endpoints" title="Key API Endpoints">
                                <ul className="space-y-3">
                                    {project.apiEndpoints.map((endpoint) => (
                                        <li
                                            key={`${endpoint.method} ${endpoint.path}`}
                                            className="flex flex-col gap-1.5 text-sm sm:flex-row sm:items-baseline sm:gap-3"
                                        >
                                            <span className="flex shrink-0 items-baseline gap-2">
                                                <span
                                                    className={`rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold ${methodColor[endpoint.method] ?? "bg-surface-hover text-fg"}`}
                                                >
                                                    {endpoint.method}
                                                </span>
                                                <code className="font-mono text-xs text-fg-secondary">{endpoint.path}</code>
                                            </span>
                                            <span className="text-xs text-fg-muted sm:text-sm">{endpoint.description}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Block>
                        )}

                        {(project.challenges?.length || project.solutions?.length) ? (
                            <section id="challenges" className="scroll-mt-24 grid gap-6 md:grid-cols-2">
                                {project.challenges && project.challenges.length > 0 && (
                                    <Block id="challenges-inner" title="Challenges">
                                        <ul className="space-y-2.5">
                                            {project.challenges.map((c, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-fg-secondary">
                                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red-500" aria-hidden />
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </Block>
                                )}
                                {project.solutions && project.solutions.length > 0 && (
                                    <Block id="solutions-inner" title="Solutions">
                                        <ul className="space-y-2.5">
                                            {project.solutions.map((s, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-fg-secondary">
                                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-success" aria-hidden />
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </Block>
                                )}
                            </section>
                        ) : null}

                        {project.lessonsLearned && project.lessonsLearned.length > 0 && (
                            <Block id="lessons" title="Lessons Learned">
                                <ul className="space-y-2.5">
                                    {project.lessonsLearned.map((lesson, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-fg-secondary">
                                            <Lightbulb size={15} className="mt-0.5 shrink-0 text-amber-500" aria-hidden />
                                            {lesson}
                                        </li>
                                    ))}
                                </ul>
                            </Block>
                        )}

                        {nextProject && (
                            <Link
                                href={`/projects/${nextProject.slug}`}
                                className="group flex items-center justify-between rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
                            >
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">Next Project</span>
                                    <p className="mt-1 text-lg font-semibold text-fg">{nextProject.title}</p>
                                </div>
                                <ArrowRight
                                    size={20}
                                    className="shrink-0 text-fg-muted transition-transform group-hover:translate-x-1 group-hover:text-brand motion-reduce:transition-none"
                                    aria-hidden
                                />
                            </Link>
                        )}
                    </div>

                    <CaseStudyTOC items={toc} />
                </div>
            </div>
        </Container>
    )
}
