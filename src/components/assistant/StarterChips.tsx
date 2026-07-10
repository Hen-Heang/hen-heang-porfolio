"use client"

import { motion } from "framer-motion"

import { starterQuestions } from "./starter-questions"

interface StarterChipsProps {
    onSelect: (prompt: string) => void
    disabled?: boolean
}

/** Suggested questions shown when the conversation is empty. */
export function StarterChips({ onSelect, disabled }: StarterChipsProps) {
    return (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Suggested questions">
            {starterQuestions.map((question, index) => (
                <motion.button
                    key={question.label}
                    type="button"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.25 }}
                    onClick={() => onSelect(question.prompt)}
                    disabled={disabled}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-200 bg-white/[0.06] border border-white/10 hover:bg-indigo-500/20 hover:border-indigo-400/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                >
                    {question.label}
                </motion.button>
            ))}
        </div>
    )
}
