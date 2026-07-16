import type { BackendContentType, BackendDifficulty, BackendItemSummary, BackendStatus } from "@/src/lib/types/backend-engineering"

export interface BackendSearchFilters {
    query?: string
    level?: number | "all"
    category?: string | "all"
    difficulty?: BackendDifficulty | "all"
    type?: BackendContentType | "all"
    status?: BackendStatus | "all"
}

function normalize(value: string): string {
    return value.toLocaleLowerCase("en").trim()
}

export function matchesBackendQuery(item: BackendItemSummary, query: string): boolean {
    const normalized = normalize(query)
    if (!normalized) return true
    const haystack = [
        item.title,
        item.description,
        item.category,
        item.type,
        item.difficulty,
        ...item.technologies,
        ...item.keywords,
    ].map(normalize)
    return normalized.split(/\s+/).every((token) => haystack.some((value) => value.includes(token)))
}

export function filterBackendItems(items: BackendItemSummary[], filters: BackendSearchFilters): BackendItemSummary[] {
    return items.filter((item) => {
        if (!matchesBackendQuery(item, filters.query ?? "")) return false
        if (filters.level !== undefined && filters.level !== "all" && item.level !== filters.level) return false
        if (filters.category && filters.category !== "all" && item.category !== filters.category) return false
        if (filters.difficulty && filters.difficulty !== "all" && item.difficulty !== filters.difficulty) return false
        if (filters.type && filters.type !== "all" && item.type !== filters.type) return false
        if (filters.status && filters.status !== "all" && item.status !== filters.status) return false
        return true
    })
}

export function sortBackendItems(items: BackendItemSummary[]): BackendItemSummary[] {
    return [...items].sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1
        if (a.status !== b.status) return a.status === "published" ? -1 : 1
        return a.level - b.level || a.title.localeCompare(b.title)
    })
}
