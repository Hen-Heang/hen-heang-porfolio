"use client"

import { Sun, Moon } from "lucide-react"
import { Button } from "@/src/components/ui/button"

interface ThemeToggleProps {
    darkMode: boolean
    toggleTheme: () => void
}

export function ThemeToggle({ darkMode, toggleTheme }: ThemeToggleProps) {
    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
    )
}
