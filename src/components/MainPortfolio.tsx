"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { useActiveSection } from "@/src/lib/hooks/useActiveSection"
import { useThemeToggle } from "@/src/lib/hooks/useThemeToggle"
import { navItems } from "@/data/navigation"
import { Header } from "@/src/components/features/navigation/Header"
import { Footer } from "@/src/components/ui/Footer"
import { useRouter } from "next/navigation"
import HeroSection from "@/src/components/sections/hero/HeroSection"
import { HHLogo } from "@/src/components/icons/HHLogo"

// Loading component for lazy-loaded sections
const SectionLoader = () => (
    <div className="w-full h-48 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-zinc-100" />
    </div>
)

// Dynamic imports for sections to improve performance
const AboutSection = dynamic(() => import("@/src/components/sections/about/AboutSection").then(mod => mod.AboutSection), {
    loading: () => <SectionLoader />,
})
const ProjectsSection = dynamic(() => import("@/src/components/sections/projects/ProjectsSection").then(mod => mod.ProjectsSection), {
    loading: () => <SectionLoader />,
})
const SkillsSection = dynamic(() => import("@/src/components/sections/skills/SkillsSection").then(mod => mod.SkillsSection), {
    loading: () => <SectionLoader />,
})
const EducationSection = dynamic(() => import("@/src/components/sections/education/EducationSection").then(mod => mod.EducationSection), {
    loading: () => <SectionLoader />,
})
const AchievementsSection = dynamic(() => import("@/src/components/sections/achievements/AchievementsSection").then(mod => mod.AchievementsSection), {
    loading: () => <SectionLoader />,
})
const BlogSection = dynamic(() => import("@/src/components/sections/blog/BlogSection").then(mod => mod.BlogSection), {
    loading: () => <SectionLoader />,
})
const ContactSection = dynamic(() => import("@/src/components/sections/contact/ContactSection").then(mod => mod.ContactSection), {
    loading: () => <SectionLoader />,
})
const ExperienceSection = dynamic(() => import("@/src/components/sections/experience/ExperienceSection").then(mod => mod.ExperienceSection), {
    loading: () => <SectionLoader />,
})

export function MainPortfolio() {
    const activeSection = useActiveSection()
    const { darkMode, toggleTheme } = useThemeToggle()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    // Simulate loading for animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    // Handle navigation to separate pages
    const handleNavigation = (sectionId: string) => {
        if (sectionId === "projects") {
            router.push("/projects")
            return true
        }
        if (sectionId === "about") {
            router.push("/about")
            return true
        }
        if (sectionId === "contact") {
            router.push("/contact")
            return true
        }
        return false
    }

    return (
        <div className="min-h-screen text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
            <AnimatePresence>
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-zinc-950">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.1, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center"
                        >
                            <HHLogo size={80} className="mb-8" />
                            <motion.h2
                                className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight"
                            >
                                Hen Heang
                            </motion.h2>
                            
                            <div className="h-1 w-48 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-zinc-900 dark:bg-zinc-100"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <Header
                navItems={navItems}
                activeSection={activeSection}
                darkMode={darkMode}
                toggleTheme={toggleTheme}
                onNavItemClick={handleNavigation}
            />

            <motion.main
                className="pt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <HeroSection />
                <AboutSection />
                <ProjectsSection />
                <ExperienceSection />
                <SkillsSection />
                <EducationSection />
                <AchievementsSection />
                <BlogSection />
                <ContactSection />
            </motion.main>

            <Footer />
        </div>
    )
}
