"use client"

import { useMemo, useSyncExternalStore } from "react"
import { Check, Circle } from "lucide-react"

const STORAGE_KEY = "devops-roadmap-progress"
const CHANGE_EVENT = "henheang:devops-progress-change"

function subscribe(callback: () => void): () => void {
    window.addEventListener("storage", callback)
    window.addEventListener(CHANGE_EVENT, callback)
    return () => {
        window.removeEventListener("storage", callback)
        window.removeEventListener(CHANGE_EVENT, callback)
    }
}

function getSnapshot(): string {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]"
}

function getServerSnapshot(): string {
    return "[]"
}

export function useDevOpsProgress(): Set<string> {
    const serialized = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

    return useMemo(() => {
        try {
            const parsed: unknown = JSON.parse(serialized)
            return new Set(Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [])
        } catch {
            return new Set<string>()
        }
    }, [serialized])
}

export function toggleDevOpsProgress(progress: Set<string>, topicSlug: string) {
    const next = new Set(progress)
    if (next.has(topicSlug)) next.delete(topicSlug)
    else next.add(topicSlug)

    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next].sort()))
        window.dispatchEvent(new Event(CHANGE_EVENT))
    } catch {
        // Progress is a convenience; learning content remains available when storage is blocked.
    }
}

export function DevOpsProgressButton({ topicSlug }: { topicSlug: string }) {
    const progress = useDevOpsProgress()
    const complete = progress.has(topicSlug)

    return (
        <button
            type="button"
            aria-pressed={complete}
            onClick={() => toggleDevOpsProgress(progress, topicSlug)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-base font-semibold transition-colors ${
                complete
                    ? "border-success/40 bg-success/10 text-success"
                    : "border-border bg-surface text-fg-secondary hover:border-border-strong hover:text-fg"
            }`}
        >
            {complete ? <Check size={15} aria-hidden="true" /> : <Circle size={15} aria-hidden="true" />}
            {complete ? "Topic completed" : "Mark topic complete"}
        </button>
    )
}
