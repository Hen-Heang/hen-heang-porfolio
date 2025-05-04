"use client"

import { useState, useEffect } from "react"

export function useActiveSection(defaultSection = "home") {
    const [activeSection, setActiveSection] = useState(defaultSection)

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section")
            const scrollPosition = window.scrollY + 100

            sections.forEach((section) => {
                const sectionTop = section.offsetTop
                const sectionHeight = section.offsetHeight

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(section.id)
                }
            })
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return activeSection
}
