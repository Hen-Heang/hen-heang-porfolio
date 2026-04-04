"use client"

import React, { useEffect, useRef, useState } from "react"
import { Menu, X, Sun, Moon, Download, Mail, Home, User, Briefcase, BarChart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import type { NavItem } from "@/src/lib/types"
import Magnetic from "@/src/components/ui/Magnetic"
import Image from "next/image"

interface HeaderProps {
    navItems: NavItem[]
    activeSection: string
    darkMode: boolean
    toggleTheme: () => void
    onNavItemClick?: (sectionId: string) => boolean
}

export function Header({ navItems, activeSection, darkMode, toggleTheme, onNavItemClick }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const firstNavLinkRef = useRef<HTMLAnchorElement | null>(null)
    const [scrolled, setScrolled] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 12)
        handleScroll()
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMobileMenuOpen(false)
            }
        }

        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [])

    useEffect(() => {
        if (mobileMenuOpen) {
            window.setTimeout(() => firstNavLinkRef.current?.focus(), 50)
        }
    }, [mobileMenuOpen])

    const handleNavItemClick = (sectionId: string) => {
        setMobileMenuOpen(false)

        if (onNavItemClick && onNavItemClick(sectionId)) {
            return
        }

        if (pathname !== "/" && !pathname.endsWith("/")) {
            router.push(`/#${sectionId}`)
            return
        }

        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: "smooth" })
        }
    }

    const handleResumeClick = () => {
        setMobileMenuOpen(false)
        router.push("/cv")
    }

    const getIcon = (id: string) => {
        const iconMap: { [key: string]: React.ReactNode } = {
            home: <Home size={16} />,
            about: <User size={16} />,
            projects: <Briefcase size={16} />,
            experience: <Briefcase size={16} />,
            skills: <BarChart size={16} />,
            contact: <Mail size={16} />,
        }

        return iconMap[id] || <Home size={16} />
    }

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-white/85 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60 shadow-sm"
                        : "bg-transparent"
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center h-20">
                        <button
                            className="justify-self-start hidden lg:inline-flex items-center gap-2 text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                            onClick={() => router.push("/")}
                            aria-label="Back to home"
                        >
                            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-indigo-500/40">
                                <Image
                                    src="/image/my_image_log.jpeg"
                                    alt="Hen Heang"
                                    width={32}
                                    height={32}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <span className="font-semibold tracking-tight">Hen Heang</span>
                        </button>

                        <nav className="hidden lg:flex items-center justify-center gap-1" role="navigation" aria-label="Main navigation">
                            {navItems.map((item) => (
                                <Magnetic key={item.id}>
                                    <motion.a
                                        href={`#${item.id}`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleNavItemClick(item.id)
                                        }}
                                        className={`relative px-4 py-2 text-sm rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                                            activeSection === item.id
                                                ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800"
                                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60"
                                        }`}
                                        aria-current={activeSection === item.id ? "page" : undefined}
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="opacity-80">{getIcon(item.id)}</span>
                                        <span>{item.label}</span>
                                        {activeSection === item.id && (
                                            <motion.span
                                                className="absolute -bottom-[2px] left-3 right-3 h-[2px] bg-zinc-900 dark:bg-zinc-100 rounded-full"
                                                layoutId="activeNavIndicator"
                                            />
                                        )}
                                    </motion.a>
                                </Magnetic>
                            ))}
                        </nav>

                        <div className="flex items-center justify-end gap-2 sm:gap-3">
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={handleResumeClick}
                                className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg transition-colors duration-200 text-sm font-medium"
                                aria-label="View CV"
                            >
                                <Download size={15} />
                                Resume
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.94 }}
                                onClick={toggleTheme}
                                className="p-2.5 rounded-lg bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800/80 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
                                aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={darkMode ? "sun" : "moon"}
                                        initial={{ opacity: 0, rotate: -20 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 20 }}
                                        transition={{ duration: 0.2 }}
                                        className="block"
                                    >
                                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="hidden md:flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-200 text-sm font-medium"
                                onClick={() => router.push("/contact")}
                                aria-label="Contact me"
                            >
                                <Mail size={15} />
                                Contact
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.94 }}
                                className="lg:hidden p-2.5 rounded-lg bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={mobileMenuOpen}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={mobileMenuOpen ? "close" : "menu"}
                                        initial={{ opacity: 0, rotate: -45 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 45 }}
                                        transition={{ duration: 0.2 }}
                                        className="block"
                                    >
                                        {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/25 z-30"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-hidden="true"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-x-0 top-20 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-700/70"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile menu"
                        >
                            <div className="container mx-auto px-4 py-4 space-y-2">
                                {navItems.map((item, index) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleNavItemClick(item.id)
                                        }}
                                        className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-200 ${
                                            activeSection === item.id
                                                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                                                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                        }`}
                                        aria-current={activeSection === item.id ? "page" : undefined}
                                        ref={index === 0 ? firstNavLinkRef : undefined}
                                    >
                                        {getIcon(item.id)}
                                        <span>{item.label}</span>
                                    </a>
                                ))}

                                <button
                                    onClick={handleResumeClick}
                                    className="w-full flex items-center gap-3 rounded-lg px-4 py-3 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                                    aria-label="View CV"
                                >
                                    <Download size={16} />
                                    View CV
                                </button>

                                <button
                                    className="w-full flex items-center gap-3 rounded-lg px-4 py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                                    onClick={() => {
                                        setMobileMenuOpen(false)
                                        router.push("/contact")
                                    }}
                                    aria-label="Contact me"
                                >
                                    <Mail size={16} />
                                    Contact Me
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="h-20" />
        </>
    )
}
