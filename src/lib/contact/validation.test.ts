import { describe, expect, it } from "vitest"
import { validateContactForm, type ContactFormInput } from "./validation"

const base: ContactFormInput = {
    name: "Jane Doe",
    email: "jane@example.com",
    subject: "Hello",
    message: "This is a test message.",
    formRenderedAt: Date.now() - 5_000,
}

describe("validateContactForm", () => {
    it("accepts a valid submission and normalizes/trims fields", () => {
        const result = validateContactForm({ ...base, name: "  Jane Doe  ", email: " Jane@Example.com " })
        expect(result.kind).toBe("valid")
        if (result.kind === "valid") {
            expect(result.data.name).toBe("Jane Doe")
            expect(result.data.email).toBe("jane@example.com")
        }
    })

    it("silently rejects when the honeypot field is filled", () => {
        const result = validateContactForm({ ...base, honeypot: "http://spam.example" })
        expect(result.kind).toBe("silent-reject")
    })

    it("silently rejects a submission that's unrealistically fast", () => {
        const result = validateContactForm({ ...base, formRenderedAt: Date.now() - 100 })
        expect(result.kind).toBe("silent-reject")
    })

    it("rejects missing required fields", () => {
        const result = validateContactForm({ ...base, name: "" })
        expect(result.kind).toBe("invalid")
    })

    it("rejects an invalid email address", () => {
        const result = validateContactForm({ ...base, email: "not-an-email" })
        expect(result.kind).toBe("invalid")
    })

    it("rejects an overly long message", () => {
        const result = validateContactForm({ ...base, message: "x".repeat(6000) })
        expect(result.kind).toBe("invalid")
    })
})
