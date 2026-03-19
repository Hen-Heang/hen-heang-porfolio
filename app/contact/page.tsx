"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Send, MapPin, MessageSquare, ExternalLink, ArrowRight } from "lucide-react"
import { ContactForm } from "@/src/components/sections/contact/ContactForm"
import { personalInfo } from "@/data/personal-info"
import { DashboardHeader } from "@/src/components/dashboard/DashboardHeader"
import { Footer } from "@/src/components/ui/Footer"
import { MobileDock } from "@/src/components/dashboard/MobileDock"
import Magnetic from "@/src/components/ui/Magnetic"

export default function ContactPage() {
    const contactCards = [
        {
            title: "Email",
            value: personalInfo.email,
            href: `mailto:${personalInfo.email}`,
            icon: Mail,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/20",
        },
        {
            title: "LinkedIn",
            value: "Hen Heang",
            href: personalInfo.socialLinks.linkedin,
            icon: Linkedin,
            color: "text-blue-600",
            bg: "bg-blue-600/10",
            border: "border-blue-600/20",
        },
        {
            title: "Telegram",
            value: "@henheang",
            href: personalInfo.socialLinks.telegram,
            icon: Send,
            color: "text-sky-400",
            bg: "bg-sky-400/10",
            border: "border-sky-400/20",
        },
        {
            title: "GitHub",
            value: "Hen-Heang",
            href: personalInfo.socialLinks.github,
            icon: Github,
            color: "text-zinc-400",
            bg: "bg-zinc-400/10",
            border: "border-zinc-400/20",
        },
    ]

    return (
        <div className="min-h-screen bg-[#09090b] text-white selection:bg-indigo-500/30">
            <DashboardHeader />
            
            <main className="container mx-auto px-4 pt-12 pb-32 max-w-7xl">
                {/* Hero Section */}
                <div className="max-w-3xl mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <MessageSquare size={14} />
                            <span>Contact</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Let&#39;s build something <span className="text-zinc-500 italic">together.</span>
                        </h1>
                        <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
                            Whether you have a specific project in mind or just want to explore 
                            potential collaborations, I&#39;m always open to new opportunities.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left: Form Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-7 bg-[#121214] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                            <Send size={200} className="-rotate-12" />
                        </div>
                        
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                    <ArrowRight size={18} className="text-indigo-400" />
                                </span>
                                Drop me a line
                            </h2>
                            <ContactForm />
                        </div>
                    </motion.div>

                    {/* Right: Info Side */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Quick Contact Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {contactCards.map((card, idx) => (
                                <motion.div
                                    key={card.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                                >
                                    <Magnetic>
                                        <a 
                                            href={card.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`block p-6 bg-[#121214] border border-white/5 rounded-2xl hover:border-white/10 transition-all group relative overflow-hidden h-full`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center ${card.color} mb-4 group-hover:scale-110 transition-transform`}>
                                                <card.icon size={20} />
                                            </div>
                                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{card.title}</p>
                                            <p className="text-sm font-medium text-zinc-200 break-all">{card.value}</p>
                                            
                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ExternalLink size={14} className="text-zinc-600" />
                                            </div>
                                        </a>
                                    </Magnetic>
                                </motion.div>
                            ))}
                        </div>

                        {/* Location Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="bg-[#121214] border border-white/5 rounded-3xl p-8 relative overflow-hidden group"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                                        <MapPin size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Location</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                        Currently based in Seoul, South Korea.<br />
                                        Open to remote opportunities worldwide.
                                    </p>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Ready for work</span>
                                    </div>
                                </div>
                                
                                <div className="text-6xl grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                                    🇰🇷
                                </div>
                            </div>
                        </motion.div>

                        {/* Availability / Note */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10"
                        >
                            <h4 className="text-indigo-400 font-bold text-sm mb-2">Working Hours</h4>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                                Typically responding within 24 hours. Mon — Fri, 9:00 AM — 6:00 PM (KST).
                            </p>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
            <MobileDock />
        </div>
    )
}
