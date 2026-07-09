// Category slugs are admin-defined content (stored in portfolio_ai_categories),
// not a fixed enum — new categories can be added from /admin without a code change.
export type ArticleCategorySlug = string

export type Difficulty = "beginner" | "intermediate" | "advanced"

export interface AICategory {
    slug: ArticleCategorySlug
    title: string
    emoji: string
    /** lucide-react icon name (e.g. "Workflow") — resolved to a component client-side */
    icon: string
    description: string
}

export type ContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; level: 2 | 3; text: string; id: string }
    | { type: "code"; language: string; code: string; filename?: string }
    | { type: "list"; ordered?: boolean; items: string[] }
    | { type: "callout"; variant: "tip" | "warning" | "best-practice" | "info"; title?: string; text: string }
    | { type: "quote"; text: string; cite?: string }
    | { type: "table"; headers: string[]; rows: string[][] }
    | { type: "timeline"; steps: { label: string; text: string }[] }

export interface Article {
    slug: string
    title: string
    description: string
    category: ArticleCategorySlug
    tags: string[]
    technologies: string[]
    publishedAt: string
    updatedAt?: string
    readingTime: number
    difficulty: Difficulty
    author: string
    featured?: boolean
    coverEmoji: string
    body: ContentBlock[]
}

export type PromptCategory =
    | "backend"
    | "api-design"
    | "database"
    | "code-review"
    | "bug-fixing"
    | "refactoring"
    | "system-design"
    | "learning"

export interface Prompt {
    id: string
    title: string
    category: PromptCategory
    description: string
    prompt: string
    expectedOutput: string
    bestPractices: string[]
    tags: string[]
}

export interface Snippet {
    id: string
    title: string
    language: string
    code: string
    tags: string[]
    explanation: string
}
