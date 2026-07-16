export interface StarterQuestion {
    /** Short label shown on the chip */
    label: string
    /** Full question sent to the assistant */
    prompt: string
}

export const starterQuestions: StarterQuestion[] = [
    { label: "Backend systems", prompt: "What backend systems has Heang built?" },
    { label: "Spring Boot experience", prompt: "What is Heang's Spring Boot experience?" },
    { label: "Strongest project", prompt: "Show me his strongest project." },
    { label: "Tech stack", prompt: "What technologies does he use?" },
    { label: "Contact", prompt: "How can I contact him?" },
]
