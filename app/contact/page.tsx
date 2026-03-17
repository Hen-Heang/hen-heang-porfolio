"use client"

import {motion} from "framer-motion"
import {Card} from "@/src/components/ui/card"
import {Mail, Github, Linkedin, Send} from "lucide-react"
import {PageLayout} from "@/src/components/layout/PageLayout"
import {ContactForm} from "@/src/components/sections/contact/ContactForm";
import { personalInfo } from "@/data/personal-info";

export default function ContactPage() {
    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="max-w-5xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Get In Touch</h1>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            Have a project in mind or just want to say hello? Drop me a message and I'll get back to you as soon as possible.
                        </p>
                    </div>

                    <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                        <div className="grid md:grid-cols-5">
                            <div className="md:col-span-2 bg-zinc-900 dark:bg-zinc-100 p-8 text-white dark:text-zinc-900">
                                <h3 className="text-2xl font-semibold mb-6">Contact Details</h3>
                                <p className="mb-8 opacity-80 text-sm leading-relaxed">
                                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-full bg-white/10 dark:bg-black/5">
                                            <Mail size={18}/>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-wider opacity-60">Email</span>
                                            <a href={`mailto:${personalInfo.email}`} target="_blank" rel="noopener noreferrer"
                                               className="hover:opacity-70 transition-opacity text-sm font-medium">
                                                {personalInfo.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-full bg-white/10 dark:bg-black/5">
                                            <Github size={18}/>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-wider opacity-60">GitHub</span>
                                            <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer"
                                               className="hover:opacity-70 transition-opacity text-sm font-medium">
                                                Hen-Heang
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-full bg-white/10 dark:bg-black/5">
                                            <Linkedin size={18}/>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-wider opacity-60">LinkedIn</span>
                                            <a href={personalInfo.socialLinks.linkedin} target="_blank"
                                               rel="noopener noreferrer"
                                               className="hover:opacity-70 transition-opacity text-sm font-medium">
                                                Hen Heang
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-full bg-white/10 dark:bg-black/5">
                                            <Send size={18}/>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-wider opacity-60">Telegram</span>
                                            <a href={personalInfo.socialLinks.telegram} target="_blank"
                                               rel="noopener noreferrer"
                                               className="hover:opacity-70 transition-opacity text-sm font-medium">
                                                @henheang
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-3 p-8 bg-white dark:bg-zinc-950">
                                <ContactForm />
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </PageLayout>
    )
}
