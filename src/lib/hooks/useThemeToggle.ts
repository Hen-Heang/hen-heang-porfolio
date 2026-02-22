"use client"

import { useState, useEffect } from "react"

export function useThemeToggle(defaultDark = true) {
    const [darkMode, setDarkMode] = useState(defaultDark)

    useEffect(() => {
        const savedTheme = window.localStorage.getItem("theme")
        if (savedTheme === "dark") {
            setDarkMode(true)
            return
        }
        if (savedTheme === "light") {
            setDarkMode(false)
            return
        }

        setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark")
            window.localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            window.localStorage.setItem("theme", "light")
        }
    }, [darkMode])

    const toggleTheme = () => setDarkMode(!darkMode)

    return { darkMode, toggleTheme }
}
