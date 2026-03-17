"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Code2, User, BookOpen, Mail, Send } from "lucide-react"
import { profile } from "@/data/dashboard"

const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Projects", href: "/projects", icon: Code2 },
    { label: "About", href: "/about", icon: User },
    { label: "Blog", href: "/blog", icon: BookOpen },
]

export function MobileDock() {
    const pathname = usePathname()

    return (
        <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4 md:hidden pointer-events-none">
            <motion.nav 
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="pointer-events-auto flex items-center gap-1 p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
            >
                {navLinks.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href
                    return (
                        <Link
                            key={href}
                            href={href}
                            className="relative flex items-center justify-center p-3 rounded-full transition-all duration-200 outline-none"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-dock"
                                    className="absolute inset-0 bg-[#6366f1] rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <Icon 
                                size={20} 
                                className={`relative z-10 transition-colors duration-200 ${
                                    isActive ? "text-white" : "text-zinc-400"
                                }`} 
                            />
                            <span className="sr-only">{label}</span>
                        </Link>
                    )
                })}
                
                {/* Vertical Divider */}
                <div className="w-px h-6 bg-white/10 mx-1" />

                {/* Telegram Link */}
                <a
                    href={profile.socials.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center p-3 rounded-full text-zinc-400 hover:text-[#26A5E4] transition-colors"
                >
                    <Send size={20} />
                    <span className="sr-only">Telegram</span>
                </a>
            </motion.nav>
        </div>
    )
}
