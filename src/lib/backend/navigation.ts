import { getPublishedBackendItems } from "@/src/lib/backend/catalog"
import type { BackendPublishedItem } from "@/src/lib/types/backend-engineering"

export interface BackendAdjacentItems {
    previous?: BackendPublishedItem
    next?: BackendPublishedItem
}

export function getBackendAdjacentItems(itemId: string): BackendAdjacentItems {
    const published = getPublishedBackendItems()
    const index = published.findIndex((item) => item.id === itemId)
    if (index < 0) return {}
    return {
        previous: index > 0 ? published[index - 1] : undefined,
        next: index < published.length - 1 ? published[index + 1] : undefined,
    }
}
