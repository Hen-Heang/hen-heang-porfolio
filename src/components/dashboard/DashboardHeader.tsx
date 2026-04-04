"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Download } from "lucide-react"
import { profile } from "@/data/dashboard"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState, useRef } from "react"
import Magnetic from "@/src/components/ui/Magnetic"
import Image from "next/image"

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

function TelegramIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
    )
}

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
]

export function DashboardHeader() {
    const pathname = usePathname()
    const [hidden, setHidden] = useState(false)
    const { scrollY } = useScroll()
    const lastScrollY = useRef(0)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const diff = latest - lastScrollY.current
        if (latest > 50 && diff > 0) {
            setHidden(true)
        } else {
            setHidden(false)
        }
        lastScrollY.current = latest
    })

    return (
        <motion.header 
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -100, opacity: 0 }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between max-w-7xl mx-auto gap-4 sticky top-0 z-[100]"
        >
            {/* Left: Logo only */}
            <div className="shrink-0">
                <Magnetic>
                    <Link href="/" className="group block">
                        <div className="w-10 h-10 rounded-2xl overflow-hidden ring-2 ring-indigo-500/40 group-hover:ring-indigo-500/80 transition-all active:scale-95">
                            <Image
                                src="/image/my_image_log.jpeg"
                                alt="Hen Heang"
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </Link>
                </Magnetic>
            </div>

            {/* Center: Nav links */}
            <nav className="hidden lg:flex items-center gap-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-2 py-1.5 shadow-2xl">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Magnetic key={link.href}>
                            <Link
                                href={link.href}
                                className={`relative px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                                    isActive ? "text-white" : "text-[#71717a] hover:text-white"
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="header-active-pill"
                                        className="absolute inset-0 bg-white/10 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </Link>
                        </Magnetic>
                    )
                })}
            </nav>

            {/* Right: Social + CTA */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
                <div className="hidden md:flex items-center gap-1 bg-black/20 backdrop-blur-md border border-white/5 rounded-xl px-1 py-1">
                    <Magnetic>
                        <a href={profile.socials.github} target="_blank" rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white transition-all"
                            title="GitHub">
                            <GitHubIcon />
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-[#0077b5] transition-all"
                            title="LinkedIn">
                            <LinkedInIcon />
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href={profile.socials.telegram} target="_blank" rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-[#26A5E4] transition-all"
                            title="Telegram">
                            <TelegramIcon />
                        </a>
                    </Magnetic>
                </div>
                
                <Magnetic>
                    <Link
                        href="/cv"
                        className="flex items-center gap-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-[#6366f1] text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all border border-indigo-500/20 active:scale-95 shadow-lg shadow-indigo-500/5"
                        title="View CV"
                    >
                        <Download size={14} className="animate-bounce" />
                        CV
                    </Link>
                </Magnetic>
            </div>
        </motion.header>
    )
}
