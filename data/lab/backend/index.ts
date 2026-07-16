import type { BackendKnowledgeItem, BackendRoadmapLevel } from "@/src/lib/types/backend-engineering"
import { BackendCatalogSchema, BackendRoadmapSchema } from "@/src/lib/schemas/backend-engineering"
import { backendRoadmap as rawRoadmap } from "@/data/lab/backend/roadmap"
import { backendFoundationItems } from "@/data/lab/backend/items/foundations"
import { backendSpringItems } from "@/data/lab/backend/items/spring"
import { backendProductionChecklist, backendProductionNarratives } from "@/data/lab/backend/items/production"
import { backendInterviewCollection, backendTaskApiLab, backendVoucherCaseStudy } from "@/data/lab/backend/items/applied"
import { backendPlannedItems } from "@/data/lab/backend/planned"

const rawItems: BackendKnowledgeItem[] = [
    ...backendFoundationItems,
    ...backendSpringItems,
    ...backendProductionNarratives,
    backendProductionChecklist,
    backendTaskApiLab,
    backendInterviewCollection,
    backendVoucherCaseStudy,
    ...backendPlannedItems,
]

export const backendItems = BackendCatalogSchema.parse(rawItems) as BackendKnowledgeItem[]
export const backendRoadmap = BackendRoadmapSchema.parse(rawRoadmap) as BackendRoadmapLevel[]

export const backendPublishedOrder = [
    "backend-java-backend-fundamentals",
    "backend-client-server-http-request-lifecycle",
    "backend-rest-api-design-fundamentals",
    "backend-postgresql-schema-indexing-fundamentals",
    "backend-spring-boot-layered-architecture",
    "backend-spring-boot-task-api-lab",
    "backend-mybatis-mapper-workflow",
    "backend-spring-transaction-fundamentals",
    "backend-spring-security-authentication-flow",
    "backend-testing-strategy",
    "backend-docker-cicd-spring-boot",
    "backend-production-readiness-checklist",
    "backend-voucher-redemption-case-study",
    "backend-interview-questions",
] as const
