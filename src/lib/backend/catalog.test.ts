import { describe, expect, it } from "vitest"
import { backendItems, backendPublishedOrder } from "@/data/lab/backend"
import { BackendCatalogSchema } from "@/src/lib/schemas/backend-engineering"
import { BACKEND_CATEGORIES, BACKEND_LEVELS } from "@/src/lib/types/backend-engineering"
import {
    getBackendItemById,
    getPublishedBackendItems,
    validateBackendCatalog,
} from "@/src/lib/backend/catalog"

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const SOURCE_TYPES = new Set(["official-docs", "standard", "paper", "reference"])

function isRealIsoDate(value: string): boolean {
    if (!ISO_DATE.test(value)) return false
    const [year, month, day] = value.split("-").map(Number)
    const date = new Date(Date.UTC(year, month - 1, day))
    return date.getUTCFullYear() === year
        && date.getUTCMonth() === month - 1
        && date.getUTCDate() === day
}

describe("backend content catalog", () => {
    it("executes the catalog through Zod with the expected release counts", () => {
        expect(() => BackendCatalogSchema.parse(backendItems)).not.toThrow()
        expect(backendItems).toHaveLength(40)
        expect(getPublishedBackendItems()).toHaveLength(14)
        expect(backendItems.filter((item) => item.status === "planned")).toHaveLength(26)
        expect(validateBackendCatalog()).toEqual([])
    })

    it("uses unique IDs and slugs", () => {
        expect(new Set(backendItems.map((item) => item.id)).size).toBe(backendItems.length)
        expect(new Set(backendItems.map((item) => item.slug)).size).toBe(backendItems.length)
    })

    it("uses declared categories and levels 0 through 12", () => {
        for (const item of backendItems) {
            expect(BACKEND_CATEGORIES).toContain(item.category)
            expect(BACKEND_LEVELS).toContain(item.level)
        }
    })

    it("uses real ISO dates and valid, typed source URLs", () => {
        for (const item of backendItems) {
            expect(isRealIsoDate(item.updatedAt), `${item.id} updatedAt`).toBe(true)
            for (const source of item.sources) {
                expect(isRealIsoDate(source.accessedAt), `${item.id}: ${source.title}`).toBe(true)
                expect(() => new URL(source.url)).not.toThrow()
                expect(new URL(source.url).protocol).toBe("https:")
                expect(SOURCE_TYPES.has(source.type)).toBe(true)
            }
        }
    })

    it("resolves every prerequisite and related-content reference without self-references", () => {
        for (const item of backendItems) {
            for (const reference of item.prerequisiteIds) {
                expect(getBackendItemById(reference), `${item.id} prerequisite ${reference}`).toBeDefined()
                expect(reference).not.toBe(item.id)
            }
            for (const reference of item.relatedIds) {
                expect(getBackendItemById(reference), `${item.id} related ${reference}`).toBeDefined()
                expect(reference).not.toBe(item.id)
            }
        }
    })

    it("keeps published content bodies non-empty", () => {
        for (const item of getPublishedBackendItems()) {
            if (item.type === "lab") {
                expect(item.overview.length).toBeGreaterThan(0)
                expect(item.milestones.length).toBeGreaterThan(0)
            } else if (item.type === "checklist") {
                expect(item.introduction.trim()).not.toBe("")
                expect(item.groups.length).toBeGreaterThan(0)
            } else if (item.type === "interview") {
                expect(item.introduction.trim()).not.toBe("")
                expect(item.questions.length).toBeGreaterThan(0)
            } else {
                expect(item.sections.length).toBeGreaterThan(0)
                expect(item.sections.every((section) => section.blocks.length > 0)).toBe(true)
            }
        }
    })

    it("keeps planned topics as metadata only and outside published route order", () => {
        const publishedIds = new Set(backendPublishedOrder)
        for (const item of backendItems.filter((candidate) => candidate.status === "planned")) {
            expect(item.title.trim()).not.toBe("")
            expect(item.description.trim()).not.toBe("")
            expect(item.learningObjectives.length).toBeGreaterThan(0)
            expect(item.sources.length).toBeGreaterThan(0)
            expect(publishedIds.has(item.id as (typeof backendPublishedOrder)[number])).toBe(false)
            expect("sections" in item).toBe(false)
            expect("overview" in item).toBe(false)
            expect("groups" in item).toBe(false)
            expect("questions" in item).toBe(false)
        }
    })
})
