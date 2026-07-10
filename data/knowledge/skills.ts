import { skills as staticSkills } from "@/data/skills"
import { systemStatus, currentFocus, engineeringPhilosophy } from "@/data/lab/overview"
import type { SkillCategory } from "@/src/lib/types"
import type { KnowledgeSection } from "./types"

const levelLabel = (level: number) =>
    level >= 5 ? "expert" : level === 4 ? "advanced" : level === 3 ? "intermediate" : "familiar"

/**
 * Per-category skill sections. Exposed as a builder so the live knowledge
 * layer can rebuild them from Supabase rows; the static export below is the
 * fallback when the database is unavailable.
 */
export function buildSkillSections(skills: SkillCategory[]): KnowledgeSection[] {
    return skills.map((group) => ({
        id: `skills-${group.category.toLowerCase()}`,
        category: "skills",
        title: `${group.category} skills`,
        keywords: [
            group.category.toLowerCase(),
            "skills", "technologies", "stack", "experience", "level", "proficiency",
            ...group.items.map((item) => item.name.toLowerCase()),
        ],
        content: group.items
            .map((item) => `- ${item.name} — ${levelLabel(item.level)}${item.experience ? ` (${item.experience})` : ""}`)
            .join("\n"),
    }))
}

const skillSections: KnowledgeSection[] = buildSkillSections(staticSkills)

const focusSection: KnowledgeSection = {
    id: "skills-current-focus",
    category: "skills",
    title: "Current focus and engineering philosophy",
    keywords: [
        "focus", "learning", "currently", "now", "philosophy", "approach",
        "ai", "llm", "claude", "gemini", "devops", "docker", "ci/cd", "system design",
    ],
    content: [
        `Current technical focus: ${currentFocus.join(", ")}.`,
        "",
        "Active areas (from the Engineering Lab):",
        ...systemStatus.map((s) => `- ${s.area} (${s.tech}) — ${s.status}: ${s.detail}`),
        "",
        `Engineering philosophy: "${engineeringPhilosophy}"`,
    ].join("\n"),
}

const aiToolsSection: KnowledgeSection = {
    id: "skills-ai-tools",
    category: "skills",
    title: "AI engineering and tools",
    keywords: [
        "ai", "artificial intelligence", "llm", "claude", "claude code", "gemini",
        "openai", "gpt", "prompt", "prompting", "ai engineering", "ai tools",
        "copilot", "assistant", "machine learning",
    ],
    content: [
        "Hen works with AI as an engineering collaborator, not just a code generator:",
        "- **Claude Code** and **Gemini** for AI-assisted development workflows — prompt patterns, code review, and debugging.",
        "- Built LLM features into real products: the Money Flow finance app ships an AI chat over personal spending data powered by **Google Gemini** through the Vercel AI SDK, and Hengo has an AI coach for Korean learning with four modes (free chat, message analysis, phrasing generation, spaced-repetition review).",
        "- This portfolio itself includes an AI assistant built with the **OpenAI Responses API** and the Vercel AI SDK.",
        "- Maintains a prompt library on the portfolio's AI Engineering page covering backend, API design, database, code review, bug fixing, refactoring, system design, and learning prompts.",
    ].join("\n"),
}

export function buildSkillsKnowledge(skills: SkillCategory[]): KnowledgeSection[] {
    return [...buildSkillSections(skills), focusSection, aiToolsSection]
}

export const skillsKnowledge: KnowledgeSection[] = [...skillSections, focusSection, aiToolsSection]
