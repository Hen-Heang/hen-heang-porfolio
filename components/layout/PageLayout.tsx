"use client"

import { useRouter, usePathname } from "next/navigation"
import { useThemeToggle } from "@/src/lib/hooks/useThemeToggle"
import { useActiveSection } from "@/src/lib/hooks/useActiveSection"
import { navItems } from "@/data/navigation"
import { Header } from "@/src/components/features/navigation/Header"
import { Footer } from "@/src/components/ui/Footer"

interface PageLayoutProps {
    children: React.ReactNode
    showFooter?: boolean
    className?: string
}

export function PageLayout({ children, showFooter = true, className = "" }: PageLayoutProps) {
    const router = useRouter()
    const pathname = usePathname()
    const { darkMode, toggleTheme } = useThemeToggle()
    const activeSection = useActiveSection()

    // Determine the current active section based on the pathname
    const getCurrentActiveSection = () => {
        if (pathname === "/") {
            return activeSection
        }
        if (pathname === "/about") return "about"
        if (pathname === "/projects") return "projects"
        if (pathname === "/contact") return "contact"
        return "home"
    }

    // Handle navigation consistently across all pages
    const handleNavigation = (sectionId: string) => {
        // If we're already on the target page, don't navigate
        if (pathname === "/" && sectionId === getCurrentActiveSection()) {
            return true
        }
        if (pathname === "/about" && sectionId === "about") {
            return true
        }
        if (pathname === "/projects" && sectionId === "projects") {
            return true
        }
        if (pathname === "/contact" && sectionId === "contact") {
            return true
        }

        // Navigate to specific pages
        if (sectionId === "about") {
            router.push("/about")
            return true
        }
        if (sectionId === "projects") {
            router.push("/projects")
            return true
        }
        if (sectionId === "contact") {
            router.push("/contact")
            return true
        }

        // Navigate to home page with hash
        if (sectionId === "home" || sectionId === "skills" || sectionId === "education" || sectionId === "achievements") {
            if (pathname !== "/") {
                router.push(`/#${sectionId}`)
            } else {
                // If already on home page, scroll to section
                const section = document.getElementById(sectionId)
                if (section) {
                    section.scrollIntoView({ behavior: "smooth" })
                }
            }
            return true
        }

        return false
    }

    return (
        <div className={`min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 ${className}`}>
            <Header
                navItems={navItems}
                activeSection={getCurrentActiveSection()}
                darkMode={darkMode}
                toggleTheme={toggleTheme}
                onNavItemClick={handleNavigation}
            />
            
            <main className="pt-16">
                {children}
            </main>

            {showFooter && <Footer />}
        </div>
    )
}
