import LinkIn from "@/src/components/icons/linkIn"
import Telegram from "@/src/components/icons/telegram"
import Github from "@/src/components/icons/github"
import { Mail, MapPin, ArrowUpRight } from "lucide-react"
import { personalInfo } from "@/data/personal-info"

export function Footer() {
    const currentYear = new Date().getFullYear()

    const links = [
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ]

    const socialLinks = [
        { href: personalInfo.socialLinks.github, icon: Github, label: "GitHub" },
        { href: personalInfo.socialLinks.linkedin, icon: LinkIn, label: "LinkedIn" },
        { href: personalInfo.socialLinks.telegram, icon: Telegram, label: "Telegram" },
    ]

    return (
        <footer className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-4 py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            {personalInfo.fullName}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed text-sm">
                            {personalInfo.title}. Dedicated to building high-quality, scalable applications with a focus on clean code and user experience.
                        </p>
                        <div className="space-y-3 text-sm text-zinc-500 dark:text-zinc-500">
                            <p className="flex items-center gap-3">
                                <Mail size={14} className="text-zinc-400 dark:text-zinc-600" />
                                {personalInfo.email}
                            </p>
                            <p className="flex items-center gap-3">
                                <MapPin size={14} className="text-zinc-400 dark:text-zinc-600" />
                                {personalInfo.location}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-6">Navigation</h4>
                        <ul className="space-y-3">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-6">Connect</h4>
                        <div className="space-y-2">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all duration-300 group"
                                >
                                    <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 font-medium">{link.label}</span>
                                    <ArrowUpRight size={14} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500 dark:text-zinc-600">
                    <p>© {currentYear} {personalInfo.fullName}. All rights reserved.</p>
                    <p className="flex items-center gap-1">Built with Next.js, TypeScript & Tailwind CSS</p>
                </div>
            </div>
        </footer>
    )
}
