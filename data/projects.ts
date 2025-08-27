// Updated data/projects.ts
import type { Project } from "@/src/lib/types"

export const projects: Project[] = [
    {
        title: "WeBill365 - Billing & Collection Platform",
        description: "A comprehensive digital billing and payment collection platform with QR code payments, multi-channel delivery, and real-time payment tracking. Features bulk billing, customer management, and integration with Vietnamese banking systems.",
        technologies: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL",  " API", ],
        image: "/image/webill365.svg",
        github: "https://github.com/Hen-Heang/webill365",
        demo: "https://webill365.vn/",
        overview: "WeBill365 is a comprehensive fintech solution designed to streamline billing and payment collection processes for businesses in Vietnam. The platform integrates with local banking systems and provides a seamless experience for both billers and payers.",
        features: [
            "Multi-channel bill delivery (Email, SMS, Zalo, Telegram, KakaoTalk)",
            "Bulk billing and automated payment tracking",
            "Real-time payment status updates",
            "Customer profile management and payment history",
            "Virtual account assignment for enterprise customers",
            "API integration for ERP systems",
            "Mobile app for on-the-go management"
        ],
        technicalDetails: "Built with a modern tech stack featuring Next.js for the web frontend, React Native for mobile apps, Spring Boot for backend services, and PostgreSQL for data persistence.",
        challenges: [
            "Complex integration with multiple Vietnamese banking systems",
            "Real-time payment status synchronization",
            "Handling large volumes of bulk billing operations",
            "Ensuring security compliance for financial transactions"
        ],
        solutions: [
            "Implemented robust API architecture for banking integrations",
            "Used WebSocket connections for real-time updates",
            "Optimized database queries and implemented caching with Redis",
            "Implemented comprehensive security measures and audit trails"
        ],
        role: "Full Stack Developer",
        duration: "6 months",
        teamSize: "5 developers"
    },
    {
        title: "EasyCart - Mobile E-commerce Platform",
        description: "A modern mobile e-commerce application with product discovery, personalized recommendations, and seamless shopping experience. Features grid/list views, save functionality, and real-time notifications.",
        technologies: [ "TypeScript", "Node.js", "MongoDB", "Firebase", "Redux Toolkit", "Stripe API"],
        image: "/image/easycart.svg",
        github: "https://github.com/Hen-Heang/easycart",
        demo: "#",
        overview: "EasyCart is a modern mobile e-commerce platform designed to provide users with an intuitive shopping experience. The app features personalized product recommendations, seamless payment processing, and real-time order tracking.",
        features: [
            "Personalized product recommendations using AI algorithms",
            "Grid and list view options for product browsing",
            "Save/wishlist functionality with real-time sync",
            "Push notifications for order updates and promotions",
            "Secure payment processing with Stripe integration",
            "Real-time inventory tracking",
            "User authentication with phone number and Google OAuth",
            "Offline product browsing with cached data"
        ],
        technicalDetails: "Developed using React Native for cross-platform mobile development, Node.js backend with Express, MongoDB for flexible data storage, and Firebase for real-time features and push notifications.",
        challenges: [
            "Implementing smooth animations and transitions",
            "Optimizing app performance for large product catalogs",
            "Ensuring consistent experience across iOS and Android",
            "Managing real-time data synchronization"
        ],
        solutions: [
            "Used React Native Reanimated for optimized animations",
            "Implemented virtual scrolling and lazy loading for products",
            "Created platform-specific components where needed",
            "Used Firebase Realtime Database for efficient data sync"
        ],
        role: "Mobile Developer",
        duration: "4 months",
        teamSize: "3 developers"
    },
    {
        title: "Warehouse Master - B2B E-commerce Platform",
        description: "A comprehensive B2B e-commerce platform connecting quality products with trusted distributors and retailers. Features order tracking, export reports, product alerts, and large volume purchasing capabilities.",
        technologies: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Redis", "AWS S3", "Chart.js", "JWT"],
        image: "/image/warehouse-master.svg",
        github: "https://github.com/Hen-Heang/warehouse-master",
        demo: "#",
        overview: "Warehouse Master is a B2B e-commerce platform that bridges the gap between product manufacturers and distributors/retailers. The platform streamlines the supply chain process with advanced order management and analytics.",
        features: [
            "Order tracking with real-time status updates",
            "Export reports for business intelligence",
            "Product availability alerts and notifications",
            "Large volume purchasing with bulk pricing",
            "Dashboard with key performance indicators",
            "Inventory management and stock tracking",
            "Multi-user roles (distributors, retailers, admins)",
            "Advanced search and filtering capabilities"
        ],
        technicalDetails: "Built with Next.js for the frontend, Spring Boot for backend services, PostgreSQL for relational data, Redis for caching, and AWS S3 for file storage. Integrated Chart.js for data visualization.",
        challenges: [
            "Handling large volumes of concurrent orders",
            "Implementing complex role-based access control",
            "Optimizing database queries for large datasets",
            "Ensuring data consistency across distributed systems"
        ],
        solutions: [
            "Implemented Redis caching for frequently accessed data",
            "Created comprehensive RBAC system with JWT tokens",
            "Optimized database schema and implemented indexing",
            "Used database transactions and event sourcing for consistency"
        ],
        role: "Full Stack Developer",
        duration: "8 months",
        teamSize: "6 developers"
    },
   
   
]   