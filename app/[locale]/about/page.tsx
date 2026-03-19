"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { skills } from "@/data/skills"
import { PageLayout } from "@/src/components/layout/PageLayout"
import { StatsCard } from "@/src/components/sections/about/StatsCard"
import { SkillsTab } from "@/src/components/sections/about/SkillsTab"
import { JourneyTimeline } from "@/src/components/sections/about/JourneyTimeline"
import { EducationSection } from "@/src/components/sections/education/EducationSection"
import { Certifications } from "@/src/components/sections/about/Certifications"
import { personalInfo } from "@/data/personal-info"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import Image from "next/image"
import {
    Mail,
    MapPin,
    Calendar,
    Award,
    Target,
    Code,
    Globe,
    Zap,
    Users,
    Server,
    Sparkles,
    ArrowRight
} from "lucide-react"
import type { SkillItem } from "@/src/lib/types"

export default function AboutPage() {
    const router = useRouter()
    const locale = 'en'

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }

    const coreValues = [
        { 
            icon: Code, 
            title: "Clean Code", 
            description: "Writing maintainable, readable, and efficient code that others can easily understand and build upon.",
            gradient: "from-blue-500/20 to-cyan-500/20",
            iconColor: "text-blue-500"
        },
        {
            icon: Target,
            title: "Problem Solving",
            description: "Approaching complex challenges with analytical thinking and creative solutions.",
            gradient: "from-emerald-500/20 to-teal-500/20",
            iconColor: "text-emerald-500"
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Working effectively with cross-functional teams to deliver exceptional results.",
            gradient: "from-purple-500/20 to-pink-500/20",
            iconColor: "text-purple-500"
        },
        {
            icon: Zap,
            title: "Continuous Learning",
            description: "Staying updated with the latest technologies and best practices in software development.",
            gradient: "from-amber-500/20 to-orange-500/20",
            iconColor: "text-amber-500"
        },
    ]

    const getSkillsByCategory = (category: string): SkillItem[] => {
        return skills.find(skill => skill.category.toLowerCase() === category.toLowerCase())?.items || []
    }

    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-12 md:py-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto"
                >
                    {/* Hero Section - Modernized */}
                    <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
                        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                                <Sparkles size={14} />
                                Full-Stack Specialist
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                Crafting Digital <span className="bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent">Excellence</span> through Code
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                                {personalInfo.description}
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button
                                    onClick={() => router.push(`/${locale}/contact`)}
                                    className="h-12 px-8 bg-slate-900 dark:bg-zinc-100 text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform"
                                >
                                    Work With Me
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => router.push(`/${locale}/projects`)}
                                    className="h-12 px-8 rounded-full border-2 border-slate-200 dark:border-zinc-800 font-bold hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all"
                                >
                                    Explore Projects
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="lg:col-span-4 lg:col-start-9 relative">
                            <div className="relative z-10 w-full max-w-[320px] mx-auto aspect-[4/5] rounded-[2rem] overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl">
                                <Image
                                    src={personalInfo.myImage}
                                    alt={personalInfo.fullName}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                                    <p className="text-white text-[10px] font-medium flex items-center gap-2">
                                        <MapPin size={12} className="text-teal-400" />
                                        Based in {personalInfo.location}
                                    </p>
                                </div>
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-500/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-3xl" />
                        </motion.div>
                    </div>

                    {/* Quick Stats */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
                        <StatsCard value="2+" label="Years Experience" color="text-teal-500" />
                        <StatsCard value="10+" label="Enterprise Projects" color="text-indigo-500" />
                        <StatsCard value="15+" label="Tech Stack" color="text-emerald-500" />
                        <StatsCard value="24/7" label="Creative Mind" color="text-amber-500" />
                    </motion.div>

                    {/* My Journey - New Section */}
                    <motion.div variants={itemVariants} className="mb-24">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-4xl font-bold">The Journey</h2>
                                <p className="text-slate-500 dark:text-zinc-500">My professional evolution in the IT landscape.</p>
                            </div>
                            <Badge variant="outline" className="h-7 px-4 border-teal-500/30 text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">
                                Career Path
                            </Badge>
                        </div>
                        <JourneyTimeline />
                    </motion.div>

                    {/* Academic Path */}
                    <motion.div variants={itemVariants} className="mb-24">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-4xl font-bold">Academic Path</h2>
                                <p className="text-slate-500 dark:text-zinc-500">My educational background and foundational training.</p>
                            </div>
                        </div>
                        <EducationSection />
                    </motion.div>

                    {/* Achievements & Certifications */}
                    <motion.div variants={itemVariants} className="mb-24">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-4xl font-bold">Certifications</h2>
                                <p className="text-slate-500 dark:text-zinc-500">Validation of my skills and professional growth.</p>
                            </div>
                        </div>
                        <Certifications />
                    </motion.div>

                    {/* Core Values - Modern Cards */}
                    <motion.div variants={itemVariants} className="mb-24">
                        <h2 className="text-3xl font-bold text-center mb-4">Core Principles</h2>
                        <p className="text-slate-500 dark:text-zinc-500 text-center mb-12 max-w-2xl mx-auto">
                            The fundamental values that drive my professional approach and architectural decisions.
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {coreValues.map((value, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className={`p-8 rounded-[2rem] bg-gradient-to-br ${value.gradient} border border-white dark:border-zinc-800 backdrop-blur-sm relative group overflow-hidden`}
                                >
                                    <div className="relative z-10">
                                        <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                                            <value.icon size={24} className={value.iconColor} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                        <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{value.description}</p>
                                    </div>
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <value.icon size={80} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Skills Section - Refined */}
                    <motion.div variants={itemVariants} className="mb-24">
                        <div className="text-center mb-12 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold">Technical Arsenal</h2>
                            <p className="text-slate-500 dark:text-zinc-500 max-w-2xl mx-auto">
                                A comprehensive look at the tools and technologies I use to solve complex problems.
                            </p>
                        </div>
                        <SkillsTab skills={skills} />
                    </motion.div>

                    {/* Technology Stack Visualization */}
                    <motion.div variants={itemVariants} className="mb-24">
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "Frontend", icon: Globe, cat: "Frontend", color: "text-blue-500" },
                                { title: "Backend", icon: Server, cat: "Backend", color: "text-green-500" },
                                { title: "Dev Tools", icon: Zap, cat: "Tools", color: "text-purple-500" }
                            ].map((group) => (
                                <Card key={group.title} className="p-8 rounded-[2rem] border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                                            <group.icon size={20} className={group.color} />
                                        </div>
                                        <h3 className="text-xl font-bold">{group.title}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {getSkillsByCategory(group.cat).map((skill: SkillItem) => (
                                            <Badge key={skill.name} variant="secondary" className="bg-slate-100 dark:bg-zinc-800 hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                                                {skill.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                    {/* Final CTA */}
                    <motion.div 
                        variants={itemVariants} 
                        className="p-12 md:p-24 rounded-[3rem] bg-slate-900 dark:bg-zinc-100 text-white dark:text-slate-900 text-center relative overflow-hidden"
                    >
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight">
                                Let&apos;s build something <span className="text-teal-400 dark:text-teal-600">extraordinary</span> together.
                            </h2>
                            <p className="text-slate-400 dark:text-slate-500 text-lg max-w-xl mx-auto">
                                Currently open to new opportunities and interesting collaborations. Let&apos;s discuss your next big idea.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Button
                                    onClick={() => router.push(`/${locale}/contact`)}
                                    className="h-14 px-10 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-bold text-lg group"
                                >
                                    Get In Touch
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                        {/* Background blobs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] -ml-32 -mb-32" />
                    </motion.div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
