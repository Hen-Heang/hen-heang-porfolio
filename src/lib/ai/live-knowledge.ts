import "server-only"

import { getProjects, getExperience, getEducation, getSkills } from "@/src/lib/db/portfolio"
import { projects as staticProjects } from "@/data/projects"
import { experiences as staticExperiences } from "@/data/experience"
import { education as staticEducation } from "@/data/education"
import { skills as staticSkills } from "@/data/skills"
import { buildKnowledgeBase, knowledgeBase, type KnowledgeSection } from "@/data/knowledge"
import type { Project } from "@/src/lib/types"

/**
 * Live knowledge base for the AI assistant.
 *
 * The portfolio's visible content lives in Supabase (portfolio_* tables,
 * edited through the admin panel) with the data/*.ts files as fallback — the
 * assistant must answer from the same source visitors see, or it will
 * contradict the site whenever content is edited. This module rebuilds the
 * knowledge sections from Supabase, merged with the static files, and caches
 * the result briefly.
 *
 * Merge rules per category:
 * - Projects: DB rows win field-by-field, but static-only case-study fields
 *   (businessProblem, architecture, apiEndpoints, lessonsLearned, …) are kept
 *   for projects that exist in both — the DB only stores a subset. DB-only
 *   projects appear with whatever fields they have.
 * - Experience / education / skills: DB replaces static when non-empty.
 * - Any empty result or thrown error falls back to the static knowledge base,
 *   so the assistant keeps working if Supabase is down.
 */
const CACHE_TTL_MS = 5 * 60_000

let cached: { sections: KnowledgeSection[]; expiresAt: number } | null = null

const isMissing = (value: unknown): boolean =>
    value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0)

function mergeProjects(dbProjects: Project[]): Project[] {
    if (dbProjects.length === 0) return staticProjects
    const staticBySlug = new Map(staticProjects.map((p) => [p.slug, p]))
    return dbProjects.map((dbProject) => {
        const staticProject = staticBySlug.get(dbProject.slug)
        if (!staticProject) return dbProject
        const merged: Record<string, unknown> = { ...staticProject }
        for (const [key, value] of Object.entries(dbProject)) {
            if (!isMissing(value)) merged[key] = value
        }
        return merged as unknown as Project
    })
}

export async function getLiveKnowledgeBase(): Promise<KnowledgeSection[]> {
    if (cached && Date.now() < cached.expiresAt) return cached.sections

    try {
        // Each getter already returns [] on any Supabase error.
        const [projects, experiences, education, skills] = await Promise.all([
            getProjects(),
            getExperience(),
            getEducation(),
            getSkills(),
        ])

        const sections = buildKnowledgeBase({
            projects: mergeProjects(projects),
            experiences: experiences.length > 0 ? experiences : staticExperiences,
            education: education.length > 0 ? education : staticEducation,
            skills: skills.length > 0 ? skills : staticSkills,
        })

        cached = { sections, expiresAt: Date.now() + CACHE_TTL_MS }
        return sections
    } catch {
        // Unexpected failure — answer from the static knowledge base and let
        // the next request retry Supabase.
        return knowledgeBase
    }
}
