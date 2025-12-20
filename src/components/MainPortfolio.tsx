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
import { LoadingDots } from "@/src/components/ui/LoadingSpinner"
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
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                        
                        {/* Background animated elements */}
                        <div className="absolute inset-0 overflow-hidden">
                            <motion.div
                                className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div
                                className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"
                                animate={{
                                    scale: [1.2, 1, 1.2],
                                    opacity: [0.6, 0.3, 0.6],
                                    rotate: [360, 180, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    delay: 2
                                }}
                            />
                        </div>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 1.2, opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="flex flex-col items-center relative z-10"
                        >
                            {/* Animated logo/profile */}
                            <motion.div
                                className="relative w-24 h-24 mb-8"
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-full h-full rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 p-1">
                                    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                                        <motion.div
                                            className="text-3xl"
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "linear"
                                            }}
                                        >
                                            👨‍💻
                                        </motion.div>
                                    </div>
                                </div>
                                
                                {/* Floating particles */}
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 bg-teal-500 rounded-full"
                                        style={{
                                            top: `${20 + (i * 10)}%`,
                                            left: `${20 + (i * 10)}%`,
                                        }}
                                        animate={{
                                            y: [-10, 10, -10],
                                            opacity: [0.3, 1, 0.3],
                                            scale: [0.5, 1, 0.5]
                                        }}
                                        transition={{
                                            duration: 2 + (i * 0.2),
                                            repeat: Number.POSITIVE_INFINITY,
                                            delay: i * 0.3,
                                            ease: "easeInOut"
                                        }}
                                    />
                                ))}
                            </motion.div>

                            {/* Loading text */}
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent mb-4"
                            >
                                Hen Heang
                            </motion.h2>

                            {/* Enhanced loading bar */}
                            <div className="h-2 w-64 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                            </div>

                            {/* Loading dots */}
                            <LoadingDots />
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
