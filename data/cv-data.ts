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

export const cvData = {
  personal: {
    name: "Hen Heang",
    title: "Full-Stack Software Engineer",
    subtitle: "Java · Spring Boot · MyBatis · JavaScript · Next.js · TypeScript",
    photo: "/image/heang_new.jpeg",
    location: "Seoul, South Korea",
    phone: "+82 86-7985-72",
    email: "henheang15@gmail.com",
    linkedin: "https://www.linkedin.com/in/hen-heang",
    github: "https://github.com/Hen-Heang",
    portfolio: "https://hen-heang-porfolio.vercel.app",
  },

  summary:
    "Full-Stack Software Engineer with 2+ years of experience building enterprise web applications in Korea and Cambodia. Specialise in Java/Spring Boot backends paired with modern frontends (Next.js, TypeScript). Proven track record in FinTech and B2B platforms — from database design and REST API implementation to frontend delivery. Comfortable working in Korean-language enterprise teams and delivering clean, maintainable code.",

  experience: [
    {
      company: "Webcash Inc.",
      title: "Full-Stack Developer",
      location: "Seoul, South Korea",
      startDate: "October 2025",
      endDate: "Present",
      current: true,
      bullets: [
        "Develop frontend pages with HTML/CSS and JavaScript (jQuery) for government-facing financial systems",
        "Build backend services and SQL queries with Java, MyBatis, and Oracle database",
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
        "Built WeBill365 — a large-scale B2B billing platform integrated with Vietnamese banking systems",
        "Designed PostgreSQL schemas and optimised query performance for high-volume transactions",
        "Implemented Spring Security with JWT authentication for enterprise-grade security",
        "Developed REST APIs with Spring Boot and MyBatis; integrated Zalo, SMS, and Telegram delivery",
        "Collaborated daily with Korean development teams on architecture and code reviews",
      ],
      stack: ["Java 8+", "Spring Boot", "Spring Security", "PostgreSQL", "MyBatis", "Next.js", "TypeScript"],
    },
    {
      company: "Korea Software HRD Center",
      title: "Android Developer (Training)",
      location: "Cambodia",
      startDate: "July 2023",
      endDate: "April 2024",
      current: false,
      bullets: [
        "Completed intensive full-stack and mobile development bootcamp",
        "Built Android applications using Java/Kotlin and Android SDK",
        "Gained foundation in Korean software development practices and enterprise patterns",
      ],
      stack: ["Android", "Java", "Kotlin"],
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
      degree: "Full-Stack Development Certificate",
      startDate: "January 2023",
      endDate: "December 2023",
      description: "Intensive bootcamp covering HTML, CSS, JavaScript, React, Java, and databases.",
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
   * proficiency: 0–100 (shown as a progress bar %)
   * Adjust freely — only edit these numbers and lists.
   */
  skills: [
    {
      category: "Backend",
      items: ["Java", "Spring Boot", "MyBatis", "Spring Security", "REST APIs", "Maven"],
      proficiency: 85,
    },
    {
      category: "Frontend",
      items: ["JavaScript", "jQuery", "HTML5", "CSS3", "TypeScript", "React", "Next.js", "Tailwind CSS"],
      proficiency: 80,
    },
    {
      category: "Database",
      items: ["PostgreSQL", "Oracle", "MySQL", "SQL Optimisation"],
      proficiency: 80,
    },
    {
      category: "Tools & DevOps",
      items: ["Git", "GitHub", "IntelliJ IDEA", "WebStorm", "VS Code", "Vercel", "Railway"],
      proficiency: 80,
    },
  ],

  /**
   * Featured projects shown on CV.
   * live: set to null if no live URL.
   */
  projects: [
    {
      name: "KoriAI",
      description:
        "AI-powered Korean language learning platform with real-time conversational tutor, grammar analysis, and spaced-repetition vocabulary engine.",
      technologies: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS", "Vercel"],
      github: "https://github.com/Hen-Heang/koriai-frontend",
      live: "https://koriai-frontend.vercel.app/",
    },
    {
      name: "WeBill365 – FinTech Billing Platform",
      description:
        "Large-scale B2B billing and payment collection system integrated with Vietnamese banking. Handles automated QR generation, multi-channel notifications, and real-time reconciliation.",
      technologies: ["Spring Boot", "Java 8", "PostgreSQL", "Redis", "Next.js", "Zalo API"],
      github: "https://github.com/Hen-Heang/webill365",
      live: "https://webill365.vn/",
    },
    {
      name: "Money Flow",
      description:
        "Personal finance orchestrator with encrypted authentication, dynamic dashboard, and ACID-compliant transaction engine.",
      technologies: ["Next.js", "TypeScript", "Auth.js", "PostgreSQL", "Vercel"],
      github: "https://github.com/Hen-Heang/money-flow",
      live: "https://money-flow-sigma-black.vercel.app/",
    },
  ],

  languages: [
    { name: "Khmer", level: "Native", proficiency: 100 },
    { name: "English", level: "Professional Working", proficiency: 70 },
    { name: "Korean", level: "Elementary (TOPIK I)", proficiency: 30 },
  ],
}

export type CVData = typeof cvData
