export interface StarterQuestion {
    /** Short label shown on the chip */
    label: string
    /** Full question sent to the assistant */
    prompt: string
}

export const starterQuestions: StarterQuestion[] = [
    { label: "Tell me about Hen", prompt: "Tell me about Hen." },
    { label: "Backend experience", prompt: "What backend technologies does Hen use?" },
    { label: "Spring Boot projects", prompt: "Which of Hen's projects use Spring Boot?" },
    { label: "AI Engineering", prompt: "What AI engineering work has Hen done?" },
    { label: "Latest projects", prompt: "What are Hen's latest projects?" },
    { label: "Download CV", prompt: "How can I view or download Hen's CV?" },
    { label: "Contact", prompt: "How can I contact Hen?" },
]
