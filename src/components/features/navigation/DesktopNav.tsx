"use client"

import type { NavItem } from "@/src/lib/types"

interface DesktopNavProps {
    navItems: NavItem[]
    activeSection: string
    onItemClick: (sectionId: string) => void
}

export function DesktopNav({ navItems, activeSection, onItemClick }: DesktopNavProps) {
    return (
        <nav className="hidden md:flex items-center gap-1 bg-black">
            {navItems.map((item) => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                        e.preventDefault()
                        onItemClick(item.id)
                    }}
                    className={`px-4 py-2 rounded-md transition-colors ${
                        activeSection === item.id
                            ? "bg-gray-100 dark:bg-gray-800 text-teal-500 dark:text-teal-400"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    }`}
                >
                    {item.label}
                </a>
            ))}
        </nav>
    )
}
