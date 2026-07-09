import type { MetadataRoute } from "next"
import { profileData } from "@/data/profile"
import { getProjectSlugs } from "@/src/lib/db/portfolio"
import { getAIArticles } from "@/src/lib/db/ai-engineering"
import { roadmap } from "@/data/lab/devops/roadmap"
import { labs } from "@/data/lab/devops/labs"

const BASE_URL = profileData.portfolioUrl

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [slugs, articles] = await Promise.all([getProjectSlugs(), getAIArticles()])
    const projectPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
        url: `${BASE_URL}/projects/${slug}`,
        lastModified: new Date(),
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
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        }))

    const devopsLabPages: MetadataRoute.Sitemap = labs.map((l) => ({
        url: `${BASE_URL}/lab/devops/labs/${l.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
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
        {
            url: `${BASE_URL}/lab`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/ai-engineering`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/ai-engineering/prompts`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/ai-engineering/snippets`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/lab/devops`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/lab/devops/labs`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/lab/devops/commands`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/lab/devops/infrastructure`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        ...projectPages,
        ...articlePages,
        ...devopsTopicPages,
        ...devopsLabPages,
    ]
}
