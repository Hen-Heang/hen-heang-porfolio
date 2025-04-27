"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isDark = theme === "dark" || resolvedTheme === "dark"

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2 rounded-full bg-github-purple/20 text-github-purple-light focus:outline-none shadow-github"
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun size={20} className="text-github-pink-bright" />
            ) : (
                <Moon size={20} className="text-github-purple" />
            )}
        </motion.button>
    )
}
