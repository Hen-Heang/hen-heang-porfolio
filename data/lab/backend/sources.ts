import type { BackendSource } from "@/src/lib/types/backend-engineering"

const accessedAt = "2026-07-16"

function source(
    title: string,
    publisher: string,
    type: BackendSource["type"],
    url: string,
): BackendSource {
    return { title, publisher, type, url, accessedAt }
}

export const backendSources = {
    java25: source("JDK 25 Documentation", "Oracle", "official-docs", "https://docs.oracle.com/en/java/javase/25/"),
    javaVirtualThreads: source("Thread API — Virtual Threads", "Oracle", "official-docs", "https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Thread.html"),
    jvmSpec: source("The Java Virtual Machine Specification, Java SE 25", "Oracle", "standard", "https://docs.oracle.com/javase/specs/jvms/se25/html/"),
    http: source("RFC 9110 — HTTP Semantics", "IETF", "standard", "https://www.rfc-editor.org/rfc/rfc9110"),
    tls: source("RFC 8446 — The Transport Layer Security Protocol Version 1.3", "IETF", "standard", "https://www.rfc-editor.org/rfc/rfc8446"),
    problemDetails: source("RFC 9457 — Problem Details for HTTP APIs", "IETF", "standard", "https://www.rfc-editor.org/rfc/rfc9457"),
    openApi: source("OpenAPI Specification 3.2.0", "OpenAPI Initiative", "standard", "https://spec.openapis.org/oas/v3.2.0.html"),
    postgresql: source("PostgreSQL 18 Documentation", "PostgreSQL Global Development Group", "official-docs", "https://www.postgresql.org/docs/18/"),
    postgresqlConstraints: source("PostgreSQL Constraints", "PostgreSQL Global Development Group", "official-docs", "https://www.postgresql.org/docs/18/ddl-constraints.html"),
    postgresqlIndexes: source("PostgreSQL Multicolumn Indexes", "PostgreSQL Global Development Group", "official-docs", "https://www.postgresql.org/docs/18/indexes-multicolumn.html"),
    postgresqlExplain: source("Using EXPLAIN", "PostgreSQL Global Development Group", "official-docs", "https://www.postgresql.org/docs/18/using-explain.html"),
    postgresqlIsolation: source("Transaction Isolation", "PostgreSQL Global Development Group", "official-docs", "https://www.postgresql.org/docs/18/transaction-iso.html"),
    oracleSql: source("Oracle Database SQL Language Reference 19c", "Oracle", "official-docs", "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/"),
    springBoot35: source("Spring Boot 3.5.16 System Requirements", "Spring", "official-docs", "https://docs.spring.io/spring-boot/3.5/system-requirements.html"),
    springIoc: source("Dependency Injection", "Spring", "official-docs", "https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html"),
    springMvc: source("Annotated Controllers", "Spring", "official-docs", "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller.html"),
    springTransactions: source("Using @Transactional", "Spring", "official-docs", "https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html"),
    mybatis: source("MyBatis 3 Mapper XML Files", "MyBatis", "official-docs", "https://mybatis.org/mybatis-3/sqlmap-xml.html"),
    mybatisDynamic: source("MyBatis 3 Dynamic SQL", "MyBatis", "official-docs", "https://mybatis.org/mybatis-3/dynamic-sql.html"),
    mybatisStarter: source("MyBatis Spring Boot Starter Reference", "MyBatis", "official-docs", "https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/"),
    springSecurity: source("Servlet Authentication Architecture", "Spring", "official-docs", "https://docs.spring.io/spring-security/reference/6.5/servlet/authentication/architecture.html"),
    springSecurityConfig: source("Spring Security Java Configuration", "Spring", "official-docs", "https://docs.spring.io/spring-security/reference/6.5/servlet/configuration/java.html"),
    jwt: source("RFC 7519 — JSON Web Token", "IETF", "standard", "https://www.rfc-editor.org/rfc/rfc7519"),
    jwtBcp: source("RFC 8725 — JSON Web Token Best Current Practices", "IETF", "standard", "https://www.rfc-editor.org/rfc/rfc8725"),
    oauthBcp: source("RFC 9700 — Best Current Practice for OAuth 2.0 Security", "IETF", "standard", "https://www.rfc-editor.org/rfc/rfc9700"),
    owaspAsvs: source("Application Security Verification Standard 5.0", "OWASP", "standard", "https://owasp.org/www-project-application-security-verification-standard/"),
    springTesting: source("Testing Spring Boot Applications", "Spring", "official-docs", "https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html"),
    junit: source("JUnit 5 User Guide", "JUnit", "official-docs", "https://junit.org/junit5/docs/current/user-guide/"),
    testcontainers: source("Testcontainers for Java — JUnit 5 Quickstart", "Testcontainers", "official-docs", "https://java.testcontainers.org/quickstart/junit_5_quickstart/"),
    docker: source("Docker Build Best Practices", "Docker", "official-docs", "https://docs.docker.com/build/building/best-practices/"),
    githubActions: source("Secure Use Reference for GitHub Actions", "GitHub", "official-docs", "https://docs.github.com/en/actions/reference/security/secure-use"),
    git: source("Git Reference", "Git Project", "official-docs", "https://git-scm.com/docs"),
    linux: source("Linux man-pages Project", "Linux man-pages", "reference", "https://www.kernel.org/doc/man-pages/"),
    nginx: source("NGINX Reverse Proxy Guide", "NGINX", "official-docs", "https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/"),
    redis: source("Redis Use Cases", "Redis", "official-docs", "https://redis.io/docs/latest/develop/use-cases/"),
    opentelemetry: source("OpenTelemetry Concepts", "OpenTelemetry", "official-docs", "https://opentelemetry.io/docs/concepts/"),
    actuator: source("Spring Boot Actuator Endpoints", "Spring", "official-docs", "https://docs.spring.io/spring-boot/reference/actuator/endpoints.html"),
    gracefulShutdown: source("Spring Boot Graceful Shutdown", "Spring", "official-docs", "https://docs.spring.io/spring-boot/reference/web/graceful-shutdown.html"),
    outbox: source("Pattern: Transactional Outbox", "Microservices.io", "reference", "https://microservices.io/patterns/data/transactional-outbox.html"),
    cap: source("Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services", "ACM", "paper", "https://doi.org/10.1145/564585.564601"),
} as const satisfies Record<string, BackendSource>
