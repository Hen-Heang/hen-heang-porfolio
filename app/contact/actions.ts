"use server"

import { headers } from "next/headers"
import { getSupabaseAdminClient } from "@/src/lib/supabase-admin"
import { createRateLimiter } from "@/src/lib/rate-limit/factory"
import { clientKeyFromHeaders } from "@/src/lib/rate-limit/client-key"
import { validateContactForm, type ContactFormInput } from "@/src/lib/contact/validation"

const contactLimiter = createRateLimiter("contact", 10 * 60_000, 3)

export type ContactFormResult = {
    success: boolean
    error?: string
}

export async function submitContactForm(formData: ContactFormInput): Promise<ContactFormResult> {
    const validation = validateContactForm(formData)

    // Bot signals (honeypot filled, submitted unrealistically fast) get a
    // generic success response — never reveal that spam detection fired.
    if (validation.kind === "silent-reject") {
        return { success: true }
    }
    if (validation.kind === "invalid") {
        return { success: false, error: validation.error }
    }

    const { name, email, subject, message } = validation.data

    const requestHeaders = await headers()
    const rate = await contactLimiter.check(clientKeyFromHeaders(requestHeaders))
    if (!rate.allowed) {
        return { success: false, error: "Too many messages sent recently. Please try again later." }
    }

    const sb = getSupabaseAdminClient()
    if (!sb) {
        return { success: false, error: "Contact form is unavailable right now. Please email me directly." }
    }

    // Idempotent no-op on an accidental double-submit of the same message.
    const tenMinutesAgo = new Date(Date.now() - 10 * 60_000).toISOString()
    const { data: duplicate } = await sb
        .from("portfolio_contact_messages")
        .select("id")
        .eq("email", email)
        .eq("message", message)
        .gte("created_at", tenMinutesAgo)
        .maybeSingle()

    if (duplicate) {
        return { success: true }
    }

    const elapsed = typeof formData.formRenderedAt === "number" ? Date.now() - formData.formRenderedAt : null

    const { error } = await sb.from("portfolio_contact_messages").insert({
        name,
        email,
        subject,
        message,
        client_elapsed_ms: elapsed,
        user_agent: requestHeaders.get("user-agent"),
    })

    if (error) {
        return { success: false, error: "Something went wrong. Please try again or email me directly." }
    }

    return { success: true }
}
