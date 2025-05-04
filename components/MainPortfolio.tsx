"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useThemeToggle } from "@/hooks/useThemeToggle"
import { navItems } from "@/data/navigation"
import { Header } from "./header/Header"

import { AboutSection } from "./about/AboutSection"
import { ProjectsSection } from "./projects/ProjectsSection"
import { EducationSection } from "./education/EducationSection"
import { ContactSection } from "./contact/ContactSection"
import { Footer } from "./shared/Footer"
import { useRouter } from "next/navigation"
import HeroSection from "@/components/hero/HeroSection";

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
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
            <AnimatePresence>
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 dark:bg-[#0f172a]">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.2, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 mb-8 animate-pulse"></div>
                            <div className="h-2 w-48 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-teal-500 to-indigo-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.8 }}
                                ></motion.div>
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
                <EducationSection />
                <ContactSection />
            </motion.main>

            <Footer />
        </div>
    )
}
