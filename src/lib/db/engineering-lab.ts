import { getAIArticles, getAIPrompts, getAISnippets } from "@/src/lib/db/ai-engineering"
import { roadmap } from "@/data/lab/devops/roadmap"
import { labs } from "@/data/lab/devops/labs"
import { commandCategories } from "@/data/lab/devops/commands"
import { infraTerms } from "@/data/lab/devops/infrastructure"
import type { EngineeringLabSearchItem } from "@/src/lib/types/engineering-lab"
import { getBackendSummaries } from "@/src/lib/backend/catalog"

export interface EngineeringLabStats {
    aiArticles: number
    aiPrompts: number
    aiSnippets: number
    devopsTopics: number
    devopsLabs: number
    devopsCommands: number
    backendPublished: number
    backendPlanned: number
}

export async function getEngineeringLabIndex(): Promise<{ items: EngineeringLabSearchItem[]; stats: EngineeringLabStats }> {
    const [articles, prompts, snippets] = await Promise.all([getAIArticles(), getAIPrompts(), getAISnippets()])
    const backendSummaries = getBackendSummaries()

    const items: EngineeringLabSearchItem[] = [
        ...articles.map((a) => ({
            title: a.title,
            description: a.description,
            href: `/ai-engineering/articles/${a.slug}`,
            source: "AI Engineering" as const,
            type: "Article",
            tags: a.tags,
        })),
        ...prompts.map((p) => ({
            title: p.title,
            description: p.description,
            href: `/ai-engineering/prompts`,
            source: "AI Engineering" as const,
            type: "Prompt",
            tags: p.tags,
        })),
        ...snippets.map((s) => ({
            title: s.title,
            description: s.explanation,
            href: `/ai-engineering/snippets`,
            source: "AI Engineering" as const,
            type: "Snippet",
            tags: s.tags,
        })),
        ...backendSummaries.map((item) => ({
            title: item.title,
            description: item.description,
            href: item.status === "published" ? `/lab/backend/${item.slug}` : "/lab/backend/roadmap",
            source: "Backend Engineering" as const,
            type: item.status === "planned" ? `Planned ${item.type}` : item.type,
            tags: [item.category, item.difficulty, ...item.technologies],
        })),
        ...roadmap
            .filter((t) => t.hasCard)
            .map((t) => ({
                title: t.title,
                description: t.description,
                href: `/lab/devops/topics/${t.slug}`,
                source: "DevOps Basics" as const,
                type: "Topic",
                tags: [t.category],
            })),
        ...labs.map((l) => ({
            title: l.title,
            description: l.description,
            href: `/lab/devops/labs/${l.slug}`,
            source: "DevOps Basics" as const,
            type: "Lab",
            tags: [],
        })),
        ...commandCategories.flatMap((c) =>
            c.commands.map((cmd) => ({
                title: cmd.name,
                description: cmd.description,
                href: `/lab/devops/commands`,
                source: "DevOps Basics" as const,
                type: "Command",
                tags: [c.category],
            }))
        ),
        ...infraTerms.map((term) => ({
            title: term.term,
            description: term.definition,
            href: `/lab/devops/infrastructure`,
            source: "DevOps Basics" as const,
            type: "Infrastructure",
            tags: [term.category],
        })),
    ]

    const stats: EngineeringLabStats = {
        aiArticles: articles.length,
        aiPrompts: prompts.length,
        aiSnippets: snippets.length,
        devopsTopics: roadmap.filter((t) => t.hasCard).length,
        devopsLabs: labs.length,
        devopsCommands: commandCategories.reduce((sum, c) => sum + c.commands.length, 0),
        backendPublished: backendSummaries.filter((item) => item.status === "published").length,
        backendPlanned: backendSummaries.filter((item) => item.status === "planned").length,
    }

    return { items, stats }
}
