import type {
    BackendBlock,
    BackendNarrativeItem,
    BackendSection,
    BackendSource,
} from "@/src/lib/types/backend-engineering"

export interface NarrativeSectionsInput {
    whatItIs: string
    whyItMatters: string
    howItWorks: BackendBlock[]
    simpleExample: BackendBlock[]
    backendExample: BackendBlock[]
    productionExample: BackendBlock[]
    commonMistakes: string[]
    bestPractices: string[]
    tradeOffs: BackendBlock[]
    interviewQuestions: string[]
    handsOnTask: BackendBlock[]
    relatedTopics: string[]
    sources: BackendSource[]
}

function section(id: string, title: string, blocks: BackendBlock[]): BackendSection {
    return { id, title, blocks }
}

export function createNarrativeSections(input: NarrativeSectionsInput): BackendNarrativeItem["sections"] {
    return [
        section("what-it-is", "What it is", [{ type: "paragraph", text: input.whatItIs }]),
        section("why-it-matters", "Why it matters", [{ type: "paragraph", text: input.whyItMatters }]),
        section("how-it-works", "How it works", input.howItWorks),
        section("simple-example", "Simple example", input.simpleExample),
        section("backend-example", "Backend example", input.backendExample),
        section("production-example", "Production example", input.productionExample),
        section("common-mistakes", "Common mistakes", [{ type: "list", items: input.commonMistakes }]),
        section("best-practices", "Best practices", [{ type: "list", items: input.bestPractices }]),
        section("trade-offs", "Trade-offs", input.tradeOffs),
        section("interview-questions", "Interview questions", [{ type: "list", items: input.interviewQuestions }]),
        section("hands-on-task", "Hands-on task", input.handsOnTask),
        section("related-topics", "Related topics", [{ type: "list", items: input.relatedTopics }]),
        section("references", "References", [{
            type: "list",
            items: input.sources.map((sourceItem) => `${sourceItem.publisher}: ${sourceItem.title} — ${sourceItem.url}`),
        }]),
    ]
}
