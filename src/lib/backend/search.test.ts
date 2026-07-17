import { describe, expect, it } from "vitest"
import { getBackendSummaries } from "@/src/lib/backend/catalog"
import { filterBackendItems, matchesBackendQuery } from "@/src/lib/backend/search"

const items = getBackendSummaries()

describe("backend catalog search", () => {
    it.each([
        ["title", "Java Backend Fundamentals", "java-backend-fundamentals"],
        ["description", "browser reverse proxy response path", "client-server-http-request-lifecycle"],
        ["technology", "MyBatis", "mybatis-mapper-workflow"],
        ["category", "security", "spring-security-authentication-flow"],
        ["keyword", "rollback", "spring-transaction-fundamentals"],
    ])("searches by %s", (_field, query, expectedSlug) => {
        expect(filterBackendItems(items, { query }).map((item) => item.slug)).toContain(expectedSlug)
    })

    it("matches case-insensitively", () => {
        const item = items.find((candidate) => candidate.slug === "spring-transaction-fundamentals")!
        expect(matchesBackendQuery(item, "sPrInG TrAnSaCtIoN")).toBe(true)
    })

    it("requires every word in a multi-word search", () => {
        const results = filterBackendItems(items, { query: "spring rollback" })
        expect(results.some((item) => item.slug === "spring-transaction-fundamentals")).toBe(true)
        expect(results.every((item) => matchesBackendQuery(item, "spring rollback"))).toBe(true)
    })

    it("matches simple singular and plural word variants", () => {
        const results = filterBackendItems(items, { query: "transactions" })
        expect(results.map((item) => item.slug)).toContain("spring-transaction-fundamentals")
    })

    it("returns an empty collection for no-result queries", () => {
        expect(filterBackendItems(items, { query: "definitely-not-in-this-catalog" })).toEqual([])
    })

    it("applies filters when the query is blank", () => {
        const results = filterBackendItems(items, { query: "   ", category: "security" })
        expect(results.length).toBeGreaterThan(0)
        expect(results.every((item) => item.category === "security")).toBe(true)
    })

    it("filters planned and published statuses", () => {
        const planned = filterBackendItems(items, { status: "planned" })
        const published = filterBackendItems(items, { status: "published" })
        expect(planned).toHaveLength(26)
        expect(published).toHaveLength(14)
        expect(planned.every((item) => item.status === "planned")).toBe(true)
        expect(published.every((item) => item.status === "published")).toBe(true)
    })
})
