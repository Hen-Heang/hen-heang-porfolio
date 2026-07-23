/**
 * Knowledge layer types
 * =====================
 * Every fact the AI assistant is allowed to state lives in a KnowledgeSection.
 * Sections are small, categorized markdown chunks so the retrieval layer can
 * send only what is relevant to a given question.
 *
 * The `keywords` field powers today's lightweight keyword retrieval. When this
 * is upgraded to embeddings, `content` becomes the text that gets embedded and
 * `keywords` can simply be ignored — no shape change required.
 */

export type KnowledgeCategory =
    | "profile"
    | "positioning"
    | "experience"
    | "career"
    | "projects"
    | "skills"
    | "ai-engineering"
    | "articles"
    | "contact"
    | "faq"

export interface KnowledgeSection {
    /** Stable unique id, e.g. "project-h-phsar" */
    id: string
    category: KnowledgeCategory
    /** Human-readable heading, also shown to the model */
    title: string
    /** Lowercase match terms for keyword retrieval (synonyms included) */
    keywords: string[]
    /**
     * Always include this section regardless of the question.
     * Reserved for identity-critical facts (who Heang is, how to reach him).
     */
    core?: boolean
    /** Markdown content — the only text the model may answer from */
    content: string
    /** Human-readable label for a linked source, e.g. "H-Phsar case study" */
    sourceLabel?: string
    /** URL the assistant may surface alongside this section's content */
    sourceUrl?: string
    /** ISO date the underlying fact was last verified/updated, if known */
    updatedAt?: string
    /** Project slug this section belongs to, when applicable */
    projectSlug?: string
}
