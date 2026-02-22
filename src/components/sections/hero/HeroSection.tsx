"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Mail, MapPin, Calendar, Sparkles } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { SocialLinks } from "@/src/components/ui/SocialLinks"
import { useRouter } from "next/navigation"
import { personalInfo } from "@/data/personal-info"
import Hero3D from "./Hero3D"

const HeroSection = () => {
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
    const reduceMotion = useReducedMotion()
    const { scrollY } = useScroll()

    useEffect(() => {
        setMounted(true)
    }, [])

    const orbOffset = useTransform(scrollY, [0, 600], [0, reduceMotion ? 0 : -80])

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/40 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
            aria-label="Hero section"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-16 left-8 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl"
                    style={{ y: orbOffset }}
                    animate={reduceMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                    className="absolute bottom-16 right-8 w-52 h-52 bg-indigo-400/20 rounded-full blur-3xl"
                    animate={reduceMotion ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.5, 0.25, 0.5] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                />
            </div>

            <div className="container mx-auto px-4 py-14 relative z-10">
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center max-w-7xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="order-2 lg:order-1 text-center lg:text-left">
                        <Badge className="mb-6 px-5 py-2 text-sm font-medium bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-500/30">
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {personalInfo.title}
                            </span>
                        </Badge>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                            <span className="block text-slate-900 dark:text-white">Hello, I&apos;m</span>
                            <span className="block bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                                {personalInfo.fullName}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            {personalInfo.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                            <Button
                                size="lg"
                                className="group bg-teal-500 hover:bg-teal-600 text-white border-0 shadow-md hover:shadow-lg transition-all"
                                onClick={() => mounted && router.push("/projects")}
                            >
                                View Projects
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="border-slate-300 dark:border-slate-600 hover:border-teal-500 dark:hover:border-teal-400"
                                onClick={() => mounted && router.push("/about")}
                            >
                                About Me
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <Card className="p-4 bg-white/70 dark:bg-slate-800/60 border-slate-200/70 dark:border-slate-700/70">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                                        <MapPin className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Location</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">{personalInfo.location}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4 bg-white/70 dark:bg-slate-800/60 border-slate-200/70 dark:border-slate-700/70">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Experience</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">{personalInfo.experience}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4 bg-white/70 dark:bg-slate-800/60 border-slate-200/70 dark:border-slate-700/70">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                                        <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Email</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{personalInfo.email}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <SocialLinks />
                    </div>

                    <motion.div
                        className="order-1 lg:order-2 flex justify-center lg:justify-end w-full h-[500px]"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className="relative w-full h-full">
                            <Hero3D />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection
