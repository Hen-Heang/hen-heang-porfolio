"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, X, Sun, Moon, Download, Mail, Home, User, Briefcase, BarChart, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import type { NavItem } from "@/src/lib/types"
import Magnetic from "@/src/components/ui/Magnetic"

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

    const handleDownloadResume = async () => {
        try {
            const response = await fetch("/api/download-resume")
            if (!response.ok) {
                throw new Error("Failed to download")
            }

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = "Hen_Heang_CV.pdf"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch {
            window.open("/Hen_Heang_Personal Application Form_KO_EN.pdf", "_blank", "noopener,noreferrer")
        }
    }

    const getIcon = (id: string) => {
        const iconMap: { [key: string]: JSX.Element } = {
            home: <Home size={16} />,
            about: <User size={16} />,
            projects: <Briefcase size={16} />,
            experience: <Briefcase size={16} />,
            skills: <BarChart size={16} />,
            blog: <BookOpen size={16} />,
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
                            className="justify-self-start hidden lg:inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                            onClick={() => router.push("/")}
                            aria-label="Back to home"
                        >
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
                                                ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/25"
                                                : "text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
                                        }`}
                                        aria-current={activeSection === item.id ? "page" : undefined}
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="opacity-80">{getIcon(item.id)}</span>
                                        <span>{item.label}</span>
                                        {activeSection === item.id && (
                                            <motion.span
                                                className="absolute -bottom-[2px] left-3 right-3 h-[2px] bg-teal-500 rounded-full"
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
                                onClick={handleDownloadResume}
                                className="hidden md:flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                                aria-label="Download resume"
                            >
                                <Download size={15} />
                                Resume
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.94 }}
                                onClick={toggleTheme}
                                className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200"
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
                                className="hidden md:flex items-center gap-2 px-4 py-2 border border-teal-500 text-teal-600 dark:text-teal-400 rounded-lg hover:bg-teal-500 hover:text-white transition-colors duration-200 text-sm font-medium"
                                onClick={() => handleNavItemClick("contact")}
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
                                                ? "bg-teal-500 text-white"
                                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        }`}
                                        aria-current={activeSection === item.id ? "page" : undefined}
                                        ref={index === 0 ? firstNavLinkRef : undefined}
                                    >
                                        {getIcon(item.id)}
                                        <span>{item.label}</span>
                                    </a>
                                ))}

                                <button
                                    onClick={handleDownloadResume}
                                    className="w-full flex items-center gap-3 rounded-lg px-4 py-3 bg-teal-500 text-white"
                                    aria-label="Download resume"
                                >
                                    <Download size={16} />
                                    Download Resume
                                </button>

                                <button
                                    className="w-full flex items-center gap-3 rounded-lg px-4 py-3 border border-teal-500 text-teal-600 dark:text-teal-400"
                                    onClick={() => handleNavItemClick("contact")}
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
