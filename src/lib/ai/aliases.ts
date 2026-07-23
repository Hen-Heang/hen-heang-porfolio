import "server-only"

/**
 * Alias / synonym dictionary for retrieval.
 *
 * Keys are lowercase tokens as they come out of `tokenize()`; values are the
 * canonical keyword(s) that already exist in `data/knowledge/*` sections.
 * Aliasing only ever *adds* extra tokens to search with — it never removes or
 * rewrites what the user asked, and it must never map a term to a claim that
 * isn't actually backed by a knowledge section (e.g. "openai" only aliases to
 * the OpenAI Responses API assistant/Codex context, never to a claim that
 * Heang does model training).
 *
 * Includes a small set of Korean and Khmer content words so a recruiter
 * asking in their own language still retrieves the right sections even
 * though most of the knowledge base itself is written in English.
 */
export const ALIASES: Record<string, string[]> = {
    // Backend stack shorthand
    spring: ["spring boot", "backend"],
    springboot: ["spring boot", "backend"],
    mybatis: ["backend", "database"],
    postgres: ["postgresql", "database"],
    pgsql: ["postgresql", "database"],
    psql: ["postgresql", "database"],
    db: ["database"],
    databases: ["database"],
    rest: ["rest api", "rest apis"],
    api: ["rest api", "rest apis"],
    apis: ["rest api", "rest apis"],
    auth: ["authentication", "spring security"],
    jwt: ["authentication", "spring security"],
    rls: ["row level security", "database"],
    oop: ["java"],
    sql: ["database"],

    // AI-assisted engineering
    ai: ["ai engineering", "ai-assisted engineering"],
    llm: ["ai engineering", "ai-assisted engineering"],
    claude: ["claude code"],
    codex: ["codex", "ai-assisted engineering"],
    openai: ["openai responses api", "ai engineering"],
    gpt: ["openai responses api"],
    gemini: ["google gemini", "ai engineering"],
    copilot: ["ai-assisted engineering"],

    // Career / geography
    korea: ["south korea", "seoul", "bizplay"],
    seoul: ["south korea", "bizplay"],
    cambodia: ["kosign", "royal university of phnom penh", "korea software hrd center"],
    kosign: ["kosign", "cambodia"],
    bizplay: ["bizplay", "south korea"],

    // Recruiter shorthand
    cv: ["resume"],
    resume: ["resume", "cv"],
    hire: ["recruiter fit", "availability"],
    hiring: ["recruiter fit", "availability"],
    recruiter: ["recruiter fit"],
    salary: ["availability"],
    relocate: ["availability"],
    relocation: ["availability"],
    remote: ["availability"],
    visa: ["availability"],
    fullstack: ["full-stack"],
    backend: ["backend"],

    // Korean (Hangul) content words
    스프링: ["spring boot", "backend"],
    스프링부트: ["spring boot", "backend"],
    백엔드: ["backend"],
    경험: ["experience"],
    프로젝트: ["projects", "project"],
    기술: ["skills", "technologies"],
    데이터베이스: ["database"],
    이력서: ["resume", "cv"],
    연락처: ["contact"],
    연락: ["contact"],
    회사: ["experience", "company"],
    가능: ["availability"],

    // Khmer content words
    បទពិសោធន៍: ["experience"],
    ទំនាក់ទំនង: ["contact"],
    គម្រោង: ["projects", "project"],
    ជំនាញ: ["skills"],
    ក្រុមហ៊ុន: ["experience", "company"],
}

/** Expands a token list with any aliased canonical keywords, deduplicated. */
export function expandWithAliases(tokens: string[]): string[] {
    const expanded = new Set(tokens)
    for (const token of tokens) {
        const mapped = ALIASES[token]
        if (mapped) for (const term of mapped) expanded.add(term)
    }
    return [...expanded]
}
