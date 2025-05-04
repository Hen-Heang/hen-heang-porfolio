import { useActiveSection } from "@/hooks/useActiveSection"
import { useThemeToggle } from "@/hooks/useThemeToggle"
import { navItems } from "@/data/navigation"
import { Header } from "./header/Header"

import { AboutSection } from "./about/AboutSection"
import { ProjectsSection } from "./projects/ProjectsSection"
import { EducationSection } from "./education/EducationSection"
import { ContactSection } from "./contact/ContactSection"
import { Footer } from "./shared/Footer"
import HeroSection from "@/components/hero/HeroSection";

export function PortfolioLayout() {
    const activeSection = useActiveSection()
    const { darkMode, toggleTheme } = useThemeToggle()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
            <Header navItems={navItems} activeSection={activeSection} darkMode={darkMode} toggleTheme={toggleTheme} />

            <main className="pt-16">
                <HeroSection />
                <AboutSection />
                <ProjectsSection />
                <EducationSection />
                <ContactSection />
            </main>

            <Footer />
        </div>
    )
}
