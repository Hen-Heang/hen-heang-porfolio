import { projects } from "@/data/projects"

const bySlug = (slug: string) => projects.find((p) => p.slug === slug)!

export interface PerformanceEntry {
    category: "Caching" | "Optimistic UI" | "Background Jobs" | "Data Access" | "Reliability"
    slug: string
    project: string
    text: string
}

/**
 * Every entry quotes an existing solution/lesson from data/projects.ts by reference
 * (not retyped) so this view can never drift from the source of truth.
 */
export const performanceTechniques: PerformanceEntry[] = [
    { category: "Caching", slug: "hengo", project: bySlug("hengo").title, text: bySlug("hengo").solutions![1] },
    { category: "Background Jobs", slug: "money-flow", project: bySlug("money-flow").title, text: bySlug("money-flow").solutions![0] },
    { category: "Reliability", slug: "money-flow", project: bySlug("money-flow").title, text: bySlug("money-flow").solutions![1] },
    { category: "Data Access", slug: "money-flow", project: bySlug("money-flow").title, text: bySlug("money-flow").solutions![2] },
    { category: "Data Access", slug: "h-phsar", project: bySlug("h-phsar").title, text: bySlug("h-phsar").solutions![0] },
]
