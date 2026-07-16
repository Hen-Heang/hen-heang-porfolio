import { cache } from 'react'
import { z } from 'zod'
import { getSupabaseClient } from '@/src/lib/supabase'
import type { Project, SkillCategory, ExperienceItem, EducationItem } from '@/src/lib/types'
import type { Achievement } from '@/data/achievements'
import {
  ProjectSchema,
  SkillCategorySchema,
  ExperienceItemSchema,
  EducationItemSchema,
  AchievementSchema,
  SiteContentSchemas,
  type SiteContentKey,
} from '@/src/lib/schemas/content'

import { projects as staticProjects } from '@/data/projects'
import { skills as staticSkills } from '@/data/skills'
import { experiences as staticExperience } from '@/data/experience'
import { education as staticEducation } from '@/data/education'
import { rawAchievements as staticAchievements } from '@/data/achievements'
import { profileData as staticProfile } from '@/data/profile'
import { cvData as staticCv } from '@/data/cv-data'
import { deployedProjects as staticDeployedProjects, workProjects as staticWorkProjects, journey as staticJourney } from '@/data/dashboard'

const staticSiteContent = {
  profile: staticProfile,
  dashboard: { deployedProjects: staticDeployedProjects, workProjects: staticWorkProjects, journey: staticJourney },
  cv: staticCv,
}

/**
 * Fetches from Supabase, validates the result, and falls back to static data
 * on any failure (missing env, network error, or a shape Supabase returned
 * that no longer matches the schema) — the public site must never render
 * empty because of a Supabase outage or an admin-entered malformed row.
 */
async function withFallback<T>(
  fetchFromSupabase: () => Promise<unknown>,
  schema: z.ZodType<T>,
  fallback: T,
  label: string,
): Promise<T> {
  try {
    const raw = await fetchFromSupabase()
    if (raw == null) return fallback
    const parsed = schema.safeParse(raw)
    if (!parsed.success) {
      console.warn(`[content:${label}] Supabase data failed schema validation, using static fallback`)
      return fallback
    }
    return parsed.data
  } catch (err) {
    console.warn(`[content:${label}] Supabase fetch failed, using static fallback:`, err instanceof Error ? err.message : err)
    return fallback
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- raw Supabase row, shape enforced by ProjectSchema below
function mapProject(r: any): unknown {
  // The DB table doesn't carry the case-study columns (architecture, data
  // model, API endpoints, featured, …), so merge those from the static
  // project with the same slug — otherwise Supabase-sourced projects lose
  // their richest sections. Rows with unknown slugs simply omit them.
  const s = staticProjects.find((p) => p.slug === r.slug)
  return {
    slug: r.slug,
    title: r.title,
    description: r.description,
    technologies: r.technologies,
    image: r.image,
    github: r.github ?? undefined,
    demo: r.demo ?? undefined,
    featured: s?.featured,
    businessProblem: s?.businessProblem,
    overview: r.overview ?? undefined,
    features: r.features ?? undefined,
    technicalDetails: r.technical_details ?? undefined,
    architecture: s?.architecture,
    architectureNote: s?.architectureNote,
    dataModel: s?.dataModel,
    apiEndpoints: s?.apiEndpoints,
    challenges: r.challenges ?? undefined,
    solutions: r.solutions ?? undefined,
    lessonsLearned: s?.lessonsLearned,
    role: r.role ?? undefined,
    duration: r.duration ?? undefined,
    teamSize: r.team_size ?? undefined,
    updatedAt: r.updated_at ?? undefined,
  }
}

const ProjectListSchema = z.array(ProjectSchema)

// Memoized per-request (React `cache`) — the query result is a raw Supabase
// client call, not `fetch`, so it isn't deduped automatically; several pages
// call getProjects()/getProjectBySlug()/getAdjacentProjects() in the same
// request tree and should share one round-trip.
export const getProjects = cache(async (): Promise<Project[]> => {
  return withFallback(
    async () => {
      const sb = getSupabaseClient()
      if (!sb) return null
      const { data, error } = await sb.from('portfolio_projects').select('*').order('sort_order')
      if (error || !data?.length) return null
      return data.map(mapProject)
    },
    ProjectListSchema,
    staticProjects,
    'projects',
  )
})

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getProjects()
  return all.find((p) => p.slug === slug) ?? null
}

export async function getProjectSlugs(): Promise<string[]> {
  const all = await getProjects()
  return all.map((p) => p.slug)
}

export async function getAdjacentProjects(slug: string): Promise<{
  next: Pick<Project, 'slug' | 'title'> | null
}> {
  const all = await getProjects()
  const index = all.findIndex((p) => p.slug === slug)
  if (index === -1 || !all.length) return { next: null }
  const next = all[(index + 1) % all.length]
  return { next: next.slug === slug ? null : { slug: next.slug, title: next.title } }
}

// Memoized per-request — app/layout.tsx, app/page.tsx, and app/about/page.tsx
// each call getSiteContent("profile") in the same request; without this they'd
// be three separate Supabase round-trips for identical data.
export const getSiteContent = cache(async function getSiteContent<K extends SiteContentKey>(
  key: K,
): Promise<z.infer<(typeof SiteContentSchemas)[K]>> {
  // K isn't narrowed to a single literal inside the function body, so the schema/fallback
  // pair pulled from the keyed maps below is cast to match this call's inferred return type
  // (which the `K extends SiteContentKey` constraint already guarantees is correct for callers).
  type Content = z.infer<(typeof SiteContentSchemas)[K]>
  const schema = SiteContentSchemas[key] as z.ZodType<Content>
  const fallback = staticSiteContent[key] as Content

  return withFallback(
    async () => {
      const sb = getSupabaseClient()
      if (!sb) return null
      const { data, error } = await sb.from('portfolio_site_content').select('data').eq('key', key).maybeSingle()
      if (error || !data) return null
      return data.data
    },
    schema,
    fallback,
    `site_content:${key}`,
  )
})

const SkillCategoryListSchema = z.array(SkillCategorySchema)

export const getSkills = cache(async (): Promise<SkillCategory[]> => {
  return withFallback(
    async () => {
      const sb = getSupabaseClient()
      if (!sb) return null
      const { data: cats, error } = await sb
        .from('portfolio_skill_categories')
        .select('*, portfolio_skills(*)')
        .order('sort_order')
      if (error || !cats?.length) return null
      return cats.map((c) => ({
        category: c.category,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase's nested-select typing doesn't infer this join
        items: (c.portfolio_skills as any[])
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((s) => ({ name: s.name, level: s.level, experience: s.experience })),
      }))
    },
    SkillCategoryListSchema,
    staticSkills,
    'skills',
  )
})

const ExperienceListSchema = z.array(ExperienceItemSchema)

export const getExperience = cache(async (): Promise<ExperienceItem[]> => {
  return withFallback(
    async () => {
      const sb = getSupabaseClient()
      if (!sb) return null
      const { data, error } = await sb.from('portfolio_experience').select('*').order('sort_order')
      if (error || !data?.length) return null
      return data.map((r) => ({
        role: r.role,
        company: r.company,
        period: r.period,
        location: r.location,
        summary: r.summary,
        highlights: r.highlights,
        stack: r.stack,
      }))
    },
    ExperienceListSchema,
    staticExperience,
    'experience',
  )
})

const EducationListSchema = z.array(EducationItemSchema)

export const getEducation = cache(async (): Promise<EducationItem[]> => {
  return withFallback(
    async () => {
      const sb = getSupabaseClient()
      if (!sb) return null
      const { data, error } = await sb.from('portfolio_education').select('*').order('sort_order')
      if (error || !data?.length) return null
      return data.map((r) => ({
        period: r.period,
        title: r.title,
        institution: r.institution,
        description: r.description,
      }))
    },
    EducationListSchema,
    staticEducation,
    'education',
  )
})

const AchievementListSchema = z.array(AchievementSchema)

export const getAchievements = cache(async (): Promise<Achievement[]> => {
  return withFallback(
    async () => {
      const sb = getSupabaseClient()
      if (!sb) return null
      const { data, error } = await sb.from('portfolio_achievements').select('*').order('sort_order')
      if (error || !data?.length) return null
      return data.map((r) => ({
        id: r.id,
        title: r.title,
        issuer: r.issuer,
        date: r.date,
        type: r.type,
        description: r.description,
        image: r.image,
        link: r.link,
      }))
    },
    AchievementListSchema,
    staticAchievements,
    'achievements',
  )
})
