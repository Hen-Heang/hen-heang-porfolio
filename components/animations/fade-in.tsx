"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FadeInProps {
    children: ReactNode
    delay?: number
    direction?: "up" | "down" | "left" | "right" | "none"
    duration?: number
    className?: string
}

export default function FadeIn({ children, delay = 0, direction = "up", duration = 0.5, className = "" }: FadeInProps) {
    const directionOffset = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
        none: { x: 0, y: 0 },
    }

    const initial = {
        opacity: 0,
        ...directionOffset[direction],
    }

    return (
        <motion.div
            initial={initial}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
