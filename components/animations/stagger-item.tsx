"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggerItemProps {
    children: ReactNode
    direction?: "up" | "down" | "left" | "right" | "none"
    className?: string
}

export default function StaggerItem({ children, direction = "up", className = "" }: StaggerItemProps) {
    const directionOffset = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
        none: { x: 0, y: 0 },
    }

    const item = {
        hidden: { opacity: 0, ...directionOffset[direction] },
        show: { opacity: 1, x: 0, y: 0, transition: { type: "spring", stiffness: 100 } },
    }

    return (
        <motion.div variants={item} className={className}>
            {children}
        </motion.div>
    )
}
