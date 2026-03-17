import type { Project } from "@/src/lib/types"

export const projects: Project[] = [
    {
        title: "KoriAI - Intelligent Korean Language Ecosystem",
        description: "An advanced AI-driven language platform engineered to provide immersive Korean learning through natural language processing, real-time grammar synthesis, and personalized spaced-repetition algorithms.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API", "Vercel"],
        image: "/image/koriai-preview.svg",
        github: "https://github.com/Hen-Heang/koriai-frontend",
        demo: "https://koriai-frontend.vercel.app/",
        overview: "KoriAI leverages Large Language Models (LLMs) to bridge the gap between classroom learning and real-world fluency. The platform features an intelligent tutor capable of simulating complex conversational scenarios, providing instant diagnostic feedback on syntax, and optimizing vocabulary retention through automated memory scheduling.",
        features: [
            "Context-Aware AI Tutor - Real-time conversational simulations with adaptive feedback loops",
            "Syntactic Diagnostic Engine - Deep-dive sentence analysis providing grammar logic and natural phrasing alternatives",
            "Cognitive Diary Coaching - NLP-based analysis of journal entries to refine writing tone and lexical sophistication",
            "Smart Vocabulary Retention - Implementation of spaced-repetition algorithms for optimized long-term memory",
            "Immersive Scenario Simulations - Curated environments ranging from professional job interviews to social interactions",
            "Learning Velocity Analytics - Data-driven insights into progress and consistency metrics"
        ],
        technicalDetails: "Architected using Next.js 14 and TypeScript for type-safe scalability. Integrated OpenAI's GPT models via streaming APIs for low-latency responses. Implemented a custom client-side state management system for real-time chat persistence and optimized performance via selective component hydration.",
        challenges: [
            "Optimizing LLM prompts to ensure consistent pedagogical accuracy for Korean grammar",
            "Maintaining low-latency streaming for real-time conversational feedback",
            "Designing a persistent client-side database for localized vocabulary tracking"
        ],
        solutions: [
            "Engineered sophisticated prompt-chaining techniques to enforce strict linguistic rules",
            "Implemented Edge Functions and streaming response handling to minimize perceived latency",
            "Utilized local caching and indexed storage strategies for seamless offline-first vocabulary review"
        ],
        role: "Lead Architect & Developer",
        duration: "2024 - Present",
        teamSize: "1 developer"
    },
    {
        title: "Enterprise Learning Hub - Korea Standard Stack",
        description: "A comprehensive technical knowledge base documenting mission-critical patterns in the Korean IT ecosystem, specializing in eGovFramework, robust backend architectures, and enterprise-grade performance tuning.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Java Stack"],
        image: "/image/dev-notes-preview.svg",
        github: "https://github.com/Hen-Heang/dev-learning-notes",
        demo: "https://dev-learning-notes.vercel.app/",
        overview: "Designed as a bridge for developers transitioning into the Korean enterprise sector, this hub centralizes best practices for eGov-style development, MyBatis optimization, and high-concurrency Java backend design.",
        features: [
            "Full-Stack Enterprise Modules - Exhaustive documentation on Spring Boot, MyBatis, and SQL performance tuning",
            "Korea Adaptation Blueprint - Structural roadmap for mastering SaaS and eGovFramework architectural patterns",
            "Optimization Playbooks - Practical guides for query optimization and high-availability server configuration",
            "Interactive Progress Tracking - Kanban-integrated learning modules for systematic skill acquisition",
            "Developer Intelligence Feed - Real-time aggregation of industry signals and research breakthroughs"
        ],
        technicalDetails: "Built with a performant MDX architecture for dynamic documentation rendering. Leverages Tailwind's advanced design system for high-readability code presentation. Implemented a robust client-side search and filtering system for rapid knowledge discovery.",
        challenges: [
            "Synthesizing complex enterprise architectural patterns into actionable documentation",
            "Bridging the gap between diverse regional development methodologies",
            "Ensuring high-performance rendering for extensive code-heavy content"
        ],
        solutions: [
            "Structured documentation using domain-driven design principles for maximum clarity",
            "Documented real-world enterprise scenarios and their architectural solutions",
            "Optimized build-time static generation for near-instant page transitions"
        ],
        role: "Solo Developer",
        duration: "2024 - Present",
        teamSize: "1 developer"
    },
    {
        title: "Money Flow - Precision Finance Engine",
        description: "A high-performance personal finance orchestrator focused on data security, intuitive financial modeling, and seamless asset tracking with a modern, high-fidelity user interface.",
        technologies: ["Next.js", "TypeScript", "Auth.js", "PostgreSQL", "Vercel"],
        image: "/image/money-flow-preview.svg",
        github: "https://github.com/Hen-Heang/money-flow",
        demo: "https://money-flow-sigma-black.vercel.app/",
        overview: "Money Flow transforms complex financial data into actionable insights. Engineered for speed and security, it provides a unified dashboard for multi-currency tracking, expense categorization, and financial trend analysis.",
        features: [
            "Encrypted Authentication - Enterprise-grade user security and data privacy",
            "Dynamic Insight Dashboard - High-fidelity visualization of cash flow and expenditure patterns",
            "Granular Transaction Engine - Full CRUD operations with advanced categorization and metadata support",
            "Cross-Device Synchronization - Seamless responsive experience across mobile and desktop environments"
        ],
        technicalDetails: "Developed with a Next.js App Router architecture and server actions for secure, fast data mutations. Integrated a PostgreSQL backend for ACID-compliant financial record keeping. Styled with a custom Tailwind design system focused on accessibility and data density.",
        challenges: [],
        solutions: [],
        role: "Full-Stack Developer",
        duration: "2024 - Present",
        teamSize: "1 developer"
    },
    {
        title: "WeBill365 - Vietnam FinTech Ecosystem",
        description: "A large-scale digital billing and payment collection infrastructure integrated with major Vietnamese banking systems, featuring QR-based automation and multi-channel delivery.",
        technologies: ["Spring Boot", "Java 8", "PostgreSQL", "Redis", "Next.js", "Zalo API"],
        image: "/image/webill365.svg",
        github: "https://github.com/Hen-Heang/webill365",
        demo: "https://webill365.vn/",
        overview: "WeBill365 is a mission-critical FinTech solution designed to digitize the entire billing lifecycle for Vietnamese enterprises. The platform manages everything from automated bill generation to real-time bank reconciliation and multi-channel customer notifications.",
        features: [
            "Multi-Channel Omni-Delivery - Automated bill dispatching via SMS, Zalo, Telegram, and KakaoTalk",
            "Automated Bank Reconciliation - Real-time synchronization with major Vietnamese financial institutions",
            "Intelligent Virtual Accounts - Dynamic account assignment for high-volume enterprise collection",
            "Enterprise API Gateway - Robust RESTful endpoints for seamless ERP and external system integration",
            "High-Volume Bulk Processing - Scalable infrastructure capable of processing thousands of invoices simultaneously"
        ],
        technicalDetails: "Architected a robust Java 8 backend using Spring Boot and MyBatis for high-performance data access. Implemented Redis caching to optimize frequent transaction lookups. Leveraged CompletableFuture for non-blocking asynchronous payment processing and Stream API for complex financial data transformations.",
        challenges: [
            "Architecting secure integrations with fragmented banking APIs",
            "Ensuring data consistency across high-concurrency payment streams",
            "Scalability of multi-channel notification systems during peak billing periods"
        ],
        solutions: [
            "Developed a unified bank integration layer with standardized error handling and retry logic",
            "Implemented database-level locking and ACID transactions to prevent double-spending and data loss",
            "Utilized asynchronous processing and queueing strategies to maintain system throughput"
        ],
        role: "Full-Stack Engineer",
        duration: "6 months",
        teamSize: "5 developers"
    },
    {
        title: "Warehouse Master - B2B Supply Chain Platform",
        description: "An enterprise-grade B2B e-commerce and inventory management system designed to optimize supply chain transparency between manufacturers, distributors, and retailers.",
        technologies: ["Spring Boot", "PostgreSQL", "Next.js", "Redis", "Chart.js", "Maven"],
        image: "/image/warehouse-master.svg",
        github: "https://github.com/Hen-Heang/warehouse-master",
        demo: "#",
        overview: "Warehouse Master streamlines complex wholesale operations through advanced order tracking, predictive inventory alerts, and deep-dive business intelligence reporting.",
        features: [
            "Predictive Inventory Alerts - Automated notifications based on stock thresholds and order trends",
            "BI Reporting Engine - High-level analytics dashboards for executive-level decision making",
            "Tiered RBAC Security - Complex role-based access control for manufacturers, distributors, and admins",
            "Bulk Transaction Processing - Optimized workflows for large-volume wholesale purchasing",
            "Real-Time Supply Chain Visibility - End-to-end tracking of orders from manufacturing to final delivery"
        ],
        technicalDetails: "Engineered a scalable backend with Spring Boot and PostgreSQL, utilizing MyBatis for high-efficiency query execution. Implemented JWT-based stateless authentication for secure cross-platform access. Integrated Chart.js for real-time data visualization of supply chain metrics.",
        challenges: [
            "Handling large-scale concurrent order processing while maintaining inventory accuracy",
            "Implementing complex, hierarchical permissions across different organization types",
            "Optimizing analytical queries over multi-million row datasets"
        ],
        solutions: [
            "Implemented distributed locking and Redis-backed stock synchronization",
            "Architected a hierarchical RBAC system using custom Spring Security expressions",
            "Optimized database performance through strategic indexing and denormalized analytical views"
        ],
        role: "Lead Full-Stack Developer",
        duration: "8 months",
        teamSize: "6 developers"
    }
]
