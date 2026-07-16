import React from "react"
import Link from "next/link"
import { Section } from "@/src/components/system/Section"
import { TextLink } from "@/src/components/system/TextLink"
import type { Article } from "@/src/lib/types/ai-engineering"

interface DirNode {
    name: string
    href: string
    children?: { name: string; href: string; meta?: string }[]
}

/** GitHub-tree-styled directory of real Lab + AI Engineering content. */
export function LabDirectory({ articles }: { articles: Article[] }) {
    const nodes: DirNode[] = [
        {
            name: "system-design/",
            href: "/lab/systems",
            children: [{ name: "architecture-notes.md", href: "/lab/systems" }],
        },
        {
            name: "backend-engineering/",
            href: "/lab/backend",
            children: [
                { name: "roadmap.md", href: "/lab/backend/roadmap" },
                { name: "java-backend-fundamentals.md", href: "/lab/backend/java-backend-fundamentals" },
                { name: "spring-boot-layered-architecture.md", href: "/lab/backend/spring-boot-layered-architecture" },
            ],
        },
        {
            name: "database/",
            href: "/lab/database",
            children: [{ name: "schema-notes.md", href: "/lab/database" }],
        },
        {
            name: "devops/",
            href: "/lab/devops",
            children: [
                { name: "commands.md", href: "/lab/devops/commands" },
                { name: "infrastructure.md", href: "/lab/devops/infrastructure" },
            ],
        },
        {
            name: "ai-workflows/",
            href: "/ai-engineering",
            children: articles.slice(0, 3).map((a) => ({
                name: `${a.slug}.md`,
                href: `/ai-engineering/articles/${a.slug}`,
                meta: new Date(a.updatedAt ?? a.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }),
            })),
        },
    ]

    return (
        <Section
            eyebrow="Engineering Lab"
            title="engineering-lab/"
            description="Notes, references, and AI-assisted workflows from day-to-day backend work — kept in the open."
        >
            <div className="overflow-hidden rounded-xl border border-border bg-surface">
                <div className="overflow-x-auto p-5 font-mono text-sm sm:p-6">
                    {nodes.map((node, i) => (
                        <div key={node.name} className={i > 0 ? "mt-1" : undefined}>
                            <Link
                                href={node.href}
                                className="group -mx-2 flex items-center gap-2 rounded-md px-2 py-1 text-fg transition-colors hover:bg-surface-hover hover:text-brand"
                            >
                                <span className="text-fg-muted transition-colors group-hover:text-brand/60" aria-hidden>
                                    {i === nodes.length - 1 ? "└──" : "├──"}
                                </span>
                                <span className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0">
                                    {node.name}
                                </span>
                            </Link>
                            {node.children?.map((child, j) => (
                                <div key={child.name} className="pl-6">
                                    <Link
                                        href={child.href}
                                        className="group -mx-2 flex w-full items-center justify-between gap-4 rounded-md px-2 py-1 text-fg-secondary transition-colors hover:bg-surface-hover hover:text-brand"
                                    >
                                        <span className="inline-flex items-center gap-2 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0">
                                            <span className="text-fg-muted transition-colors group-hover:text-brand/60" aria-hidden>
                                                {j === (node.children?.length ?? 0) - 1 ? "└──" : "├──"}
                                            </span>
                                            {child.name}
                                        </span>
                                        {child.meta && (
                                            <span className="hidden text-xs text-fg-muted sm:inline">
                                                {child.meta}
                                            </span>
                                        )}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <TextLink href="/lab">Open the Engineering Lab</TextLink>
            </div>
        </Section>
    )
}
