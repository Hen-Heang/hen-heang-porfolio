import type { ReactNode } from "react"

export interface NavItem {
    id: string
    label?: string
    labelKey?: string
    icon: ReactNode
}

export interface SkillItem {
    name: string
    level: number
    experience: string
}

export interface SkillCategory {
    category: string
    items: SkillItem[]
}

export interface ApiEndpoint {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    path: string
    description: string
}

export interface Project {
    slug: string
    title: string
    description: string
    technologies: string[]
    image: string
    github?: string
    demo?: string
    featured?: boolean
    businessProblem?: string
    overview?: string
    features?: string[]
    technicalDetails?: string
    architecture?: string[]
    architectureNote?: string
    dataModel?: string[]
    apiEndpoints?: ApiEndpoint[]
    challenges?: string[]
    solutions?: string[]
    lessonsLearned?: string[]
    role?: string
    duration?: string
    teamSize?: string
}

export interface EducationItem {
    period: string
    title: string
    institution: string
    description: string
}

export interface ExperienceItem {
    role: string
    company: string
    period: string
    location?: string
    summary: string
    highlights?: string[]
    stack?: string[]
}
