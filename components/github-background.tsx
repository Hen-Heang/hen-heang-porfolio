"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

const STAR_COUNT = 400
const STAR_SIZE = 2
const STAR_SPEED = 0.05

export default function GithubBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Only show elements after component has mounted to avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = mounted && (theme === "dark" || resolvedTheme === "dark")

    useEffect(() => {
        if (!mounted) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        // Create stars
        const stars = Array.from({ length: STAR_COUNT }).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * STAR_SIZE,
            speed: Math.random() * STAR_SPEED + 0.01,
        }))

        // Animation loop
        let animationFrameId: number

        const render = () => {
            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)

            if (isDark) {
                gradient.addColorStop(0, "#0a0426")
                gradient.addColorStop(1, "#1f0a4d")
            } else {
                gradient.addColorStop(0, "#f8fafc") // Light gray
                gradient.addColorStop(1, "#f1f5f9") // Slightly darker gray
            }

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Only draw stars and nebula in dark mode
            if (isDark) {
                // Draw stars
                stars.forEach((star) => {
                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.7})`
                    ctx.beginPath()
                    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                    ctx.fill()

                    // Move stars
                    star.y += star.speed

                    // Reset stars that go off screen
                    if (star.y > canvas.height) {
                        star.y = 0
                        star.x = Math.random() * canvas.width
                    }
                })

                // Add nebula effect
                const nebulaCount = 3
                for (let i = 0; i < nebulaCount; i++) {
                    const x = (canvas.width * (i + 0.5)) / (nebulaCount + 1)
                    const y = canvas.height * 0.5
                    const radius = Math.min(canvas.width, canvas.height) * 0.2

                    const nebulaGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)

                    if (i % 3 === 0) {
                        nebulaGradient.addColorStop(0, "rgba(147, 51, 234, 0.3)") // Purple
                        nebulaGradient.addColorStop(1, "rgba(147, 51, 234, 0)")
                    } else if (i % 3 === 1) {
                        nebulaGradient.addColorStop(0, "rgba(79, 70, 229, 0.2)") // Indigo
                        nebulaGradient.addColorStop(1, "rgba(79, 70, 229, 0)")
                    } else {
                        nebulaGradient.addColorStop(0, "rgba(219, 39, 119, 0.15)") // Pink
                        nebulaGradient.addColorStop(1, "rgba(219, 39, 119, 0)")
                    }

                    ctx.fillStyle = nebulaGradient
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                }
            } else {
                // Light mode subtle pattern
                const patternCount = 5
                for (let i = 0; i < patternCount; i++) {
                    const x = (canvas.width * (i + 0.5)) / (patternCount + 1)
                    const y = canvas.height * 0.5
                    const radius = Math.min(canvas.width, canvas.height) * 0.3

                    const patternGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
                    patternGradient.addColorStop(0, "rgba(147, 51, 234, 0.03)") // Very subtle purple
                    patternGradient.addColorStop(1, "rgba(147, 51, 234, 0)")

                    ctx.fillStyle = patternGradient
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                }
            }

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [isDark, mounted])

    return (
        <div className="absolute inset-0 -z-10">
            <canvas ref={canvasRef} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20 dark:to-purple-900/20"></div>

            {/* Only render floating elements after component has mounted to avoid hydration mismatch */}
            {mounted && (
                <>
                    {/* Floating elements - same for both light and dark modes to avoid hydration issues */}
                    <motion.div
                        className="absolute w-12 h-12 rounded-full bg-purple-400 opacity-70"
                        style={{
                            top: "30%",
                            left: "20%",
                            filter: "blur(8px)",
                            opacity: isDark ? 0.7 : 0.3,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, 10, 0],
                            rotate: [0, 10, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />

                    <motion.div
                        className="absolute w-8 h-8 rounded-full bg-indigo-500 opacity-60"
                        style={{
                            top: "60%",
                            left: "70%",
                            filter: "blur(6px)",
                            opacity: isDark ? 0.6 : 0.2,
                        }}
                        animate={{
                            y: [0, 30, 0],
                            x: [0, -15, 0],
                            rotate: [0, -15, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />

                    <motion.div
                        className="absolute w-16 h-16 rounded-full bg-pink-500 opacity-50"
                        style={{
                            top: "40%",
                            left: "80%",
                            filter: "blur(10px)",
                            opacity: isDark ? 0.5 : 0.15,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, -20, 0],
                            rotate: [0, 20, 0],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />
                </>
            )}
        </div>
    )
}
