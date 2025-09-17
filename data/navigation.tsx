// data/navigation.tsx
import React from "react"
import { Code, User, Briefcase, GraduationCap, BarChart, Trophy, BookOpen } from 'lucide-react'
import type { NavItem } from "@/src/lib/types"

export const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: <Code size={18} /> },
    { id: "about", label: "About", icon: <User size={18} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={18} /> },
    { id: "skills", label: "Skills", icon: <BarChart size={18} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={18} /> },
    { id: "achievements", label: "Achievements", icon: <Trophy size={18} /> },
    { id: "blog", label: "Blog", icon: <BookOpen size={18} /> },
]