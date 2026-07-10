"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { motion } from "framer-motion"
import { RotateCcw, Send, Sparkles, Square, X } from "lucide-react"

import { MessageBubble } from "./MessageBubble"
import { StarterChips } from "./StarterChips"
import { TypingIndicator } from "./TypingIndicator"
import { clearAssistantHistory, loadAssistantHistory, saveAssistantHistory } from "./history"

const MAX_INPUT_CHARS = 1_000
/** How close to the bottom (px) the user must be for auto-scroll to engage. */
const STICK_THRESHOLD = 80

/** Server errors arrive as JSON `{ error }` — fall back to a generic line. */
function friendlyError(error: Error | undefined): string {
    if (!error) return ""
    try {
        const parsed = JSON.parse(error.message) as { error?: string }
        if (typeof parsed.error === "string" && parsed.error.length > 0) return parsed.error
    } catch {
        // not JSON — use the fallback below
    }
    return "Something went wrong. Please try again in a moment."
}

interface AssistantPanelProps {
    onClose: () => void
}

export default function AssistantPanel({ onClose }: AssistantPanelProps) {
    // The panel only mounts after a click, so localStorage is available.
    const [initialMessages] = useState(loadAssistantHistory)

    const { messages, sendMessage, status, stop, error, clearError, setMessages } = useChat({
        transport: new DefaultChatTransport({ api: "/api/chat" }),
        messages: initialMessages,
    })

    const [input, setInput] = useState("")
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const stickToBottom = useRef(true)

    const isBusy = status === "submitted" || status === "streaming"
    const lastMessage = messages[messages.length - 1]
    const showTyping = status === "submitted" || (status === "streaming" && lastMessage?.role !== "assistant")

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    // Persist between turns; skip mid-stream so we don't write on every token.
    useEffect(() => {
        if (status === "ready" || status === "error") saveAssistantHistory(messages)
    }, [messages, status])

    // Auto-scroll while the user hasn't scrolled up to read something.
    useEffect(() => {
        const el = scrollRef.current
        if (el && stickToBottom.current) el.scrollTop = el.scrollHeight
    }, [messages, showTyping])

    const handleScroll = () => {
        const el = scrollRef.current
        if (!el) return
        stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < STICK_THRESHOLD
    }

    const submit = useCallback(
        (text: string) => {
            const trimmed = text.trim()
            if (trimmed.length === 0 || trimmed.length > MAX_INPUT_CHARS || isBusy) return
            clearError()
            stickToBottom.current = true
            void sendMessage({ text: trimmed })
            setInput("")
        },
        [isBusy, clearError, sendMessage],
    )

    const clearConversation = () => {
        stop()
        clearError()
        setMessages([])
        clearAssistantHistory()
        inputRef.current?.focus()
    }

    const errorText = friendlyError(error)

    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            role="dialog"
            aria-modal="false"
            aria-label="AI portfolio assistant"
            className="fixed z-[60] inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[400px] flex flex-col h-[min(620px,calc(100dvh-5rem))] rounded-3xl overflow-hidden bg-[#0b0f1a]/90 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-indigo-950/40"
        >
            {/* Header */}
            <header className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shrink-0">
                    <Sparkles className="w-[18px] h-[18px] text-white" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-semibold text-white truncate">Hen&apos;s AI Assistant</h2>
                    <p className="text-[11px] text-slate-400 truncate">Answers from Hen&apos;s real portfolio data</p>
                </div>
                {messages.length > 0 && (
                    <button
                        type="button"
                        onClick={clearConversation}
                        aria-label="Clear conversation"
                        title="Clear conversation"
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" aria-hidden />
                    </button>
                )}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close assistant"
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 transition-colors"
                >
                    <X className="w-4 h-4" aria-hidden />
                </button>
            </header>

            {/* Messages */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                role="log"
                aria-live="polite"
                aria-label="Conversation"
                className="flex-1 overflow-y-auto px-4 py-4 space-y-3 overscroll-contain"
            >
                {messages.length === 0 && (
                    <div className="space-y-4">
                        <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/10 text-sm leading-relaxed text-slate-200">
                            Hi! I&apos;m Hen&apos;s AI assistant. Ask me about his experience, projects, tech
                            stack, or how to get in touch. 👋
                        </div>
                        <StarterChips onSelect={submit} disabled={isBusy} />
                    </div>
                )}

                {messages.map((message, index) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        isStreaming={status === "streaming" && index === messages.length - 1 && message.role === "assistant"}
                    />
                ))}

                {showTyping && <TypingIndicator />}

                {errorText && (
                    <div role="alert" className="px-4 py-3 rounded-2xl bg-rose-500/10 border border-rose-400/30 text-sm text-rose-200">
                        {errorText}
                    </div>
                )}
            </div>

            {/* Input */}
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    submit(input)
                }}
                className="px-3 pb-3 pt-2 border-t border-white/10 bg-white/[0.02]"
            >
                <div className="flex items-end gap-2 rounded-2xl bg-white/[0.06] border border-white/10 focus-within:border-indigo-400/50 transition-colors px-3 py-2">
                    <label htmlFor="assistant-input" className="sr-only">
                        Ask a question about Hen
                    </label>
                    <textarea
                        id="assistant-input"
                        ref={inputRef}
                        value={input}
                        onChange={(event) => setInput(event.target.value.slice(0, MAX_INPUT_CHARS))}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && !event.shiftKey) {
                                event.preventDefault()
                                submit(input)
                            }
                        }}
                        rows={1}
                        maxLength={MAX_INPUT_CHARS}
                        placeholder="Ask about Hen…"
                        className="flex-1 resize-none bg-transparent text-sm text-white placeholder:text-slate-500 outline-none max-h-28 leading-relaxed py-1"
                    />
                    {isBusy ? (
                        <button
                            type="button"
                            onClick={() => stop()}
                            aria-label="Stop generating"
                            className="p-2 rounded-xl bg-white/10 text-slate-200 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 transition-colors"
                        >
                            <Square className="w-4 h-4" aria-hidden />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={input.trim().length === 0}
                            aria-label="Send message"
                            className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white disabled:opacity-40 disabled:pointer-events-none hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 transition-all"
                        >
                            <Send className="w-4 h-4" aria-hidden />
                        </button>
                    )}
                </div>
                <p className="mt-1.5 px-1 text-[10px] text-slate-500 flex items-center justify-between">
                    <span>AI-generated from portfolio data — may be imperfect.</span>
                    {input.length > MAX_INPUT_CHARS * 0.8 && (
                        <span aria-live="polite">{MAX_INPUT_CHARS - input.length} left</span>
                    )}
                </p>
            </form>
        </motion.div>
    )
}
