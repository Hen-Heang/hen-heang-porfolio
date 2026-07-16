import type { BackendChecklistItem, BackendNarrativeItem } from "@/src/lib/types/backend-engineering"
import { createNarrativeSections } from "@/data/lab/backend/helpers"
import { backendSources as s } from "@/data/lab/backend/sources"

const updatedAt = "2026-07-16"

export const backendProductionNarratives = [
    {
        id: "backend-testing-strategy",
        slug: "backend-testing-strategy",
        title: "Backend Testing Strategy",
        description: "Build a risk-based Java and Spring test suite across services, controllers, security, MyBatis, real PostgreSQL, transactions, idempotency, and concurrency.",
        level: 7,
        category: "testing",
        type: "guide",
        technologies: ["JUnit 5", "AssertJ", "Mockito", "MockMvc", "Testcontainers", "PostgreSQL"],
        keywords: ["unit tests", "integration tests", "test pyramid", "MockMvc", "Testcontainers", "concurrency tests"],
        prerequisiteIds: ["backend-spring-transaction-fundamentals", "backend-spring-security-authentication-flow"],
        relatedIds: ["backend-spring-boot-task-api-lab", "backend-production-readiness-checklist", "backend-mybatis-mapper-workflow"],
        learningObjectives: ["Select the cheapest test that can detect a specific backend risk", "Test database, security, rollback, idempotency, and concurrency behavior with production-like boundaries"],
        difficulty: "intermediate",
        estimatedMinutes: 60,
        featured: true,
        status: "published",
        updatedAt,
        versionScope: "Spring Boot 3.5 test support, JUnit Jupiter, Testcontainers for Java",
        sources: [s.springTesting, s.junit, s.testcontainers],
        sections: createNarrativeSections({
            whatItIs: "A backend testing strategy assigns each important risk to a test boundary: pure unit tests for business decisions, MVC/security slices for HTTP mapping, PostgreSQL integration tests for SQL and transactions, and a small number of end-to-end flows for deployed wiring.",
            whyItMatters: "A large test count can still miss the failures that cost money: invalid authorization, incorrect SQL dialect, non-rollback, duplicate requests, time-dependent behavior, or incompatible responses. Strategy links tests to consequences rather than maximizing mocks or coverage percentages.",
            howItWorks: [
                { type: "table", headers: ["Test", "Real components", "Best at"], rows: [["Unit", "One class plus controlled collaborators", "Rules, branches, error translation"], ["MVC slice", "Spring MVC mapping/validation/filter subset", "HTTP contract and security decisions"], ["Database integration", "MyBatis + real PostgreSQL", "SQL, result maps, constraints, transaction behavior"], ["Application integration", "Full Spring context + external test dependencies", "Wiring and use-case flow"], ["End to end", "Built/deployed application through public interface", "Critical user journey and deployment confidence"]] },
                { type: "callout", tone: "note", title: "Pyramid, not dogma", text: "Keep most tests fast and focused, then add realistic boundary tests wherever mocks cannot represent the risk. Database-heavy applications need meaningful database integration coverage." },
            ],
            simpleExample: [
                { type: "code", language: "java", filename: "VoucherRulesTest.java", code: `class VoucherRulesTest {
    private final Clock clock = Clock.fixed(
        Instant.parse("2026-07-16T01:00:00Z"), ZoneOffset.UTC);
    private final VoucherRules rules = new VoucherRules(clock);

    @ParameterizedTest
    @CsvSource({
        "ISSUED, 2026-07-17T00:00:00Z, true",
        "REDEEMED, 2026-07-17T00:00:00Z, false",
        "ISSUED, 2026-07-15T00:00:00Z, false"
    })
    void evaluatesRedemption(String status, Instant expiresAt, boolean expected) {
        Voucher voucher = voucher(status, expiresAt);
        assertThat(rules.canRedeem(voucher)).isEqualTo(expected);
    }
}` },
                { type: "paragraph", text: "The fixed Clock removes wall-clock nondeterminism. Parameterization documents a decision table without hiding failures in a loop." },
            ],
            backendExample: [
                { type: "code", language: "java", filename: "TaskControllerTest.java", code: `@WebMvcTest(TaskController.class)
@Import(SecurityConfig.class)
class TaskControllerTest {
    @Autowired MockMvc mvc;
    @MockBean TaskService taskService;

    @Test
    @WithMockUser(username = "42", roles = "USER")
    void rejectsBlankTitle() throws Exception {
        mvc.perform(post("/v1/tasks")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"title":""}"""))
            .andExpect(status().isBadRequest())
            .andExpect(content().contentTypeCompatibleWith("application/problem+json"))
            .andExpect(jsonPath("$.errors[0].field").value("title"));
    }
}` },
                { type: "code", language: "java", filename: "TaskMapperIT.java", code: `@Testcontainers
@SpringBootTest
class TaskMapperIT {
    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:16-alpine");

    @Autowired TaskMapper taskMapper;

    @Test
    void returnsStableKeysetOrder() {
        // Arrange committed rows with equal timestamps and distinct IDs.
        // Query two pages and assert no duplicate or missing ID.
    }
}` },
            ],
            productionExample: [
                { type: "steps", items: [{ title: "Risk inventory", text: "List money, security, privacy, compatibility, availability, migration, and operational failure modes." }, { title: "Boundary", text: "Choose the smallest boundary that contains the real behavior: do not mock PostgreSQL when verifying a PostgreSQL constraint." }, { title: "Determinism", text: "Control time, randomness, IDs, network behavior, data cleanup, and parallel execution." }, { title: "Failure evidence", text: "Assert durable rows, affected counts, emitted events, status and error shape—not only that no exception was thrown." }] },
                { type: "table", headers: ["Critical scenario", "Evidence"], rows: [["Transaction rollback", "No partial rows after an injected failure"], ["Idempotency", "Same key/request returns same outcome; changed request conflicts"], ["Concurrent redemption", "One business result and valid audit history"], ["Authorization", "Anonymous, wrong role, wrong owner, and correct owner paths"], ["Migration", "Upgrade from realistic previous schema and restart safely"]] },
            ],
            commonMistakes: ["Mocking every collaborator and testing implementation calls", "Using H2 to claim PostgreSQL SQL correctness", "Sharing mutable fixtures across tests", "Depending on test order or current time", "Testing only happy paths", "Using Thread.sleep as synchronization in concurrency tests", "Making CI require production credentials"],
            bestPractices: ["Name tests as behavior and outcome", "Use AssertJ failure messages for domain intent", "Keep fixtures small and explicit", "Use Testcontainers for dialect and constraint behavior", "Test authorization denial and information disclosure", "Make retries, timeouts, and concurrency bounded in tests", "Quarantine nothing silently; fix or delete flaky tests"],
            tradeOffs: [{ type: "table", headers: ["Technique", "Benefit", "Cost"], rows: [["Mock", "Fast, isolates collaborator behavior", "Can encode implementation and unrealistic assumptions"], ["Fake", "Reusable deterministic behavior", "May drift from the real system"], ["Container", "Real database or broker semantics", "Startup and resource cost"], ["Full context", "Wiring confidence", "Slower and less precise failures"]] }],
            interviewQuestions: ["What should be unit tested in a Spring service?", "When would you use @WebMvcTest versus @SpringBootTest?", "Why use Testcontainers?", "How do you prove rollback?", "How would you test idempotency under concurrency?", "What makes a test deterministic?"],
            handsOnTask: [{ type: "steps", items: [{ title: "Matrix", text: "Create a Task API test matrix for happy, validation, authentication, authorization, conflict, rollback, idempotency, and concurrency paths." }, { title: "Implement", text: "Add a pure service test, MockMvc security test, and PostgreSQL mapper/transaction test." }, { title: "Gate", text: "Run fast tests on every change and integrate container tests into CI with bounded time and diagnostic output." }] }],
            relatedTopics: ["JUnit and AssertJ", "Spring MVC and Security Testing", "MyBatis Query Testing", "Testcontainers", "CI Quality Gates"],
            sources: [s.springTesting, s.junit, s.testcontainers],
        }),
    },
    {
        id: "backend-docker-cicd-spring-boot",
        slug: "docker-cicd-spring-boot",
        title: "Docker and CI/CD for Spring Boot",
        description: "Package a reproducible Spring Boot artifact in a multi-stage non-root image and promote it through secure CI, verification, deployment, and rollback gates.",
        level: 10,
        category: "devops",
        type: "guide",
        technologies: ["Docker", "Maven", "GitHub Actions", "Spring Boot", "Nginx"],
        keywords: ["Dockerfile", "multi-stage build", "non-root", "CI/CD", "GitHub Actions", "deployment"],
        prerequisiteIds: ["backend-testing-strategy"],
        relatedIds: ["backend-production-readiness-checklist", "backend-spring-boot-task-api-lab", "backend-voucher-redemption-case-study"],
        learningObjectives: ["Build a minimal non-root Spring Boot container with reproducible inputs", "Design CI/CD gates that verify the artifact before and after deployment"],
        difficulty: "intermediate",
        estimatedMinutes: 55,
        featured: true,
        status: "published",
        updatedAt,
        versionScope: "Docker BuildKit, Java 21 runtime, Maven wrapper, GitHub Actions current secure-use guidance",
        sources: [s.docker, s.githubActions, s.gracefulShutdown, s.nginx],
        sections: createNarrativeSections({
            whatItIs: "Containerization packages a Spring Boot artifact and runtime filesystem into an image. CI validates source and creates an immutable artifact; delivery deploys that same artifact through controlled environments; deployment completes only after health and smoke verification.",
            whyItMatters: "A successful local JAR is not production evidence. Reproducibility, base-image provenance, least privilege, secrets, migrations, supply-chain controls, probes, resource limits, and rollback determine whether an artifact can be operated safely.",
            howItWorks: [
                { type: "diagram", title: "Delivery flow", steps: ["Developer push", "Compile", "Unit tests", "Integration tests", "Build image", "Scan + attest", "Deploy", "Readiness", "Smoke test", "Monitor", "Promote or rollback"], textAlternative: "A developer push triggers compile, unit and integration tests, image build and scanning. The immutable image is deployed, checked for readiness and smoke behavior, monitored, then promoted or rolled back." },
                { type: "callout", tone: "production", title: "One artifact", text: "Build once, identify the image by immutable digest, and promote that digest. Rebuilding per environment can produce different bits and weakens rollback confidence." },
            ],
            simpleExample: [
                { type: "code", language: "dockerfile", filename: "Dockerfile", code: `# syntax=docker/dockerfile:1
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /workspace
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN ./mvnw -B -q -DskipTests dependency:go-offline
COPY src/ src/
RUN ./mvnw -B -DskipTests package

FROM eclipse-temurin:21-jre-jammy AS runtime
RUN groupadd --system --gid 10001 app \
    && useradd --system --uid 10001 --gid app --home /app app
WORKDIR /app
COPY --from=build --chown=app:app /workspace/target/*.jar app.jar
USER 10001:10001
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]` },
                { type: "callout", tone: "warning", title: "Pin and update", text: "Tags are readable but mutable. For controlled production builds, pin trusted base images by digest and use automation to propose reviewed digest updates. Rebuild regularly for security fixes." },
            ],
            backendExample: [
                { type: "code", language: "yaml", filename: ".github/workflows/backend-ci.yml", code: `name: backend-ci
on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      # In the repository, replace every <verified-full-sha> with a full
      # commit SHA from the official action repository.
      - uses: actions/checkout@<verified-full-sha>
      - uses: actions/setup-java@<verified-full-sha>
        with:
          distribution: temurin
          java-version: "21"
          cache: maven
      - run: ./mvnw -B verify
      - run: docker build --pull -t task-api:\${{ github.sha }} .` },
                { type: "paragraph", text: "The placeholder is intentional: GitHub recommends full-length commit SHAs as the immutable way to consume actions. Resolve and review the current SHA when implementing the repository workflow rather than copying a stale value from learning content." },
            ],
            productionExample: [
                { type: "steps", items: [{ title: "Pull request", text: "Compile, static analysis, unit tests, PostgreSQL integration tests, dependency review, and Dockerfile checks run without deployment credentials." }, { title: "Artifact", text: "Main builds and scans one image, records source revision and dependency metadata, then pushes it to a restricted registry." }, { title: "Migration", text: "Run a backward-compatible migration as an explicit controlled job; do not let every application replica race to migrate." }, { title: "Deploy", text: "Roll out the digest with environment configuration and secret references, bounded resources, readiness/liveness, and graceful shutdown." }, { title: "Verify", text: "Run smoke tests and watch error, latency, saturation, and business signals during a defined observation window." }, { title: "Rollback", text: "Stop promotion or restore the previous application digest. Database rollback relies on expand/contract compatibility, not wishful down scripts." }] },
            ],
            commonMistakes: ["Running the application as root", "Copying source, Maven cache, or secrets into the runtime image", "Using latest tags for production identity", "Giving the workflow broad write permissions", "Pinning actions only to mutable tags", "Running destructive migrations during every instance startup", "Treating a passing health endpoint as a complete smoke test"],
            bestPractices: ["Use multi-stage builds and .dockerignore", "Choose trusted minimal bases and patch them", "Run as an explicit non-root UID/GID", "Give jobs least-privilege permissions and environments separate approval", "Keep secrets out of images and logs", "Use readiness for traffic and liveness only for unrecoverable process state", "Practice rollback and restore"],
            tradeOffs: [{ type: "table", headers: ["Approach", "Benefit", "Cost"], rows: [["Dockerfile", "Explicit portable image recipe", "You own patch and layer decisions"], ["Buildpack", "Curated layers and fast rebases", "Less low-level control"], ["Rolling", "Efficient gradual replacement", "Old/new versions overlap"], ["Blue-green", "Fast traffic switch and app rollback", "Double capacity and data compatibility"]] }],
            interviewQuestions: ["Why use a multi-stage build?", "Why run as non-root?", "What should readiness and liveness mean?", "How do you deploy a database migration safely?", "Why pin GitHub Actions to a full SHA?", "What makes rollback possible?"],
            handsOnTask: [{ type: "steps", items: [{ title: "Image", text: "Build the Task API with a multi-stage Dockerfile, non-root runtime, .dockerignore, and digest-aware base policy." }, { title: "Pipeline", text: "Add compile, unit, integration, image build, scan, artifact, and approval stages with least privilege." }, { title: "Deploy", text: "Run a local rolling simulation, verify readiness and smoke behavior, send SIGTERM, and confirm graceful completion." }, { title: "Recover", text: "Roll back the application image while keeping an expand/contract schema compatible." }] }],
            relatedTopics: ["Maven Reproducibility", "Docker Layers", "GitHub Actions Security", "Nginx Reverse Proxy", "Health Probes", "Production Checklist"],
            sources: [s.docker, s.githubActions, s.gracefulShutdown, s.nginx],
        }),
    },
] satisfies BackendNarrativeItem[]

export const backendProductionChecklist: BackendChecklistItem = {
    id: "backend-production-readiness-checklist",
    slug: "production-readiness-checklist",
    title: "Production Readiness Checklist",
    description: "An evidence-based release review for security, data, resilience, delivery, observability, operations, rollback, and ownership.",
    level: 11,
    category: "observability",
    type: "checklist",
    technologies: ["Spring Boot Actuator", "PostgreSQL", "Docker", "OpenTelemetry"],
    keywords: ["production checklist", "health checks", "monitoring", "rollback", "backups", "incident response"],
    prerequisiteIds: ["backend-docker-cicd-spring-boot", "backend-spring-security-authentication-flow"],
    relatedIds: ["backend-voucher-redemption-case-study", "backend-testing-strategy", "backend-spring-boot-task-api-lab"],
    learningObjectives: ["Review a backend release using verifiable evidence rather than confidence statements", "Define owners, monitors, recovery steps, and rollback before production traffic"],
    difficulty: "advanced",
    estimatedMinutes: 45,
    featured: true,
    status: "published",
    updatedAt,
    versionScope: "Spring Boot 3.5 Actuator and graceful shutdown; OpenTelemetry current concepts",
    sources: [s.actuator, s.gracefulShutdown, s.opentelemetry, s.owaspAsvs, s.docker],
    introduction: "A checklist is a release decision aid, not proof by itself. Mark an item complete only when a link, test result, dashboard, runbook, restore record, or named owner demonstrates it. Tailor thresholds to the service rather than copying universal numbers.",
    groups: [
        {
            title: "Product and API contract",
            rationale: "Production starts with a bounded behavior contract and accountable ownership.",
            items: [
                { label: "Requirements and non-goals are reviewed", evidence: "Approved scope and acceptance criteria" },
                { label: "API success and RFC 9457 failure contracts are documented", evidence: "Versioned OpenAPI plus examples" },
                { label: "Compatibility and deprecation policy is explicit", evidence: "Consumer review or contract test" },
                { label: "Service, data, and on-call owners are named", evidence: "Repository ownership and runbook contacts" },
            ],
        },
        {
            title: "Security and privacy",
            rationale: "Authentication is one control; production security includes authorization, abuse, secrets, data, and audit behavior.",
            items: [
                { label: "Threats and trust boundaries are reviewed", evidence: "Threat model with mitigations and accepted risks" },
                { label: "Least privilege and resource ownership are tested", evidence: "Automated negative authorization cases" },
                { label: "Secrets are external, rotated, and excluded from logs/images", evidence: "Secret inventory and scan result" },
                { label: "Sensitive fields are classified and redacted", evidence: "Logging/privacy test and retention policy" },
                { label: "Rate limits and abuse responses protect high-risk flows", evidence: "Load/abuse test and operational override" },
            ],
        },
        {
            title: "Data and migrations",
            rationale: "Durability requires constraints, compatible schema change, and proven recovery—not only successful writes.",
            items: [
                { label: "Constraints and indexes match invariants and query plans", evidence: "Schema review and representative EXPLAIN evidence" },
                { label: "Migration is backward-compatible and rehearsed", evidence: "Upgrade test from the previous production schema" },
                { label: "Backup completed and restore was verified", evidence: "Recent restore record with measured recovery time" },
                { label: "Retention, deletion, and audit history are defined", evidence: "Data lifecycle policy and implementation test" },
                { label: "Connection-pool limits fit database capacity", evidence: "Capacity calculation plus pool dashboard" },
            ],
        },
        {
            title: "Reliability and performance",
            rationale: "The service needs bounded resource and failure behavior under realistic concurrency.",
            items: [
                { label: "Service objectives and workload assumptions are stated", evidence: "Latency/error/throughput targets with traffic model" },
                { label: "Every network and database call has a timeout budget", evidence: "Configuration review and failure test" },
                { label: "Retries are bounded, jittered, and idempotency-safe", evidence: "Policy and duplicate-delivery test" },
                { label: "Pools, queues, and payload sizes are bounded", evidence: "Resource configuration and saturation test" },
                { label: "Graceful shutdown drains accepted work", evidence: "SIGTERM deployment test" },
            ],
        },
        {
            title: "Delivery and infrastructure",
            rationale: "A verified source change must become one identifiable, least-privileged, recoverable artifact.",
            items: [
                { label: "The same immutable image is promoted", evidence: "Registry digest recorded in deployment" },
                { label: "Image is minimal, non-root, scanned, and patched", evidence: "Dockerfile review and current scan" },
                { label: "CI permissions and deployment approvals are least privilege", evidence: "Workflow and environment policy review" },
                { label: "HTTPS, proxy limits, security headers, and resource limits are set", evidence: "Runtime configuration test" },
                { label: "Application and schema rollback paths are rehearsed", evidence: "Recorded rollback exercise" },
            ],
        },
        {
            title: "Observability and operations",
            rationale: "Operators need enough signal to detect user impact, locate a boundary, mitigate safely, and learn.",
            items: [
                { label: "Structured logs correlate requests without sensitive data", evidence: "Sanitized log sample and redaction test" },
                { label: "Request, error, latency, saturation, JVM, and pool metrics exist", evidence: "Dashboard populated from a test deployment" },
                { label: "Trace context reaches trusted downstream boundaries", evidence: "Example trace and propagation policy" },
                { label: "Readiness and liveness express different meanings", evidence: "Probe failure simulation" },
                { label: "Alerts are actionable and linked to a runbook", evidence: "Alert test with owner and response steps" },
                { label: "Incident and postmortem process is prepared", evidence: "Database pool exhaustion exercise" },
            ],
        },
    ],
    releaseDecision: [
        "GO only when critical correctness, security, restore, observability, and rollback evidence exists and residual risks have named owners.",
        "CONDITIONAL GO records the exact temporary control, owner, expiry date, and verification plan; it is not a permanent waiver.",
        "NO-GO when an unknown can cause data corruption, unauthorized access, unrecoverable loss, or an unobservable high-impact failure.",
    ],
}
