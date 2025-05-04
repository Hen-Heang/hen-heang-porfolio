"use client"

import { useState, useEffect } from "react"

export function useThemeToggle(defaultDark = true) {
    const [darkMode, setDarkMode] = useState(defaultDark)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [darkMode])

    const toggleTheme = () => setDarkMode(!darkMode)

    return { darkMode, toggleTheme }
}
