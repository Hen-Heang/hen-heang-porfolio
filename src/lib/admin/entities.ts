// Field/entity definitions driving the generic admin editor.
// All configs are plain serializable objects so server pages can pass them
// straight into the client editor component.

export type FieldType = "text" | "textarea" | "lines" | "number" | "select"

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
}
