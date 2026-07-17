import { describe, expect, it } from "vitest"
import { getProjectPreview } from "./project-preview"
import type { Project } from "@/src/lib/types"

function baseProject(overrides: Partial<Project> = {}): Project {
    return {
        slug: "sample",
        title: "Sample Project",
        description: "A sample project.",
        technologies: ["Next.js"],
        image: "/image/sample.png",
        ...overrides,
    }
}

describe("getProjectPreview", () => {
    it("prefers architecture when present, even alongside other preview data", () => {
        const project = baseProject({
            architecture: ["Next.js", "Spring Boot"],
            apiEndpoints: [{ method: "GET", path: "/api/v1/orders", description: "List orders" }],
            dataModel: ["orders"],
        })
        expect(getProjectPreview(project)).toEqual({
            kind: "architecture",
            layers: ["Next.js", "Spring Boot"],
            note: undefined,
        })
    })

    it("falls back to api endpoints when there is no architecture", () => {
        const project = baseProject({
            apiEndpoints: [{ method: "GET", path: "/api/v1/orders", description: "List orders" }],
            dataModel: ["orders"],
        })
        expect(getProjectPreview(project)).toEqual({
            kind: "api",
            endpoints: [{ method: "GET", path: "/api/v1/orders", description: "List orders" }],
        })
    })

    it("falls back to the data model when there is no architecture or api data", () => {
        const project = baseProject({ dataModel: ["orders", "customers"], process: [{ phase: "Plan", detail: "Scope the work" }] })
        expect(getProjectPreview(project)).toEqual({ kind: "database", tables: ["orders", "customers"] })
    })

    it("falls back to process steps as a workflow preview", () => {
        const project = baseProject({ process: [{ phase: "Plan", detail: "Scope the work" }] })
        expect(getProjectPreview(project)).toEqual({ kind: "workflow", steps: [{ phase: "Plan", detail: "Scope the work" }] })
    })

    it("falls back to the project image when no technical preview data exists", () => {
        const project = baseProject()
        expect(getProjectPreview(project)).toEqual({ kind: "image", src: "/image/sample.png", alt: "Sample Project — preview" })
    })

    it("treats empty arrays as absent so it keeps falling through the priority order", () => {
        const project = baseProject({ architecture: [], apiEndpoints: [], dataModel: [], process: [] })
        expect(getProjectPreview(project)).toEqual({ kind: "image", src: "/image/sample.png", alt: "Sample Project — preview" })
    })

    it("returns none only when even the image is missing, so callers never render an empty column", () => {
        const project = baseProject({ image: "" })
        expect(getProjectPreview(project)).toEqual({ kind: "none" })
    })
})
