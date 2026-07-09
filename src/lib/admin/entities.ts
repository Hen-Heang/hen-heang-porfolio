// Field/entity definitions driving the generic admin editor.
// All configs are plain serializable objects so server pages can pass them
// straight into the client editor component.

export type FieldType = "text" | "textarea" | "lines" | "number" | "select" | "boolean" | "json"

export interface FieldConfig {
    name: string
    label: string
    type: FieldType
    required?: boolean
    options?: string[]
    /** Populate select options from another table */
    optionsFrom?: { table: string; value: string; label: string }
    placeholder?: string
    min?: number
    max?: number
}

export interface EntityConfig {
    table: string
    title: string
    /** Columns shown in the list view */
    listFields: string[]
    fields: FieldConfig[]
}

export const entities: Record<string, EntityConfig> = {
    projects: {
        table: "portfolio_projects",
        title: "Projects",
        listFields: ["title", "duration"],
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "slug", label: "Slug (URL path)", type: "text", required: true, placeholder: "my-project" },
            { name: "description", label: "Description", type: "textarea", required: true },
            { name: "technologies", label: "Technologies (one per line)", type: "lines" },
            { name: "image", label: "Image path", type: "text", placeholder: "/image/example.svg" },
            { name: "github", label: "GitHub URL", type: "text" },
            { name: "demo", label: "Demo URL", type: "text", placeholder: "# if none" },
            { name: "overview", label: "Overview", type: "textarea" },
            { name: "features", label: "Features (one per line)", type: "lines" },
            { name: "technical_details", label: "Technical details", type: "textarea" },
            { name: "challenges", label: "Challenges (one per line)", type: "lines" },
            { name: "solutions", label: "Solutions (one per line)", type: "lines" },
            { name: "role", label: "Role", type: "text" },
            { name: "duration", label: "Duration", type: "text" },
            { name: "team_size", label: "Team size", type: "text" },
            { name: "sort_order", label: "Sort order", type: "number" },
        ],
    },
    skill_categories: {
        table: "portfolio_skill_categories",
        title: "Skill Categories",
        listFields: ["category"],
        fields: [
            { name: "category", label: "Category", type: "text", required: true },
            { name: "sort_order", label: "Sort order", type: "number" },
        ],
    },
    skills: {
        table: "portfolio_skills",
        title: "Skills",
        listFields: ["name", "level", "experience"],
        fields: [
            {
                name: "category_id",
                label: "Category",
                type: "select",
                required: true,
                optionsFrom: { table: "portfolio_skill_categories", value: "id", label: "category" },
            },
            { name: "name", label: "Name", type: "text", required: true },
            { name: "level", label: "Level (1–5)", type: "number", min: 1, max: 5 },
            { name: "experience", label: "Experience", type: "text", placeholder: "2+ years" },
            { name: "sort_order", label: "Sort order", type: "number" },
        ],
    },
    experience: {
        table: "portfolio_experience",
        title: "Experience",
        listFields: ["role", "company", "period"],
        fields: [
            { name: "role", label: "Role", type: "text", required: true },
            { name: "company", label: "Company", type: "text", required: true },
            { name: "period", label: "Period", type: "text", required: true },
            { name: "location", label: "Location", type: "text" },
            { name: "summary", label: "Summary", type: "textarea" },
            { name: "highlights", label: "Highlights (one per line)", type: "lines" },
            { name: "stack", label: "Stack (one per line)", type: "lines" },
            { name: "sort_order", label: "Sort order", type: "number" },
        ],
    },
    education: {
        table: "portfolio_education",
        title: "Education",
        listFields: ["title", "institution", "period"],
        fields: [
            { name: "period", label: "Period", type: "text", required: true },
            { name: "title", label: "Title", type: "text", required: true },
            { name: "institution", label: "Institution", type: "text", required: true },
            { name: "description", label: "Description", type: "textarea" },
            { name: "sort_order", label: "Sort order", type: "number" },
        ],
    },
    achievements: {
        table: "portfolio_achievements",
        title: "Achievements",
        listFields: ["title", "issuer", "date"],
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "issuer", label: "Issuer", type: "text" },
            { name: "date", label: "Date", type: "text", placeholder: "2026" },
            { name: "type", label: "Type", type: "select", options: ["certificate", "graduation", "award"] },
            { name: "description", label: "Description", type: "textarea" },
            { name: "image", label: "Image path", type: "text", placeholder: "/certificate/example.png" },
            { name: "link", label: "Link", type: "text" },
            { name: "sort_order", label: "Sort order", type: "number" },
        ],
    },
    ai_categories: {
        table: "portfolio_ai_categories",
        title: "AI Engineering — Categories",
        listFields: ["title", "slug"],
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "slug", label: "Slug (URL-safe, unique)", type: "text", required: true, placeholder: "ai-workflows" },
            { name: "emoji", label: "Emoji", type: "text", required: true, placeholder: "🤖" },
            {
                name: "icon",
                label: "Icon",
                type: "select",
                required: true,
                options: ["Workflow", "MessageSquareCode", "ServerCog", "Network", "FileCode2", "NotebookPen", "FlaskConical", "Compass"],
            },
            { name: "description", label: "Description", type: "textarea", required: true },
            { name: "sort_order", label: "Sort order", type: "number" },
        ],
    },
    ai_articles: {
        table: "portfolio_ai_articles",
        title: "AI Engineering — Articles",
        listFields: ["title", "category_slug", "difficulty"],
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "slug", label: "Slug (URL path)", type: "text", required: true, placeholder: "my-article" },
            { name: "description", label: "Description", type: "textarea", required: true },
            {
                name: "category_slug",
                label: "Category",
                type: "select",
                required: true,
                optionsFrom: { table: "portfolio_ai_categories", value: "slug", label: "title" },
            },
            { name: "tags", label: "Tags (one per line)", type: "lines" },
            { name: "technologies", label: "Technologies (one per line)", type: "lines" },
            { name: "published_at", label: "Published date", type: "text", required: true, placeholder: "2026-07-01" },
            { name: "updated_at", label: "Updated date (optional)", type: "text", placeholder: "2026-07-05" },
            { name: "reading_time", label: "Reading time (minutes)", type: "number", required: true },
            { name: "difficulty", label: "Difficulty", type: "select", options: ["beginner", "intermediate", "advanced"], required: true },
            { name: "author", label: "Author", type: "text", required: true },
            { name: "featured", label: "Featured", type: "boolean" },
            { name: "cover_emoji", label: "Cover emoji", type: "text", required: true, placeholder: "📝" },
            {
                name: "body",
                label: "Body (JSON array of content blocks — paragraph, heading, code, list, callout, quote, table, timeline)",
                type: "json",
                required: true,
            },
            { name: "sort_order", label: "Sort order", type: "number" },
        ],
    },
    ai_prompts: {
        table: "portfolio_ai_prompts",
        title: "AI Engineering — Prompts",
        listFields: ["title", "category"],
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "prompt_id", label: "Prompt ID (unique slug)", type: "text", required: true, placeholder: "explain-exact-line" },
            {
                name: "category",
                label: "Category",
                type: "select",
                required: true,
                options: ["backend", "api-design", "database", "code-review", "bug-fixing", "refactoring", "system-design", "learning"],
            },
            { name: "description", label: "Description", type: "textarea", required: true },
            { name: "prompt", label: "Prompt text", type: "textarea", required: true },
            { name: "expected_output", label: "Expected output", type: "textarea", required: true },
            { name: "best_practices", label: "Best practices (one per line)", type: "lines" },
            { name: "tags", label: "Tags (one per line)", type: "lines" },
            { name: "sort_order", label: "Sort order", type: "number" },
        ],
    },
    ai_snippets: {
        table: "portfolio_ai_snippets",
        title: "AI Engineering — Snippets",
        listFields: ["title", "language"],
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "snippet_id", label: "Snippet ID (unique slug)", type: "text", required: true, placeholder: "mybatis-dynamic-where" },
            { name: "language", label: "Language", type: "text", required: true, placeholder: "java" },
            { name: "code", label: "Code", type: "textarea", required: true },
            { name: "tags", label: "Tags (one per line)", type: "lines" },
            { name: "explanation", label: "Explanation", type: "textarea", required: true },
            { name: "sort_order", label: "Sort order", type: "number" },
        ],
    },
}
