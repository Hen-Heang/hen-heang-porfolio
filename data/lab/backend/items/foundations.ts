import type { BackendNarrativeItem } from "@/src/lib/types/backend-engineering"
import { createNarrativeSections } from "@/data/lab/backend/helpers"
import { backendSources as s } from "@/data/lab/backend/sources"

const updatedAt = "2026-07-16"

export const backendFoundationItems = [
    {
        id: "backend-client-server-http-request-lifecycle",
        slug: "client-server-http-request-lifecycle",
        title: "Client–Server and HTTP Request Lifecycle",
        description: "Trace a browser or API request through DNS, TLS, a reverse proxy, Spring Security, application layers, PostgreSQL, and the response path.",
        level: 2,
        category: "http",
        type: "concept",
        technologies: ["HTTP", "TLS", "Nginx", "Spring Boot", "PostgreSQL"],
        keywords: ["client server", "request lifecycle", "DNS", "TCP", "reverse proxy", "filters"],
        prerequisiteIds: [],
        relatedIds: ["backend-rest-api-design-fundamentals", "backend-spring-boot-layered-architecture", "backend-spring-security-authentication-flow"],
        learningObjectives: ["Name every major hop in a production HTTP request", "Separate transport, proxy, security, application, and database failures"],
        difficulty: "beginner",
        estimatedMinutes: 35,
        featured: true,
        status: "published",
        updatedAt,
        versionScope: "HTTP semantics per RFC 9110; TLS 1.3; Spring Boot 3.5 servlet stack",
        sources: [s.http, s.tls, s.springMvc, s.nginx],
        sections: createNarrativeSections({
            whatItIs: "A request lifecycle is the ordered work that begins when a client resolves a host and ends when it receives, interprets, and possibly caches an HTTP response. The application controller is only one stage in that path.",
            whyItMatters: "Production failures often sit outside business code. DNS errors, TLS negotiation, proxy timeouts, security filters, exhausted application pools, slow SQL, serialization, and client cancellation can produce similar symptoms unless you know the boundaries.",
            howItWorks: [
                { type: "diagram", title: "End-to-end request path", steps: ["Client", "DNS", "TCP + TLS", "Reverse proxy", "Spring filter chain", "Controller", "Service + transaction", "MyBatis", "PostgreSQL", "HTTP response"], textAlternative: "The client resolves DNS, establishes TCP and TLS, sends HTTP through a reverse proxy and Spring filters, then the controller calls a transactional service, MyBatis, and PostgreSQL before the response returns through the same network path." },
                { type: "steps", items: [
                    { title: "Resolve and connect", text: "DNS maps the host name to an address; TCP creates an ordered byte stream; TLS authenticates the server and protects the connection." },
                    { title: "Route and protect", text: "The reverse proxy terminates or forwards TLS, applies size and timeout policy, and sends the request to a healthy application instance. Servlet filters run before the controller, including Spring Security." },
                    { title: "Execute application work", text: "Spring maps input, validates it, invokes a service, opens the intended transaction, runs parameterized SQL through MyBatis, and serializes the result." },
                    { title: "Return and observe", text: "Status, headers, and body travel back through the proxy. Logs, metrics, and trace context should identify the same request without exposing credentials." },
                ] },
            ],
            simpleExample: [
                { type: "code", language: "http", filename: "request-and-response.http", code: `GET /v1/tasks/42 HTTP/1.1
Host: api.example.com
Accept: application/json
Traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01

HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store

{"id":42,"title":"Review settlement","status":"OPEN"}` },
                { type: "paragraph", text: "HTTP defines the message semantics. It does not guarantee that the database committed only once; that is an application and data-consistency responsibility." },
            ],
            backendExample: [
                { type: "diagram", title: "Spring servlet path", steps: ["HTTP request", "Correlation filter", "SecurityFilterChain", "DispatcherServlet", "Controller", "Validation", "Service", "@Transactional", "Mapper", "Database", "Response"], textAlternative: "An HTTP request crosses a correlation filter and Spring Security before DispatcherServlet selects a controller. Valid input reaches a service transaction, mapper, and database, then the result is serialized into the response." },
                { type: "code", language: "java", filename: "TaskController.java", code: `@RestController
@RequestMapping("/v1/tasks")
final class TaskController {
    private final TaskQueryService taskQueryService;

    TaskController(TaskQueryService taskQueryService) {
        this.taskQueryService = taskQueryService;
    }

    @GetMapping("/{id}")
    TaskResponse findById(@PathVariable long id) {
        return taskQueryService.findById(id);
    }
}` },
            ],
            productionExample: [
                { type: "table", headers: ["Symptom", "Likely boundary", "First evidence"], rows: [
                    ["Name cannot be resolved", "DNS", "Resolver result and authoritative records"],
                    ["TLS handshake failure", "TLS/proxy", "Certificate chain, SNI, protocol logs"],
                    ["413 response", "Proxy or server limit", "Configured request-size limits"],
                    ["401/403", "Security filter/authorization", "Sanitized security decision and principal context"],
                    ["Requests queue while CPU is low", "Thread or connection pool", "Active/idle/wait metrics and thread dump"],
                    ["Slow only for one query shape", "Database plan/lock", "EXPLAIN plan, lock wait, statement timing"],
                ] },
                { type: "callout", tone: "production", title: "Timeout budget", text: "Set the client deadline first, then give each downstream hop a smaller bounded timeout. An outer 2-second promise cannot be reliable when an inner database or HTTP client can wait indefinitely." },
            ],
            commonMistakes: ["Calling the controller the start of the request", "Trusting inbound X-Forwarded-* headers from the public internet", "Logging Authorization or Cookie values", "Using retries without an idempotency and deadline policy", "Treating a client timeout as proof that server-side work rolled back"],
            bestPractices: ["Use one correlation or trace context across trusted boundaries", "Configure connect, read, write, queue, and database timeouts explicitly", "Return protocol-correct status and media types", "Keep reverse-proxy and application limits aligned", "Measure latency at each boundary, not only end to end"],
            tradeOffs: [{ type: "table", headers: ["Choice", "Benefit", "Cost"], rows: [["TLS at proxy", "Central certificate and routing policy", "Internal hop still needs a trust decision"], ["TLS passthrough", "End-to-end application termination", "Less proxy visibility and harder certificate operations"], ["Keep-alive", "Avoid repeated connection setup", "Consumes connection state and needs idle limits"]] }],
            interviewQuestions: ["What happens after a user enters an HTTPS URL?", "Where do Spring Security filters run relative to a controller?", "Why can a client receive a timeout while the database change still commits?", "What is the difference between a forward proxy and reverse proxy?"],
            handsOnTask: [{ type: "steps", items: [{ title: "Trace", text: "Call a local Spring endpoint with curl -v and record DNS, connection, request, response, and timing evidence." }, { title: "Instrument", text: "Add a correlation filter and structured request-completion log that excludes credentials and request bodies." }, { title: "Fail", text: "Introduce a slow query and compare client, proxy, application, and database timeouts." }] }],
            relatedTopics: ["REST API Design Fundamentals", "Spring Boot Layered Architecture", "Spring Security Authentication Flow", "Observability and timeout budgets"],
            sources: [s.http, s.tls, s.springMvc, s.nginx],
        }),
    },
    {
        id: "backend-java-backend-fundamentals",
        slug: "java-backend-fundamentals",
        title: "Java Backend Fundamentals",
        description: "Review modern Java types, object design, collections, exceptions, JVM behavior, and concurrency through one backend domain example.",
        level: 1,
        category: "java",
        type: "guide",
        technologies: ["Java 21", "JVM", "JUnit"],
        keywords: ["OOP", "collections", "generics", "exceptions", "records", "concurrency", "virtual threads"],
        prerequisiteIds: [],
        relatedIds: ["backend-spring-boot-layered-architecture", "backend-testing-strategy", "backend-voucher-redemption-case-study"],
        learningObjectives: ["Choose Java types and collections from domain invariants", "Explain JVM memory and concurrency risks relevant to request processing"],
        difficulty: "beginner",
        estimatedMinutes: 55,
        featured: true,
        status: "published",
        updatedAt,
        versionScope: "Examples compile on Java 21; JDK 25 API and language evolution noted",
        sources: [s.java25, s.jvmSpec, s.javaVirtualThreads],
        sections: createNarrativeSections({
            whatItIs: "Java backend fundamentals connect language syntax to durable domain behavior: values and identity, equality, collections, failure boundaries, resource management, JVM execution, and safe concurrency. Framework annotations cannot compensate for weak understanding here.",
            whyItMatters: "A Spring service runs ordinary Java code on a JVM under concurrent requests. Incorrect equality can lose map entries, mutable objects can leak state, swallowed exceptions can commit partial work, and unbounded executors can exhaust memory or downstream capacity.",
            howItWorks: [
                { type: "table", headers: ["Area", "Backend question"], rows: [["Types", "Is this value nullable, mutable, bounded, or identified?"], ["OOP", "Which invariant belongs inside the domain and which dependency belongs behind an interface?"], ["Collections", "Do order, uniqueness, lookup, equality, and concurrency matter?"], ["Exceptions", "Which layer can recover, translate, retry, or terminate?"], ["JVM", "Where are objects allocated and which roots keep them reachable?"], ["Concurrency", "Which state is shared and what establishes atomicity or ordering?"]] },
                { type: "callout", tone: "note", title: "Records", text: "A record is a concise, shallowly immutable carrier. Its component references can still point to mutable objects, so copy mutable collections at the boundary." },
            ],
            simpleExample: [
                { type: "code", language: "java", filename: "Voucher.java", code: `public record VoucherCode(String value) {
    public VoucherCode {
        value = Objects.requireNonNull(value, "value").trim();
        if (!value.matches("[A-Z0-9]{12}")) {
            throw new IllegalArgumentException("Invalid voucher code format");
        }
    }
}

public enum VoucherStatus { ISSUED, REDEEMED, EXPIRED, CANCELLED }

public sealed interface RedemptionResult
        permits RedemptionResult.Accepted, RedemptionResult.Rejected {
    record Accepted(long redemptionId) implements RedemptionResult {}
    record Rejected(String reasonCode) implements RedemptionResult {}
}` },
                { type: "paragraph", text: "The types make invalid format and unknown result variants harder to represent. They do not by themselves make redemption atomic; the database transaction still owns that invariant." },
            ],
            backendExample: [
                { type: "code", language: "java", filename: "VoucherRules.java", code: `final class VoucherRules {
    private final Set<String> permittedMerchantIds;

    VoucherRules(Set<String> permittedMerchantIds) {
        this.permittedMerchantIds = Set.copyOf(permittedMerchantIds);
    }

    RedemptionResult evaluate(Voucher voucher, String merchantId, Instant now) {
        Objects.requireNonNull(now, "now");
        if (!permittedMerchantIds.contains(merchantId)) {
            return new RedemptionResult.Rejected("MERCHANT_NOT_ALLOWED");
        }
        if (!voucher.expiresAt().isAfter(now)) {
            return new RedemptionResult.Rejected("VOUCHER_EXPIRED");
        }
        return new RedemptionResult.Accepted(voucher.id());
    }
}` },
                { type: "callout", tone: "production", title: "Time is a dependency", text: "Pass Instant or inject Clock so tests are deterministic. Store instants for machine events; apply a named time zone only when presenting or implementing a documented local-time rule." },
            ],
            productionExample: [
                { type: "diagram", title: "JVM execution model", steps: ["javac", "Bytecode", "Class loader", "Interpreter + JIT", "Threads", "Heap objects", "Garbage collector"], textAlternative: "The Java compiler produces bytecode. The JVM loads classes, interprets and JIT-compiles hot code, runs work on threads, allocates objects on the heap, and reclaims unreachable objects with garbage collection." },
                { type: "table", headers: ["Tool/evidence", "Use"], rows: [["Thread dump", "Blocked, waiting, deadlocked, and runnable thread state"], ["Heap dump", "Retained objects and suspected memory leaks"], ["GC logs/JFR", "Allocation, pause, CPU, lock, and I/O evidence"], ["Pool metrics", "Whether application concurrency exceeds downstream capacity"]] },
                { type: "callout", tone: "tradeoff", title: "Virtual threads", text: "Virtual threads suit high-concurrency tasks that mostly block on I/O. They do not accelerate CPU-bound work or remove database connection limits, and thread-local usage deserves review." },
            ],
            commonMistakes: ["Using == instead of equals for object value comparison", "Overriding equals without a consistent hashCode", "Returning mutable internal collections", "Catching Exception and continuing without a recovery policy", "Using Optional for fields or parameters as a default design", "Creating unbounded threads or CompletableFuture work on an unsuitable shared executor"],
            bestPractices: ["Prefer composition and small cohesive types", "Make invariants explicit in constructors or factories", "Use try-with-resources for closeable resources", "Translate exceptions at stable boundaries and preserve the cause", "Choose collections by semantics before performance", "Measure JVM and concurrency behavior under realistic downstream limits"],
            tradeOffs: [{ type: "table", headers: ["Choice", "Use when", "Risk"], rows: [["Checked exception", "Callers are expected to handle a recoverable condition", "Propagation boilerplate and accidental wrapping"], ["Runtime exception", "Invariant or boundary failure cannot be handled locally", "Undocumented failure contracts"], ["Inheritance", "A true substitutable subtype relationship exists", "Tight coupling and fragile hierarchies"], ["Composition", "Behavior can be delegated behind a focused interface", "More small objects and wiring"]] }],
            interviewQuestions: ["What is the contract between equals and hashCode?", "How do stack frames and heap objects differ?", "Why is a record only shallowly immutable?", "What causes a Java memory leak despite garbage collection?", "When are virtual threads appropriate?", "How would you diagnose a deadlock?"],
            handsOnTask: [{ type: "steps", items: [{ title: "Model", text: "Create voucher value types, lifecycle states, and sealed redemption outcomes." }, { title: "Test", text: "Write parameterized tests for format, expiry, merchant rules, equality, and mutable collection defenses." }, { title: "Stress", text: "Run concurrent evaluation tasks, capture a thread dump, and explain which shared state is safe." }] }],
            relatedTopics: ["Layered Spring Boot Architecture", "Backend Testing Strategy", "Spring Transaction Fundamentals", "Voucher Redemption Case Study"],
            sources: [s.java25, s.jvmSpec, s.javaVirtualThreads],
        }),
    },
    {
        id: "backend-rest-api-design-fundamentals",
        slug: "rest-api-design-fundamentals",
        title: "REST API Design Fundamentals",
        description: "Design stable resource APIs with correct HTTP semantics, validation, pagination, idempotency, errors, compatibility, and OpenAPI documentation.",
        level: 2,
        category: "api",
        type: "guide",
        technologies: ["HTTP", "JSON", "OpenAPI", "Spring MVC"],
        keywords: ["REST", "status codes", "pagination", "idempotency", "problem details", "versioning"],
        prerequisiteIds: ["backend-client-server-http-request-lifecycle"],
        relatedIds: ["backend-spring-boot-layered-architecture", "backend-spring-transaction-fundamentals", "backend-spring-security-authentication-flow"],
        learningObjectives: ["Map resource operations to HTTP method and status semantics", "Design compatible DTO, error, pagination, and idempotency contracts"],
        difficulty: "beginner",
        estimatedMinutes: 50,
        featured: true,
        status: "published",
        updatedAt,
        versionScope: "RFC 9110, RFC 9457, OpenAPI 3.2; examples use Spring MVC 6.2",
        sources: [s.http, s.problemDetails, s.openApi, s.springMvc],
        sections: createNarrativeSections({
            whatItIs: "REST API design is the deliberate use of HTTP resource identifiers, methods, representations, and response semantics to create a contract that clients can understand and evolve against. REST does not require one universal response envelope or CRUD-only behavior.",
            whyItMatters: "Clients build retry, cache, validation, authorization, and error-handling logic around the contract. Ambiguous status codes, unstable JSON, offset-only pagination, or undocumented failure shapes turn implementation details into long-lived integration risk.",
            howItWorks: [
                { type: "table", headers: ["Operation", "Method", "Typical success"], rows: [["List tasks", "GET /v1/tasks", "200 with page"], ["Create task", "POST /v1/tasks", "201 + Location"], ["Read task", "GET /v1/tasks/{id}", "200 or 404"], ["Replace task", "PUT /v1/tasks/{id}", "200/204"], ["Partial update", "PATCH /v1/tasks/{id}", "200/204"], ["Delete task", "DELETE /v1/tasks/{id}", "204 (idempotent effect)"]] },
                { type: "callout", tone: "note", title: "Safe versus idempotent", text: "Safe methods are intended to be read-only. Repeating an idempotent request has the same intended effect as making it once, though logs, timestamps, and other side effects can still differ." },
            ],
            simpleExample: [
                { type: "code", language: "json", filename: "task-page.json", code: `{
  "items": [
    { "id": 42, "title": "Review settlement", "status": "OPEN" }
  ],
  "nextCursor": "eyJpZCI6NDJ9",
  "hasMore": true
}` },
                { type: "paragraph", text: "A cursor should be opaque to clients and derived from a stable, unique ordering. If ordering is by created_at, use a unique tie-breaker such as id." },
            ],
            backendExample: [
                { type: "code", language: "java", filename: "TaskController.java", code: `@PostMapping
ResponseEntity<TaskResponse> create(
        @Valid @RequestBody CreateTaskRequest request,
        @RequestHeader(value = "Idempotency-Key", required = false) String key) {
    TaskResponse created = taskService.create(request, key);
    URI location = URI.create("/v1/tasks/" + created.id());
    return ResponseEntity.created(location).body(created);
}

public record CreateTaskRequest(
        @NotBlank @Size(max = 160) String title,
        @FutureOrPresent Instant dueAt) {}
` },
                { type: "code", language: "json", filename: "problem-details.json", code: `{
  "type": "https://henheang.site/problems/task-title-invalid",
  "title": "Task validation failed",
  "status": 400,
  "detail": "One or more fields are invalid.",
  "instance": "/v1/tasks",
  "errors": [{ "field": "title", "code": "NotBlank" }],
  "traceId": "7fbc..."
}` },
            ],
            productionExample: [
                { type: "steps", items: [{ title: "Compatibility", text: "Add optional response fields freely when clients ignore unknown fields; do not silently change meaning, type, enum policy, or nullability." }, { title: "Idempotency", text: "Scope a client key to actor and operation, hash the relevant request, atomically persist outcome, and reject key reuse with a different request." }, { title: "Errors", text: "Use stable machine codes, human-safe details, trace correlation, and documented status mappings. RFC 9457 obsoletes RFC 7807." }, { title: "Documentation", text: "Keep OpenAPI request, success, error, auth, pagination, and idempotency examples executable in contract tests where practical." }] },
            ],
            commonMistakes: ["Verbs and database table names in every URI", "Returning 200 with success=false for protocol errors", "Leaking stack traces or SQL messages", "Using page numbers without a stable order", "Accepting arbitrary sort columns directly into SQL", "Breaking clients by renaming fields or narrowing accepted values"],
            bestPractices: ["Model external DTOs separately from persistence models", "Use explicit limits and allowlists for filter/sort/search input", "Return 201 and Location for created resources when applicable", "Design retry and idempotency behavior together", "Document timezone and null/omission rules", "Treat OpenAPI as a reviewed contract, not decoration"],
            tradeOffs: [{ type: "table", headers: ["Decision", "Advantage", "Cost"], rows: [["Offset pagination", "Simple random page access", "Degrades and shifts under writes"], ["Keyset pagination", "Stable and efficient continuation", "No arbitrary page jump; stable sort required"], ["URI version", "Very visible compatibility boundary", "Multiple routes and duplicated docs"], ["Compatible evolution", "Fewer version branches", "Requires strict change discipline"]] }],
            interviewQuestions: ["When should an API return 400, 401, 403, 404, 409, or 422?", "How do PUT and PATCH differ?", "How would you implement idempotent payment creation?", "Why can keyset pagination outperform offset?", "How would you evolve an enum safely?"],
            handsOnTask: [{ type: "steps", items: [{ title: "Contract", text: "Write OpenAPI for create, read, list, update, and delete Task operations, including every error response." }, { title: "Policy", text: "Define stable order, cursor encoding, maximum page size, allowed filters, and idempotency-key behavior." }, { title: "Verify", text: "Create integration tests for validation, conflict, unknown resource, duplicate idempotency key, and backward-compatible JSON." }] }],
            relatedTopics: ["Client–Server Request Lifecycle", "Spring MVC and Validation", "RFC 9457 Error Handling", "Transactions and Idempotency", "OpenAPI Contract Testing"],
            sources: [s.http, s.problemDetails, s.openApi, s.springMvc],
        }),
    },
    {
        id: "backend-postgresql-schema-indexing-fundamentals",
        slug: "postgresql-schema-indexing-fundamentals",
        title: "PostgreSQL Schema and Indexing Fundamentals",
        description: "Model constrained relational data, choose indexes from query shapes, read execution plans, and compare important Oracle differences.",
        level: 3,
        category: "database",
        type: "guide",
        technologies: ["PostgreSQL 16+", "SQL", "Oracle 19c"],
        keywords: ["schema", "constraints", "B-tree", "composite index", "EXPLAIN", "keyset pagination"],
        prerequisiteIds: ["backend-java-backend-fundamentals"],
        relatedIds: ["backend-mybatis-mapper-workflow", "backend-spring-transaction-fundamentals", "backend-voucher-redemption-case-study"],
        learningObjectives: ["Use database constraints to protect business invariants", "Match composite indexes to filters, ordering, selectivity, and real execution plans"],
        difficulty: "intermediate",
        estimatedMinutes: 60,
        featured: true,
        status: "published",
        updatedAt,
        versionScope: "PostgreSQL 16+ syntax, verified against PostgreSQL 18; Oracle 19c differences noted",
        sources: [s.postgresqlConstraints, s.postgresqlIndexes, s.postgresqlExplain, s.oracleSql],
        sections: createNarrativeSections({
            whatItIs: "Schema design defines valid durable states; indexing defines additional data structures the optimizer may use to reach those states efficiently. Constraints are correctness controls. Indexes are workload-dependent performance and access-path tools.",
            whyItMatters: "Application validation can be bypassed by races, scripts, imports, or another service. Database constraints close that gap. Poor indexes can waste storage and write throughput while still missing the actual filter and ordering pattern.",
            howItWorks: [
                { type: "table", headers: ["Constraint/index", "Primary job"], rows: [["PRIMARY KEY", "Stable row identity and uniqueness"], ["FOREIGN KEY", "Referenced-row integrity"], ["UNIQUE", "Business uniqueness under concurrency"], ["CHECK", "Row-local valid-state rule"], ["NOT NULL", "Required value"], ["B-tree index", "Equality, ranges, and ordered access"], ["Partial index", "Index only rows matching a predicate"], ["Expression index", "Index a deterministic expression used by queries"]] },
                { type: "paragraph", text: "For a multicolumn B-tree, leading equality constraints and then the first range constraint usually determine how much of the index can bound the scan. PostgreSQL can apply later-column conditions, but they may not reduce the scanned portion in the same way." },
            ],
            simpleExample: [
                { type: "code", language: "sql", filename: "task-schema.sql", code: `CREATE TABLE task (
    id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    owner_id     bigint NOT NULL REFERENCES app_user(id),
    title        varchar(160) NOT NULL CHECK (length(trim(title)) > 0),
    status       varchar(20) NOT NULL CHECK (status IN ('OPEN', 'DONE', 'CANCELLED')),
    due_at       timestamptz,
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX task_owner_status_created_idx
    ON task (owner_id, status, created_at DESC, id DESC);
` },
                { type: "callout", tone: "note", title: "Time types", text: "PostgreSQL timestamptz represents an instant and displays it in the session time zone. Persist event instants in UTC-oriented application logic; do not append a fake Z to local time." },
            ],
            backendExample: [
                { type: "code", language: "sql", filename: "keyset-page.sql", code: `SELECT id, owner_id, title, status, created_at
FROM task
WHERE owner_id = :ownerId
  AND status = :status
  AND (created_at, id) < (:cursorCreatedAt, :cursorId)
ORDER BY created_at DESC, id DESC
LIMIT :pageSize;
` },
                { type: "paragraph", text: "The index begins with the equality predicates, then matches the descending pagination order and unique id tie-breaker. Verify with representative data and EXPLAIN (ANALYZE, BUFFERS) in a safe non-production environment; ANALYZE executes the statement." },
            ],
            productionExample: [
                { type: "steps", items: [{ title: "Start from queries", text: "Collect the exact predicates, sort order, selected columns, frequency, and latency objective." }, { title: "Inspect estimates", text: "Compare estimated and actual rows, scan type, loops, buffers, sorts, and join strategy." }, { title: "Change one thing", text: "Add or revise a constraint/index/query and re-measure with representative distribution." }, { title: "Account for writes", text: "Every index consumes space and must be updated by INSERT, UPDATE, DELETE, vacuum, backup, and replication work." }] },
                { type: "table", headers: ["PostgreSQL", "Oracle note"], rows: [["GENERATED ... AS IDENTITY", "Identity is also available; sequences remain common"], ["LIMIT", "Use FETCH FIRST / OFFSET in modern Oracle"], ["timestamptz", "Oracle timestamp-with-time-zone semantics differ; test driver mappings"], ["EXPLAIN (ANALYZE, BUFFERS)", "Use DBMS_XPLAN and execution-plan tooling"], ["Partial indexes", "No direct identical feature; function-based/conditional strategies differ"]] },
            ],
            commonMistakes: ["Relying only on application validation for uniqueness", "Adding an index for every column", "Using SELECT * in stable mapper contracts", "Assuming an index will always be chosen", "Running EXPLAIN ANALYZE for a write on production without a rollback plan", "Using offset pagination for unbounded deep pages"],
            bestPractices: ["Name constraints and indexes clearly", "Prefer narrow stable keys and explicit foreign-key actions", "Keep statistics current and inspect actual row-count errors", "Use representative data volume and distribution", "Design online/backward-compatible migrations", "Test backup restore, not only backup creation"],
            tradeOffs: [{ type: "table", headers: ["Choice", "Benefit", "Cost"], rows: [["Normalize", "Stronger consistency and less update duplication", "More joins and model navigation"], ["Denormalize", "Simpler/faster targeted reads", "Synchronization and stale-data risk"], ["Covering INCLUDE index", "Potential index-only reads", "Larger index and more write work"], ["Soft delete", "Recovery/audit convenience", "Every uniqueness and query rule becomes more complex"]] }],
            interviewQuestions: ["Why does a UNIQUE constraint solve a race that a pre-check cannot?", "How does column order affect a composite B-tree index?", "What evidence do you read in EXPLAIN ANALYZE?", "When would a sequential scan be correct?", "How does keyset pagination work with duplicate timestamps?"],
            handsOnTask: [{ type: "steps", items: [{ title: "Model", text: "Create users, roles, tasks, orders, and order items with named constraints and audit columns." }, { title: "Load", text: "Generate data with realistic skew across owners and statuses." }, { title: "Measure", text: "Compare no index, a poorly ordered index, and a query-aligned composite index using plans and timings." }, { title: "Race", text: "Run two concurrent inserts for the same business key and confirm the constraint is the final arbiter." }] }],
            relatedTopics: ["MyBatis Mapper Workflow", "Spring Transactions", "Keyset Pagination", "Connection Pooling", "Concurrent Balance Updates"],
            sources: [s.postgresqlConstraints, s.postgresqlIndexes, s.postgresqlExplain, s.postgresqlIsolation, s.oracleSql],
        }),
    },
] satisfies BackendNarrativeItem[]
