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
            color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
        },
        {
            icon: Target,
            title: "Problem Solving",
            description: "Approaching complex challenges with analytical thinking and creative solutions.",
            color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Working effectively with cross-functional teams to deliver exceptional results.",
            color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
        },
        {
            icon: Zap,
            title: "Continuous Learning",
            description: "Staying updated with the latest technologies and best practices in software development.",
            color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
        },
    ]

    // Helper function to get skills by category
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
                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                            About Me
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            {aboutSummary[0]}
                        </p>
                    </motion.div>

                    {/* Profile Section */}
                    <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-8 mb-16">
                        {/* Profile Image */}
                        <div className="lg:col-span-1">
                            <div className="relative">
                                <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={personalInfo.myImage}
                                        alt={personalInfo.fullName || personalInfo.name}
                                        fill
                                        className="object-cover object-center"
                                        style={{ objectPosition: 'center 25%' }}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-indigo-500/20 rounded-2xl" />
                            </div>
                        </div>

                        {/* Personal Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">{personalInfo.fullName || personalInfo.name}</h2>
                                <p className="text-xl text-teal-600 dark:text-teal-400 font-medium mb-6">
                                    {personalInfo.title}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                                    <Mail className="text-teal-600 dark:text-teal-400" size={20} />
                                    <div className="min-w-0">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                        <p className="font-medium truncate">{personalInfo.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                                    <MapPin className="text-teal-600 dark:text-teal-400" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                                        <p className="font-medium">{personalInfo.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                                    <Calendar className="text-teal-600 dark:text-teal-400" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                                        <p className="font-medium">{personalInfo.experience}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                                    <Award className="text-teal-600 dark:text-teal-400" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Focus</p>
                                        <p className="font-medium">Full-Stack Development</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-16">
                        <Card className="p-8 bg-white/95 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700">
                            <CardContent className="p-0 space-y-5">
                                <h2 className="text-3xl font-bold">Professional Summary</h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aboutSummary[1]}</p>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aboutSummary[2]}</p>
                                <div>
                                    <p className="font-semibold mb-3">Core Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {linkedinCoreSkills.map((skill) => (
                                            <Badge key={skill} variant="secondary" className="text-sm">
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
                        <h2 className="text-3xl font-bold text-center mb-12">Core Values</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {coreValues.map((value, index) => (
                                <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow duration-300">
                                    <CardContent className="p-0">
                                        <div className={`w-16 h-16 rounded-full ${value.color} flex items-center justify-center mx-auto mb-4`}>
                                            <value.icon size={24} />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-12"></h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatsCard
                                value="3+"
                                label="Projects Completed"
                                color="text-teal-500 dark:text-teal-400"
                            />
                            <StatsCard
                                value="8+"
                                label="Technologies"
                                color="text-indigo-500 dark:text-indigo-400"
                            />
                            <StatsCard
                                value="Bachelor's"
                                label="Education"
                                color="text-blue-500 dark:text-blue-400"
                            />
                            <StatsCard
                                value="2 Years"
                                label="Experience"
                                color="text-green-500 dark:text-green-400"
                            />
                        </div>
                    </motion.div>

                    {/* Experience Section */}
                    <motion.div variants={itemVariants} className="mb-16 -mx-4 sm:-mx-6 lg:-mx-8">
                        <ExperienceSection />
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
                        <SkillsTab skills={skills} />
                    </motion.div>

                    {/* Technology Stack */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-12">Technology Stack</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Frontend */}
                            <Card className="p-6">
                                <CardContent className="p-0">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                            <Globe className="text-blue-600 dark:text-blue-400" size={24} />
                                        </div>
                                        <h3 className="text-xl font-semibold">Frontend</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {getSkillsByCategory("Frontend").map((skill: SkillItem) => (
                                            <Badge key={skill.name} variant="secondary" className="text-sm">
                                                {skill.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Backend */}
                            <Card className="p-6">
                                <CardContent className="p-0">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                            <Server className="text-green-600 dark:text-green-400" size={24} />
                                        </div>
                                        <h3 className="text-xl font-semibold">Backend</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {getSkillsByCategory("Backend").map((skill: SkillItem) => (
                                            <Badge key={skill.name} variant="secondary" className="text-sm">
                                                {skill.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Tools */}
                            <Card className="p-6">
                                <CardContent className="p-0">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                            <Zap className="text-purple-600 dark:text-purple-400" size={24} />
                                        </div>
                                        <h3 className="text-xl font-semibold">Tools</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {getSkillsByCategory("Tools").map((skill: SkillItem) => (
                                            <Badge key={skill.name} variant="secondary" className="text-sm">
                                                {skill.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div variants={itemVariants} className="text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to Work Together?</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            Let&apos;s discuss your project and see how I can help bring your ideas to life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => router.push("/contact")}
                                className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white px-8 py-3 text-lg"
                            >
                                Get In Touch
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/projects")}
                                className="border-2 border-teal-500 text-teal-600 dark:text-teal-400 hover:bg-teal-500 hover:text-white px-8 py-3 text-lg"
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
