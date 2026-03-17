"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { skills } from "@/data/skills"
import { PageLayout } from "@/src/components/layout/PageLayout"
import { StatsCard } from "@/src/components/sections/about/StatsCard"
import { SkillsTab } from "@/src/components/sections/about/SkillsTab"
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
} from "lucide-react"
import type { SkillItem } from "@/src/lib/types"
import { ExperienceSection } from "@/src/components/sections/experience/ExperienceSection"

export default function AboutPage() {
    const router = useRouter()
    const aboutSummary = [
        "I’m a Full-Stack Developer who builds web applications end-to-end - from frontend screens to backend APIs and databases. I’ve worked in both Cambodia and South Korea, and I’m currently based in Seoul at Webcash.",
        "In my work, I develop frontend pages with HTML/CSS and JavaScript (including jQuery), and I also build backend services with Java and MyBatis. I regularly work with SQL to design queries, connect APIs to the database, and improve performance and stability. I’m used to working in enterprise environments where clean code, reliable releases, and teamwork matter.",
        "I enjoy solving real business problems, collaborating closely with teammates, and continuously improving my skills in system design, database architecture, and scalable web development.",
    ]
    const linkedinCoreSkills = [
        "Java",
        "Spring Boot",
        "MyBatis",
        "SQL",
        "JavaScript",
        "jQuery",
        "HTML/CSS",
        "REST APIs",
    ]

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
            color: "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100" 
        },
        {
            icon: Target,
            title: "Problem Solving",
            description: "Approaching complex challenges with analytical thinking and creative solutions.",
            color: "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Working effectively with cross-functional teams to deliver exceptional results.",
            color: "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
        },
        {
            icon: Zap,
            title: "Continuous Learning",
            description: "Staying updated with the latest technologies and best practices in software development.",
            color: "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
        },
    ]

    const getSkillsByCategory = (category: string): SkillItem[] => {
        return skills.find(skill => skill.category.toLowerCase() === category.toLowerCase())?.items || []
    }

    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto"
                >
                    {/* Hero Section */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h1 className="text-5xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
                            About Me
                        </h1>
                        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-4xl mx-auto leading-relaxed">
                            {aboutSummary[0]}
                        </p>
                    </motion.div>

                    {/* Profile Section */}
                    <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-8 mb-16">
                        {/* Profile Image */}
                        <div className="lg:col-span-1">
                            <div className="relative">
                                <div className="w-full aspect-square rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm group">
                                    <Image
                                        src={personalInfo.myImage}
                                        alt={personalInfo.fullName || personalInfo.name}
                                        fill
                                        className="object-cover object-center grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                        style={{ objectPosition: 'center 25%' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Personal Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">{personalInfo.fullName || personalInfo.name}</h2>
                                <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium mb-6">
                                    {personalInfo.title}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                                    <Mail className="text-zinc-900 dark:text-zinc-100" size={20} />
                                    <div className="min-w-0">
                                        <p className="text-sm text-zinc-500 dark:text-zinc-500">Email</p>
                                        <p className="font-medium truncate text-zinc-900 dark:text-zinc-100">{personalInfo.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                                    <MapPin className="text-zinc-900 dark:text-zinc-100" size={20} />
                                    <div>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-500">Location</p>
                                        <p className="font-medium text-zinc-900 dark:text-zinc-100">{personalInfo.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                                    <Calendar className="text-zinc-900 dark:text-zinc-100" size={20} />
                                    <div>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-500">Experience</p>
                                        <p className="font-medium text-zinc-900 dark:text-zinc-100">{personalInfo.experience}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                                    <Award className="text-zinc-900 dark:text-zinc-100" size={20} />
                                    <div>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-500">Focus</p>
                                        <p className="font-medium text-zinc-900 dark:text-zinc-100">Full-Stack Development</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-16">
                        <Card className="p-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                            <CardContent className="p-0 space-y-5">
                                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Professional Summary</h2>
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{aboutSummary[1]}</p>
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{aboutSummary[2]}</p>
                                <div>
                                    <p className="font-semibold mb-3 text-zinc-900 dark:text-zinc-100">Core Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {linkedinCoreSkills.map((skill) => (
                                            <Badge key={skill} variant="secondary" className="text-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Core Values */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-12 text-zinc-900 dark:text-zinc-100">Core Values</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {coreValues.map((value, index) => (
                                <Card key={index} className="p-6 text-center border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-md transition-all duration-300">
                                    <CardContent className="p-0">
                                        <div className={`w-16 h-16 rounded-full ${value.color} flex items-center justify-center mx-auto mb-4 border border-zinc-200 dark:border-zinc-800`}>
                                            <value.icon size={24} />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">{value.title}</h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{value.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                    {/* Experience Section */}
                    <motion.div variants={itemVariants} className="mb-16 -mx-4 sm:-mx-6 lg:-mx-8">
                        <ExperienceSection />
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-12 text-zinc-900 dark:text-zinc-100">Technical Skills</h2>
                        <SkillsTab skills={skills} />
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div variants={itemVariants} className="text-center">
                        <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Ready to Work Together?</h2>
                        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
                            Let&apos;s discuss your project and see how I can help bring your ideas to life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => router.push("/contact")}
                                className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-3 text-lg"
                            >
                                Get In Touch
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/projects")}
                                className="border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 px-8 py-3 text-lg"
                            >
                                View My Work
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
