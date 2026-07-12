"use client"

import { Github, Linkedin, Send } from "lucide-react"
import { useDashboardProfile } from "@/src/providers/site-content-provider"

export function ContactCTA() {
    const profile = useDashboardProfile()
    return (
        <div
            className="col-span-4 md:col-span-8 lg:col-span-12 relative overflow-hidden rounded-[16px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-indigo-500/30 animate-in fade-in slide-in-from-bottom-4 fill-mode-both motion-reduce:animate-none"
            style={{
                background: "linear-gradient(135deg, #18181b 0%, #1e1b4b 45%, #312e81 100%)",
                animationDuration: "500ms",
            }}
        >   
            {/* Soft indigo glow + decorative orbs */}
            <div
                className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0) 70%)" }}
            />
            <div className="pointer-events-none absolute -top-12 -left-12 w-40 h-40 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5" />

            {/* Text */}
            <div className="relative z-10 text-center md:text-left">
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                    Ready to build something amazing together?
                </h2>
                <p className="text-white/70 text-sm">
                    <a
                        href={`mailto:${profile.email}`}
                        className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white/70 transition-colors"
                    >
                        {profile.email}
                    </a>
                    {" "}• Currently in {profile.location}
                </p>
            </div>

            {/* Actions */}
            <div className="relative z-10 flex items-center gap-3 shrink-0">
                <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile (opens in a new tab)"
                    className="w-10 h-10 rounded-xl backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
                >
                    <Github size={17} />
                </a>
                <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile (opens in a new tab)"
                    className="w-10 h-10 rounded-xl backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
                >
                    <Linkedin size={17} />
                </a>
                <a
                    href={profile.socials.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram (opens in a new tab)"
                    className="w-10 h-10 rounded-xl backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
                >
                    <Send size={17} />
                </a>
                <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 bg-white hover:bg-white/90 text-[#4f46e5] font-bold text-sm px-6 py-2.5 rounded-xl transition-all ml-2"
                >
                    Say Hello →
                </a>
            </div>
        </div>
    )
}
