"use client"

import { motion } from "framer-motion"

/** Three pulsing dots shown while the assistant is thinking. */
export function TypingIndicator() {
    return (
        <div
            className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/10 w-fit"
            role="status"
            aria-label="Assistant is typing"
        >
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-300"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
                />
            ))}
        </div>
    )
}
