// Updated data/projects.ts
import type { Project } from "@/types"

export const projects: Project[] = [
    {
        title: "Customer Management System",
        description: "A full-stack web application for managing customer data with advanced filtering and reporting capabilities.",
        technologies: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "TanStack Query"],
        image: "/placeholder.svg?height=200&width=350",
        github: "https://github.com/Hen-Heang/customer-management",
        demo: "#",
    },
    {
        title: "Inventory Tracker",
        description: "Real-time inventory management system with RESTful API endpoints and responsive dashboard.",
        technologies: ["Spring Boot", "Spring Data JPA", "PostgreSQL", "Next.js", "Tailwind CSS"],
        image: "/placeholder.svg?height=200&width=350",
        github: "https://github.com/Hen-Heang/inventory-tracker",
        demo: "#",
    },
    {
        title: "Task Management Portal",
        description: "Collaborative task management application with user authentication and real-time updates.",
        technologies: ["TypeScript", "Next.js", "TanStack Query", "Spring Boot", "PostgreSQL"],
        image: "/placeholder.svg?height=200&width=350",
        github: "https://github.com/Hen-Heang/task-management",
        demo: "#",
    },
    {
        title: "E-commerce Platform",
        description: "Full-featured online store with product catalog, shopping cart, and payment integration.",
        technologies: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Tailwind CSS"],
        image: "/placeholder.svg?height=200&width=350",
        github: "https://github.com/Hen-Heang/ecommerce-platform",
        demo: "#",
    },
]