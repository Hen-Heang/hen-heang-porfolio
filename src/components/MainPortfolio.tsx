"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useActiveSection } from "@/src/lib/hooks/useActiveSection"
import { useThemeToggle } from "@/src/lib/hooks/useThemeToggle"
import { navItems } from "@/data/navigation"
import { Header } from "@/src/components/features/navigation/Header"
import { AboutSection } from "@/src/components/sections/about/AboutSection"
import { ProjectsSection } from "@/src/components/sections/projects/ProjectsSection"
import { SkillsSection } from "@/src/components/sections/skills/SkillsSection"
import { EducationSection } from "@/src/components/sections/education/EducationSection"
import { AchievementsSection } from "@/src/components/sections/achievements/AchievementsSection"
import { BlogSection } from "@/src/components/sections/blog/BlogSection"
import { ContactSection } from "@/src/components/sections/contact/ContactSection"
import { Footer } from "@/src/components/ui/Footer"
import { useRouter } from "next/navigation"
import HeroSection from "@/src/components/sections/hero/HeroSection"
import { ExperienceSection } from "@/src/components/sections/experience/ExperienceSection"

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
