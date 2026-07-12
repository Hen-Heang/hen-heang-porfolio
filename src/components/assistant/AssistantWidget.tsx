"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { AnimatePresence, motion } from "framer-motion"
import { Sparkles, X } from "lucide-react"

/**
 * Floating AI assistant entry point, mounted once in the root layout.
 *
 * The chat panel (AI SDK hooks, markdown renderer) is loaded lazily on first
 * open so visitors who never touch the assistant download none of it.
 */
const AssistantPanel = dynamic(() => import("./AssistantPanel"), {
    ssr: false,
    loading: () => (
        <div
            aria-hidden
            className="fixed z-[110] inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[400px] h-[min(620px,calc(100dvh-5rem))] rounded-3xl bg-[#0b0f1a]/90 backdrop-blur-2xl border border-white/10 shadow-2xl animate-pulse"
        />
    ),
})

export function AssistantWidget() {
    const [open, setOpen] = useState(false)
    const launcherRef = useRef<HTMLButtonElement>(null)

    const close = useCallback(() => {
        setOpen(false)
        // Return focus to the launcher for keyboard users — after the
        // re-render, since the launcher is hidden on mobile while open.
        requestAnimationFrame(() => launcherRef.current?.focus())
    }, [])

    useEffect(() => {
        if (!open) return
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close()
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [open, close])

    return (
        <>
            <AnimatePresence>
                {open && <AssistantPanel key="assistant-panel" onClose={close} />}
            </AnimatePresence>

            <motion.button
                ref={launcherRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-haspopup="dialog"
                aria-label={open ? "Close AI assistant" : "Open AI assistant — ask about Hen"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="fixed z-[70] bottom-24 right-3 lg:bottom-6 lg:right-6 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-900/50 border border-white/20 backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 max-sm:data-[open=true]:hidden"
                data-open={open}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={open ? "close" : "open"}
                        initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
                        transition={{ duration: 0.15 }}
                        className="flex"
                    >
                        {open ? <X className="w-5 h-5" aria-hidden /> : <Sparkles className="w-5 h-5" aria-hidden />}
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </>
    )
}
