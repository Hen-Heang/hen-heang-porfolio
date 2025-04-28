"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { personalInfo } from "@/data/personal-info"
import FadeIn from "@/components/animations/fade-in"
import TextReveal from "@/components/animations/text-reveal"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function HeroSection() {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Only show theme-dependent elements after component has mounted
    useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = mounted && (theme === "dark" || resolvedTheme === "dark")

    return (
        <div className="relative overflow-hidden">
            <div className="relative z-10 py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <TextReveal
                                text={`Hello, I'm ${personalInfo.name}`}
                                className="text-4xl md:text-5xl font-bold mb-4 text-github-text-primary glow-text"
                            />
                            <FadeIn delay={0.3} direction="up">
                                <p className="text-xl mb-6 text-github-purple-light glow-text">{personalInfo.title}</p>
                            </FadeIn>
                            <FadeIn delay={0.5} direction="up">
                                <p className="text-lg mb-8 text-github-text-secondary">{personalInfo.description}</p>
                            </FadeIn>
                            <FadeIn delay={0.7} direction="up">
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/projects" className="px-6 py-3 bg-github-purple text-white font-medium rounded-md hover:bg-github-purple-dark transition-colors">
                                        <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            View Projects
                                        </motion.span>
                                    </Link>
                                    <Link href="/contact" className="px-6 py-3 bg-transparent border border-github-purple text-github-purple-light hover:bg-github-purple/10 transition-colors rounded-md">
                                        <motion.span
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Contact Me
                                        </motion.span>
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>

                        <FadeIn delay={0.3} direction="left" className="md:w-2/5">
                            <div className="relative github-glow">
                                <motion.div
                                    animate={isDark ? { y: [0, -15, 0], rotateZ: [0, 5, 0] } : {}}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6 }}
                                    className="relative h-64 w-64 md:h-80 md:w-80 mx-auto rounded-full overflow-hidden border-4 border-github-purple/30 shadow-github-glow"
                                >
                                    <Image
                                        src={personalInfo.profileImage || "/placeholder.svg"}
                                        alt={personalInfo.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>

                                {/* Only render floating elements after component has mounted */}
                                {mounted && isDark && (
                                    <>
                                        <motion.div
                                            className="absolute w-16 h-16 rounded-full bg-github-pink-bright opacity-70"
                                            style={{
                                                top: "20%",
                                                left: "0%",
                                                filter: "blur(20px)",
                                            }}
                                            animate={{
                                                y: [0, -20, 0],
                                                x: [0, 10, 0],
                                            }}
                                            transition={{
                                                duration: 8,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "easeInOut",
                                            }}
                                        />
                                        <motion.div
                                            className="absolute w-20 h-20 rounded-full bg-github-purple-light opacity-60"
                                            style={{
                                                bottom: "10%",
                                                right: "5%",
                                                filter: "blur(25px)",
                                            }}
                                            animate={{
                                                y: [0, 30, 0],
                                                x: [0, -15, 0],
                                            }}
                                            transition={{
                                                duration: 10,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "easeInOut",
                                            }}
                                        />
                                        <motion.div
                                            className="absolute w-12 h-12 rounded-full bg-github-blue opacity-70"
                                            style={{
                                                top: "70%",
                                                right: "20%",
                                                filter: "blur(15px)",
                                            }}
                                            animate={{
                                                y: [0, -10, 0],
                                                x: [0, 20, 0],
                                            }}
                                            transition={{
                                                duration: 7,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </div>
    )
}