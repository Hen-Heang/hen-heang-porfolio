"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
    Mail, 
    MapPin, 
    Calendar, 
    ExternalLink, 
    Download, 
    Users, 
    UserPlus, 
    MessageSquare, 
    Heart, 
    Award, 
    Target,
    Settings,
    Shield,
    Bell,
    Puzzle,
    HelpCircle,
    LogOut,
    Code,
    CheckCircle
} from "lucide-react"
import { personalInfo } from "@/data/personal-info"
import { skills } from "@/data/skills"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Card } from "@/src/components/ui/card"
import { SocialLinks } from "@/src/components/ui/SocialLinks"
import Image from "next/image"

const ProfileSection = () => {
    const [isEditing, setIsEditing] = useState(false)

    // Mock statistics data - you can replace with real data
    const stats = [
        { label: "Followers", value: "1,250", icon: Users, color: "text-blue-500" },
        { label: "Following", value: "890", icon: UserPlus, color: "text-green-500" },
        { label: "Posts", value: "42", icon: MessageSquare, color: "text-purple-500" },
        { label: "Likes", value: "2,750", icon: Heart, color: "text-red-500" },
        { label: "Achievements", value: "15", icon: Award, color: "text-yellow-500" },
        { label: "Projects", value: "12", icon: Target, color: "text-teal-500" }
    ]

    const quickActions = [
        { label: "Account Settings", icon: Settings, color: "text-slate-600" },
        { label: "Privacy & Security", icon: Shield, color: "text-blue-600" },
        { label: "Notifications", icon: Bell, color: "text-orange-600" },
        { label: "Appearance", icon: Puzzle, color: "text-purple-600" },
        { label: "Help & Support", icon: HelpCircle, color: "text-green-600" },
        { label: "Sign Out", icon: LogOut, color: "text-red-600", isDestructive: true }
    ]

    const handleDownloadResume = () => {
        const link = document.createElement('a')
        link.href = '/api/download-resume'
        link.download = 'Hen_Heang_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <motion.div
                    className="grid lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Main Profile Content */}
                    <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
                        {/* Profile Header */}
                        <motion.div variants={itemVariants}>
                            <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                    {/* Profile Image */}
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 p-1">
                                            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full overflow-hidden">
                                                <Image
                                                    src="/image/HH.jpg"
                                                    alt={`${personalInfo.fullName} - Full-Stack Developer`}
                                                    width={96}
                                                    height={96}
                                                    className="object-cover object-center"
                                                    priority
                                                    style={{ objectPosition: 'center 25%' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                    </div>

                                    {/* Profile Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                                                {personalInfo.fullName}
                                            </h1>
                                            <Badge className="px-3 py-1 text-sm bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                                                Verified
                                            </Badge>
                                        </div>
                                        
                                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                                            @{personalInfo.name.toLowerCase().replace(/\s+/g, '')}
                                        </p>
                                        
                                        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                                            {personalInfo.title}
                                        </p>
                                        
                                        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                            {personalInfo.description}
                                        </p>

                                        {/* Contact Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-center gap-3">
                                                <MapPin className="w-4 h-4 text-slate-500" />
                                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                                    {personalInfo.location}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <ExternalLink className="w-4 h-4 text-slate-500" />
                                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                                    https://henheang.dev
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Calendar className="w-4 h-4 text-slate-500" />
                                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                                    Joined March 2023
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-4 h-4 text-slate-500" />
                                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                                    {personalInfo.email}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            <Button
                                                onClick={() => setIsEditing(!isEditing)}
                                                className="bg-teal-600 hover:bg-teal-700 text-white"
                                            >
                                                Edit Profile
                                            </Button>
                                            <Button variant="outline" className="border-slate-300 dark:border-slate-600">
                                                Settings
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Statistics Cards */}
                        <motion.div variants={itemVariants}>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                                Statistics
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                    >
                                        <Card className="p-4 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
                                            <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                                {stat.label}
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent Activity */}
                        <motion.div variants={itemVariants}>
                            <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Calendar className="w-5 h-5 text-slate-500" />
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                        Recent Activity
                                    </h2>
                                </div>
                                <div className="text-center py-8">
                                    <div className="text-slate-400 dark:text-slate-500">
                                        No recent activity to display
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div className="space-y-6" variants={itemVariants}>
                        {/* Quick Actions */}
                        <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                                Quick Actions
                            </h3>
                            <div className="space-y-2">
                                {quickActions.map((action, index) => (
                                    <motion.button
                                        key={action.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ x: 5 }}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                                            action.isDestructive
                                                ? 'hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400'
                                                : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300'
                                        }`}
                                    >
                                        <action.icon className={`w-4 h-4 ${action.color}`} />
                                        <span className="text-sm font-medium">{action.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </Card>

                        {/* Skills Section */}
                        <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <Code className="w-5 h-5 text-slate-500" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                    &lt;/&gt; Skills
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skills.flatMap(category => category.items).slice(0, 10).map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Badge className="px-3 py-1 text-xs bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 border border-teal-200 dark:border-teal-800 hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors">
                                            {skill.name}
                                        </Badge>
                                    </motion.div>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-4 border-slate-300 dark:border-slate-600"
                                onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                View All Skills
                            </Button>
                        </Card>

                        {/* Social Links */}
                        <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                                Connect With Me
                            </h3>
                            <SocialLinks />
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default ProfileSection
