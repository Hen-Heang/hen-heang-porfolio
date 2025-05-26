"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { skills } from "@/data/skills"
import { navItems } from "@/data/navigation"
import { useThemeToggle } from "@/hooks/useThemeToggle"
import { useState } from "react"
import { StatsCard } from "@/components/about/StatsCard"
import { SkillsTab } from "@/components/about/SkillsTab"
import { Header } from "@/components/header/Header"
import { Footer } from "@/components/shared/Footer"
import { personalInfo } from "@/data/personal-info"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
    Download,
    Mail,
    MapPin,
    Calendar,
    Award,
    Target,
    Heart,
    Coffee,
    Code,
    Briefcase,
    GraduationCap,
    Star,
} from "lucide-react"

export default function AboutPage() {
    const router = useRouter()
    const { darkMode, toggleTheme } = useThemeToggle()
    const [activeSection] = useState("about")

    // Handle navigation
    const handleNavigation = (sectionId: string) => {
        if (sectionId === "about") {
            return true // Already on about page
        }
        if (sectionId === "projects") {
            router.push("/projects")
            return true
        }
        if (sectionId === "contact") {
            router.push("/contact")
            return true
        }
        if (sectionId === "home" || sectionId === "education") {
            router.push(`/#${sectionId}`)
            return true
        }
        return false
    }

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

    const interests = [
        { icon: Code, label: "Clean Code", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
        {
            icon: Coffee,
            label: "Coffee Lover",
            color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
        },
        {
            icon: Target,
            label: "Problem Solving",
            color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        },
        { icon: Heart, label: "Open Source", color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
    ]

    const achievements = [
        { icon: Award, title: "Best Intern", description: "Outstanding performance during internship" },
        { icon: Star, title: "Quick Learner", description: "Rapidly adapted to new technologies" },
        { icon: Target, title: "Goal Oriented", description: "Consistently meets project deadlines" },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-900 dark:text-gray-100">
            <Header
                navItems={navItems}
                activeSection={activeSection}
                darkMode={darkMode}
                toggleTheme={toggleTheme}
                onNavItemClick={handleNavigation}
            />

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <Badge className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-400/20">
              <span className="relative flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                About Me
              </span>
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                            Get to Know Me Better
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            I&#39;m a passionate web developer who loves creating digital experiences that make a difference.
                        </p>
                    </motion.div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        {/* Profile Image & Quick Info */}
                        <motion.div variants={itemVariants} className="lg:col-span-1">
                            <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                                <CardContent className="p-0">
                                    <div className="relative mb-6">
                                        <motion.div
                                            className="w-full aspect-square rounded-2xl bg-gradient-to-br from-teal-500 to-indigo-500 blur-2xl opacity-20 absolute -inset-4"
                                            animate={{
                                                scale: [1, 1.05, 1],
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "easeInOut",
                                            }}
                                        />
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-blue-500 to-indigo-500 rounded-2xl p-1">
                                                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
                                                    <Image
                                                        src={personalInfo.myImage || "/placeholder.svg"}
                                                        alt={personalInfo.name}
                                                        fill
                                                        className="object-cover hover:scale-110 transition-transform duration-500"
                                                        priority
                                                        sizes="400px"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Info Cards */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                                                <MapPin className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Location</p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">Phnom Penh, Cambodia</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Experience</p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">1.5+ Years</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                <Briefcase className="h-4 w-4 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Status</p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">Available for Work</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Buttons */}
                                    <div className="mt-6 space-y-3">
                                        <Button className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white">
                                            <Mail className="mr-2 h-4 w-4" />
                                            Get in Touch
                                        </Button>
                                        <Button variant="outline" className="w-full">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Resume
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Story & Details */}
                        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
                            <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                                <CardContent className="p-0">
                                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <div className="p-2 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-lg">
                                            <GraduationCap className="h-6 w-6 text-white" />
                                        </div>
                                        My Story
                                    </h2>
                                    <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                                        <p>
                                            I'm a passionate web application developer with a strong foundation in both frontend and backend
                                            technologies. My journey in web development began with a curiosity about how interactive websites
                                            work, which led me to pursue formal education in computer science and specialized training in
                                            modern web technologies.
                                        </p>
                                        <p>
                                            Throughout my career, I've focused on building scalable, maintainable web applications that solve
                                            real-world problems. I enjoy the challenge of translating complex business requirements into
                                            elegant technical solutions, always keeping the end user's experience at the forefront of my
                                            development process.
                                        </p>
                                        <p>
                                            When I&#39;m not coding, I stay current with emerging technologies and best practices through
                                            continuous learning, contributing to open-source projects, and participating in developer
                                            communities.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Interests */}
                            <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                                <CardContent className="p-0">
                                    <h3 className="text-2xl font-bold mb-4">What I Love</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {interests.map((interest, index) => (
                                            <motion.div
                                                key={interest.label}
                                                className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className={`p-2 rounded-lg ${interest.color}`}>
                                                    <interest.icon className="h-4 w-4" />
                                                </div>
                                                <span className="font-medium text-sm">{interest.label}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Stats Section */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatsCard value="1.5+" label="Years of experience" color="text-teal-500 dark:text-teal-400" />
                            <StatsCard value="4+" label="Completed projects" color="text-indigo-500 dark:text-indigo-400" />
                            <StatsCard value="5+" label="Tech stack mastery" color="text-amber-500 dark:text-amber-400" />
                            <StatsCard value="100%" label="Client satisfaction" color="text-green-500 dark:text-green-400" />
                        </div>
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <Card className="p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                            <CardContent className="p-0">
                                <h2 className="text-3xl font-bold mb-8 text-center">My Technical Skills</h2>
                                <SkillsTab skills={skills} />
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Achievements */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <Card className="p-8 bg-gradient-to-br from-teal-500 to-indigo-500 text-white shadow-xl">
                            <CardContent className="p-0">
                                <h2 className="text-3xl font-bold mb-8 text-center">Key Achievements</h2>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {achievements.map((achievement) => (
                                        <motion.div
                                            key={achievement.title}
                                            className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <achievement.icon className="h-8 w-8" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                                            <p className="text-blue-100">{achievement.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Professional Journey */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <Card className="p-8 bg-slate-900 text-white shadow-xl">
                            <CardContent className="p-0">
                                <h2 className="text-3xl font-bold mb-8 text-center">My Professional Journey</h2>

                                <div className="relative">
                                    {/* Timeline line */}
                                    <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-indigo-500 hidden sm:block"></div>

                                    {/* Current Position */}
                                    <div className="relative mb-12">
                                        <div className="flex flex-col sm:flex-row">
                                            <div className="relative mb-4 sm:mb-0">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-indigo-500 flex items-center justify-center z-10 relative mx-auto sm:mx-0 shadow-lg"
                                                >
                                                    <Code className="h-6 w-6 text-white" />
                                                </motion.div>
                                            </div>
                                            <div className="sm:ml-8 text-center sm:text-left">
                                                <Badge className="mb-2 bg-teal-500/20 text-teal-300 border-teal-400/30">2024 - Present</Badge>
                                                <h3 className="text-2xl font-bold mb-2">Junior Web Application Developer</h3>
                                                <h4 className="text-teal-400 mb-4 text-lg">KOSIGN (Cambodia) Investment Co., Ltd.</h4>
                                                <p className="text-gray-300 mb-4 leading-relaxed">
                                                    Currently working as a Junior Web Application Developer, focusing on building and maintaining
                                                    web applications using Spring Boot and Next.js. Collaborating with cross-functional teams to
                                                    deliver high-quality software solutions that meet business requirements and user needs.
                                                </p>
                                                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                                    <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                                                        Spring Boot
                                                    </Badge>
                                                    <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                                                        Next.js
                                                    </Badge>
                                                    <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                                                        TypeScript
                                                    </Badge>
                                                    <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                                                        PostgreSQL
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Internship */}
                                    <div className="relative">
                                        <div className="flex flex-col sm:flex-row">
                                            <div className="relative mb-4 sm:mb-0">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center z-10 relative mx-auto sm:mx-0 shadow-lg"
                                                >
                                                    <GraduationCap className="h-6 w-6 text-white" />
                                                </motion.div>
                                            </div>
                                            <div className="sm:ml-8 text-center sm:text-left">
                                                <Badge className="mb-2 bg-indigo-500/20 text-indigo-300 border-indigo-400/30">2024</Badge>
                                                <h3 className="text-2xl font-bold mb-2">Internship Android Mobile Developer</h3>
                                                <h4 className="text-indigo-400 mb-4 text-lg">KOSIGN (Cambodia) Investment Co., Ltd.</h4>
                                                <p className="text-gray-300 mb-4 leading-relaxed">
                                                    Completed an intensive internship as an Android Mobile Developer, gaining hands-on experience
                                                    in developing mobile applications using Java. Worked on various projects, enhancing skills in
                                                    mobile app development, user interface design, and collaborative software development
                                                    practices.
                                                </p>
                                                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                                    <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                                                        Android
                                                    </Badge>
                                                    <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                                                        Java
                                                    </Badge>
                                                    <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                                                        UI Design
                                                    </Badge>
                                                    <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                                                        Mobile Development
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div variants={itemVariants} className="text-center">
                        <Card className="p-8 bg-gradient-to-r from-teal-500 to-indigo-500 text-white shadow-xl">
                            <CardContent className="p-0">
                                <h2 className="text-3xl font-bold mb-4">Let&#39;s Work Together</h2>
                                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                    I&#39;m always excited to take on new challenges and collaborate on innovative projects.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        size="lg"
                                        className="bg-white text-teal-600 hover:bg-blue-50"
                                        onClick={() => router.push("/contact")}
                                    >
                                        <Mail className="mr-2 h-5 w-5" />
                                        Get in Touch
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white text-white hover:bg-white hover:text-teal-600"
                                        onClick={() => router.push("/projects")}
                                    >
                                        View My Work
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>

            <Footer />
        </div>
    )
}
