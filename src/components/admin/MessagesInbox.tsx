"use client"

import { useCallback, useEffect, useState } from "react"
import { Loader2, Mail, MailOpen, Trash2 } from "lucide-react"
import { createClient } from "@/src/lib/supabase/client"

interface ContactMessage {
    id: string
    name: string
    email: string
    subject: string
    message: string
    is_read: boolean
    created_at: string
}

export function MessagesInbox() {
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [loading, setLoading] = useState(true)
    const [openId, setOpenId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const load = useCallback(async () => {
        const { data, error: loadError } = await createClient()
            .from("portfolio_contact_messages")
            .select("*")
            .order("created_at", { ascending: false })
        if (loadError) setError(loadError.message)
        else setMessages((data as ContactMessage[]) ?? [])
        setLoading(false)
    }, [])

    useEffect(() => {
        void load()
    }, [load])

    async function toggleOpen(msg: ContactMessage) {
        setOpenId(openId === msg.id ? null : msg.id)
        if (!msg.is_read) {
            await createClient()
                .from("portfolio_contact_messages")
                .update({ is_read: true })
                .eq("id", msg.id)
            setMessages((prev) =>
                prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m))
            )
        }
    }

    async function handleDelete(msg: ContactMessage) {
        if (!window.confirm(`Delete message from ${msg.name}?`)) return
        const { error: deleteError } = await createClient()
            .from("portfolio_contact_messages")
            .delete()
            .eq("id", msg.id)
        if (deleteError) {
            setError(deleteError.message)
            return
        }
        setMessages((prev) => prev.filter((m) => m.id !== msg.id))
    }

    const unread = messages.filter((m) => !m.is_read).length

    return (
        <section className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272a]">
                <h2 className="text-[#fafafa] text-sm font-semibold">
                    Contact Messages
                    {unread > 0 && (
                        <span className="ml-2 bg-[#6366f1] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {unread} new
                        </span>
                    )}
                </h2>
            </div>

            {error && (
                <p className="mx-5 mt-4 text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-12 text-[#52525b]">
                    <Loader2 size={16} className="animate-spin" />
                </div>
            ) : messages.length === 0 ? (
                <p className="text-center py-12 text-[#52525b] text-sm">No messages yet.</p>
            ) : (
                <ul className="divide-y divide-[#27272a]">
                    {messages.map((msg) => (
                        <li key={msg.id}>
                            <button
                                onClick={() => toggleOpen(msg)}
                                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[#1c1c1f] transition-colors text-left"
                            >
                                {msg.is_read ? (
                                    <MailOpen size={14} className="text-[#3f3f46] shrink-0" />
                                ) : (
                                    <Mail size={14} className="text-[#6366f1] shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-sm truncate ${msg.is_read ? "text-[#a1a1aa]" : "text-[#fafafa] font-semibold"}`}>
                                            {msg.name}
                                        </span>
                                        <span className="text-[#52525b] text-xs truncate">{msg.subject}</span>
                                    </div>
                                </div>
                                <span className="text-[#3f3f46] text-[10px] shrink-0">
                                    {new Date(msg.created_at).toLocaleDateString()}
                                </span>
                            </button>
                            {openId === msg.id && (
                                <div className="px-5 pb-4 pl-[52px]">
                                    <p className="text-[#71717a] text-xs mb-2">
                                        From <a href={`mailto:${msg.email}`} className="text-[#6366f1] hover:underline">{msg.email}</a>
                                    </p>
                                    <p className="text-[#a1a1aa] text-sm whitespace-pre-wrap leading-relaxed mb-3">
                                        {msg.message}
                                    </p>
                                    <button
                                        onClick={() => handleDelete(msg)}
                                        className="flex items-center gap-1.5 text-[#71717a] hover:text-red-400 text-xs transition-colors"
                                    >
                                        <Trash2 size={12} />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
