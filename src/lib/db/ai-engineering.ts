import { getSupabaseClient } from "@/src/lib/supabase"
import type { AICategory, Article, ContentBlock, Difficulty, Prompt, PromptCategory, Snippet } from "@/src/lib/types/ai-engineering"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCategory(r: any): AICategory {
    return {
        slug: r.slug,
        title: r.title,
        emoji: r.emoji,
        icon: r.icon,
        description: r.description,
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapArticle(r: any): Article {
    return {
        slug: r.slug,
        title: r.title,
        description: r.description,
        category: r.category_slug,
        tags: r.tags ?? [],
        technologies: r.technologies ?? [],
        publishedAt: r.published_at,
        updatedAt: r.updated_at ?? undefined,
        readingTime: r.reading_time,
        difficulty: r.difficulty as Difficulty,
        author: r.author,
        featured: r.featured,
        coverEmoji: r.cover_emoji,
        body: (r.body ?? []) as ContentBlock[],
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPrompt(r: any): Prompt {
    return {
        id: r.prompt_id,
        title: r.title,
        category: r.category as PromptCategory,
        description: r.description,
        prompt: r.prompt,
        expectedOutput: r.expected_output,
        bestPractices: r.best_practices ?? [],
        tags: r.tags ?? [],
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSnippet(r: any): Snippet {
    return {
        id: r.snippet_id,
        title: r.title,
        language: r.language,
        code: r.code,
        tags: r.tags ?? [],
        explanation: r.explanation,
    }
}

export async function getAICategories(): Promise<AICategory[]> {
    const sb = getSupabaseClient()
    if (!sb) return []
    const { data, error } = await sb.from("portfolio_ai_categories").select("*").order("sort_order")
    if (error || !data) return []
    return data.map(mapCategory)
}

export async function getAIArticles(): Promise<Article[]> {
    const sb = getSupabaseClient()
    if (!sb) return []
    const { data, error } = await sb.from("portfolio_ai_articles").select("*").order("sort_order")
    if (error || !data) return []
    return data.map(mapArticle)
}

export async function getAIArticleBySlug(slug: string): Promise<Article | null> {
    const sb = getSupabaseClient()
    if (!sb) return null
    const { data, error } = await sb.from("portfolio_ai_articles").select("*").eq("slug", slug).maybeSingle()
    if (error || !data) return null
    return mapArticle(data)
}

export async function getAIArticleSlugs(): Promise<string[]> {
    const sb = getSupabaseClient()
    if (!sb) return []
    const { data, error } = await sb.from("portfolio_ai_articles").select("slug").order("sort_order")
    if (error || !data) return []
    return data.map((r) => r.slug)
}

export async function getAIPrompts(): Promise<Prompt[]> {
    const sb = getSupabaseClient()
    if (!sb) return []
    const { data, error } = await sb.from("portfolio_ai_prompts").select("*").order("sort_order")
    if (error || !data) return []
    return data.map(mapPrompt)
}

export async function getAISnippets(): Promise<Snippet[]> {
    const sb = getSupabaseClient()
    if (!sb) return []
    const { data, error } = await sb.from("portfolio_ai_snippets").select("*").order("sort_order")
    if (error || !data) return []
    return data.map(mapSnippet)
}

export function getRelatedArticles(article: Article, all: Article[], limit = 3): Article[] {
    return all
        .filter((a) => a.slug !== article.slug)
        .map((a) => ({
            article: a,
            score:
                (a.category === article.category ? 2 : 0) +
                a.tags.filter((t) => article.tags.includes(t)).length,
        }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((x) => x.article)
}

export function getAllTags(articles: Article[]): string[] {
    return Array.from(new Set(articles.flatMap((a) => a.tags))).sort()
}

export function getAllTechnologies(articles: Article[]): string[] {
    return Array.from(new Set(articles.flatMap((a) => a.technologies))).sort()
}
