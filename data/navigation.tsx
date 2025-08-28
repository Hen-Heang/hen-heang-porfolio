// data/navigation.tsx
import React from "react"
import { Code, User, Briefcase, GraduationCap, BarChart, Trophy } from 'lucide-react'
import type { NavItem } from "@/src/lib/types"

export const navItems: NavItem[] = [
    { id: "home", labelKey: "navigation.home", icon: <Code size={18} /> },
    { id: "about", labelKey: "navigation.about", icon: <User size={18} /> },
    { id: "projects", labelKey: "navigation.projects", icon: <Briefcase size={18} /> },
    { id: "skills", labelKey: "navigation.skills", icon: <BarChart size={18} /> },
    { id: "education", labelKey: "navigation.education", icon: <GraduationCap size={18} /> },
    { id: "achievements", labelKey: "navigation.achievements", icon: <Trophy size={18} /> },
]