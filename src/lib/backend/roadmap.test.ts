import { describe, expect, it } from "vitest"
import { backendItems, backendRoadmap } from "@/data/lab/backend"
import { BackendRoadmapSchema } from "@/src/lib/schemas/backend-engineering"
import { getBackendItemById, getPublishedBackendItems } from "@/src/lib/backend/catalog"

describe("backend roadmap", () => {
    it("contains exactly 13 ordered levels from 0 through 12", () => {
        expect(() => BackendRoadmapSchema.parse(backendRoadmap)).not.toThrow()
        expect(backendRoadmap).toHaveLength(13)
        expect(backendRoadmap.map((level) => level.level)).toEqual(
            Array.from({ length: 13 }, (_, index) => index),
        )
    })

    it("does not require content from an inappropriate later level", () => {
        for (const item of backendItems) {
            for (const prerequisiteId of item.prerequisiteIds) {
                const prerequisite = getBackendItemById(prerequisiteId)
                expect(prerequisite, `${item.id}: ${prerequisiteId}`).toBeDefined()
                expect(prerequisite!.level, `${item.id}: ${prerequisiteId}`).toBeLessThanOrEqual(item.level)
            }
        }
    })

    it("resolves roadmap references with their published or planned status intact", () => {
        for (const level of backendRoadmap) {
            for (const itemId of level.relatedItemIds) {
                const item = getBackendItemById(itemId)
                expect(item, `Level ${level.level}: ${itemId}`).toBeDefined()
                expect(["published", "planned"]).toContain(item!.status)
            }
        }
    })

    it("places every published item in a sensible level progression", () => {
        const referencedLevels = new Map<string, number[]>()
        for (const level of backendRoadmap) {
            for (const itemId of level.relatedItemIds) {
                referencedLevels.set(itemId, [...(referencedLevels.get(itemId) ?? []), level.level])
            }
        }

        for (const item of getPublishedBackendItems()) {
            const levels = referencedLevels.get(item.id)
            expect(levels, `${item.id} is missing from the roadmap`).toBeDefined()
            expect(levels).toContain(item.level)
        }
    })

    it("keeps Java and Spring as the primary curriculum focus", () => {
        expect(backendRoadmap[1].title).toBe("Java Foundations")
        expect(backendRoadmap[4].title).toBe("Spring Boot Fundamentals")
        expect(backendRoadmap[5].relatedItemIds).toContain("backend-spring-transaction-fundamentals")
        expect(backendRoadmap[12].coreConcepts.join(" ")).toContain("Spring Boot")

        const published = getPublishedBackendItems()
        const javaOrSpringItems = published.filter((item) =>
            item.technologies.some((technology) => /java|spring/i.test(technology)),
        )
        expect(javaOrSpringItems.length).toBeGreaterThan(published.length / 2)
    })
})
