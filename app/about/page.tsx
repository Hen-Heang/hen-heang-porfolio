"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { skills } from "@/data/skills"
import { navItems } from "@/data/navigation"
import { useThemeToggle } from "@/hooks/useThemeToggle"
import { useState } from "react"
import {StatsCard} from "@/components/about/StatsCard";
import {SkillsTab} from "@/components/about/SkillsTab";
import {Header} from "@/components/header/Header";
import {Footer} from "@/components/shared/Footer";
import {personalInfo} from "@/data/personal-info";
import Image from "next/image";


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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100">
            <Header
                navItems={navItems}
                activeSection={activeSection}
                darkMode={darkMode}
                toggleTheme={toggleTheme}
                onNavItemClick={handleNavigation}
            />

            <div className="container mx-auto px-4 py-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="md:col-span-1">
                                <div className="relative">
                                    <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-teal-500 to-indigo-500 blur-2xl opacity-20 absolute -inset-4"></div>
                                    <div className="w-full aspect-square rounded-xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden relative z-10">
                                        <Image
                                            src={personalInfo.myImage}
                                            alt={personalInfo.name}
                                            fill
                                            className="object-cover"
                                            priority
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <h2 className="text-3xl font-semibold mb-6">My Story</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    I&#39;m a passionate web application developer with a strong foundation in both frontend and backend
                                    technologies. My journey in web development began with a curiosity about how interactive websites
                                    work, which led me to pursue formal education in computer science and specialized training in modern
                                    web technologies.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Throughout my career, I&#39;ve focused on building scalable, maintainable web applications that solve
                                    real-world problems. I enjoy the challenge of translating complex business requirements into elegant
                                    technical solutions, always keeping the end user&#39;s experience at the forefront of my development
                                    process.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    When I&#39;m not coding, I stay current with emerging technologies and best practices through continuous
                                    learning, contributing to open-source projects, and participating in developer communities.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                            <StatsCard value="4+" label="Years of experience" color="text-teal-500 dark:text-teal-400" />
                            <StatsCard value="20+" label="Completed projects" color="text-indigo-500 dark:text-indigo-400" />
                            <StatsCard value="12+" label="Happy clients" color="text-purple-500 dark:text-purple-400" />
                            <StatsCard value="5+" label="Tech stack mastery" color="text-amber-500 dark:text-amber-400" />
                        </div>

                        <div className="mb-16">
                            <h2 className="text-3xl font-semibold mb-6">My Skills</h2>
                            <SkillsTab skills={skills} />
                        </div>

                        <div>
                            <h2 className="text-3xl font-semibold mb-6">My Professional Journey</h2>
                            <div className="space-y-8">
                                <div className="relative pl-8 border-l-2 border-teal-500 pb-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500" />
                                    <div className="mb-1 text-teal-500">2022 - Present</div>
                                    <h3 className="text-xl font-semibold">Senior Web Application Developer</h3>
                                    <p className="text-gray-400">Tech Solutions Inc.</p>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        Leading development of enterprise web applications using React, Node.js, and cloud services.
                                        Implementing CI/CD pipelines and mentoring junior developers.
                                    </p>
                                </div>

                                <div className="relative pl-8 border-l-2 border-indigo-500 pb-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500" />
                                    <div className="mb-1 text-indigo-500">2020 - 2022</div>
                                    <h3 className="text-xl font-semibold">Full Stack Developer</h3>
                                    <p className="text-gray-400">Digital Innovations Co.</p>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        Developed and maintained multiple web applications using the MERN stack. Implemented RESTful APIs
                                        and integrated third-party services.
                                    </p>
                                </div>

                                <div className="relative pl-8 border-l-2 border-purple-500">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500" />
                                    <div className="mb-1 text-purple-500">2019 - 2020</div>
                                    <h3 className="text-xl font-semibold">Frontend Developer</h3>
                                    <p className="text-gray-400">WebTech Startup</p>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        Built responsive user interfaces with React and implemented state management with Redux.
                                        Collaborated with UX designers to create intuitive user experiences.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    )
}
