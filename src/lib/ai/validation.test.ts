import { describe, expect, it } from "vitest"
import { validateChatBody } from "./validation"

function userMessage(text: string, id = "1") {
    return { id, role: "user", parts: [{ type: "text", text }] }
}

describe("validateChatBody", () => {
    it("rejects a body with no messages array", () => {
        expect(validateChatBody({}).ok).toBe(false)
        expect(validateChatBody(null).ok).toBe(false)
        expect(validateChatBody({ messages: "nope" }).ok).toBe(false)
    })

    it("rejects an empty messages array", () => {
        expect(validateChatBody({ messages: [] }).ok).toBe(false)
    })

    it("rejects an invalid role", () => {
        const body = { messages: [{ id: "1", role: "system", parts: [{ type: "text", text: "hi" }] }] }
        expect(validateChatBody(body).ok).toBe(false)
    })

    it("rejects when the last message is not from the user", () => {
        const body = {
            messages: [userMessage("hi", "1"), { id: "2", role: "assistant", parts: [{ type: "text", text: "hello" }] }],
        }
        expect(validateChatBody(body).ok).toBe(false)
    })

    it("rejects a conversation exceeding the message-count limit", () => {
        const messages = Array.from({ length: 21 }, (_, i) => userMessage("hi", String(i)))
        expect(validateChatBody({ messages }).ok).toBe(false)
    })

    it("rejects a single message exceeding the per-message character limit", () => {
        const body = { messages: [userMessage("x".repeat(1001))] }
        expect(validateChatBody(body).ok).toBe(false)
    })

    it("rejects a conversation exceeding the total character limit", () => {
        const messages = Array.from({ length: 10 }, () => userMessage("x".repeat(900)))
        expect(validateChatBody({ messages }).ok).toBe(false)
    })

    it("strips control characters and ignores non-text parts", () => {
        const body = {
            messages: [
                {
                    id: "1",
                    role: "user",
                    parts: [
                        { type: "text", text: "hello\x00world" },
                        { type: "tool-call", toolName: "x" },
                    ],
                },
            ],
        }
        const result = validateChatBody(body)
        expect(result.ok).toBe(true)
        expect(result.userTexts).toEqual(["helloworld"])
    })

    it("accepts a well-formed conversation and returns rebuilt messages/userTexts", () => {
        const body = { messages: [userMessage("What backend stack do you use?")] }
        const result = validateChatBody(body)
        expect(result.ok).toBe(true)
        expect(result.messages).toHaveLength(1)
        expect(result.userTexts).toEqual(["What backend stack do you use?"])
    })
})
