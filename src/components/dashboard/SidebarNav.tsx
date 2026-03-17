"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Code2, User, BookOpen, Mail, Download, Send } from "lucide-react"
import { profile } from "@/data/dashboard"
import { motion, AnimatePresence } from "framer-motion"

function GitHubIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    )
}

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 11 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    )
}

const navLinks = [
    { label: "Home",     href: "/",         icon: Home },
    { label: "Projects", href: "/projects",  icon: Code2 },
    { label: "About",    href: "/about",     icon: User },
    { label: "Blog",     href: "/blog",      icon: BookOpen },
    { label: "Contact",  href: "/contact",   icon: Mail },
]

export function SidebarNav() {
    const pathname = usePathname()
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <aside className="fixed left-0 top-0 bottom-0 z-50 w-[70px] flex flex-col bg-[#09090b]/80 backdrop-blur-md border-r border-white/5 hidden md:flex items-center py-8">
            {/* Logo */}
            <Link href="/" className="mb-12 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-all duration-300">
                    <span className="text-white text-lg font-bold">H</span>
                </div>
            </Link>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col gap-4">
                {navLinks.map(({ label, href, icon: Icon }, index) => {
                    const isActive = pathname === href
                    return (
                        <div key={href} className="relative flex items-center">
                            <Link
                                href={href}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`relative w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 group ${
                                    isActive
                                        ? "bg-[#6366f1] text-white shadow-lg shadow-indigo-500/40"
                                        : "text-zinc-500 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </Link>

                            {/* Tooltip */}
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="absolute left-16 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs font-bold whitespace-nowrap pointer-events-none shadow-xl"
                                    >
                                        {label}
                                        {/* Tooltip Arrow */}
                                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-white/10 rotate-45" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </nav>

            {/* Bottom: Socials + CV */}
            <div className="flex flex-col gap-3 mt-auto">
                <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
                    title="GitHub"
                >
                    <GitHubIcon />
                </a>
                <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-500 hover:text-[#0A66C2] hover:bg-white/5 transition-all"
                    title="LinkedIn"
                >
                    <LinkedInIcon />
                </a>
                <a
                    href={profile.socials.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-500 hover:text-[#26A5E4] hover:bg-white/5 transition-all"
                    title="Telegram"
                >
                    <Send size={18} />
                </a>
                
                <a
                    href="/cv.pdf"
                    download
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-500/10 text-[#6366f1] hover:bg-indigo-500/20 transition-all border border-indigo-500/20 mt-2"
                    title="Download CV"
                >
                    <Download size={18} />
                </a>
            </div>
        </aside>
    )
}
