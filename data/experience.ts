import type { ExperienceItem } from "@/src/lib/types"

export const experiences: ExperienceItem[] = [
    {
        role: "Full-Stack Developer",
        company: "Bizplay",
        period: "October 2025 — Present",
        location: "Seoul, South Korea",
        summary: "Building enterprise financial web applications for government agencies and corporate clients. Developing both frontend interfaces and backend API services in Korean enterprise environment.",
        highlights: [
            "Developing frontend pages with HTML/CSS and JavaScript (jQuery)",
            "Building backend services with Java and MyBatis",
            "Designing SQL queries and connecting APIs to Oracle database",
            "Improving performance and stability of enterprise web applications",
            "Working in cross-functional team using Korean enterprise development patterns"
        ],
        stack: ["Java", "MyBatis", "SQL", "JavaScript", "jQuery", "HTML/CSS", "REST APIs"]
    },
    {
        role: "Software Engineer",
        company: "KOSIGN [Korea Software Innovation Global Network]",
        period: "January 2024 — October 2025",
        location: "Phnom Penh, Cambodia",
        summary: "Developed B2B financial platforms including billing systems and e-commerce solutions. Built end-to-end features from database design to API implementation.",
        highlights: [
            "Built B2B billing platform (WeBill365) for enterprise clients",
            "Designed PostgreSQL database schemas and optimized query performance",
            "Implemented Spring Security with JWT authentication",
            "Developed REST APIs with Spring Boot and MyBatis",
            "Collaborated with Korean development teams on enterprise projects"
        ],
        stack: ["Java 8+", "Spring Boot", "Spring Security", "PostgreSQL", "MyBatis", "Next.js", "TypeScript"]
    },
    {
        role: "Android Developer",
        company: "Korea Software HRD Center",
        period: "July 2023 — April 2024",
        location: "Cambodia",
        summary: "Developed Android applications during training program at Korea Software HRD Center bootcamp.",
        highlights: [
            "Built Android applications using Java/Kotlin",
            "Learned Korean software development practices",
            "Completed intensive full-stack development bootcamp"
        ],
        stack: ["Android", "Java", "Kotlin"]
    }
]
