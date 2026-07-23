import { describe, expect, it } from "vitest"
import { rankLabSearch } from "./search"
import type { EngineeringLabSearchItem } from "@/src/lib/types/engineering-lab"

const items: EngineeringLabSearchItem[] = [
    { title: "Spring Security and JWT Authentication", description: "Token validation, filter chains, refresh tokens.", href: "/lab/backend/jwt", source: "Backend Engineering", type: "guide", tags: ["security", "spring boot"], difficulty: "intermediate" },
    { title: "Dockerize a Spring Boot App", description: "Multi-stage Docker build for a Java service.", href: "/lab/devops/labs/dockerize-spring-boot", source: "DevOps Basics", type: "Lab", tags: ["docker"], difficulty: "intermediate" },
    { title: "PostgreSQL Schema Design", description: "Normalization, indexes, and migrations.", href: "/lab/backend/pg", source: "Backend Engineering", type: "guide", tags: ["database", "postgresql"], difficulty: "beginner" },
    { title: "CI/CD with GitHub Actions", description: "Automate build, test, and deploy.", href: "/lab/devops/labs/github-actions-cicd-pipeline", source: "DevOps Basics", type: "Lab", tags: ["ci/cd"], difficulty: "advanced" },
    { title: "Prompt: Review a Pull Request", description: "A prompt for AI-assisted code review.", href: "/ai-engineering/prompts", source: "AI Engineering", type: "Prompt", tags: ["review"] },
]

describe("rankLabSearch", () => {
    it("returns everything (respecting filters) when the query is empty", () => {
        expect(rankLabSearch("", items)).toHaveLength(items.length)
        expect(rankLabSearch("", items, { source: "DevOps Basics" })).toHaveLength(2)
    })

    it("ranks an exact title match first", () => {
        const results = rankLabSearch("Dockerize a Spring Boot App", items)
        expect(results[0].title).toBe("Dockerize a Spring Boot App")
    })

    it("matches by tag and description, not just title", () => {
        const results = rankLabSearch("database", items)
        expect(results.map((r) => r.title)).toContain("PostgreSQL Schema Design")
    })

    it("resolves the jwt alias to authentication/spring security", () => {
        const results = rankLabSearch("jwt", items)
        expect(results[0].title).toBe("Spring Security and JWT Authentication")
    })

    it("resolves the cicd alias to CI/CD", () => {
        const results = rankLabSearch("cicd", items)
        expect(results.map((r) => r.title)).toContain("CI/CD with GitHub Actions")
    })

    it("resolves the dockerize alias to docker", () => {
        const results = rankLabSearch("dockerize", items)
        expect(results.map((r) => r.title)).toContain("Dockerize a Spring Boot App")
    })

    it("filters by source", () => {
        const results = rankLabSearch("", items, { source: "Backend Engineering" })
        expect(results.every((r) => r.source === "Backend Engineering")).toBe(true)
    })

    it("filters by difficulty", () => {
        const results = rankLabSearch("", items, { difficulty: "beginner" })
        expect(results).toHaveLength(1)
        expect(results[0].title).toBe("PostgreSQL Schema Design")
    })

    it("returns no results for a query that matches nothing", () => {
        expect(rankLabSearch("kubernetes helm chart", items)).toHaveLength(0)
    })

    it("does not fragment Unicode (Korean) queries into zero tokens", () => {
        expect(() => rankLabSearch("스프링 시큐리티", items)).not.toThrow()
    })
})
