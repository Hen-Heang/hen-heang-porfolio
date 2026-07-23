import { describe, expect, it } from "vitest"
import { computeContinueLearning, type ContinueLearningInput, type ContinueLearningItem } from "./continue-learning"

const backendItem: ContinueLearningItem = { id: "b1", title: "Spring Security and JWT Authentication", href: "/lab/backend/b1", metaLabel: "Backend Engineering · Level 6" }
const devopsItem: ContinueLearningItem = { id: "d1", title: "Dockerizing a Spring Boot app", href: "/lab/devops/topics/d1", metaLabel: "DevOps Basics" }

const base: ContinueLearningInput = {
    backendDone: 0,
    backendTotal: 18,
    devopsDone: 0,
    devopsTotal: 10,
    lastVisitedCompleted: false,
}

describe("computeContinueLearning", () => {
    it("returns start-here with no progress and nothing visited", () => {
        expect(computeContinueLearning(base)).toEqual({ mode: "start-here" })
    })

    it("recommends the next incomplete backend item by default", () => {
        const result = computeContinueLearning({ ...base, nextBackend: backendItem, backendDone: 5 })
        expect(result).toMatchObject({ mode: "continue", source: "next-in-path", path: "backend", item: backendItem, completed: 5, total: 18 })
    })

    it("falls back to DevOps when there is no next backend item", () => {
        const result = computeContinueLearning({ ...base, nextDevOps: devopsItem, devopsDone: 2 })
        expect(result).toMatchObject({ mode: "continue", source: "next-in-path", path: "devops", item: devopsItem })
    })

    it("prefers an unfinished last-visited item over the default next-in-path item", () => {
        const result = computeContinueLearning({
            ...base,
            nextBackend: backendItem,
            nextDevOps: devopsItem,
            lastVisitedPath: "devops",
            lastVisitedItem: devopsItem,
            lastVisitedCompleted: false,
        })
        expect(result).toMatchObject({ mode: "continue", source: "last-visited", path: "devops", item: devopsItem })
    })

    it("ignores a last-visited item that has since been completed", () => {
        const result = computeContinueLearning({
            ...base,
            nextBackend: backendItem,
            lastVisitedPath: "devops",
            lastVisitedItem: devopsItem,
            lastVisitedCompleted: true,
        })
        expect(result).toMatchObject({ mode: "continue", source: "next-in-path", path: "backend" })
    })

    it("respects an explicitly selected DevOps path over the default backend recommendation", () => {
        const result = computeContinueLearning({ ...base, nextBackend: backendItem, nextDevOps: devopsItem, selectedPath: "devops" })
        expect(result).toMatchObject({ mode: "continue", path: "devops", item: devopsItem })
    })

    it("reports all-caught-up when there is real progress but nothing left to continue", () => {
        const result = computeContinueLearning({ ...base, backendDone: 18, devopsDone: 10 })
        expect(result).toEqual({ mode: "all-caught-up" })
    })
})
