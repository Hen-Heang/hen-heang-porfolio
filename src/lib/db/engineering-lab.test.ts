import { describe, expect, it } from "vitest"
import { getEngineeringLabIndex } from "@/src/lib/db/engineering-lab"

describe("Engineering Lab backend integration", () => {
    it("includes all backend metadata and correct dashboard counts without requiring AI data", async () => {
        const { items, stats } = await getEngineeringLabIndex()
        const backend = items.filter((item) => item.source === "Backend Engineering")

        expect(backend).toHaveLength(40)
        expect(stats.backendPublished).toBe(14)
        expect(stats.backendPlanned).toBe(26)
    })

    it("links published results to detail pages and planned results to the roadmap", async () => {
        const { items } = await getEngineeringLabIndex()
        const published = items.find((item) => item.title === "Java Backend Fundamentals")
        const planned = items.find((item) => item.title === "Java Concurrency and Virtual Threads")

        expect(published?.href).toBe("/lab/backend/java-backend-fundamentals")
        expect(planned?.href).toBe("/lab/backend/roadmap")
        expect(planned?.type).toMatch(/^Planned /)
    })

    it("makes technologies, category, and difficulty searchable as tags", async () => {
        const { items } = await getEngineeringLabIndex()
        const transaction = items.find((item) => item.title === "Spring Transaction Fundamentals")

        expect(transaction?.tags).toEqual(expect.arrayContaining([
            "spring",
            "intermediate",
            "Spring Framework 6.2",
            "PostgreSQL",
        ]))
    })
})
