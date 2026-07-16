const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Minimum realistic time between a form rendering and a human submitting it. */
const MIN_SUBMIT_MS = 1_500

export interface ContactFormInput {
    name: string
    email: string
    subject: string
    message: string
    /** Hidden field — only bots fill it in. */
    honeypot?: string
    /** `Date.now()` captured when the form mounted. */
    formRenderedAt?: number
}

export interface ValidatedContactForm {
    name: string
    email: string
    subject: string
    message: string
}

export type ContactValidationResult =
    | { kind: "valid"; data: ValidatedContactForm }
    /** Bot signals (honeypot filled, submitted too fast) — caller should pretend success. */
    | { kind: "silent-reject" }
    | { kind: "invalid"; error: string }

/**
 * Pure validation — no I/O, no rate limiting, no Supabase. Bot detection
 * (honeypot / timing) is surfaced as `silent-reject` so the caller can
 * return a generic success response without tipping off the bot.
 */
export function validateContactForm(input: ContactFormInput): ContactValidationResult {
    if (input.honeypot?.trim()) {
        return { kind: "silent-reject" }
    }

    if (typeof input.formRenderedAt === "number" && Date.now() - input.formRenderedAt < MIN_SUBMIT_MS) {
        return { kind: "silent-reject" }
    }

    const name = input.name?.trim() ?? ""
    const email = input.email?.trim().toLowerCase() ?? ""
    const subject = input.subject?.trim() ?? ""
    const message = input.message?.trim() ?? ""

    if (!name || !email || !subject || !message) {
        return { kind: "invalid", error: "All fields are required." }
    }
    if (!EMAIL_REGEX.test(email)) {
        return { kind: "invalid", error: "Please provide a valid email address." }
    }
    if (name.length > 200 || subject.length > 300 || message.length > 5000) {
        return { kind: "invalid", error: "One of the fields is too long." }
    }

    return { kind: "valid", data: { name, email, subject, message } }
}
