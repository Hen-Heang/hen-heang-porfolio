"use client"

import React from "react"
import { motion, useReducedMotion } from "framer-motion"

interface RevealProps {
    delay?: number
    className?: string
    children: React.ReactNode
}

/**
 * Gently moves content into place as it enters the viewport. Content remains
 * fully visible before animation so it is never lost when observers or JS fail.
 */
export function Reveal({ delay = 0, className, children }: RevealProps) {
    const reduceMotion = useReducedMotion()

    if (reduceMotion) {
        return <div className={className}>{children}</div>
    }

    return (
        <motion.div
            className={className}
            initial={{ y: 14 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-32px" }}
            transition={{ duration: 0.35, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            {children}
        </motion.div>
    )
}
