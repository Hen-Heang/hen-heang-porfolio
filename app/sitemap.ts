import type { MetadataRoute } from "next"
import { profileData } from "@/data/profile"
import { getProjects } from "@/src/lib/db/portfolio"
import { getAIArticles } from "@/src/lib/db/ai-engineering"
import { roadmap } from "@/data/lab/devops/roadmap"
import { labs } from "@/data/lab/devops/labs"
import { getPublishedBackendItems } from "@/src/lib/backend/catalog"

const BASE_URL = profileData.portfolioUrl

/**
 * Stable fallback for routes with no real "last changed" signal (static
 * marketing pages, devops roadmap/lab pages, statically-sourced projects).
 * A fixed date, not `new Date()` — the bug being fixed here is every route
 * reporting itself as modified on every single request/build.
 */
const STABLE_LAST_MODIFIED = new Date("2026-07-16")

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [projects, articles] = await Promise.all([getProjects(), getAIArticles()])

    const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${BASE_URL}/projects/${project.slug}`,
        lastModified: project.updatedAt ? new Date(project.updatedAt) : STABLE_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.7,
    }))

    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${BASE_URL}/ai-engineering/articles/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
    }))

    const devopsTopicPages: MetadataRoute.Sitemap = roadmap
        .filter((t) => t.hasCard)
        .map((t) => ({
            url: `${BASE_URL}/lab/devops/topics/${t.slug}`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.6,
        }))

    const devopsLabPages: MetadataRoute.Sitemap = labs.map((l) => ({
        url: `${BASE_URL}/lab/devops/labs/${l.slug}`,
        lastModified: STABLE_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.6,
    }))

    const backendPages: MetadataRoute.Sitemap = getPublishedBackendItems().map((item) => ({
        url: `${BASE_URL}/lab/backend/${item.slug}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: "monthly",
        priority: item.featured ? 0.7 : 0.6,
    }))

    return [
        {
            url: BASE_URL,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/projects`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/cv`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "yearly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/lab`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/ai-engineering`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/ai-engineering/prompts`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/ai-engineering/snippets`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/lab/backend`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/lab/backend/roadmap`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/lab/devops`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/lab/devops/labs`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/lab/devops/commands`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/lab/devops/infrastructure`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/lab/api`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/lab/database`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/lab/experiments`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/lab/performance`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/lab/systems`,
            lastModified: STABLE_LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        ...projectPages,
        ...articlePages,
        ...devopsTopicPages,
        ...devopsLabPages,
        ...backendPages,
    ]
}
