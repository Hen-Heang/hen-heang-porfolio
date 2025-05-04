"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { DesktopNav } from "./DesktopNav"
import { MobileMenu } from "./MobileMenu"
import { useRouter, usePathname } from "next/navigation"
import type { NavItem } from "@/types"

interface HeaderProps {
    navItems: NavItem[]
    activeSection: string
    darkMode: boolean
    toggleTheme: () => void
    onNavItemClick?: (sectionId: string) => boolean
}

export function Header({ navItems, activeSection, darkMode, toggleTheme, onNavItemClick }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    // Close mobile menu when pathname changes
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    const handleNavItemClick = (sectionId: string) => {
        // Close mobile menu first
        setMobileMenuOpen(false)

        // If we have a custom handler and it returns true, we're done
        if (onNavItemClick && onNavItemClick(sectionId)) {
            return
        }

        // If we're not on the home page, navigate to home with hash
        if (pathname !== "/") {
            router.push(`/#${sectionId}`)
            return
        }

        // Default behavior - scroll to section on home page
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 flex justify-between items-center h-16">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                            YN
                        </div>
                        <span className="font-bold text-xl hidden sm:block">YourName</span>
                    </div>

                    <DesktopNav navItems={navItems} activeSection={activeSection} onItemClick={handleNavItemClick} />

                    <div className="flex items-center gap-2">
                        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden rounded-full"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>

                        <Button
                            className="hidden md:flex bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0"
                            onClick={() => handleNavItemClick("contact")}
                        >
                            Contact
                        </Button>
                    </div>
                </div>
            </header>

            <MobileMenu
                isOpen={mobileMenuOpen}
                navItems={navItems}
                activeSection={activeSection}
                onItemClick={handleNavItemClick}
            />
        </>
    )
}
