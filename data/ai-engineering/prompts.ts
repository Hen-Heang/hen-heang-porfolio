import type { PromptCategory } from "@/src/lib/types/ai-engineering"

// Fixed category enum for the prompt library UI (filter pills, badges).
// The prompts themselves are admin-editable content stored in Supabase — see src/lib/db/ai-engineering.ts.
export const promptCategoryLabels: Record<PromptCategory, string> = {
    backend: "Backend",
    "api-design": "API Design",
    database: "Database",
    "code-review": "Code Review",
    "bug-fixing": "Bug Fixing",
    refactoring: "Refactoring",
    "system-design": "System Design",
    learning: "Learning",
}
