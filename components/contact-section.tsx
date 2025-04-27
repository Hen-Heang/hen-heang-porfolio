"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import ScrollReveal from "@/components/animations/scroll-reveal"
import FadeIn from "@/components/animations/fade-in"

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitSuccess(true)

            // Reset form after showing success message
            setTimeout(() => {
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                })
                setSubmitSuccess(false)
            }, 3000)
        }, 1500)
    }

    return (
        <section className="py-16 bg-gray-50 dark:bg-[#0a0426]">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Get In Touch</h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Have a question or want to work together? Send me a message!
                            </p>
                        </div>
                    </ScrollReveal>

                    {submitSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-100 dark:bg-purple-900/30 border border-green-500/30 dark:border-purple-500/30 text-green-700 dark:text-purple-200 px-4 py-3 rounded relative mb-6"
                            role="alert"
                        >
                            <strong className="font-bold">Thank you! </strong>
                            <span className="block sm:inline">
                Your message has been sent successfully. I&#39;ll get back to you soon.
              </span>
                        </motion.div>
                    ) : null}

                    <FadeIn direction="up" delay={0.2}>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                                        Name
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.01 }}
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-white dark:bg-[#1a103f] border border-gray-300 dark:border-purple-900 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                                        Email
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.01 }}
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-white dark:bg-[#1a103f] border border-gray-300 dark:border-purple-900 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                                    Subject
                                </label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-white dark:bg-[#1a103f] border border-gray-300 dark:border-purple-900 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                                    Message
                                </label>
                                <motion.textarea
                                    whileFocus={{ scale: 1.01 }}
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 bg-white dark:bg-[#1a103f] border border-gray-300 dark:border-purple-900 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-white"
                                ></motion.textarea>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </motion.button>
                        </form>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}
