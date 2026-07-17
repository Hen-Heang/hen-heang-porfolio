import { describe, expect, it } from "vitest"
import { activeProjects, progressItems } from "./progress"

describe("current portfolio progress", () => {
    it("keeps the homepage overview to four focus areas", () => {
        expect(progressItems).toHaveLength(4)
        expect(progressItems.map((item) => item.id)).toEqual(["backend", "devops", "ai", "korean"])
    })

    it("tracks every focus area with milestones instead of percentages", () => {
        for (const item of progressItems) {
            expect(item.subtitle.length).toBeGreaterThan(0)
            expect(item.currentFocus.length).toBeGreaterThan(0)
            expect(item.technologies.length).toBeGreaterThan(0)
            expect(item.milestones.some((milestone) => milestone.state === "current")).toBe(true)
            expect(item).not.toHaveProperty("percentage")
        }
    })

    it("shows the four active projects requested for the journey", () => {
        expect(activeProjects.map((project) => project.name)).toEqual([
            "KoriAI",
            "AuthHub",
            "Developer Portfolio",
            "Hengo",
        ])
    })
})
