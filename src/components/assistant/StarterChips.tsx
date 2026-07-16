"use client"

import { motion, useReducedMotion } from "framer-motion"

import { starterQuestions } from "./starter-questions"

interface StarterChipsProps {
    onSelect: (prompt: string) => void
    disabled?: boolean
}

/** Suggested questions shown when the conversation is empty. */
export function StarterChips({ onSelect, disabled }: StarterChipsProps) {
    const reduceMotion = useReducedMotion()

    return (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Suggested questions">
            {starterQuestions.map((question, index) => (
                <motion.button
                    key={question.label}
                    type="button"
                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.05 * index, duration: 0.25 }}
                    onClick={() => onSelect(question.prompt)}
                    disabled={disabled}
                    className="min-h-10 rounded-full border border-border bg-background/60 px-3 py-2 text-xs font-medium text-fg-secondary transition-colors hover:border-brand/40 hover:bg-brand/10 hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50"
                >
                    {question.label}
                </motion.button>
            ))}
        </div>
    )
}
