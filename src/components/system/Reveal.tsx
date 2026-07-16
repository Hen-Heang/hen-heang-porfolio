"use client"

import React from "react"
import { motion, useReducedMotion } from "framer-motion"

interface RevealProps {
    delay?: number
    className?: string
    children: React.ReactNode
}

/**
 * Fades content up as it enters the viewport. Children stay server-rendered
 * (RSC composition); with reduced motion the wrapper is inert.
 */
export function Reveal({ delay = 0, className, children }: RevealProps) {
    const reduceMotion = useReducedMotion()

    if (reduceMotion) {
        return <div className={className}>{children}</div>
    }

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-64px" }}
            transition={{ duration: 0.45, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            {children}
        </motion.div>
    )
}
