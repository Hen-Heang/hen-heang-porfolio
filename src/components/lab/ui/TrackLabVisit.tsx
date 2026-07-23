"use client"

import { useEffect } from "react"
import { recordLabVisit, type LabPath } from "@/src/lib/lab/learning-state"

/** Mounted (invisibly) on backend/devops lesson pages to record "last visited" for the homepage Continue Learning card. */
export function TrackLabVisit({ itemId, href, title, path }: { itemId: string; href: string; title: string; path: LabPath }) {
    useEffect(() => {
        recordLabVisit({ itemId, href, title, path })
    }, [itemId, href, title, path])

    return null
}
