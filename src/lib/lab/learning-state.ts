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

export interface RecentLabVisit {
    itemId: string
    href: string
    title: string
    path: LabPath
    visitedAt: string
}

export interface LabLearningState {
    selectedPath?: LabPath
    lastVisitedItemId?: string
    lastVisitedHref?: string
    lastVisitedTitle?: string
    lastVisitedPath?: LabPath
    lastVisitedAt?: string
    savedItemIds: string[]
    /** Most recent visits first, deduplicated by itemId, capped at 5 — powers the /lab/progress "Recently viewed" list. */
    recentlyViewed: RecentLabVisit[]
}

const MAX_RECENT = 5

const DEFAULT_STATE: LabLearningState = { savedItemIds: [], recentlyViewed: [] }

const isLabPath = (value: unknown): value is LabPath => value === "backend" || value === "devops" || value === "ai"

const isRecentVisit = (value: unknown): value is RecentLabVisit =>
    typeof value === "object" && value !== null &&
    typeof (value as RecentLabVisit).itemId === "string" &&
    typeof (value as RecentLabVisit).href === "string" &&
    typeof (value as RecentLabVisit).title === "string" &&
    isLabPath((value as RecentLabVisit).path) &&
    typeof (value as RecentLabVisit).visitedAt === "string"

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
            recentlyViewed: Array.isArray(p.recentlyViewed) ? p.recentlyViewed.filter(isRecentVisit) : [],
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

/** Records the most recently visited Lab item — called once on mount by <TrackLabVisit>. Updates both the single "last visited" (for Continue Learning) and the "recently viewed" list (for /lab/progress). */
export function recordLabVisit(entry: { itemId: string; href: string; title: string; path: LabPath }): void {
    if (typeof window === "undefined") return
    const current = parse(getSnapshot())
    const visitedAt = new Date().toISOString()
    const recentlyViewed = [
        { ...entry, visitedAt },
        ...current.recentlyViewed.filter((visit) => visit.itemId !== entry.itemId),
    ].slice(0, MAX_RECENT)

    write({
        ...current,
        lastVisitedItemId: entry.itemId,
        lastVisitedHref: entry.href,
        lastVisitedTitle: entry.title,
        lastVisitedPath: entry.path,
        lastVisitedAt: visitedAt,
        recentlyViewed,
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
