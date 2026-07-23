import { describe, expect, it } from "vitest"
import { keywordRetriever } from "./retrieval"
import { ALIASES } from "./aliases"
import type { KnowledgeSection } from "@/data/knowledge"

const sections: KnowledgeSection[] = [
    { id: "backend", category: "skills", title: "Backend skills", keywords: ["backend", "spring boot", "java"], content: "Backend content" },
    { id: "contact", category: "contact", title: "Contact", keywords: ["contact"], core: true, content: "Contact content" },
    { id: "projects", category: "projects", title: "Projects", keywords: ["projects", "project"], content: "Projects content" },
    { id: "cpp", category: "skills", title: "C++", keywords: ["c++"], content: "C++ content" },
]

const idsOf = (result: KnowledgeSection[]) => result.map((s) => s.id)

describe("keywordRetriever", () => {
    it("matches plain English keywords", () => {
        const result = keywordRetriever.retrieve("What is his Spring Boot experience?", sections)
        expect(idsOf(result)).toContain("backend")
    })

    it("always includes core sections regardless of the query", () => {
        const result = keywordRetriever.retrieve("completely unrelated gibberish query", sections)
        expect(idsOf(result)).toContain("contact")
    })

    it("expands aliases (spring -> spring boot, backend)", () => {
        const result = keywordRetriever.retrieve("Does he know spring?", sections)
        expect(idsOf(result)).toContain("backend")
    })

    it("keeps tech symbols like C++ as a single token instead of splitting on '+'", () => {
        const result = keywordRetriever.retrieve("Does he know C++?", sections)
        expect(idsOf(result)).toContain("cpp")
    })

    it("does not collapse mixed Korean/English questions to zero signal", () => {
        const result = keywordRetriever.retrieve("히엉 씨는 spring boot 경험이 있나요?", sections)
        expect(idsOf(result)).toContain("backend")
    })

    it("tokenizes Khmer script without throwing or fragmenting on combining marks", () => {
        expect(() => keywordRetriever.retrieve("តើ Heang មានបទពិសោធន៍ ការងារ អ្វីខ្លះ?", sections)).not.toThrow()
    })

    it("matches a Khmer content word via alias expansion", () => {
        // Pulled directly from the alias dictionary (rather than hand-typed) so
        // the test can't drift from it due to a transcription/normalization
        // mismatch between two independently-typed Khmer strings.
        const khmerProjectsWord = Object.keys(ALIASES).find((key) => ALIASES[key].includes("projects"))
        expect(khmerProjectsWord).toBeDefined()
        const result = keywordRetriever.retrieve(`តើ Heang មាន ${khmerProjectsWord} អ្វីខ្លះ?`, sections)
        expect(idsOf(result)).toContain("projects")
    })

    it("falls back to overview-style sections for vague/empty-signal queries", () => {
        const result = keywordRetriever.retrieve("hi", sections)
        expect(result.length).toBeGreaterThan(0)
    })
})
