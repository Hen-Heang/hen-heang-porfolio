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

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-16">
                            <StatsCard value="1.5+" label="Years of experience" color="text-teal-500 dark:text-teal-400" />
                            <StatsCard value="4+" label="Completed projects" color="text-indigo-500 dark:text-indigo-400" />
                            {/*<StatsCard value="12+" label="Happy clients" color="text-purple-500 dark:text-purple-400" />*/}
                            <StatsCard value="5+" label="Tech stack mastery" color="text-amber-500 dark:text-amber-400" />
                        </div>

                        <div className="mb-16">
                            <h2 className="text-3xl font-semibold mb-6">My Skills</h2>
                            <SkillsTab skills={skills} />
                        </div>

                        <div className="bg-gray-900 text-white p-8 rounded-lg">
                            <h1 className="text-4xl font-bold mb-8">My Professional Journey</h1>

                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-indigo-500"></div>

                                {/* Web Developer Position */}
                                <div className="relative mb-12">
                                    <div className="flex">
                                        <div className="relative">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.5 }}
                                                className="w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center z-10 relative"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18 10h-4v4h4v-4z" />
                                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                                    <path d="M2 10h16" />
                                                    <path d="M6 14h.01" />
                                                    <path d="M6 18h12" />
                                                </svg>
                                            </motion.div>
                                        </div>
                                        <div className="ml-8">
                                            <span className="text-teal-400 text-lg">2024 - Present</span>
                                            <h2 className="text-2xl font-bold mb-1">Junior Web Application Developer</h2>
                                            <h3 className="text-gray-400 mb-3">KOSIGN (Cambodia) Investment Co., Ltd.</h3>
                                            <p className="text-gray-300">
                                                Currently working as a Junior Web Application Developer, focusing on building and maintaining web applications
                                                using Spring Boot and Next.js. Collaborating with cross-functional teams to deliver high-quality software
                                                solutions.
                                            </p>
                                            <div className="flex mt-4 space-x-3">
                                                <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Spring Boot</span>
                                                <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Next.js</span>
                                                <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">TypeScript</span>
                                                <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">PostgreSQL</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Android Developer Position */}
                                <div className="relative">
                                    <div className="flex">
                                        <div className="relative">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                                className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center z-10 relative"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                                    <path d="M12 18h.01" />
                                                </svg>
                                            </motion.div>
                                        </div>
                                        <div className="ml-8">
                                            <span className="text-indigo-400 text-lg">2020</span>
                                            <h2 className="text-2xl font-bold mb-1">Internship Android Mobile Developer</h2>
                                            <h3 className="text-gray-400 mb-3">KOSIGN (Cambodia) Investment Co., Ltd.</h3>
                                            <p className="text-gray-300">
                                                Completed an internship as an Android Mobile Developer, where I gained hands-on experience in developing
                                                mobile applications using Java. Worked on various projects, enhancing my skills in mobile app development and
                                                user interface design.
                                            </p>
                                            <div className="flex mt-4 space-x-3">
                                                <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Android</span>
                                                <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Java</span>
                                                <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">UI Design</span>
                                                <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Mobile Development</span>
                                            </div>
                                        </div>
                                    </div>
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
