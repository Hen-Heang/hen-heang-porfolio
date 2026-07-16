import { z } from "zod"
import { BACKEND_CATEGORIES, BACKEND_CONTENT_TYPES, BACKEND_LEVELS } from "@/src/lib/types/backend-engineering"

const IsoDateSchema = z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)), {
    message: "Expected a valid YYYY-MM-DD date",
})

export const BackendSourceSchema = z.object({
    title: z.string().min(3),
    publisher: z.string().min(2),
    type: z.enum(["official-docs", "standard", "paper", "reference"]),
    url: z.string().url(),
    accessedAt: IsoDateSchema,
})

const BackendBaseSchema = z.object({
    id: z.string().regex(/^backend-[a-z0-9-]+$/),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(4),
    description: z.string().min(24),
    level: z.union(BACKEND_LEVELS.map((level) => z.literal(level)) as [z.ZodLiteral<0>, z.ZodLiteral<1>, ...z.ZodLiteral<number>[]]),
    category: z.enum(BACKEND_CATEGORIES),
    type: z.enum(BACKEND_CONTENT_TYPES),
    technologies: z.array(z.string().min(1)),
    keywords: z.array(z.string().min(1)).min(2),
    prerequisiteIds: z.array(z.string()),
    relatedIds: z.array(z.string()),
    learningObjectives: z.array(z.string().min(8)).min(1),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
    estimatedMinutes: z.number().int().positive().optional(),
    featured: z.boolean().optional(),
    updatedAt: IsoDateSchema,
    versionScope: z.string().min(4),
    sources: z.array(BackendSourceSchema).min(1),
})

const BackendBlockSchema = z.union([
    z.object({ type: z.literal("paragraph"), text: z.string().min(12) }),
    z.object({ type: z.literal("list"), items: z.array(z.string().min(3)).min(1), ordered: z.boolean().optional() }),
    z.object({ type: z.literal("code"), code: z.string().min(8), language: z.string().min(1), filename: z.string().optional() }),
    z.object({
        type: z.literal("callout"),
        title: z.string().min(2),
        text: z.string().min(12),
        tone: z.enum(["note", "warning", "production", "tradeoff"]),
    }),
    z.object({
        type: z.literal("table"),
        headers: z.array(z.string().min(1)).min(2),
        rows: z.array(z.array(z.string())).min(1),
    }).refine((table) => table.rows.every((row) => row.length === table.headers.length), "Every table row must match the header count"),
    z.object({
        type: z.literal("diagram"),
        title: z.string().min(3),
        steps: z.array(z.string().min(1)).min(2),
        textAlternative: z.string().min(12),
    }),
    z.object({
        type: z.literal("steps"),
        items: z.array(z.object({ title: z.string().min(2), text: z.string().min(8) })).min(1),
    }),
])

const BackendSectionSchema = z.object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(3),
    blocks: z.array(BackendBlockSchema).min(1),
})

const requiredConceptSections = [
    "what-it-is",
    "why-it-matters",
    "how-it-works",
    "simple-example",
    "backend-example",
    "production-example",
    "common-mistakes",
    "best-practices",
    "trade-offs",
    "interview-questions",
    "hands-on-task",
    "related-topics",
    "references",
]

export const BackendNarrativeItemSchema = BackendBaseSchema.extend({
    status: z.literal("published"),
    type: z.enum(["concept", "guide", "article", "system", "case-study"]),
    sections: z.array(BackendSectionSchema).min(requiredConceptSections.length),
}).refine(
    (item) => requiredConceptSections.every((required) => item.sections.some((section) => section.id === required)),
    "Narrative items must include every required content section",
)

const BackendLabMilestoneSchema = z.object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(3),
    goal: z.string().min(12),
    tasks: z.array(z.string().min(4)).min(1),
    acceptanceCriteria: z.array(z.string().min(4)).min(1),
    tests: z.array(z.string().min(4)).min(1),
    commonRisks: z.array(z.string().min(4)).min(1),
    productionNotes: z.array(z.string().min(4)).min(1),
})

export const BackendLabItemSchema = BackendBaseSchema.extend({
    status: z.literal("published"),
    type: z.literal("lab"),
    overview: z.array(BackendSectionSchema).min(3),
    milestones: z.array(BackendLabMilestoneSchema).min(3),
})

export const BackendChecklistItemSchema = BackendBaseSchema.extend({
    status: z.literal("published"),
    type: z.literal("checklist"),
    introduction: z.string().min(24),
    groups: z.array(z.object({
        title: z.string().min(3),
        rationale: z.string().min(12),
        items: z.array(z.object({ label: z.string().min(3), evidence: z.string().min(5) })).min(1),
    })).min(3),
    releaseDecision: z.array(z.string().min(5)).min(2),
})

export const BackendInterviewItemSchema = BackendBaseSchema.extend({
    status: z.literal("published"),
    type: z.literal("interview"),
    introduction: z.string().min(24),
    questions: z.array(z.object({
        question: z.string().min(8),
        focus: z.string().min(8),
        strongAnswer: z.array(z.string().min(8)).min(2),
        weakSignals: z.array(z.string().min(5)).min(1),
        followUps: z.array(z.string().min(5)).min(1),
    })).min(8),
})

export const BackendPlannedItemSchema = BackendBaseSchema.extend({ status: z.literal("planned") })

export const BackendKnowledgeItemSchema = z.union([
    BackendNarrativeItemSchema,
    BackendLabItemSchema,
    BackendChecklistItemSchema,
    BackendInterviewItemSchema,
    BackendPlannedItemSchema,
])

export const BackendCatalogSchema = z.array(BackendKnowledgeItemSchema)

export const BackendRoadmapLevelSchema = z.object({
    level: BackendBaseSchema.shape.level,
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(4),
    summary: z.string().min(20),
    learningGoals: z.array(z.string().min(8)).min(2),
    requiredPrerequisites: z.array(z.string()).min(1),
    coreConcepts: z.array(z.string().min(2)).min(4),
    practicalExamples: z.array(z.string().min(4)).min(1),
    commonMistakes: z.array(z.string().min(5)).min(1),
    interviewQuestions: z.array(z.string().min(8)).min(1),
    handsOnLabs: z.array(z.string().min(5)).min(1),
    productionConsiderations: z.array(z.string().min(5)).min(1),
    relatedItemIds: z.array(z.string()),
    references: z.array(BackendSourceSchema).min(1),
})

export const BackendRoadmapSchema = z.array(BackendRoadmapLevelSchema).length(13)
