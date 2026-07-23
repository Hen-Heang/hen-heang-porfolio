"use client"

import { Bookmark, BookmarkCheck } from "lucide-react"
import { toggleSavedLabItem, useLabLearningState } from "@/src/lib/lab/learning-state"

/** Local-only "save for later" toggle — no account, no server call. Surfaced back on /lab/progress. */
export function SaveForLaterButton({ itemId }: { itemId: string }) {
    const state = useLabLearningState()
    const saved = state.savedItemIds.includes(itemId)

    return (
        <button
            type="button"
            aria-pressed={saved}
            onClick={() => toggleSavedLabItem(itemId)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-base font-semibold transition-colors ${
                saved
                    ? "border-brand/40 bg-brand/10 text-brand"
                    : "border-border bg-surface text-fg-secondary hover:border-border-strong hover:text-fg"
            }`}
        >
            {saved ? <BookmarkCheck size={15} aria-hidden={true} /> : <Bookmark size={15} aria-hidden={true} />}
            {saved ? "Saved" : "Save for later"}
        </button>
    )
}
