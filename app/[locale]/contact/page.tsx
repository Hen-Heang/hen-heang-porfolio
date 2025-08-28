"use client"

import {motion} from "framer-motion"
import {Card} from "@/src/components/ui/card"
import {Mail, Github, Linkedin, Send} from "lucide-react"
import {PageLayout} from "@/components/layout/PageLayout"
import {ContactForm} from "@/src/components/sections/contact/ContactForm";

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
                    <h1 className="text-4xl font-bold mb-8 text-center">Get In Touch</h1>

                    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="grid md:grid-cols-5">
                            <div className="md:col-span-2 bg-gradient-to-br from-teal-500 to-indigo-500 p-8 text-white">
                                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                                <p className="mb-8 opacity-90">Fill out the form and I&#39;ll get back to you as soon as
                                    possible.</p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-full bg-white/20">
                                            <Mail size={20}/>
                                        </div>
                                        <a href="mailto:henheang15@gmail.com" target="_blank" rel="noopener noreferrer"
                                           className="hover:text-teal-200 transition-colors duration-200 hover:underline flex items-center">Heang
                                            Hen</a>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-full bg-white/20">
                                            <Github size={20}/>
                                        </div>
                                        <a href="https://github.com/Hen-Heang" target="_blank" rel="noopener noreferrer"
                                           className="hover:text-teal-200 transition-colors duration-200 hover:underline flex items-center">Hen-Heang</a>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-full bg-white/20">
                                            <Linkedin size={20}/>
                                        </div>
                                        <a href="https://www.linkedin.com/in/hen-heang" target="_blank"
                                           rel="noopener noreferrer"
                                           className="hover:text-teal-200 transition-colors duration-200 hover:underline flex items-center">Hen
                                            Heang</a>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-full bg-white/20">
                                            <Send size={20}/>
                                        </div>
                                        <a href="https://t.me/henheang" target="_blank"
                                           rel="noopener noreferrer"
                                           className="hover:text-teal-200 transition-colors duration-200 hover:underline flex items-center">Telegram</a>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-3 p-8">
                                <ContactForm />
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </PageLayout>
    )
}