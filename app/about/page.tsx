"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { skills } from "@/data/skills"
import { PageLayout } from "@/src/components/layout/PageLayout"
import { SkillsTab } from "@/src/components/sections/about/SkillsTab"
import { personalInfo } from "@/data/personal-info"
import { Button } from "@/src/components/ui/button"
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
    ArrowRight,
    Sparkles,
    ChevronRight,
} from "lucide-react"
import { ExperienceSection } from "@/src/components/sections/experience/ExperienceSection"
import { AchievementsSection } from "@/src/components/sections/achievements/AchievementsSection"
import { education } from "@/data/education"
import { GraduationCap } from "lucide-react"

export default function AboutPage() {
    const router = useRouter()
    
    const aboutSummary = [
        "I’m a Full-Stack Developer who builds web applications end-to-end - from frontend screens to backend APIs and databases. I’ve worked in both Cambodia and South Korea, and I’m currently based in Seoul at Webcash.",
        "In my work, I develop frontend pages with HTML/CSS and JavaScript (including jQuery), and I also build backend services with Java and MyBatis. I regularly work with SQL to design queries, connect APIs to the database, and improve performance and stability.",
        "I enjoy solving real business problems, collaborating closely with teammates, and continuously improving my skills in system design, database architecture, and scalable web development.",
    ]
    
    const linkedinCoreSkills = [
        "Java", "Spring Boot", "MyBatis", "SQL", "JavaScript", "jQuery", "HTML/CSS", "REST APIs",
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    }

    const coreValues = [
        { 
            icon: Code, 
            title: "Clean Code", 
            description: "Writing maintainable, readable, and efficient code that others can easily understand.",
            color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" 
        },
        {
            icon: Target,
            title: "Problem Solving",
            description: "Approaching complex challenges with analytical thinking and creative, robust solutions.",
            color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20",
        },
        {
            icon: Users,
            title: "Collaboration",
            description: "Working effectively with cross-functional teams to deliver exceptional, user-centric results.",
            color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
        },
        {
            icon: Zap,
            title: "Growth Mindset",
            description: "Staying updated with the latest technologies and best practices in software development.",
            color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
        },
    ]

    return (
        <PageLayout>
            <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#09090b]">
                {/* Hero Header Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50/50 dark:from-blue-950/10 to-transparent -z-10" />
                    
                    <div className="container mx-auto px-4">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="max-w-6xl mx-auto"
                        >
                            <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-16">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100 dark:border-blue-800/30">
                                    <Sparkles size={14} />
                                    <span>Get to know me</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tight mb-8">
                                    Engineering with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Purpose.</span>
                                </h1>
                                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed font-medium">
                                    {aboutSummary[0]}
                                </p>
                            </motion.div>

                            {/* Profile Highlight Card */}
                            <motion.div variants={itemVariants} className="grid lg:grid-cols-12 gap-12 items-center mb-32">
                                <div className="lg:col-span-5 relative group">
                                    <div className="relative z-10 aspect-[4/5] rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl rotate-[-2deg] transition-transform duration-500 group-hover:rotate-0">
                                        <Image
                                            src={personalInfo.myImage}
                                            alt={personalInfo.fullName || personalInfo.name}
                                            fill
                                            className="object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-700"
                                            style={{ objectPosition: 'center 20%' }}
                                            priority
                                        />
                                    </div>
                                    <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[3rem] -z-10 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                                    
                                    {/* Experience Badge Floating */}
                                    <div className="absolute -bottom-6 -right-6 z-20 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 hidden md:block">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-none">
                                                <Award size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Experience</p>
                                                <p className="text-xl font-black text-zinc-900 dark:text-white">{personalInfo.experience}+ Years</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-7 space-y-8">
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-black text-zinc-900 dark:text-white leading-tight">
                                            {personalInfo.fullName || personalInfo.name}
                                        </h2>
                                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {personalInfo.title}
                                        </p>
                                        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { icon: Mail, label: "Email", value: personalInfo.email },
                                            { icon: MapPin, label: "Location", value: personalInfo.location },
                                            { icon: Calendar, label: "Availability", value: "Open to Collaborate" },
                                            { icon: Globe, label: "Languages", value: "EN · KR · KH" }
                                        ].map((info, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                                                    <info.icon size={18} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{info.label}</p>
                                                    <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate">{info.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-8 rounded-3xl bg-zinc-900 dark:bg-zinc-900/50 text-white shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                            <Sparkles size={120} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                            Professional Mission
                                        </h3>
                                        <p className="text-zinc-300 leading-relaxed font-medium relative z-10">
                                            {aboutSummary[1]}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Core Values Grid */}
                            <motion.div variants={itemVariants} className="mb-32">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-4">Core Principles</h2>
                                    <p className="text-zinc-500 font-medium">The values that drive my engineering decisions every day.</p>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {coreValues.map((value, index) => (
                                        <div key={index} className="group p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-blue-500/30 dark:hover:border-blue-400/30 shadow-sm hover:shadow-xl transition-all duration-500">
                                            <div className={`w-14 h-14 rounded-2xl ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                                <value.icon size={28} />
                                            </div>
                                            <h3 className="text-xl font-black mb-3 text-zinc-900 dark:text-white">{value.title}</h3>
                                            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">{value.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Work Journey Section */}
                            <motion.div variants={itemVariants} className="mb-32">
                                <ExperienceSection />
                            </motion.div>

                            {/* Education Section */}
                            <motion.div variants={itemVariants} className="mb-32">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                                        <GraduationCap className="text-blue-600" size={36} />
                                        Education
                                    </h2>
                                    <p className="text-zinc-500 font-medium">Academic background and certifications that shaped my skills.</p>
                                </div>

                                <div className="relative pl-6 space-y-10 border-l-2 border-zinc-200 dark:border-zinc-800 ml-4">
                                    {education.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: i * 0.08 }}
                                            className="relative"
                                        >
                                            {/* Timeline dot */}
                                            <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_0_10px_rgba(99,102,241,0.4)]" />

                                            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:shadow-lg transition-all duration-300">
                                                <span className="inline-block text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                                                    {item.period}
                                                </span>
                                                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-1">{item.title}</h3>
                                                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">{item.institution}</p>
                                                {item.description && (
                                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.description}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Achievements & Certificates Section */}
                            <motion.div variants={itemVariants} className="mb-32">
                                <AchievementsSection />
                            </motion.div>

                            {/* Skills Section */}
                            <motion.div variants={itemVariants} className="mb-32">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                                    <div>
                                        <h2 className="text-4xl font-black text-zinc-900 dark:text-white mb-2">Technical Arsenal</h2>
                                        <p className="text-zinc-500 font-medium">A comprehensive list of technologies I use to build scalable products.</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {linkedinCoreSkills.slice(0, 4).map(skill => (
                                            <Badge key={skill} className="bg-blue-600/10 text-blue-600 border-none px-3 py-1 font-bold">{skill}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-2 rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                                    <div className="bg-white dark:bg-zinc-900 rounded-[2.2rem] p-6 md:p-10 shadow-inner">
                                        <SkillsTab skills={skills} />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Final CTA */}
                            <motion.div variants={itemVariants} className="relative rounded-[3rem] overflow-hidden bg-zinc-900 text-white p-12 md:p-20 text-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20" />
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600 blur-[120px] opacity-20" />
                                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600 blur-[120px] opacity-20" />
                                
                                <div className="relative z-10 max-w-2xl mx-auto">
                                    <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Ready to build the next big thing?</h2>
                                    <p className="text-xl text-zinc-400 mb-12 font-medium">
                                        I&apos;m always looking for interesting projects and collaborative teams to join forces with.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                        <Button
                                            onClick={() => router.push("/contact")}
                                            className="bg-white text-zinc-900 hover:bg-zinc-100 h-14 px-10 rounded-2xl text-lg font-black group transition-all"
                                        >
                                            Start a Conversation
                                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => router.push("/projects")}
                                            className="text-white hover:bg-white/10 h-14 px-10 rounded-2xl text-lg font-bold group"
                                        >
                                            View Projects
                                            <ChevronRight className="ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageLayout>
    )
}
