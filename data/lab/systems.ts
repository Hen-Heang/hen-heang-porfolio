import { projects } from "@/data/projects"
import type { ArchNode, ArchNodeType } from "@/src/components/lab/ui/ArchitectureDiagram"

/** Classifies a free-text architecture layer (e.g. "PostgreSQL + Flyway") into a diagram node type. */
function classifyArchType(label: string): ArchNodeType {
    const l = label.toLowerCase()
    if (/postgres|database|mysql|neon|\bsql\b/.test(l)) return "database"
    if (/redis|cache/.test(l)) return "cache"
    if (/cron|queue|websocket|worker/.test(l)) return "queue"
    if (/next\.js|react|browser|spa|storefront/.test(l)) return "client"
    if (/axios|tanstack|zustand|interceptor|hook form/.test(l)) return "app"
    if (/security|jwt|auth|rest api|spring boot/.test(l)) return "api"
    if (/gemini|\bai\b|external/.test(l)) return "external"
    return "service"
}

export interface SystemDesignEntry {
    slug: string
    title: string
    description: string
    technologies: string[]
    steps: ArchNode[]
    architectureNote?: string
    challenges: string[]
    solutions: string[]
    lessonsLearned: string[]
}

export const systemDesigns: SystemDesignEntry[] = projects
    .filter((p) => (p.architecture?.length ?? 0) > 0)
    .map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        technologies: p.technologies,
        steps: (p.architecture ?? []).map((label) => ({ label, type: classifyArchType(label) })),
        architectureNote: p.architectureNote,
        challenges: p.challenges ?? [],
        solutions: p.solutions ?? [],
        lessonsLearned: p.lessonsLearned ?? [],
    }))
