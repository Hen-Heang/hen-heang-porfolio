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
        <footer className="section-muted border-t border-slate-200/70 dark:border-slate-700/70">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
                            {personalInfo.fullName}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-5 max-w-xl leading-relaxed">
                            {personalInfo.title}. I build reliable products from frontend UI to backend APIs and databases.
                        </p>
                        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            <p className="inline-flex items-center gap-2">
                                <Mail size={14} className="text-teal-500" />
                                {personalInfo.email}
                            </p>
                            <p className="inline-flex items-center gap-2">
                                <MapPin size={14} className="text-teal-500" />
                                {personalInfo.location}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Navigation</h4>
                        <ul className="space-y-2">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Connect</h4>
                        <div className="space-y-2">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-2.5 rounded-lg surface-soft hover:border-teal-400/60 dark:hover:border-teal-500/60 transition-colors"
                                >
                                    <span className="text-sm text-slate-700 dark:text-slate-200">{link.label}</span>
                                    <span className="text-slate-500 dark:text-slate-400"><ArrowUpRight size={14} /></span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-200/70 dark:border-slate-700/70 text-sm text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                    <p>© {currentYear} {personalInfo.fullName}. All rights reserved.</p>
                    <p>Built with Next.js and TypeScript.</p>
                </div>
            </div>
        </footer>
    )
}
