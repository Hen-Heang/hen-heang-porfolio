import type { ReactElement, ReactNode } from "react"
import { describe, expect, it } from "vitest"
import sitemap from "@/app/sitemap"
import BackendDetailPage, {
    generateMetadata,
    generateStaticParams,
} from "@/app/lab/backend/[slug]/page"
import BackendRoadmapPage, { metadata as roadmapMetadata } from "@/app/lab/backend/roadmap/page"
import { metadata as hubMetadata } from "@/app/lab/backend/page"
import { backendItems } from "@/data/lab/backend"
import { profileData } from "@/data/profile"
import { getPublishedBackendItems } from "@/src/lib/backend/catalog"

function jsonLdFromElement(element: ReactElement<{ children?: ReactNode }>): Record<string, unknown> {
    const children = element.props.children as ReactElement[]
    const script = children.find((child) => child?.type === "script")
    expect(script).toBeDefined()
    const jsonLdScript = script as ReactElement<{ dangerouslySetInnerHTML: { __html: string } }>
    return JSON.parse(jsonLdScript.props.dangerouslySetInnerHTML.__html) as Record<string, unknown>
}

describe("Backend Engineering SEO and static routes", () => {
    it("publishes canonical and Open Graph metadata for the hub and roadmap", () => {
        expect(hubMetadata.alternates?.canonical).toBe(`${profileData.portfolioUrl}/lab/backend`)
        expect(hubMetadata.openGraph).toMatchObject({
            url: `${profileData.portfolioUrl}/lab/backend`,
            type: "website",
        })
        expect(roadmapMetadata.alternates?.canonical).toBe(`${profileData.portfolioUrl}/lab/backend/roadmap`)
        expect(roadmapMetadata.openGraph).toMatchObject({
            url: `${profileData.portfolioUrl}/lab/backend/roadmap`,
            type: "website",
        })
    })

    it("publishes complete metadata and valid JSON-LD for all 14 detail pages", async () => {
        for (const item of getPublishedBackendItems()) {
            const metadata = await generateMetadata({ params: Promise.resolve({ slug: item.slug }) })
            const canonical = `${profileData.portfolioUrl}/lab/backend/${item.slug}`
            expect(metadata.title).toBe(item.title)
            expect(metadata.description).toBe(item.description)
            expect(metadata.alternates?.canonical).toBe(canonical)
            expect(metadata.openGraph).toMatchObject({ url: canonical, type: "article" })

            const element = await BackendDetailPage({ params: Promise.resolve({ slug: item.slug }) }) as ReactElement<{ children?: ReactNode }>
            const jsonLd = jsonLdFromElement(element)
            expect(jsonLd["@context"]).toBe("https://schema.org")
            expect(jsonLd["@type"]).toBe(item.type === "lab" ? "LearningResource" : "TechArticle")
            expect(jsonLd.url).toBe(canonical)
            expect(jsonLd.dateModified).toBe(item.updatedAt)
        }
    })

    it("returns safe metadata and no static route for planned or unknown slugs", async () => {
        const planned = backendItems.find((item) => item.status === "planned")!
        const metadata = await generateMetadata({ params: Promise.resolve({ slug: planned.slug }) })
        expect(metadata).toEqual({ title: "Backend content not found" })
        expect(generateStaticParams().some(({ slug }) => slug === planned.slug)).toBe(false)
        expect(await generateMetadata({ params: Promise.resolve({ slug: "unknown" }) })).toEqual({ title: "Backend content not found" })
    })

    it("emits LearningResource JSON-LD for the roadmap", () => {
        const jsonLd = jsonLdFromElement(BackendRoadmapPage() as ReactElement<{ children?: ReactNode }>)
        expect(jsonLd["@type"]).toBe("LearningResource")
        expect(jsonLd.url).toBe(`${profileData.portfolioUrl}/lab/backend/roadmap`)
        expect(jsonLd.teaches).toHaveLength(13)
    })

    it("includes only published backend details in a stable sitemap", async () => {
        const first = await sitemap()
        const second = await sitemap()
        const backendPrefix = `${profileData.portfolioUrl}/lab/backend`
        const backendEntries = first.filter((entry) => entry.url.startsWith(backendPrefix))

        expect(backendEntries).toHaveLength(16)
        expect(backendEntries.map((entry) => entry.url)).toEqual(expect.arrayContaining([
            backendPrefix,
            `${backendPrefix}/roadmap`,
            ...getPublishedBackendItems().map((item) => `${backendPrefix}/${item.slug}`),
        ]))
        for (const planned of backendItems.filter((item) => item.status === "planned")) {
            expect(backendEntries.some((entry) => entry.url.endsWith(`/${planned.slug}`))).toBe(false)
        }
        expect(first.map((entry) => [entry.url, entry.lastModified])).toEqual(
            second.map((entry) => [entry.url, entry.lastModified]),
        )
    })
})
