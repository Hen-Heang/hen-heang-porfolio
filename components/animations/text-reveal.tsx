"use client"

import { motion } from "framer-motion"

interface TextRevealProps {
    text: string
    delay?: number
    className?: string
}

export default function TextReveal({ text, delay = 0, className = "" }: TextRevealProps) {
    const words = text.split(" ")

    const container = {
        hidden: { opacity: 0 },
        visible: () => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay },
        }),
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    }

    return (
        <motion.div className={`overflow-hidden ${className}`} variants={container} initial="hidden" animate="visible">
            {words.map((word, index) => (
                <motion.span key={index} className="inline-block mr-1" variants={child}>
                    {word}
                </motion.span>
            ))}
        </motion.div>
    )
}
