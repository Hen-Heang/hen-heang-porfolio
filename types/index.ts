// types/index.ts
import type { ReactNode } from "react"

export interface NavItem {
    id: string
    label: string
    icon: ReactNode
}

// Update: Changed from Skill to SkillCategory 
export interface SkillItem {
    name: string
    level: number
    experience: string
}

export interface SkillCategory {
    category: string
    items: SkillItem[]
}

export interface Project {
    title: string
    description: string
    technologies: string[]
    image: string
    github: string
    demo: string
}

export interface EducationItem {
    period: string
    title: string
    institution: string
    description: string
}