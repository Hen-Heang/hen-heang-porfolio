"use client"

import { ArrowUpRight, Github, Linkedin, Send, Sparkles } from "lucide-react"
import { personalInfo } from "@/data/personal-info"
import Link from "next/link"
import { HHLogo } from "@/src/components/icons/HHLogo"

export function Footer() {
    const currentYear = new Date().getFullYear()

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ]

    const socialLinks = [
        { 
            href: personalInfo.socialLinks.github, 
            icon: Github, 
            label: "GitHub",
            hoverColor: "hover:text-white"
        },
        { 
            href: personalInfo.socialLinks.linkedin, 
            icon: Linkedin, 
            label: "LinkedIn",
            hoverColor: "hover:text-[#0A66C2]"
        },
        { 
            href: personalInfo.socialLinks.telegram, 
            icon: Send, 
            label: "Telegram",
            hoverColor: "hover:text-[#26A5E4]"
        },
    ]

    return (
        <footer className="relative bg-[#09090b] pt-24 pb-32 md:pb-12 border-t border-white/5 overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-30" />
            
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid gap-16 lg:grid-cols-12 mb-20">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <Link href="/" className="inline-flex items-center gap-2 group">
                                <HHLogo size={40} className="group-hover:rotate-6" />
                                <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                                    {personalInfo.fullName}
                                </span>
                            </Link>
                            <p className="text-zinc-400 max-w-sm leading-relaxed text-base font-medium">
                                Crafting scalable enterprise solutions and modern digital experiences in the heart of <span className="text-white">Seoul</span>.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                                Available for projects
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                                <Sparkles size={12} />
                                Full-Stack Specialist
                            </div>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                        {/* Navigation */}
                        <div className="space-y-6">
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Sitemap</h4>
                            <ul className="space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm font-medium text-zinc-500 hover:text-white transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social */}
                        <div className="space-y-6">
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Connect</h4>
                            <ul className="space-y-4">
                                {socialLinks.map((social) => (
                                    <li key={social.label}>
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors duration-200 ${social.hoverColor} group/link`}
                                        >
                                            <social.icon size={16} />
                                            {social.label}
                                            <ArrowUpRight size={12} className="opacity-0 group-hover/link:opacity-100 transition-all -translate-y-0.5" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Location/Contact */}
                        <div className="col-span-2 md:col-span-1 space-y-6">
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Local</h4>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-zinc-600 font-bold uppercase">Location</p>
                                    <p className="text-sm text-zinc-300 font-medium">{personalInfo.location}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-zinc-600 font-bold uppercase">Timezone</p>
                                    <p className="text-sm text-zinc-300 font-medium">GMT+9 (KST)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6 text-[11px] font-bold text-zinc-600 uppercase tracking-widest">
                        <p>© {currentYear} {personalInfo.fullName}</p>
                        <span className="hidden md:block w-1 h-1 bg-zinc-800 rounded-full" />
                        <p className="hidden md:block">Handcrafted with Passion</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-[11px] font-bold text-zinc-600 uppercase tracking-widest">
                        <span>Built with</span>
                        <div className="flex items-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            <span className="text-white">Next.js</span>
                            <span className="text-white">Tailwind</span>
                            <span className="text-white">Framer</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
