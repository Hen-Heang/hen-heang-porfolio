"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Check, Copy } from "lucide-react"
import type { UIMessage } from "ai"

import { MarkdownContent } from "./MarkdownContent"
import { messageText } from "./history"

interface MessageBubbleProps {
    message: UIMessage
    /** Hide the copy button while this message is still streaming in. */
    isStreaming?: boolean
}

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
    const [copied, setCopied] = useState(false)
    const reduceMotion = useReducedMotion()
    const isUser = message.role === "user"
    const text = messageText(message)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
        } catch {
            // Clipboard blocked (permissions/insecure context) — nothing to do.
        }
    }

    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`group flex flex-col ${isUser ? "items-end" : "items-start"}`}
        >
            <div
                className={
                    isUser
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-sm leading-relaxed text-brand-foreground whitespace-pre-wrap break-words"
                        : "max-w-[92%] rounded-2xl rounded-bl-md border border-border bg-background/60 px-4 py-3"
                }
            >
                {isUser ? text : <MarkdownContent text={text} />}
            </div>

            {!isUser && !isStreaming && text.length > 0 && (
                <button
                    type="button"
                    onClick={copy}
                    aria-label={copied ? "Response copied" : "Copy response"}
                    className="mt-1 inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] text-fg-muted opacity-0 transition-all hover:bg-surface-hover hover:text-fg-secondary focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand group-hover:opacity-100"
                >
                    {copied ? <Check className="h-3 w-3 text-success" aria-hidden /> : <Copy className="h-3 w-3" aria-hidden />}
                    {copied ? "Copied" : "Copy"}
                </button>
            )}
        </motion.div>
    )
}
