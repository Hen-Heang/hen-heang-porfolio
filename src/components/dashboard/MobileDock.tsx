"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Code2, User, BookOpen, Mail, Send } from "lucide-react"
import { profile } from "@/data/dashboard"
import Magnetic from "@/src/components/ui/Magnetic"

const navLinks = [
    { label: "Home",     href: "/",        icon: Home     },
    { label: "Projects", href: "/projects", icon: Code2    },
    { label: "About",    href: "/about",    icon: User     },
    { label: "Blog",     href: "/blog",     icon: BookOpen },
    { label: "Contact",  href: "/contact",  icon: Mail     },
]

export function MobileDock() {
    const pathname = usePathname()

    return (
        <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
            <motion.nav
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="pointer-events-auto flex items-center gap-1 p-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
                {navLinks.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href
                    return (
                        <Magnetic key={href}>
                            <Link
                                href={href}
                                className="relative flex items-center justify-center p-3 rounded-full transition-all duration-200 outline-none group"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-dock"
                                        className="absolute inset-0 bg-[#6366f1] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <Icon
                                    size={20}
                                    className={`relative z-10 transition-colors duration-200 ${
                                        isActive ? "text-white" : "text-zinc-400 group-hover:text-white"
                                    }`}
                                />
                                <span className="sr-only">{label}</span>
                                
                                {/* Tooltip on Hover */}
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/5">
                                    {label}
                                </span>
                            </Link>
                        </Magnetic>
                    )
                })}

                {/* Vertical Divider */}
                <div className="w-px h-6 bg-white/10 mx-1" />

                {/* Telegram */}
                <Magnetic>
                    <a
                        href={profile.socials.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center justify-center p-3 rounded-full text-zinc-400 hover:text-[#26A5E4] transition-colors group"
                    >
                        <Send size={20} />
                        <span className="sr-only">Telegram</span>
                        
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/5">
                            Telegram
                        </span>
                    </a>
                </Magnetic>
            </motion.nav>
        </div>
    )
}
