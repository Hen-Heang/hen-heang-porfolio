export const BACKEND_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

export type BackendLevel = (typeof BACKEND_LEVELS)[number]

export const BACKEND_CATEGORIES = [
    "foundations",
    "java",
    "http",
    "database",
    "spring",
    "api",
    "security",
    "testing",
    "performance",
    "distributed-systems",
    "devops",
    "observability",
    "capstone",
] as const

export type BackendCategory = (typeof BACKEND_CATEGORIES)[number]

export const BACKEND_CONTENT_TYPES = [
    "concept",
    "guide",
    "article",
    "lab",
    "system",
    "command",
    "checklist",
    "interview",
    "case-study",
    "roadmap",
] as const

export type BackendContentType = (typeof BACKEND_CONTENT_TYPES)[number]
export type BackendDifficulty = "beginner" | "intermediate" | "advanced"
export type BackendStatus = "planned" | "draft" | "published"

export interface BackendSource {
    title: string
    publisher: string
    type: "official-docs" | "standard" | "paper" | "reference"
    url: string
    accessedAt: string
}

/** Lesson-specific retrieval-check questions. Optional — items without one fall back to the generic prompts already shown on every detail page. */
export interface BackendKnowledgeCheck {
    questions: string[]
    suggestedAnswers?: string[]
}

export interface BackendBaseItem {
    id: string
    slug: string
    title: string
    description: string
    level: BackendLevel
    category: BackendCategory
    type: BackendContentType
    technologies: string[]
    keywords: string[]
    prerequisiteIds: string[]
    relatedIds: string[]
    learningObjectives: string[]
    difficulty: BackendDifficulty
    estimatedMinutes?: number
    featured?: boolean
    updatedAt: string
    versionScope: string
    sources: BackendSource[]
    knowledgeCheck?: BackendKnowledgeCheck
}

export interface BackendPlannedItem extends BackendBaseItem {
    status: "planned"
}

export type BackendBlock =
    | { type: "paragraph"; text: string }
    | { type: "list"; items: string[]; ordered?: boolean }
    | { type: "code"; code: string; language: string; filename?: string }
    | { type: "callout"; title: string; text: string; tone: "note" | "warning" | "production" | "tradeoff" }
    | { type: "table"; headers: string[]; rows: string[][] }
    | { type: "diagram"; title: string; steps: string[]; textAlternative: string }
    | { type: "steps"; items: { title: string; text: string }[] }

export interface BackendSection {
    id: string
    title: string
    blocks: BackendBlock[]
}

export interface BackendNarrativeItem extends BackendBaseItem {
    status: "published"
    type: "concept" | "guide" | "article" | "system" | "case-study"
    sections: BackendSection[]
}

export interface BackendLabMilestone {
    id: string
    title: string
    goal: string
    tasks: string[]
    acceptanceCriteria: string[]
    tests: string[]
    commonRisks: string[]
    productionNotes: string[]
}

export interface BackendLabItem extends BackendBaseItem {
    status: "published"
    type: "lab"
    overview: BackendSection[]
    milestones: BackendLabMilestone[]
}

export interface BackendChecklistGroup {
    title: string
    rationale: string
    items: { label: string; evidence: string }[]
}

export interface BackendChecklistItem extends BackendBaseItem {
    status: "published"
    type: "checklist"
    introduction: string
    groups: BackendChecklistGroup[]
    releaseDecision: string[]
}

export interface BackendInterviewQuestion {
    question: string
    focus: string
    strongAnswer: string[]
    weakSignals: string[]
    followUps: string[]
}

export interface BackendInterviewItem extends BackendBaseItem {
    status: "published"
    type: "interview"
    introduction: string
    questions: BackendInterviewQuestion[]
}

export type BackendPublishedItem =
    | BackendNarrativeItem
    | BackendLabItem
    | BackendChecklistItem
    | BackendInterviewItem

export type BackendKnowledgeItem = BackendPlannedItem | BackendPublishedItem

export interface BackendRoadmapLevel {
    level: BackendLevel
    slug: string
    title: string
    summary: string
    learningGoals: string[]
    requiredPrerequisites: string[]
    coreConcepts: string[]
    practicalExamples: string[]
    commonMistakes: string[]
    interviewQuestions: string[]
    handsOnLabs: string[]
    productionConsiderations: string[]
    relatedItemIds: string[]
    references: BackendSource[]
}

export interface BackendItemSummary {
    id: string
    slug: string
    title: string
    description: string
    level: BackendLevel
    category: BackendCategory
    type: BackendContentType
    technologies: string[]
    keywords: string[]
    difficulty: BackendDifficulty
    estimatedMinutes?: number
    featured: boolean
    status: BackendStatus
}
