import { describe, expect, it } from "vitest"
import { classifyComplexity, selectModel } from "./models"

describe("classifyComplexity", () => {
    it("routes simple factual questions to the default tier", () => {
        expect(classifyComplexity("Where is Heang based?")).toBe("default")
        expect(classifyComplexity("What technologies does he use?")).toBe("default")
        expect(classifyComplexity("How can I contact him?")).toBe("default")
        expect(classifyComplexity("Does he use Spring Boot?")).toBe("default")
    })

    it("routes comparison/evaluation/architecture questions to the deep tier", () => {
        expect(classifyComplexity("Compare Heang's strongest backend projects.")).toBe("deep")
        expect(classifyComplexity("Why would Heang fit our financial-platform team?")).toBe("deep")
        expect(classifyComplexity("Evaluate his experience against this backend role.")).toBe("deep")
        expect(classifyComplexity("Explain the architecture and trade-offs of H-Phsar.")).toBe("deep")
        expect(classifyComplexity("Summarize his strongest professional evidence.")).toBe("deep")
    })

    it("routes very long or compound questions to the deep tier", () => {
        const long = "Tell me everything about his background, ".repeat(10)
        expect(classifyComplexity(long)).toBe("deep")
        expect(classifyComplexity("What does he use for backend? What about the frontend stack, and which databases has he worked with?")).toBe("deep")
    })

    it("defaults empty input to the default tier", () => {
        expect(classifyComplexity("")).toBe("default")
    })
})

describe("selectModel", () => {
    it("gives the default tier a lower reasoning effort and smaller token budget than the deep tier", () => {
        const simple = selectModel("Does he use Spring Boot?")
        const deep = selectModel("Compare Heang's strongest backend projects.")
        expect(simple.tier).toBe("default")
        expect(deep.tier).toBe("deep")
        expect(simple.maxOutputTokens).toBeLessThan(deep.maxOutputTokens)
    })
})
