import { backendItems, backendPublishedOrder, backendRoadmap } from "@/data/lab/backend"
import type {
    BackendItemSummary,
    BackendKnowledgeItem,
    BackendPublishedItem,
} from "@/src/lib/types/backend-engineering"

export interface BackendValidationIssue {
    code: string
    message: string
    itemId?: string
}

export function validateBackendCatalog(items: BackendKnowledgeItem[] = backendItems): BackendValidationIssue[] {
    const issues: BackendValidationIssue[] = []
    const ids = new Set<string>()
    const slugs = new Set<string>()

    for (const item of items) {
        if (ids.has(item.id)) issues.push({ code: "duplicate-id", message: `Duplicate id: ${item.id}`, itemId: item.id })
        if (slugs.has(item.slug)) issues.push({ code: "duplicate-slug", message: `Duplicate slug: ${item.slug}`, itemId: item.id })
        ids.add(item.id)
        slugs.add(item.slug)

        for (const source of item.sources) {
            if (!Number.isFinite(Date.parse(source.accessedAt))) {
                issues.push({ code: "invalid-source-date", message: `Invalid source date: ${source.accessedAt}`, itemId: item.id })
            }
        }
        if (!Number.isFinite(Date.parse(item.updatedAt))) {
            issues.push({ code: "invalid-updated-date", message: `Invalid updatedAt: ${item.updatedAt}`, itemId: item.id })
        }
    }

    for (const item of items) {
        for (const reference of [...item.prerequisiteIds, ...item.relatedIds]) {
            if (!ids.has(reference)) {
                issues.push({ code: "missing-reference", message: `${item.id} references missing item ${reference}`, itemId: item.id })
            }
            if (reference === item.id) {
                issues.push({ code: "self-reference", message: `${item.id} references itself`, itemId: item.id })
            }
        }
    }

    const levels = backendRoadmap.map((level) => level.level)
    if (levels.some((level, index) => level !== index)) {
        issues.push({ code: "roadmap-order", message: "Roadmap levels must be ordered from 0 through 12" })
    }
    for (const level of backendRoadmap) {
        for (const itemId of level.relatedItemIds) {
            if (!ids.has(itemId)) {
                issues.push({ code: "roadmap-reference", message: `Level ${level.level} references missing item ${itemId}` })
            }
        }
    }

    return issues
}

const validationIssues = validateBackendCatalog()
if (validationIssues.length > 0) {
    throw new Error(`Invalid backend catalog:\n${validationIssues.map((issue) => `- ${issue.message}`).join("\n")}`)
}

export function getBackendItemBySlug(slug: string): BackendKnowledgeItem | undefined {
    return backendItems.find((item) => item.slug === slug)
}

export function getBackendItemById(id: string): BackendKnowledgeItem | undefined {
    return backendItems.find((item) => item.id === id)
}

export function getPublishedBackendItems(): BackendPublishedItem[] {
    const byId = new Map(
        backendItems
            .filter((item): item is BackendPublishedItem => item.status === "published")
            .map((item) => [item.id, item]),
    )
    return backendPublishedOrder.map((id) => byId.get(id)).filter((item): item is BackendPublishedItem => Boolean(item))
}

export function toBackendSummary(item: BackendKnowledgeItem): BackendItemSummary {
    return {
        id: item.id,
        slug: item.slug,
        title: item.title,
        description: item.description,
        level: item.level,
        category: item.category,
        type: item.type,
        technologies: item.technologies,
        keywords: item.keywords,
        difficulty: item.difficulty,
        estimatedMinutes: item.estimatedMinutes,
        featured: item.featured ?? false,
        status: item.status,
    }
}

export function getBackendSummaries(): BackendItemSummary[] {
    return backendItems.map(toBackendSummary)
}

export function getBackendRoadmapLevelCount(): number {
    return backendRoadmap.length
}

export function resolveBackendItems(ids: string[]): BackendKnowledgeItem[] {
    return ids.map(getBackendItemById).filter((item): item is BackendKnowledgeItem => Boolean(item))
}

export function getRelatedBackendItems(item: BackendKnowledgeItem, limit = 4): BackendKnowledgeItem[] {
    const explicit = resolveBackendItems(item.relatedIds).filter((candidate) => candidate.status === "published")
    if (explicit.length >= limit) return explicit.slice(0, limit)

    const explicitIds = new Set(explicit.map((candidate) => candidate.id))
    const fallback = getPublishedBackendItems()
        .filter((candidate) => candidate.id !== item.id && !explicitIds.has(candidate.id))
        .sort((a, b) => {
            const aScore = Number(a.category === item.category) * 2 + Number(a.level === item.level)
            const bScore = Number(b.category === item.category) * 2 + Number(b.level === item.level)
            return bScore - aScore || a.level - b.level || a.title.localeCompare(b.title)
        })
    return [...explicit, ...fallback].slice(0, limit)
}
