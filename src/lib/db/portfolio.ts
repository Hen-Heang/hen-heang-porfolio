import { getSupabaseClient } from '@/src/lib/supabase'
import type { Project, SkillCategory, ExperienceItem, EducationItem } from '@/src/lib/types'
import type { Achievement } from '@/data/achievements'

export async function getProjects(): Promise<Project[]> {
  const sb = getSupabaseClient()
  if (!sb) return []
  const { data, error } = await sb
    .from('portfolio_projects')
    .select('*')
    .order('sort_order')
  if (error || !data?.length) return []
  return data.map((r) => ({
    title: r.title,
    description: r.description,
    technologies: r.technologies,
    image: r.image,
    github: r.github,
    demo: r.demo,
    overview: r.overview,
    features: r.features,
    technicalDetails: r.technical_details,
    challenges: r.challenges,
    solutions: r.solutions,
    role: r.role,
    duration: r.duration,
    teamSize: r.team_size,
  }))
}

export async function getSkills(): Promise<SkillCategory[]> {
  const sb = getSupabaseClient()
  if (!sb) return []
  const { data: cats, error } = await sb
    .from('portfolio_skill_categories')
    .select('*, portfolio_skills(*)')
    .order('sort_order')
  if (error || !cats?.length) return []
  return cats.map((c) => ({
    category: c.category,
    items: (c.portfolio_skills as any[])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((s) => ({ name: s.name, level: s.level, experience: s.experience })),
  }))
}

export async function getExperience(): Promise<ExperienceItem[]> {
  const sb = getSupabaseClient()
  if (!sb) return []
  const { data, error } = await sb
    .from('portfolio_experience')
    .select('*')
    .order('sort_order')
  if (error || !data?.length) return []
  return data.map((r) => ({
    role: r.role,
    company: r.company,
    period: r.period,
    location: r.location,
    summary: r.summary,
    highlights: r.highlights,
    stack: r.stack,
  }))
}

export async function getEducation(): Promise<EducationItem[]> {
  const sb = getSupabaseClient()
  if (!sb) return []
  const { data, error } = await sb
    .from('portfolio_education')
    .select('*')
    .order('sort_order')
  if (error || !data?.length) return []
  return data.map((r) => ({
    period: r.period,
    title: r.title,
    institution: r.institution,
    description: r.description,
  }))
}

export async function getAchievements(): Promise<Achievement[]> {
  const sb = getSupabaseClient()
  if (!sb) return []
  const { data, error } = await sb
    .from('portfolio_achievements')
    .select('*')
    .order('sort_order')
  if (error || !data?.length) return []
  return data.map((r) => ({
    id: r.id,
    title: r.title,
    issuer: r.issuer,
    date: r.date,
    type: r.type as Achievement['type'],
    description: r.description,
    image: r.image,
    link: r.link,
  }))
}
