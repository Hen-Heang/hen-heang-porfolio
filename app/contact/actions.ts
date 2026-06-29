"use server"

import { getSupabaseAdminClient } from "@/src/lib/supabase-admin"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactFormResult = {
    success: boolean
    error?: string
}

export async function submitContactForm(formData: {
    name: string
    email: string
    subject: string
    message: string
}): Promise<ContactFormResult> {
    const name = formData.name?.trim() ?? ""
    const email = formData.email?.trim() ?? ""
    const subject = formData.subject?.trim() ?? ""
    const message = formData.message?.trim() ?? ""

    if (!name || !email || !subject || !message) {
        return { success: false, error: "All fields are required." }
    }
    if (!EMAIL_REGEX.test(email)) {
        return { success: false, error: "Please provide a valid email address." }
    }
    if (name.length > 200 || subject.length > 300 || message.length > 5000) {
        return { success: false, error: "One of the fields is too long." }
    }

    const sb = getSupabaseAdminClient()
    if (!sb) {
        return { success: false, error: "Contact form is unavailable right now. Please email me directly." }
    }

    const { error } = await sb
        .from("portfolio_contact_messages")
        .insert({ name, email, subject, message })

    if (error) {
        return { success: false, error: "Something went wrong. Please try again or email me directly." }
    }

    return { success: true }
}
