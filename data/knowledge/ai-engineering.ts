import type { KnowledgeSection } from "./types"

/**
 * AI-related knowledge, deliberately split into two categories the way a
 * recruiter should read them:
 *
 * 1. AI application integration — shipping LLM features inside real products.
 * 2. AI-assisted software development — using AI tools to build software.
 *
 * Every item here is verified against this repository or the projects it
 * describes (app/api/chat/route.ts, data/projects.ts, data/cv-data.ts).
 * Deliberately excluded because unverified: model training, fine-tuning,
 * building vector databases, autonomous AI agents, and LangChain — none of
 * that appears in the codebase, so none of it is claimed here.
 */
export const aiEngineeringKnowledge: KnowledgeSection[] = [
    {
        id: "ai-application-integration",
        category: "ai-engineering",
        title: "AI application integration",
        keywords: [
            "ai", "artificial intelligence", "llm", "openai", "gemini", "gpt",
            "ai feature", "ai chat", "ai integration", "ai application",
            "assistant", "chatbot", "responses api", "vercel ai sdk",
        ],
        sourceLabel: "AI Engineering page",
        sourceUrl: "https://henheang.site/ai-engineering",
        content: [
            "Heang integrates LLM features into shipped products, using the Vercel AI SDK as the integration layer:",
            "- **This portfolio's own assistant** — the chat widget you're using right now — is built on the **OpenAI Responses API** with retrieval grounded in the portfolio's own structured data, so it only answers from real Heang content.",
            "- **Money Flow** (personal finance PWA) ships an AI chat, powered by **Google Gemini**, that answers questions grounded in the user's own transaction and budget data.",
            "- **Hengo** (AI companion / Korean-learning app) has an AI Coach with four modes: free chat, message analysis, phrasing generation by formality level, and spaced-repetition review of past mistakes.",
        ].join("\n"),
    },
    {
        id: "ai-assisted-development",
        category: "ai-engineering",
        title: "AI-assisted software development",
        keywords: [
            "ai-assisted", "ai assisted", "claude", "claude code", "codex",
            "prompt", "prompting", "prompt design", "ai code review",
            "ai workflow", "development workflow", "ai tools", "productivity",
        ],
        content: [
            "Separately from building AI *into* products, Heang uses AI tools as part of how he *builds* software day to day:",
            "- **Claude Code** and **Codex** for implementation planning, code analysis, review, testing, and documentation support.",
            "- **Prompt design** as a practiced skill — he maintains a prompt library on the portfolio's AI Engineering page covering backend, API design, database, code review, bug fixing, refactoring, system design, and learning prompts.",
            "- AI-assisted code review as part of his regular workflow, alongside — not instead of — his own review and testing.",
            "",
            "This is a productivity practice, not a claimed engineering specialty: he does not do model training, fine-tuning, or machine learning engineering.",
        ].join("\n"),
    },
]
