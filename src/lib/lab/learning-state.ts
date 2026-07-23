"use client"

import { useMemo, useSyncExternalStore } from "react"

/**
 * Unified local learning state for the Engineering Lab — additive only.
 *
 * Deliberately does NOT duplicate completion data: `BackendProgress.tsx`
 * (`henheang:lab:backend:progress:v1`) and `DevOpsProgress.tsx`
 * (`devops-roadmap-progress`) remain the single source of truth for
 * completion, unchanged. Duplicating those arrays into a second store would
 * create two sources of truth that can drift out of sync; instead,
 * `ContinueLearning`/`/lab/progress` call those existing hooks directly and
 * this module only stores what doesn't already exist anywhere: which path
 * the visitor picked, what they last visited, and what they've saved.
 *
 * Because nothing here overlaps existing keys, there is nothing to migrate —
 * existing completion data is untouched by construction.
 */
const STORAGE_KEY = "henheang:lab:state:v1"
const CHANGE_EVENT = "henheang:lab-state-change"

export type LabPath = "backend" | "devops" | "ai"

export interface LabLearningState {
    selectedPath?: LabPath
    lastVisitedItemId?: string
    lastVisitedHref?: string
    lastVisitedTitle?: string
    lastVisitedPath?: LabPath
    lastVisitedAt?: string
    savedItemIds: string[]
}

const DEFAULT_STATE: LabLearningState = { savedItemIds: [] }

const isLabPath = (value: unknown): value is LabPath => value === "backend" || value === "devops" || value === "ai"

function subscribe(callback: () => void): () => void {
    window.addEventListener("storage", callback)
    window.addEventListener(CHANGE_EVENT, callback)
    return () => {
        window.removeEventListener("storage", callback)
        window.removeEventListener(CHANGE_EVENT, callback)
    }
}

function getSnapshot(): string {
    return window.localStorage.getItem(STORAGE_KEY) ?? "{}"
}

function getServerSnapshot(): string {
    return "{}"
}

function parse(serialized: string): LabLearningState {
    try {
        const parsed: unknown = JSON.parse(serialized)
        if (typeof parsed !== "object" || parsed === null) return DEFAULT_STATE
        const p = parsed as Partial<LabLearningState>
        return {
            selectedPath: isLabPath(p.selectedPath) ? p.selectedPath : undefined,
            lastVisitedItemId: typeof p.lastVisitedItemId === "string" ? p.lastVisitedItemId : undefined,
            lastVisitedHref: typeof p.lastVisitedHref === "string" ? p.lastVisitedHref : undefined,
            lastVisitedTitle: typeof p.lastVisitedTitle === "string" ? p.lastVisitedTitle : undefined,
            lastVisitedPath: isLabPath(p.lastVisitedPath) ? p.lastVisitedPath : undefined,
            lastVisitedAt: typeof p.lastVisitedAt === "string" ? p.lastVisitedAt : undefined,
            savedItemIds: Array.isArray(p.savedItemIds) ? p.savedItemIds.filter((v): v is string => typeof v === "string") : [],
        }
    } catch {
        return DEFAULT_STATE
    }
}

function write(next: LabLearningState): void {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        window.dispatchEvent(new Event(CHANGE_EVENT))
    } catch {
        // Local learning state is a convenience; content stays usable when storage is blocked.
    }
}

/** Reactive read of the full local learning state (SSR-safe: empty on the server). */
export function useLabLearningState(): LabLearningState {
    const serialized = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
    return useMemo(() => parse(serialized), [serialized])
}

/** Records the most recently visited Lab item — called once on mount by <TrackLabVisit>. */
export function recordLabVisit(entry: { itemId: string; href: string; title: string; path: LabPath }): void {
    if (typeof window === "undefined") return
    const current = parse(getSnapshot())
    write({
        ...current,
        lastVisitedItemId: entry.itemId,
        lastVisitedHref: entry.href,
        lastVisitedTitle: entry.title,
        lastVisitedPath: entry.path,
        lastVisitedAt: new Date().toISOString(),
    })
}

/** Records which learning path the visitor chose (e.g. clicking "Start Backend Path"). */
export function setSelectedLabPath(path: LabPath): void {
    if (typeof window === "undefined") return
    write({ ...parse(getSnapshot()), selectedPath: path })
}

export function toggleSavedLabItem(itemId: string): void {
    if (typeof window === "undefined") return
    const current = parse(getSnapshot())
    const set = new Set(current.savedItemIds)
    if (set.has(itemId)) set.delete(itemId)
    else set.add(itemId)
    write({ ...current, savedItemIds: [...set] })
}
