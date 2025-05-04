"use client"

import { motion } from "framer-motion"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Code, Mail, Github, Linkedin } from "lucide-react"

import { navItems } from "@/data/navigation"
import { useThemeToggle } from "@/hooks/useThemeToggle"

import { useState } from "react"
import {ContactForm} from "@/components/contact/ContactForm";
import Footer from "@/components/footer";
import {Header} from "@/components/header/Header";

export default function ContactPage() {
    const router = useRouter()
    const { darkMode, toggleTheme } = useThemeToggle()
    const [activeSection] = useState("contact")

    // Handle navigation
    const handleNavigation = (sectionId: string) => {
        if (sectionId === "contact") {
            return true // Already on contact page
        }
        if (sectionId === "projects") {
            router.push("/projects")
            return true
        }
        if (sectionId === "about") {
            router.push("/about")
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-5xl mx-auto"
                >
                    <h1 className="text-4xl font-bold mb-8 text-center">Get In Touch</h1>

                    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="grid md:grid-cols-5">
                            <div className="md:col-span-2 bg-gradient-to-br from-teal-500 to-indigo-500 p-8 text-white">
                                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                                <p className="mb-8 opacity-90">Fill out the form and I&#39;ll get back to you as soon as possible.</p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-full bg-white/20">
                                            <Mail size={20} />
                                        </div>
                                        <span>yourname@example.com</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-full bg-white/20">
                                            <Github size={20} />
                                        </div>
                                        <span>github.com/yourname</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-full bg-white/20">
                                            <Linkedin size={20} />
                                        </div>
                                        <span>linkedin.com/in/yourname</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-8 left-8 right-8 opacity-10">
                                    <Code size={180} />
                                </div>
                            </div>

                            <div className="md:col-span-3 p-8">
                                <ContactForm />
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            <Footer />
        </div>
    )
}
