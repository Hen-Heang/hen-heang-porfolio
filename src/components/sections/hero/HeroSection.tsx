"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Mail, MapPin, Calendar, Sparkles } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { SocialLinks } from "@/src/components/ui/SocialLinks"
import { useRouter } from "next/navigation"
import { personalInfo } from "@/data/personal-info"
import { HeroImage } from "./HeroImage"

const HeroSection = () => {
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
    const reduceMotion = useReducedMotion()

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
            aria-label="Hero section"
        >
            <div className="container mx-auto px-4 py-14 relative z-10">
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center max-w-7xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="order-2 lg:order-1 text-center lg:text-left">
                        <Badge variant="outline" className="mb-6 px-5 py-2 text-sm font-medium">
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {personalInfo.title}
                            </span>
                        </Badge>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                            <span className="block text-zinc-900 dark:text-zinc-100">Hello, I&apos;m</span>
                            <span className="block text-zinc-900 dark:text-zinc-100">
                                {personalInfo.fullName}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            {personalInfo.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                            <Button
                                size="lg"
                                className="group transition-all"
                                onClick={() => mounted && router.push("/projects")}
                            >
                                View Projects
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="transition-all"
                                onClick={() => mounted && router.push("/about")}
                            >
                                About Me
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <Card className="p-4 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                                        <MapPin className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Location</p>
                                        <p className="text-xs text-zinc-600 dark:text-zinc-400">{personalInfo.location}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                                        <Calendar className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Experience</p>
                                        <p className="text-xs text-zinc-600 dark:text-zinc-400">{personalInfo.experience}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                                        <Mail className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                                    </div>
                                    <div className="min-w-0 text-left">
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Email</p>
                                        <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">{personalInfo.email}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="flex justify-center lg:justify-start">
                            <SocialLinks />
                        </div>
                    </div>

                    <motion.div
                        className="order-1 lg:order-2 flex justify-center items-center w-full min-h-[400px]"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <HeroImage />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection
