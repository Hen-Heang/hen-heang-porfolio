"use client"

import { createContext, useContext } from "react"
import type { z } from "zod"
import type { ProfileContentSchema, CvContentSchema } from "@/src/lib/schemas/content"

export type ProfileContent = z.infer<typeof ProfileContentSchema>
export type CVContent = z.infer<typeof CvContentSchema>

export interface SiteContent {
    profile: ProfileContent
    cv: CVContent
}

const SiteContentContext = createContext<SiteContent | null>(null)

/**
 * Content is resolved server-side (see `app/layout.tsx`, which calls the
 * fallback-aware `getSiteContent` repository functions) and handed down as
 * `initialContent` — no client fetch, no static-then-Supabase flash.
 */
export function SiteContentProvider({
    initialContent,
    children,
}: {
    initialContent: SiteContent
    children: React.ReactNode
}) {
    return <SiteContentContext.Provider value={initialContent}>{children}</SiteContentContext.Provider>
}

function useSiteContent(): SiteContent {
    const ctx = useContext(SiteContentContext)
    if (!ctx) throw new Error("useSiteContent must be used within a SiteContentProvider")
    return ctx
}

export function useProfile(): ProfileContent {
    return useSiteContent().profile
}

export function useCVData(): CVContent {
    return useSiteContent().cv
}

// Same shape data/personal-info.ts derived from the profile
export function usePersonalInfo() {
    const p = useProfile()
    return {
        name: p.name,
        fullName: p.fullName,
        title: p.title,
        description: p.description,
        profileImage: p.profileImage,
        myImage: p.myImage,
        email: p.email,
        location: p.location,
        socialLinks: p.socialLinks,
        experience: p.yearsExperience,
        ides: p.ides,
    }
}
