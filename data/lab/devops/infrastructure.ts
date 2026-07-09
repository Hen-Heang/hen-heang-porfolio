import type { InfraTerm } from "@/src/lib/types/devops-lab"

export const infraTerms: InfraTerm[] = [
    {
        term: "Reverse Proxy",
        category: "Networking",
        definition: "A server that sits in front of your application, receiving all client requests first and forwarding them to the appropriate backend.",
        whyItMattersForBackend: "It's how Nginx terminates TLS, routes to multiple services, and shields your app from being directly exposed to the internet.",
    },
    {
        term: "Load Balancer",
        category: "Networking",
        definition: "Distributes incoming requests across multiple instances of your app so no single instance is overwhelmed.",
        whyItMattersForBackend: "Once you run more than one instance of your API for reliability or scale, something has to decide which instance handles each request — that's the load balancer's job.",
    },
    {
        term: "Environment Variables",
        category: "Configuration",
        definition: "Key-value configuration injected into a running process from outside the codebase, rather than hardcoded.",
        whyItMattersForBackend: "It's how the same build behaves correctly in dev, staging, and production without being recompiled per environment.",
    },
    {
        term: "SSL/TLS Certificate",
        category: "Security",
        definition: "A cryptographic credential that proves a server's identity and enables encrypted HTTPS connections.",
        whyItMattersForBackend: "Without one, every request to your API — including login credentials — travels as plain, readable text over the network.",
    },
    {
        term: "API Gateway",
        category: "Networking",
        definition: "A single entry point that routes requests to different backend services, often also handling auth, rate limiting, and logging centrally.",
        whyItMattersForBackend: "Once you have more than one backend service, a gateway avoids duplicating auth and rate-limiting logic in every single one.",
    },
    {
        term: "Caching",
        category: "Performance",
        definition: "Storing the result of an expensive operation so a repeat request can be served instantly instead of recomputing it.",
        whyItMattersForBackend: "The fastest database query is the one you never have to run — caching is often the highest-leverage performance fix available.",
    },
    {
        term: "Redis",
        category: "Performance",
        definition: "An in-memory key-value store commonly used for caching, session storage, and simple queues.",
        whyItMattersForBackend: "It's the most common answer to \"where do I cache this\" in a Java/Spring Boot stack — sub-millisecond reads for data that doesn't need a full relational query.",
    },
    {
        term: "CDN",
        category: "Performance",
        definition: "Content Delivery Network — a distributed set of servers that cache and serve static assets from a location physically close to the requesting user.",
        whyItMattersForBackend: "Static assets (images, JS bundles) served from a CDN never have to touch your application server at all — it's traffic your backend doesn't need to handle.",
    },
    {
        term: "Connection Pool",
        category: "Database",
        definition: "A cache of reusable database connections, avoiding the cost of opening a brand new TCP connection to the database for every single query.",
        whyItMattersForBackend: "Opening a raw connection per request is slow and exhausts the database's connection limit under load — Spring Boot's default (HikariCP) handles this, but the pool size still needs tuning to your actual traffic.",
    },
    {
        term: "Health Checks",
        category: "Observability",
        definition: "An endpoint (commonly /actuator/health in Spring Boot) that reports whether the app and its dependencies (database, cache) are actually working.",
        whyItMattersForBackend: "Deployment platforms and load balancers use this to decide whether an instance should receive traffic — without one, a crashed instance can keep receiving requests it can never answer.",
    },
    {
        term: "Application Logs",
        category: "Observability",
        definition: "A structured, timestamped record of what your application did, at defined severity levels (DEBUG, INFO, WARN, ERROR).",
        whyItMattersForBackend: "When something breaks in production and you can't attach a debugger, logs are the only evidence of what actually happened.",
    },
    {
        term: "Monitoring",
        category: "Observability",
        definition: "Continuously tracking a system's health and performance metrics over time, usually visualized on a dashboard.",
        whyItMattersForBackend: "It's the difference between finding out about an incident from a dashboard versus finding out from an angry user.",
    },
    {
        term: "Metrics",
        category: "Observability",
        definition: "Numeric measurements over time — request latency, error rate, CPU usage, queue depth — that monitoring dashboards are built from.",
        whyItMattersForBackend: "\"The API feels slow\" isn't actionable. p95 latency went from 80ms to 400ms after the last deploy is.",
    },
    {
        term: "Alerts",
        category: "Observability",
        definition: "Automated notifications triggered when a metric crosses a defined threshold — error rate above 5%, disk usage above 90%.",
        whyItMattersForBackend: "Monitoring you have to remember to check is monitoring that fails silently at 3am. Alerts are what make observability actually proactive.",
    },
]
