import type { MetadataRoute } from "next"
import { profileData } from "@/data/profile"
import { getProjectSlugs } from "@/src/lib/db/portfolio"

const BASE_URL = profileData.portfolioUrl

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const slugs = await getProjectSlugs()
    const projectPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
        url: `${BASE_URL}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    }))

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/projects`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/cv`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.6,
        },
        ...projectPages,
    ]
}
