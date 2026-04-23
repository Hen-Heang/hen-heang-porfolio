import React, { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { getSupabaseClient } from "@/src/lib/supabase"

export function ContactForm() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormState((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const sb = getSupabaseClient()
        if (!sb) {
            setError('Contact form is unavailable right now. Please email me directly.')
            setIsSubmitting(false)
            return
        }
        const { error: dbError } = await sb
            .from('portfolio_contact_messages')
            .insert({
                name: formState.name,
                email: formState.email,
                subject: formState.subject,
                message: formState.message,
            })

        setIsSubmitting(false);

        if (dbError) {
            setError('Something went wrong. Please try again or email me directly.')
            return;
        }

        setIsSubmitted(true);
        setFormState({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
        
        // Trigger Confetti
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
          return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          });
        }, 250);

        // Reset success message after 5 seconds
        setTimeout(() => {
            setIsSubmitted(false);
        }, 5000);
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-md bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 mb-6 border border-red-200 dark:border-red-800 text-sm"
                >
                    {error}
                </motion.div>
            )}
            {isSubmitted && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 mb-6 border border-zinc-200 dark:border-zinc-800 flex items-center gap-2"
                >
                    <span className="font-medium text-sm">Thank you! Your message has been sent successfully.</span>
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-100">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all duration-200 placeholder:text-zinc-400"
                        placeholder="Your name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-100">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all duration-200 placeholder:text-zinc-400"
                        placeholder="your@email.com"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-100">
                    Subject
                </label>
                <input
                    type="text"
                    id="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all duration-200 placeholder:text-zinc-400"
                    placeholder="Project Inquiry"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-100">
                    Message
                </label>
                <textarea
                    id="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all duration-200 placeholder:text-zinc-400"
                    placeholder="Tell me about your project..."
                />
            </div>
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-0 transition-all duration-300 hover:shadow-md disabled:opacity-70"
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white dark:text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </span>
                ) : (
                    "Send Message"
                )}
            </Button>
        </form>
    )
}
