import { describe, expect, it } from "vitest"
import { backendPublishedOrder } from "@/data/lab/backend"
import {
    getBackendItemById,
    getBackendSummaries,
    getPublishedBackendItems,
    getRelatedBackendItems,
} from "@/src/lib/backend/catalog"
import { getBackendAdjacentItems } from "@/src/lib/backend/navigation"
import { filterBackendItems, sortBackendItems } from "@/src/lib/backend/search"

const summaries = getBackendSummaries()

describe("backend selection and navigation", () => {
    it("orders featured items first, then published status, roadmap level, and title", () => {
        const sorted = sortBackendItems(summaries)
        const firstNonFeatured = sorted.findIndex((item) => !item.featured)
        expect(sorted.slice(0, firstNonFeatured).every((item) => item.featured)).toBe(true)

        const nonFeatured = sorted.filter((item) => !item.featured)
        const firstPlanned = nonFeatured.findIndex((item) => item.status === "planned")
        expect(nonFeatured.slice(0, firstPlanned).every((item) => item.status === "published")).toBe(true)

        for (let index = 1; index < nonFeatured.length; index += 1) {
            const previous = nonFeatured[index - 1]
            const current = nonFeatured[index]
            if (previous.status === current.status) expect(previous.level).toBeLessThanOrEqual(current.level)
        }
    })

    it.each([
        ["difficulty", { difficulty: "advanced" as const }, (item: (typeof summaries)[number]) => item.difficulty === "advanced"],
        ["content type", { type: "lab" as const }, (item: (typeof summaries)[number]) => item.type === "lab"],
        ["category", { category: "database" }, (item: (typeof summaries)[number]) => item.category === "database"],
        ["level", { level: 5 }, (item: (typeof summaries)[number]) => item.level === 5],
    ])("supports %s filtering", (_name, filters, predicate) => {
        const results = filterBackendItems(summaries, filters)
        expect(results.length).toBeGreaterThan(0)
        expect(results.every(predicate)).toBe(true)
    })

    it("selects explicit related content first and only published pages", () => {
        const item = getBackendItemById("backend-spring-transaction-fundamentals")!
        const related = getRelatedBackendItems(item)
        const explicitPublished = item.relatedIds
            .map(getBackendItemById)
            .filter((candidate) => candidate?.status === "published")
            .map((candidate) => candidate!.id)
        expect(related.slice(0, explicitPublished.length).map((candidate) => candidate.id)).toEqual(explicitPublished)
        expect(related.every((candidate) => candidate.status === "published")).toBe(true)
        expect(related.some((candidate) => candidate.id === item.id)).toBe(false)
    })

    it("uses a deterministic fallback for related content", () => {
        const item = getBackendItemById("backend-java-backend-fundamentals")!
        const first = getRelatedBackendItems({ ...item, relatedIds: [] })
        const second = getRelatedBackendItems({ ...item, relatedIds: [] })
        expect(first.map((candidate) => candidate.id)).toEqual(second.map((candidate) => candidate.id))
        expect(first).toHaveLength(4)
    })

    it("navigates previous and next according to the published curriculum order", () => {
        const published = getPublishedBackendItems()
        expect(published.map((item) => item.id)).toEqual([...backendPublishedOrder])

        for (let index = 0; index < published.length; index += 1) {
            const adjacent = getBackendAdjacentItems(published[index].id)
            expect(adjacent.previous?.id).toBe(published[index - 1]?.id)
            expect(adjacent.next?.id).toBe(published[index + 1]?.id)
        }
    })

    it("handles first, last, planned, and unknown item navigation", () => {
        const published = getPublishedBackendItems()
        expect(getBackendAdjacentItems(published[0].id).previous).toBeUndefined()
        expect(getBackendAdjacentItems(published.at(-1)!.id).next).toBeUndefined()
        expect(getBackendAdjacentItems("backend-computer-linux-command-line-foundations")).toEqual({})
        expect(getBackendAdjacentItems("missing-item")).toEqual({})
    })
})
