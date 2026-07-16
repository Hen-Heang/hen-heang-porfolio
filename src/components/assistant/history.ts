import type { UIMessage } from "ai"

/**
 * Local persistence for the AI assistant conversation.
 *
 * History lives only in the visitor's browser (localStorage) — nothing is
 * stored server-side. Only plain text parts are persisted; anything else is
 * dropped on save and on load, so a tampered localStorage entry can never
 * inject rich payloads back into the chat.
 *
 * The assistant panel only mounts client-side (after a click on the
 * launcher), so `loadAssistantHistory` is safe to call in a useState
 * initializer without SSR/hydration concerns.
 */
const STORAGE_KEY = "hh-assistant-history-v1"
// Keep this aligned with the API's MAX_MESSAGES limit so restored history can
// always be submitted without immediately failing server-side validation.
const MAX_STORED_MESSAGES = 20

export function messageText(message: UIMessage): string {
    return message.parts
        .filter((part): part is { type: "text"; text: string } => part.type === "text")
        .map((part) => part.text)
        .join("")
}

interface StoredMessage {
    role: "user" | "assistant"
    text: string
}

export function loadAssistantHistory(): UIMessage[] {
    if (typeof window === "undefined") return []
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        const parsed: unknown = JSON.parse(raw)
        if (!Array.isArray(parsed)) return []
        return parsed
            .filter(
                (entry): entry is StoredMessage =>
                    typeof entry === "object" && entry !== null &&
                    ((entry as StoredMessage).role === "user" || (entry as StoredMessage).role === "assistant") &&
                    typeof (entry as StoredMessage).text === "string" && (entry as StoredMessage).text.length > 0,
            )
            .slice(-MAX_STORED_MESSAGES)
            .map((entry, index) => ({
                id: `history-${index}`,
                role: entry.role,
                parts: [{ type: "text", text: entry.text }],
            }))
    } catch {
        return []
    }
}

export function saveAssistantHistory(messages: UIMessage[]): void {
    if (typeof window === "undefined") return
    try {
        const stored: StoredMessage[] = messages
            .filter((m): m is UIMessage & { role: "user" | "assistant" } => m.role === "user" || m.role === "assistant")
            .map((m) => ({ role: m.role, text: messageText(m) }))
            .filter((m) => m.text.length > 0)
            .slice(-MAX_STORED_MESSAGES)
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    } catch {
        // Storage full or blocked — history is a nice-to-have, never an error.
    }
}

export function clearAssistantHistory(): void {
    if (typeof window === "undefined") return
    try {
        window.localStorage.removeItem(STORAGE_KEY)
    } catch {
        // ignore
    }
}
