"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Mail, Github, Linkedin } from "lucide-react"
import { Card } from "@/src/components/ui/card"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import { ContactForm } from "./ContactForm"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { personalInfo } from "@/data/personal-info"

export function ContactSection() {
    const router = useRouter()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section id="contact" className="section-base section-plain">
            <div className="container mx-auto px-4">
                <SectionHeader
                    badge="Contact"
                    title="Let's Talk"
                    description="Interested in working together or have any questions?"
                />

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-5xl mx-auto"
                >
                    <Card className="surface-card overflow-hidden">
                        <div className="grid md:grid-cols-5">
                            <div className="md:col-span-2 bg-gradient-to-br from-teal-500 to-indigo-500 p-8 text-white relative overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-full w-full"
                                    style={{
                                        background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
                                    }}
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                    }}
                                />

                                <h3 className="text-2xl font-semibold mb-6 relative z-10">Contact Information</h3>
                                <p className="mb-8 opacity-90 relative z-10">
                                    Fill out the form and I&#39;ll get back to you as soon as possible.
                                </p>

                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-full bg-white/20">
                                            <Mail size={20} />
                                        </div>
                                        <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                                            {personalInfo.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-full bg-white/20">
                                            <Github size={20} />
                                        </div>
                                        <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            github.com/Hen-Heang
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-full bg-white/20">
                                            <Linkedin size={20} />
                                        </div>
                                        <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            linkedin.com/in/hen-heang
                                        </a>
                                    </div>
                                </div>

                                <div className="absolute bottom-8 left-8 right-8 opacity-10">
                                    <Code size={180} />
                                </div>
                            </div>

                            <div className="md:col-span-3 p-8">
                                <ContactForm />
                            </div>
                        </div>
                    </Card>

                    <div className="text-center mt-8">
                        <Button
                            variant="outline"
                            className="border-slate-300 dark:border-slate-700"
                            onClick={() => router.push("/contact")}
                        >
                            View full contact page
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
