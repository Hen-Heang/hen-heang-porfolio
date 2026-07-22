import type { ApiEndpoint, ProcessStep, Project } from "@/src/lib/types"

export type ProjectPreviewKind = "architecture" | "api" | "database" | "workflow" | "image" | "code" | "none"

export type ProjectPreview =
    | { kind: "architecture"; layers: string[]; note?: string }
    | { kind: "api"; endpoints: ApiEndpoint[] }
    | { kind: "database"; tables: string[] }
    | { kind: "workflow"; steps: ProcessStep[] }
    | { kind: "image"; src: string; alt: string; imageFit?: "cover" | "contain" }
    | { kind: "none" }

/**
 * Picks the best available technical preview for a project's featured panel,
 * using only data that already exists on it — never fabricated. Checked in
 * order of how technically substantive the preview is; falls back to a
 * project screenshot, and only to "none" if even that is missing.
 * `previewImage` overrides this order to force the poster image forward.
 */
export function getProjectPreview(project: Project): ProjectPreview {
    if (project.previewImage && project.image) {
        return { kind: "image", src: project.image, alt: `${project.title} — preview`, imageFit: project.imageFit }
    }
    if (project.architecture && project.architecture.length > 0) {
        return { kind: "architecture", layers: project.architecture, note: project.architectureNote }
    }
    if (project.apiEndpoints && project.apiEndpoints.length > 0) {
        return { kind: "api", endpoints: project.apiEndpoints }
    }
    if (project.dataModel && project.dataModel.length > 0) {
        return { kind: "database", tables: project.dataModel }
    }
    if (project.process && project.process.length > 0) {
        return { kind: "workflow", steps: project.process }
    }
    if (project.image) {
        return { kind: "image", src: project.image, alt: `${project.title} — preview`, imageFit: project.imageFit }
    }
    return { kind: "none" }
}
