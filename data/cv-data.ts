/**
 * CV Data - Single Source of Truth
 * ================================
 * Edit ONLY this file to update your CV.
 * All CV components read from this file.
 *
 * Sections you can update:
 *  - personal    → name, title, contact info, links
 *  - summary     → professional summary paragraph
 *  - experience  → work history (newest first)
 *  - education   → degrees, certifications, training
 *  - skills      → skill categories with progress %
 *  - projects    → featured projects
 *  - languages   → spoken languages
 */

import { profileData } from "./profile"

export const cvData = {
  personal: {
    name: profileData.fullName,
    title: "Backend Developer (Java & Spring Boot)",
    subtitle: "Java · Spring Boot · MyBatis · REST APIs · PostgreSQL · Oracle · Next.js",
    photo: profileData.myImage,
    location: profileData.location,
    phone: profileData.phone,
    email: profileData.email,
    linkedin: profileData.socialLinks.linkedin,
    github: profileData.socialLinks.github,
    portfolio: profileData.portfolioUrl,
  },

  summary:
    "Backend Developer with 2+ years of experience designing and building REST APIs and enterprise applications with Java, Spring Boot, and MyBatis. Delivered a large-scale B2B billing platform integrated with Vietnamese banking systems, including PostgreSQL schema design, query optimisation, and Spring Security with JWT authentication. Currently develop backend services and SQL-driven business logic on Oracle for government-facing financial systems in a Korean enterprise environment. Comfortable extending work to the frontend with Next.js and TypeScript when a feature calls for it. Focused on clean architecture and maintainable code within cross-functional teams.",

  experience: [
    {
      company: "Bizplay",
      title: "Full-Stack Developer",
      location: "Seoul, South Korea",
      startDate: "October 2025",
      endDate: "Present",
      current: true,
      bullets: [
        "Develop backend services and SQL queries with Java, MyBatis, and Oracle database for government-facing financial systems",
        "Implement supporting frontend pages with HTML/CSS and JavaScript (jQuery)",
        "Maintain and improve stability of enterprise web applications in a Korean enterprise environment",
        "Collaborate in cross-functional teams following Korean enterprise development patterns",
      ],
      stack: ["Java", "MyBatis", "Oracle", "JavaScript", "jQuery", "HTML/CSS"],
    },
    {
      company: "KOSIGN (Korea Software Innovation Global Network)",
      title: "Software Engineer",
      location: "Phnom Penh, Cambodia",
      startDate: "January 2024",
      endDate: "October 2025",
      current: false,
      bullets: [
        "Designed and developed REST APIs with Spring Boot and MyBatis for a large-scale B2B billing platform integrated with Vietnamese banking systems",
        "Designed PostgreSQL schemas and optimised query performance for high-volume transactions",
        "Implemented Spring Security with JWT authentication to secure enterprise-grade APIs",
        "Integrated Zalo, SMS, and Telegram delivery channels for transactional notifications",
        "Collaborated daily with Korean development teams on architecture design and code reviews",
      ],
      stack: ["Java 8+", "Spring Boot", "Spring Security", "PostgreSQL", "MyBatis", "Next.js", "TypeScript"],
    },
  ],

  education: [
    {
      school: "Royal University of Phnom Penh",
      degree: "Bachelor of Computer Science",
      startDate: "March 2020",
      endDate: "May 2024",
      description: "Focused on software development, algorithms, and web technologies.",
    },
    {
      school: "Korea Software HRD Center",
      degree: "Full-Stack & Mobile Development Training",
      startDate: "July 2023",
      endDate: "April 2024",
      description: "Intensive training in full-stack development and Android application development using Java and Kotlin.",
    },
    {
      school: "ANT Technology Training Center",
      degree: "Basic C++ Programming Certificate",
      startDate: "March 2021",
      endDate: "July 2021",
      description: "Introduction to programming concepts and problem solving with C++.",
    },
  ],

  /**
   * Categorised skill lists shown on the CV. Order reflects priority for backend roles.
   */
  skills: [
    {
      category: "Backend",
      items: ["Java", "Spring Boot", "MyBatis", "Spring Security", "REST APIs", "Maven"],
    },
    {
      category: "Database",
      items: ["PostgreSQL", "Oracle", "MySQL", "SQL Optimisation"],
    },
    {
      category: "Frontend",
      items: ["Next.js", "React", "TypeScript", "JavaScript", "jQuery", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      category: "Tools & DevOps",
      items: ["Git", "GitHub", "IntelliJ IDEA", "WebStorm", "VS Code", "Vercel", "Railway", "Claude Code", "Postman", "Swagger"],
    },
  ],

  /**
   * Featured projects shown on CV.
   * live: set to null if no live URL.
   */
  projects: [
    {
      name: "H-Phsar",
      description:
        "Backend API for a Cambodian B2B marketplace connecting distributors and retailers. Designed the data model for stores, product catalogs, and carts; implemented an order state machine, OTP-based verification, and real-time order notifications over WebSocket.",
      technologies: ["Spring Boot 3", "Java 17", "MyBatis", "PostgreSQL", "WebSocket"],
      github: "https://github.com/Hen-Heang/h-phsar-api-full",
      live: "",
    },
    {
      name: "Hengo",
      description:
        "Spring Boot REST API behind an AI-assisted goal-tracking app, paired with a Next.js/TypeScript client. Implemented endpoints for daily missions, spaced-repetition scheduling, and XP progression, consumed via TanStack Query.",
      technologies: ["Next.js", "TypeScript", "TanStack Query", "Tailwind CSS", "Spring Boot"],
      github: "https://github.com/Hen-Heang/koriai-frontend",
      live: "https://koriai-frontend.vercel.app/",
    },
    {
      name: "We Commerce",
      description:
        "Multi-vendor marketplace API built with Spring Boot 3.4 and Java 21, with database-tracked JWT revocation for session security. Paired with a Next.js 16 storefront implementing cart, checkout, and simulated ABA Pay / KHQR payment flows.",
      technologies: ["Spring Boot 3", "Java 21", "PostgreSQL", "Next.js", "TanStack Query"],
      github: "https://github.com/Hen-Heang/we-commerce-api",
      live: "",
    },
    {
      name: "Money Flow",
      description:
        "Personal finance API and PWA on Supabase Postgres with row-level security, exposing budgeting, savings-goal, and recurring-transaction logic, plus an AI chat endpoint over Google Gemini for spending insights. Backed up daily to Neon.",
      technologies: ["Next.js", "TypeScript", "Supabase", "Google Gemini", "Web Push"],
      github: "https://github.com/Hen-Heang/money-flow",
      live: "https://money-flow.henheang.site/",
    },
  ],

  languages: [
    { name: "Khmer", level: "Native", proficiency: 100 },
    { name: "English", level: "Professional Working", proficiency: 70 },
    { name: "Korean", level: "Elementary (TOPIK I)", proficiency: 30 },
  ],
}

export type CVData = typeof cvData
