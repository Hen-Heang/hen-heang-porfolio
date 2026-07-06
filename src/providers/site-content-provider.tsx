"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getSiteContent } from "@/src/lib/db/portfolio"
import { profileData as defaultProfile } from "@/data/profile"
import {
    deployedProjects as defaultDeployed,
    workProjects as defaultWork,
    journey as defaultJourney,
    type BentoProject,
} from "@/data/dashboard"
import { cvData as defaultCV } from "@/data/cv-data"

export type ProfileContent = typeof defaultProfile
export type CVContent = typeof defaultCV
export interface DashboardContent {
    deployedProjects: BentoProject[]
    workProjects: typeof defaultWork
    journey: typeof defaultJourney
}

interface SiteContent {
    profile: ProfileContent
    dashboard: DashboardContent
    cv: CVContent
}

const defaults: SiteContent = {
    profile: defaultProfile,
    dashboard: {
        deployedProjects: defaultDeployed,
        workProjects: defaultWork,
        journey: defaultJourney,
    },
    cv: defaultCV,
}

const SiteContentContext = createContext<SiteContent>(defaults)

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
    const [content, setContent] = useState<SiteContent>(defaults)

    useEffect(() => {
        Promise.all([
            getSiteContent<ProfileContent>("profile"),
            getSiteContent<DashboardContent>("dashboard"),
            getSiteContent<CVContent>("cv"),
        ]).then(([profile, dashboard, cv]) => {
            setContent({
                profile: profile ?? defaults.profile,
                dashboard: dashboard ?? defaults.dashboard,
                cv: cv ?? defaults.cv,
            })
        })
    }, [])

    return (
        <SiteContentContext.Provider value={content}>
            {children}
        </SiteContentContext.Provider>
    )
}

export function useProfile(): ProfileContent {
    return useContext(SiteContentContext).profile
}

export function useDashboardContent(): DashboardContent {
    return useContext(SiteContentContext).dashboard
}

export function useCVData(): CVContent {
    return useContext(SiteContentContext).cv
}

// Same shape data/dashboard.ts `profile` derived from the profile
export function useDashboardProfile() {
    const p = useProfile()
    return {
        name: p.name,
        koreanName: p.koreanName,
        title: p.title,
        company: p.company,
        location: p.location,
        locationEmoji: p.locationEmoji,
        email: p.email,
        available: p.available,
        yearsExperience: p.yearsExperience,
        bio: p.bio,
        socials: p.socialLinks,
    }
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
