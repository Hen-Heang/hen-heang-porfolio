import { describe, expect, it } from "vitest"
import { knowledgeBase, renderSections } from "@/data/knowledge"
import { keywordRetriever } from "../retrieval"
import { portfolioEvalCases } from "./portfolio-questions"

/**
 * Retrieval-only evaluation pass — no OpenAI calls, runs in every `pnpm test`.
 * Validates the retriever surfaces the right sections and facts for each
 * eval case, and that the static knowledge base never contains an
 * unverified claim. This is necessary but not sufficient: it can't check
 * what the *model* says, only what it's given to say it with — see
 * `live-model.test.ts` for the model-level pass.
 */
const fullKnowledgeText = renderSections(knowledgeBase).toLowerCase()

describe("portfolio retrieval evals", () => {
    for (const testCase of portfolioEvalCases) {
        it(`[${testCase.category}/${testCase.language ?? "en"}] ${testCase.id}`, () => {
            const retrieved = keywordRetriever.retrieve(testCase.question, knowledgeBase)
            const retrievedIds = retrieved.map((s) => s.id)
            const contextText = renderSections(retrieved).toLowerCase()

            if (testCase.expectedSectionIds?.length) {
                const hasExpected = testCase.expectedSectionIds.some((id) => retrievedIds.includes(id))
                expect(
                    hasExpected,
                    `expected one of [${testCase.expectedSectionIds.join(", ")}] for "${testCase.question}", got [${retrievedIds.join(", ")}]`,
                ).toBe(true)
            }

            for (const fact of testCase.requiredFacts ?? []) {
                expect(contextText, `expected retrieved context for "${testCase.question}" to contain "${fact}"`).toContain(fact.toLowerCase())
            }

            // Forbidden claims are checked against the whole static knowledge base,
            // not just this query's slice — the base itself must never assert them.
            for (const claim of testCase.forbiddenClaims ?? []) {
                expect(fullKnowledgeText, `expected the knowledge base to never contain "${claim}"`).not.toContain(claim.toLowerCase())
            }
        })
    }

    it("covers at least 30 cases across profile, experience, projects, skills, ai-engineering, database, security, career, resume, availability, contact, unknown, and prompt-injection", () => {
        expect(portfolioEvalCases.length).toBeGreaterThanOrEqual(30)
        const categories = new Set(portfolioEvalCases.map((c) => c.category))
        for (const required of ["profile", "experience", "projects", "skills", "ai-engineering", "database", "security", "career", "resume", "availability", "contact", "unknown", "prompt-injection"]) {
            expect(categories.has(required as never), `missing eval coverage for category "${required}"`).toBe(true)
        }
    })

    it("covers English, Korean, and Khmer questions", () => {
        const languages = new Set(portfolioEvalCases.map((c) => c.language ?? "en"))
        expect(languages.has("en")).toBe(true)
        expect(languages.has("ko")).toBe(true)
        expect(languages.has("km")).toBe(true)
    })
})
