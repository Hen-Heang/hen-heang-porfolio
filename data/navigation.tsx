import React from "react"
import { Code, User, Briefcase, GraduationCap, Mail } from 'lucide-react'
import type { NavItem } from "@/types"

export const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: <Code size={18} /> },
    { id: "about", label: "About Me", icon: <User size={18} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={18} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
]