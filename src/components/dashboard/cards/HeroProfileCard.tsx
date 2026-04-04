"use client"

import { useState, useEffect } from "react"
import { BentoCard } from "@/src/components/dashboard/BentoCard"
import { profile } from "@/data/dashboard"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Clock, Check, Sparkles, MapPin, ExternalLink, Mail } from "lucide-react"
import { Toast } from "@/src/components/ui/Toast"

const roles = [
    "Full-Stack Engineer",
    "Java · Spring Boot Specialist",
    "Next.js · TypeScript Expert",
    "Backend Architect",
]

const techStack = [
    { name: "Java",        color: "#f89820", icon: "☕" },
    { name: "Spring",      color: "#6db33f", icon: "🍃" },
    { name: "Next.js",     color: "#ffffff", icon: "▲" },
    { name: "TS",          color: "#3178c6", icon: "TS" },
    { name: "PostgreSQL",  color: "#336791", icon: "🐘" },
]

export function HeroProfileCard() {
    const [time, setTime]         = useState("")
    const [showToast, setShowToast] = useState(false)
    const [copied, setCopied]     = useState(false)
    const [roleIndex, setRoleIndex] = useState(0)
    const [displayed, setDisplayed] = useState("")
    const [deleting, setDeleting]   = useState(false)

    // Seoul clock
    useEffect(() => {
        const update = () => {
            setTime(
                new Intl.DateTimeFormat("en-US", {
                    timeZone: "Asia/Seoul",
                    hour: "2-digit", minute: "2-digit", second: "2-digit",
                    hour12: false,
                }).format(new Date())
            )
        }
        update()
        const id = setInterval(update, 1000)
        return () => clearInterval(id)
    }, [])

    // Typing animation
    useEffect(() => {
        const target = roles[roleIndex]
        let timeout: ReturnType<typeof setTimeout>

        if (!deleting && displayed.length < target.length) {
            timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 50)
        } else if (!deleting && displayed.length === target.length) {
            timeout = setTimeout(() => setDeleting(true), 2500)
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30)
        } else if (deleting && displayed.length === 0) {
            setDeleting(false)
            setRoleIndex((i) => (i + 1) % roles.length)
        }

        return () => clearTimeout(timeout)
    }, [displayed, deleting, roleIndex])

    const copyEmail = () => {
        navigator.clipboard.writeText(profile.email)
        setCopied(true)
        setShowToast(true)
        setTimeout(() => { setShowToast(false); setCopied(false) }, 2000)
    }

    return (
        <BentoCard className="col-span-4 md:col-span-8 lg:col-span-8 p-0 overflow-hidden flex flex-col min-h-[380px] group border-white/10">
            {/* Header Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366f1]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            
            <div className="p-6 md:p-10 space-y-8 relative z-10 flex flex-col h-full">
                {/* Top Row: Avatar + Time & Location */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="relative group/avatar"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ring-4 ring-white/5 group-hover/avatar:ring-[#6366f1]/30 bg-[#1c1c1f]">
                                <Image
                                    src="/image/heang_new.jpeg"
                                    alt={profile.name}
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/avatar:scale-110"
                                    priority
                                />
                            </div>
                            {profile.available && (
                                <span className="absolute -bottom-1 -right-1 flex h-6 w-6">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
                                    <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 border-4 border-[#09090b]" />
                                </span>
                            )}
                        </motion.div>

                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <h2 className="text-white text-3xl md:text-4xl font-black tracking-tight leading-none">
                                    {profile.name}
                                </h2>
                                <Sparkles size={20} className="text-amber-400 opacity-70 animate-pulse" />
                            </div>
                            <div className="h-6 flex items-center">
                                <p className="text-[#6366f1] text-sm md:text-base font-mono font-black flex items-center">
                                    {displayed}
                                    <span className="inline-block w-1 h-4 bg-[#6366f1] ml-1 animate-pulse" />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end gap-3 self-start md:self-auto">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
                            <Clock size={14} className="text-[#22d3ee] animate-pulse" />
                            <span className="text-xs font-mono font-black text-white tracking-tight">{time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                            <MapPin size={12} className="text-emerald-500" />
                            {profile.location}
                        </div>
                    </div>
                </div>

                {/* Middle: Bio & More Info */}
                <div className="flex-1 space-y-6">
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                        {profile.bio}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20">
                            <Building2 size={14} className="text-[#6366f1]" />
                            <span className="text-[11px] font-black text-[#6366f1] uppercase tracking-wider">{profile.company}</span>
                        </div>
                        
                        <button
                            onClick={copyEmail}
                            className="group/email flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all"
                        >
                            <AnimatePresence mode="wait">
                                {copied ? (
                                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                        <Check size={13} className="text-emerald-500" />
                                    </motion.div>
                                ) : (
                                    <Mail key="mail" size={13} className="text-zinc-500 group-hover/email:text-white transition-colors" />
                                )}
                            </AnimatePresence>
                            <span className="text-[11px] font-bold text-zinc-500 group-hover/email:text-white transition-colors lowercase tracking-wide">
                                {profile.email}
                            </span>
                        </button>
                    </div>

                    {/* Tech stack mini pills */}
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <div
                                key={tech.name}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-[#6366f1]/30 hover:bg-[#6366f1]/5 transition-all group/tech"
                            >
                                <span className="text-xs transition-transform group-hover/tech:scale-125">{tech.icon}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover/tech:text-white transition-colors">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Row: CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/5">
                    <Link
                        href="/projects"
                        className="group/btn relative flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden shadow-xl shadow-white/5"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                        Explore Projects
                        <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Link>
                    <a
                        href={`mailto:${profile.email}`}
                        className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-zinc-900 text-white text-xs font-black uppercase tracking-widest border border-white/10 transition-all hover:bg-zinc-800 hover:border-white/20 active:scale-[0.98] shadow-xl"
                    >
                        Get In Touch
                        <Mail size={14} />
                    </a>
                </div>
            </div>

            <Toast message="Email copied to clipboard!" isVisible={showToast} />
        </BentoCard>
    )
}

function Building2({ size, className }: { size: number, className: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
        </svg>
    )
}
