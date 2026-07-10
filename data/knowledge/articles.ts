import { performanceTechniques } from "@/data/lab/performance"
import type { KnowledgeSection } from "./types"

/**
 * The Engineering Lab (https://henheang.site/lab) is where Hen documents
 * engineering write-ups: system design walkthroughs, performance techniques,
 * and a DevOps learning roadmap. Derived from data/lab/*.
 */
export const articlesKnowledge: KnowledgeSection[] = [
    {
        id: "articles-engineering-lab",
        category: "articles",
        title: "Engineering Lab — articles and write-ups",
        keywords: [
            "articles", "article", "blog", "write", "writing", "lab", "engineering lab",
            "content", "posts", "documentation", "devops", "roadmap", "system design",
            "diagrams", "learning", "notes",
        ],
        content: [
            "Hen publishes engineering write-ups on his portfolio's **Engineering Lab** (https://henheang.site/lab):",
            "",
            "- **Systems** — architecture walkthroughs of each portfolio project, with diagrams, challenges, solutions, and lessons learned.",
            "- **Performance** — techniques applied in real projects: caching, optimistic UI, background jobs, data access, and reliability.",
            "- **DevOps Lab** — a documented learning roadmap covering Git, Docker, CI/CD with GitHub Actions, and Nginx, each with overview, why it matters, how backend devs use it, common mistakes, and example commands.",
            "- **AI Engineering** (https://henheang.site/ai-engineering) — a prompt library for backend, API design, database, code review, bug fixing, refactoring, system design, and learning.",
        ].join("\n"),
    },
    {
        id: "articles-performance-techniques",
        category: "articles",
        title: "Performance techniques from real projects",
        keywords: [
            "performance", "optimization", "caching", "cache", "optimistic",
            "background jobs", "cron", "reliability", "data access", "query", "speed",
        ],
        content: performanceTechniques
            .map((t) => `- **${t.category}** (${t.project}): ${t.text}`)
            .join("\n"),
    },
]
