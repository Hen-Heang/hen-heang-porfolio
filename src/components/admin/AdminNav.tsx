"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/skills", label: "Skills" },
    { href: "/admin/experience", label: "Experience" },
    { href: "/admin/education", label: "Education" },
    { href: "/admin/achievements", label: "Achievements" },
    { href: "/admin/content", label: "Site Content" },
]

export function AdminNav() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center gap-1 overflow-x-auto">
            {links.map((link) => {
                const active =
                    link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href)
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                            active
                                ? "bg-[#27272a] text-[#fafafa]"
                                : "text-[#71717a] hover:text-[#fafafa]"
                        }`}
                    >
                        {link.label}
                    </Link>
                )
            })}
        </nav>
    )
}
