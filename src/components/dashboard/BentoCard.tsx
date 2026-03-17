"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { MouseEvent, useRef } from "react"

interface BentoCardProps {
    children: React.ReactNode
    className?: string
    hover?: boolean
    gradient?: string
    style?: React.CSSProperties
    showSpotlight?: boolean
}

export function BentoCard({ 
    children, 
    className = "", 
    hover = true, 
    gradient, 
    style,
    showSpotlight = true 
}: BentoCardProps) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const cardRef = useRef<HTMLDivElement>(null)

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    const springConfig = { damping: 20, stiffness: 150 }
    const xSpring = useSpring(mouseX, springConfig)
    const ySpring = useSpring(mouseY, springConfig)

    const spotlightBg = useTransform(
        [xSpring, ySpring],
        ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.08), transparent 80%)`
    )

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            whileHover={hover ? { y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.25)" } : undefined}
            transition={{ duration: 0.2 }}
            className={`
                bento-card relative overflow-hidden
                border rounded-[20px] md:rounded-[24px]
                transition-colors duration-200 group
                ${gradient ? `bg-gradient-to-br ${gradient}` : "bg-[#111113] hover:bg-[#141416]"}
                ${className}
            `}
            style={{ borderColor: "rgba(39, 39, 42, 0.8)", ...style }}
        >
            {/* Spotlight Layer */}
            {showSpotlight && (
                <motion.div
                    className="pointer-events-none absolute -inset-px z-0 transition duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: spotlightBg }}
                />
            )}

            {/* Content Container */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
            
            {/* Subtle Border Glow */}
            <div className="absolute inset-0 border border-white/5 rounded-[inherit] pointer-events-none" />
        </motion.div>
    )
}
