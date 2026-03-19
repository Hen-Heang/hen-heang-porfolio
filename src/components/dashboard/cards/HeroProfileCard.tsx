"use client"

import { useState, useEffect } from "react"
import { BentoCard } from "@/src/components/dashboard/BentoCard"
import { profile } from "@/data/dashboard"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Clock, Copy, Check, Sparkles, MapPin, ExternalLink, Mail } from "lucide-react"
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
        <BentoCard className="col-span-4 md:col-span-4 p-0 overflow-hidden flex flex-col min-h-[380px] group">
            {/* Header Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366f1]/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            
            <div className="p-6 md:p-8 space-y-6 relative z-10 flex flex-col h-full justify-between">
                <div className="space-y-6">
                    {/* Header: Avatar + Time */}
                    <div className="flex justify-between items-start">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="relative group/avatar"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ring-2 ring-white/10 group-hover/avatar:ring-[#6366f1]/50 bg-[#1c1c1f]">
                                <Image
                                    src="/image/heang_new.jpeg"
                                    alt={profile.name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/avatar:scale-110"
                                    priority
                                />
                            </div>
                            {profile.available && (
                                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#09090b]" />
                                </span>
                            )}
                        </motion.div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c1c1f]/80 backdrop-blur-md border border-white/5 shadow-sm">
                                <Clock size={12} className="text-[#22d3ee] animate-pulse" />
                                <span className="text-[11px] font-mono font-black text-white tracking-tight">{time}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#52525b]">
                                <MapPin size={10} className="text-teal-500" />
                                Seoul, KR
                            </div>
                        </div>
                    </div>

                    {/* Identity */}
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h2 className="text-white text-2xl md:text-3xl font-black tracking-tight leading-none">
                                    {profile.name}
                                </h2>
                                <Sparkles size={16} className="text-amber-400 opacity-50" />
                            </div>

                            <div className="h-6 flex items-center">
                                <p className="text-[#6366f1] text-xs md:text-sm font-mono font-black flex items-center">
                                    {displayed}
                                    <span className="inline-block w-1 h-3.5 bg-[#6366f1] ml-1 animate-pulse" />
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#6366f1]/10 border border-[#6366f1]/20 group-hover:bg-[#6366f1]/20 transition-colors">
                                <Building2 size={12} className="text-[#6366f1]" />
                                <span className="text-[10px] font-black text-[#6366f1] uppercase tracking-wider">{profile.company}</span>
                            </div>
                            
                            <button
                                onClick={copyEmail}
                                className="group/email flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all"
                            >
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                            <Check size={11} className="text-emerald-500" />
                                        </motion.div>
                                    ) : (
                                        <Mail key="mail" size={11} className="text-[#71717a] group-hover/email:text-white transition-colors" />
                                    )}
                                </AnimatePresence>
                                <span className="text-[10px] font-bold text-[#71717a] group-hover/email:text-white transition-colors lowercase tracking-wide">
                                    {profile.email.split("@")[0]}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Tech stack mini pills */}
                    <div className="flex flex-wrap gap-1.5">
                        {techStack.map((tech) => (
                            <div
                                key={tech.name}
                                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#1c1c1f] border border-white/5 group-hover:border-white/10 transition-all"
                            >
                                <span className="text-[9px] leading-none grayscale group-hover:grayscale-0 transition-all">{tech.icon}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#71717a] group-hover:text-white transition-colors">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                    <Link
                        href="/projects"
                        className="group/btn relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-black text-xs font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                        Projects
                        <ExternalLink size={12} />
                    </Link>
                    <a
                        href={`mailto:${profile.email}`}
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1c1c1f] text-white text-xs font-black uppercase tracking-widest border border-white/10 transition-all hover:bg-[#27272a] hover:border-white/20 active:scale-[0.98]"
                    >
                        Contact
                        <Mail size={12} />
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
