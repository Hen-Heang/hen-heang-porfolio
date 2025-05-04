import type { ReactNode } from "react"

export interface NavItem {
    id: string
    label: string
    icon: ReactNode
}
export interface Skill {
    category: string
    items: string[]
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
