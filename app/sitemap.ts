import type { MetadataRoute } from "next"
import { projects } from "@/data/projects"
import { profileData } from "@/data/profile"

const BASE_URL = profileData.portfolioUrl

export default function sitemap(): MetadataRoute.Sitemap {
    const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
        url: `${BASE_URL}/projects/${p.slug}`,
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
