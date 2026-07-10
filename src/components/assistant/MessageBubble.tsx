"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`group flex flex-col ${isUser ? "items-end" : "items-start"}`}
        >
            <div
                className={
                    isUser
                        ? "max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-md bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm leading-relaxed whitespace-pre-wrap break-words"
                        : "max-w-[92%] px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/10"
                }
            >
                {isUser ? text : <MarkdownContent text={text} />}
            </div>

            {!isUser && !isStreaming && text.length > 0 && (
                <button
                    type="button"
                    onClick={copy}
                    aria-label={copied ? "Response copied" : "Copy response"}
                    className="mt-1 inline-flex items-center gap-1 px-1.5 py-1 rounded-md text-[11px] text-slate-400 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:text-slate-200 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 transition-all"
                >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" aria-hidden /> : <Copy className="w-3 h-3" aria-hidden />}
                    {copied ? "Copied" : "Copy"}
                </button>
            )}
        </motion.div>
    )
}
