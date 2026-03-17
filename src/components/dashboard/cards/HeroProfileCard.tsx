"use client"

import { useState, useEffect } from "react"
import { BentoCard } from "@/src/components/dashboard/BentoCard"
import { profile } from "@/data/dashboard"
import Link from "next/link"
import { Clock, Copy, Check } from "lucide-react"
import { Toast } from "@/src/components/ui/Toast"

export function HeroProfileCard() {
    const [time, setTime] = useState("")
    const [showToast, setShowToast] = useState(false)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const seoulTime = new Intl.DateTimeFormat("en-US", {
                timeZone: "Asia/Seoul",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }).format(now)
            setTime(seoulTime)
        }

        updateTime()
        const timer = setInterval(updateTime, 1000)
        return () => clearInterval(timer)
    }, [])

    const copyEmail = () => {
        navigator.clipboard.writeText(profile.email)
        setCopied(true)
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
            setCopied(false)
        }, 2000)
    }

    return (
        <BentoCard className="col-span-4 md:col-span-4 p-6 md:p-8 flex flex-col justify-between min-h-[280px]">
            <div className="space-y-5">
                {/* Header: Avatar + Time */}
                <div className="flex justify-between items-start">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <span className="text-white text-2xl md:text-3xl font-bold">{profile.koreanName}</span>
                    </div>
                    
                    {/* Live Clock */}
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-[#22d3ee] bg-[#22d3ee]/10 px-3 py-1.5 rounded-xl border border-[#22d3ee]/20 shadow-sm">
                            <Clock size={13} className="animate-pulse" />
                            <span className="text-xs md:text-sm font-mono font-bold tracking-tight">{time}</span>
                        </div>
                        <span className="text-[10px] md:text-[11px] text-[#52525b] font-bold uppercase tracking-widest mt-1.5 mr-1">Seoul, KR</span>
                    </div>
                </div>

                {/* Identity */}
                <div className="relative group/identity">
                    <h2 className="text-[#fafafa] text-2xl md:text-3xl font-bold leading-tight tracking-tight">{profile.name}</h2>
                    <p className="text-[#71717a] text-sm md:text-base mt-1 font-medium">{profile.title}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <p className="text-[#6366f1] text-xs md:text-sm font-semibold px-2 py-0.5 bg-[#6366f1]/10 rounded-md border border-[#6366f1]/20">@ {profile.company}</p>
                        <span className="text-zinc-800 text-xs hidden xs:inline">•</span>
                        <button 
                            onClick={copyEmail}
                            className="flex items-center gap-1.5 text-[#71717a] hover:text-[#fafafa] text-xs md:text-sm transition-all hover:bg-white/5 px-2 py-0.5 rounded-md"
                        >
                            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                            <span className="truncate max-w-[120px] xs:max-w-none">{profile.email.split('@')[0]}</span>
                        </button>
                    </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2.5">
                    {profile.available && (
                        <span className="inline-flex items-center gap-1.5 bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 text-[11px] md:text-xs font-bold px-3 py-1 rounded-full shadow-sm shadow-emerald-500/10">
                            <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse" />
                            Available
                        </span>
                    )}
                    <span className="bg-[#27272a] text-[#a1a1aa] text-[11px] md:text-xs font-bold px-3 py-1 rounded-full border border-white/5">
                        {profile.yearsExperience} Experience
                    </span>
                </div>

                {/* Bio */}
                <p className="text-[#a1a1aa] text-sm md:text-base leading-relaxed font-medium">{profile.bio}</p>
            </div>

            {/* CTA */}
            <div className="flex gap-3 mt-6">
                <Link
                    href="/projects"
                    className="flex-1 text-center bg-[#6366f1] hover:bg-[#5558e8] text-white text-sm font-bold px-4 py-3 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                >
                    Projects
                </Link>
                <a
                    href={`mailto:${profile.email}`}
                    className="flex-1 text-center bg-[#18181b] hover:bg-[#27272a] text-[#fafafa] text-sm font-bold px-4 py-3 rounded-2xl transition-all border border-white/5 active:scale-[0.98]"
                >
                    Contact
                </a>
            </div>

            <Toast message="Email copied to clipboard!" isVisible={showToast} />
        </BentoCard>
    )
}
