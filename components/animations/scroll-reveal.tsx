"use client"

import { motion, useInView } from "framer-motion"
import { type ReactNode, useRef } from "react"

interface ScrollRevealProps {
    children: ReactNode
    threshold?: number
    direction?: "up" | "down" | "left" | "right" | "none"
    className?: string
}

export default function ScrollReveal({
                                         children,
                                         threshold = 0.1,
                                         direction = "up",
                                         className = "",
                                     }: ScrollRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: threshold })

    const directionOffset = {
        up: { y: 100 },
        down: { y: -100 },
        left: { x: 100 },
        right: { x: -100 },
        none: { x: 0, y: 0 },
    }

    const variants = {
        hidden: {
            opacity: 0,
            ...directionOffset[direction],
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}
