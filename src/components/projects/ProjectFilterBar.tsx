import React from "react"
import Link from "next/link"
import { cn } from "@/src/lib/utils/utils"

export type ProjectFilter = "all" | "backend" | "full-stack" | "live"

interface FilterOption {
    id: ProjectFilter
    label: string
}

const filters: FilterOption[] = [
    { id: "all", label: "All" },
    { id: "backend", label: "Backend" },
    { id: "full-stack", label: "Full-stack" },
    { id: "live", label: "Live" },
]

/**
 * URL-driven filter pills — server-rendered links so the filter state is
 * shareable and works without JavaScript. `?filter=` is read by the page.
 */
export function ProjectFilterBar({
    active,
    counts,
}: {
    active: ProjectFilter
    counts: Record<ProjectFilter, number>
}) {
    return (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by type">
            {filters.map((filter) => {
                const isActive = filter.id === active
                return (
                    <Link
                        key={filter.id}
                        href={filter.id === "all" ? "/projects" : `/projects?filter=${filter.id}`}
                        scroll={false}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                            isActive
                                ? "border-brand bg-brand/10 text-brand"
                                : "border-border text-fg-secondary hover:border-border-strong hover:text-fg",
                        )}
                    >
                        {filter.label}
                        <span className="font-mono text-xs text-fg-muted">{counts[filter.id]}</span>
                    </Link>
                )
            })}
        </div>
    )
}
