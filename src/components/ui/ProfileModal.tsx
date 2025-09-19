"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, MapPin, Calendar, Download, ExternalLink } from "lucide-react"
import { personalInfo } from "@/data/personal-info"
import { skills } from "@/data/skills"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { SocialLinks } from "@/src/components/ui/SocialLinks"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {
    CssIcon,
    GitHubIcon,
    HtmlIcon,
    IntellijIcon,
    JavaIcon,
    JavaScriptIcon,
    NextJsIcon,
    PostgreSQLIcon,
    ReactIcon,
    SpringIcon,
    TanStackIcon,
    TypeScriptIcon,
    WebStormIcon,
} from "@/src/components/icons/TechIcons"
import Image from "next/image"

interface ProfileModalProps {
    isOpen: boolean
    onClose: () => void
}

const getIconForSkill = (skillName: string) => {
    const skillNameLower = skillName.toLowerCase()
    let IconComponent = null

    if (skillNameLower.includes("next.js")) IconComponent = <NextJsIcon />
    if (skillNameLower.includes("tanstack")) IconComponent = <TanStackIcon />
    if (skillNameLower.includes("css")) IconComponent = <CssIcon />
    if (skillNameLower.includes("html")) IconComponent = <HtmlIcon />
    if (skillNameLower.includes("javascript")) IconComponent = <JavaScriptIcon />
    if (skillNameLower.includes("typescript")) IconComponent = <TypeScriptIcon />
    if (skillNameLower.includes("react")) IconComponent = <ReactIcon />
    if (skillNameLower.includes("java")) IconComponent = <JavaIcon />
    if (skillNameLower.includes("spring")) IconComponent = <SpringIcon />
    if (skillNameLower.includes("postgresql")) IconComponent = <PostgreSQLIcon />
    if (skillNameLower.includes("git")) IconComponent = <GitHubIcon />
    if (skillNameLower.includes("intellij")) IconComponent = <IntellijIcon />
    if (skillNameLower.includes("webstorm")) IconComponent = <WebStormIcon />

    return IconComponent ? <div className="icon-wrapper">{IconComponent}</div> : null
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
    const handleDownloadResume = () => {
        const link = document.createElement('a')
        link.href = '/api/download-resume'
        link.download = 'Hen_Heang_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
                    >
                        <div className="h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-y-auto">
                            {/* Header */}
                            <div className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                    Profile
                                </h2>
                                <motion.button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X size={20} className="text-slate-600 dark:text-slate-300" />
                                </motion.button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-8">
                                {/* Profile Header */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-center"
                                >
                                    <div className="relative w-32 h-32 mx-auto mb-6">
                                        <div className="w-full h-full rounded-2xl bg-gradient-to-r from-teal-500 to-indigo-500 p-1">
                                            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
                                                <Image
                                                    src={personalInfo.profileImage || personalInfo.myImage || "/image/personal_image.jpg"}
                                                    alt={`${personalInfo.fullName} - Full-Stack Developer`}
                                                    fill
                                                    className="object-cover object-center"
                                                    priority
                                                    style={{ objectPosition: 'center 25%' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                        {personalInfo.fullName}
                                    </h1>
                                    
                                    <Badge className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-400/20">
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                                            Web Application Developer
                                        </span>
                                    </Badge>
                                </motion.div>

                                {/* About Me Content */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 text-center">
                                        About Me
                                    </h2>
                                    
                                    <div className="prose prose-slate dark:prose-invert max-w-none">
                                        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                            I&apos;m a full-stack web developer with a passion for creating modern applications that solve real business problems.
                                            With experience in both frontend and backend technologies, I build cohesive solutions from database design to user interfaces.
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                            My expertise includes Spring Boot and Spring Data for backend development, and Next.js with TypeScript for
                                            creating responsive, type-safe frontends. I use PostgreSQL for database management and TanStack Query for
                                            efficient data fetching and state management.
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                            I enjoy tackling complex problems and continuously learning new technologies to improve my skillset.
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Contact Information */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                                            Contact Information
                                        </h3>
                                        
                                        <div className="space-y-3">
                                            <motion.div 
                                                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                                                whileHover={{ x: 5 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                            >
                                                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                                                    <Mail className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Email</p>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">{personalInfo.email}</p>
                                                </div>
                                            </motion.div>

                                            <motion.div 
                                                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                                                whileHover={{ x: 5 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                            >
                                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                    <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Location</p>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">Phnom Penh, Cambodia</p>
                                                </div>
                                            </motion.div>

                                            <motion.div 
                                                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                                                whileHover={{ x: 5 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                            >
                                                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                                                    <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Experience</p>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">1 year and 5 months</p>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                                            Quick Actions
                                        </h3>
                                        
                                        <div className="space-y-3">
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <Button
                                                    onClick={handleDownloadResume}
                                                    className="w-full justify-start bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white"
                                                >
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download Resume
                                                </Button>
                                            </motion.div>

                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <Button
                                                    variant="outline"
                                                    className="w-full justify-start border-slate-300 dark:border-slate-600 hover:border-teal-500 dark:hover:border-teal-400"
                                                    onClick={() => {
                                                        onClose()
                                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                                    }}
                                                >
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Contact Me
                                                </Button>
                                            </motion.div>

                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <Button
                                                    variant="outline"
                                                    className="w-full justify-start border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400"
                                                    onClick={() => {
                                                        onClose()
                                                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                                                    }}
                                                >
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    View Projects
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Skills Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 text-center">
                                        My Skills
                                    </h3>
                                    
                                    <Tabs defaultValue={skills[0].category} className="w-full">
                                        <TabsList className="grid grid-cols-3 mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                                            {skills.map((skill) => (
                                                <TabsTrigger
                                                    key={skill.category}
                                                    value={skill.category}
                                                    className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm transition-all duration-200"
                                                >
                                                    {skill.category}
                                                </TabsTrigger>
                                            ))}
                                        </TabsList>

                                        {skills.map((skill) => (
                                            <TabsContent key={skill.category} value={skill.category} className="mt-0">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {skill.items.map((item, index) => (
                                                        <motion.div
                                                            key={item.name}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            className="group p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 transition-all duration-300 hover:shadow-lg"
                                                            whileHover={{ scale: 1.02, y: -2 }}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                {getIconForSkill(item.name) ? (
                                                                    <div className="flex-shrink-0 p-2 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors duration-300">
                                                                        {getIconForSkill(item.name)}
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 flex-shrink-0"></div>
                                                                )}
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300 truncate">
                                                                        {item.name}
                                                                    </div>
                                                                    <div className="text-sm text-slate-500 dark:text-slate-400 truncate">{item.experience}</div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </TabsContent>
                                        ))}
                                    </Tabs>
                                </motion.div>

                                {/* Social Links */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-center"
                                >
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                                        Connect With Me
                                    </h3>
                                    <SocialLinks />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
