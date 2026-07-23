import type { LabPath } from "./learning-state"

export interface ContinueLearningItem {
    id: string
    title: string
    href: string
    /** e.g. "Backend Engineering · Level 6" */
    metaLabel: string
    estimatedMinutes?: number
}

export interface ContinueLearningInput {
    nextBackend?: ContinueLearningItem
    nextDevOps?: ContinueLearningItem
    backendDone: number
    backendTotal: number
    devopsDone: number
    devopsTotal: number
    lastVisitedItemId?: string
    lastVisitedPath?: LabPath
    /** Resolves the last-visited item back to a live item, or undefined if it's gone/completed-elsewhere. Kept as an input (rather than a lookup inside this function) so the function stays pure and unit-testable. */
    lastVisitedItem?: ContinueLearningItem
    lastVisitedCompleted: boolean
    selectedPath?: LabPath
}

export type ContinueLearningResult =
    | { mode: "start-here" }
    | { mode: "all-caught-up" }
    | { mode: "continue"; source: "last-visited" | "next-in-path"; path: LabPath; item: ContinueLearningItem; completed: number; total: number; roadmapHref: string }

const ROADMAP_HREF: Record<LabPath, string> = {
    backend: "/lab/backend/roadmap",
    devops: "/lab/devops",
    ai: "/ai-engineering",
}

/**
 * Pure decision logic for the homepage "Continue Learning" card. Priority:
 * 1. An unfinished last-visited item (whichever path it's in).
 * 2. The next incomplete item in the visitor's selected path.
 * 3. The next incomplete backend item (backend is the recommended default path).
 * 4. The next incomplete DevOps topic.
 * 5. "All caught up" when there's real progress but nothing left to continue.
 * 6. "Start here" when there is no progress and nothing was ever visited.
 */
export function computeContinueLearning(input: ContinueLearningInput): ContinueLearningResult {
    if (input.lastVisitedItem && !input.lastVisitedCompleted && input.lastVisitedPath) {
        const path = input.lastVisitedPath
        const { completed, total } = pathProgress(input, path)
        return { mode: "continue", source: "last-visited", path, item: input.lastVisitedItem, completed, total, roadmapHref: ROADMAP_HREF[path] }
    }

    if (input.selectedPath === "devops" && input.nextDevOps) {
        return { mode: "continue", source: "next-in-path", path: "devops", item: input.nextDevOps, completed: input.devopsDone, total: input.devopsTotal, roadmapHref: ROADMAP_HREF.devops }
    }

    if (input.nextBackend) {
        return { mode: "continue", source: "next-in-path", path: "backend", item: input.nextBackend, completed: input.backendDone, total: input.backendTotal, roadmapHref: ROADMAP_HREF.backend }
    }

    if (input.nextDevOps) {
        return { mode: "continue", source: "next-in-path", path: "devops", item: input.nextDevOps, completed: input.devopsDone, total: input.devopsTotal, roadmapHref: ROADMAP_HREF.devops }
    }

    if (input.backendDone > 0 || input.devopsDone > 0) {
        return { mode: "all-caught-up" }
    }

    return { mode: "start-here" }
}

function pathProgress(input: ContinueLearningInput, path: LabPath): { completed: number; total: number } {
    if (path === "backend") return { completed: input.backendDone, total: input.backendTotal }
    if (path === "devops") return { completed: input.devopsDone, total: input.devopsTotal }
    return { completed: 0, total: 0 }
}
