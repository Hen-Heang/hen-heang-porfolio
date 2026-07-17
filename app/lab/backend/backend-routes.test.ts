import { describe, expect, it } from "vitest"
import { backendItems } from "@/data/lab/backend"
import { getPublishedBackendItems } from "@/src/lib/backend/catalog"
import { dynamicParams, generateStaticParams } from "@/app/lab/backend/[slug]/page"

describe("backend static detail routes", () => {
    it("generates static params for all and only published items", () => {
        const params = generateStaticParams()
        expect(params).toHaveLength(14)
        expect(params.map(({ slug }) => slug)).toEqual(getPublishedBackendItems().map((item) => item.slug))
        expect(params.every(({ slug }) => backendItems.some((item) => item.slug === slug && item.status === "published"))).toBe(true)
    })

    it("does not generate detail pages for planned topics", () => {
        expect(dynamicParams).toBe(false)
        const generated = new Set(generateStaticParams().map(({ slug }) => slug))
        for (const item of backendItems.filter((candidate) => candidate.status === "planned")) {
            expect(generated.has(item.slug), item.slug).toBe(false)
        }
    })
})
