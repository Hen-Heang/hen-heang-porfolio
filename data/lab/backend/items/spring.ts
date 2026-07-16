import type { BackendNarrativeItem } from "@/src/lib/types/backend-engineering"
import { createNarrativeSections } from "@/data/lab/backend/helpers"
import { backendSources as s } from "@/data/lab/backend/sources"

const updatedAt = "2026-07-16"

export const backendSpringItems = [
    {
        id: "backend-spring-boot-layered-architecture",
        slug: "spring-boot-layered-architecture",
        title: "Layered Spring Boot Architecture",
        description: "Place HTTP mapping, validation, business orchestration, transactions, MyBatis SQL, and models in explicit layers with inward dependency direction.",
        level: 4,
        category: "spring",
        type: "system",
        technologies: ["Java 21", "Spring Boot 3.5", "Spring MVC", "MyBatis"],
        keywords: ["layered architecture", "controller", "service", "mapper", "DTO", "dependency injection"],
        prerequisiteIds: ["backend-java-backend-fundamentals", "backend-rest-api-design-fundamentals"],
        relatedIds: ["backend-mybatis-mapper-workflow", "backend-spring-transaction-fundamentals", "backend-spring-boot-task-api-lab"],
        learningObjectives: ["Assign one clear responsibility to each application layer", "Keep transport and persistence models from leaking into business policy"],
        difficulty: "beginner",
        estimatedMinutes: 45,
        featured: true,
        status: "published",
        updatedAt,
        versionScope: "Java 21, Spring Boot 3.5.16, Spring Framework 6.2, MyBatis starter 3.x",
        sources: [s.springBoot35, s.springIoc, s.springMvc, s.mybatisStarter],
        sections: createNarrativeSections({
            whatItIs: "Layered architecture separates an HTTP adapter, application use cases, and persistence details. In this curriculum the practical flow is Controller → Service → Mapper → SQL → Database, with mapping at boundaries and dependencies pointing toward business policy.",
            whyItMatters: "Clear boundaries make a Spring application easier to test, review, change, and operate. They also prevent framework input, database columns, and SQL behavior from becoming the public API or the place where business decisions hide.",
            howItWorks: [
                { type: "diagram", title: "Primary dependency flow", steps: ["Controller", "Service", "Mapper interface", "Mapper XML / SQL", "PostgreSQL"], textAlternative: "The controller depends on a service, the service depends on a mapper interface, the mapper binds SQL from XML, and SQL accesses PostgreSQL. Results return in the opposite direction." },
                { type: "table", headers: ["Layer", "Owns", "Does not own"], rows: [["Controller", "HTTP input/output, status, validation trigger", "Business rules or SQL"], ["Service", "Use case, authorization context, orchestration, transaction boundary", "Servlet objects or XML mapping"], ["Mapper", "Typed persistence operations", "HTTP responses or cross-use-case policy"], ["SQL", "Set operations, joins, locking, affected-row semantics", "Presentation shape"], ["Database", "Constraints, durability, isolation, indexing", "Client-specific error copy"]] },
            ],
            simpleExample: [
                { type: "code", language: "text", filename: "package-structure.txt", code: `com.henheang.task
├── api/
│   ├── TaskController.java
│   ├── CreateTaskRequest.java
│   └── TaskResponse.java
├── application/
│   └── TaskService.java
├── domain/
│   ├── Task.java
│   └── TaskStatus.java
├── persistence/
│   ├── TaskMapper.java
│   └── TaskRow.java
└── support/
    └── ApiExceptionHandler.java

resources/mappers/TaskMapper.xml` },
                { type: "paragraph", text: "Package by feature first when it keeps related code navigable; use subpackages to make layer boundaries visible. A giant global controller/service/repository package tree becomes harder to own as features grow." },
            ],
            backendExample: [
                { type: "code", language: "java", filename: "TaskService.java", code: `@Service
public class TaskService {
    private final TaskMapper taskMapper;

    public TaskService(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @Transactional
    public TaskResponse create(CreateTaskCommand command, long actorId) {
        Task task = Task.create(command.title(), command.dueAt(), actorId);
        TaskRow row = TaskRow.from(task);
        taskMapper.insert(row);
        return TaskResponse.from(row);
    }
}` },
                { type: "callout", tone: "note", title: "DTO boundary", text: "A request DTO represents accepted transport input; a command represents the application use case; a domain object protects business invariants; a row model matches persistence concerns; a response DTO is the stable client contract. Small systems may combine some models intentionally, but the trade-off should be explicit." },
            ],
            productionExample: [
                { type: "steps", items: [{ title: "HTTP", text: "Controller accepts a validated request and authenticated principal, calls one use case, and maps the result to HTTP." }, { title: "Policy", text: "Service enforces ownership and state transition, then defines the atomic transaction boundary." }, { title: "Persistence", text: "Mapper executes parameterized SQL and returns affected rows or typed results; database constraints arbitrate concurrent validity." }, { title: "Failure", text: "Exceptions cross into a global handler that maps known categories to stable RFC 9457 responses and logs unexpected causes once." }] },
                { type: "callout", tone: "production", title: "Dependency direction", text: "A service can depend on a small persistence port when the domain needs isolation from MyBatis. Do not add interfaces mechanically for every class; introduce them where substitution, boundary testing, or module ownership provides value." },
            ],
            commonMistakes: ["Putting business rules and mapper calls directly in controllers", "Returning mapper row objects as the API contract", "Using field injection", "Opening transactions in controllers", "Catching every exception in every layer", "Adding pass-through layers with no boundary or ownership value"],
            bestPractices: ["Use constructor injection and final dependencies", "Keep controllers thin and services use-case focused", "Validate syntax at the edge and business rules in the service/domain", "Keep SQL explicit and reviewable", "Map expected failures once at the API boundary", "Test layers according to their real responsibility"],
            tradeOffs: [{ type: "table", headers: ["Design", "Advantage", "Cost"], rows: [["Separate DTO/domain/row models", "Strong compatibility and persistence boundaries", "Mapping code"], ["Shared simple model", "Less code for a small stable feature", "Transport and schema changes become coupled"], ["Feature packages", "Ownership and navigation", "Cross-cutting conventions need discipline"], ["Global layer packages", "Obvious layer inventory", "Features scatter across the codebase"]] }],
            interviewQuestions: ["What belongs in a controller versus a service?", "Why prefer constructor injection?", "Should a DTO be the same as a database row?", "Where should authorization and transactions live?", "When is an extra interface useful rather than ceremonial?"],
            handsOnTask: [{ type: "steps", items: [{ title: "Sketch", text: "Draw the Task create and list flows with layer inputs, outputs, and failure types." }, { title: "Implement", text: "Build controller, service, mapper, XML, schema, DTO mapping, and global error handling." }, { title: "Review", text: "Write one sentence for each class responsibility; split or remove any class that cannot be explained clearly." }] }],
            relatedTopics: ["Spring IoC and Dependency Injection", "MyBatis Mapper Workflow", "Spring Transactions", "Validation and Global Error Handling", "Task API Lab"],
            sources: [s.springBoot35, s.springIoc, s.springMvc, s.mybatisStarter],
        }),
    },
    {
        id: "backend-mybatis-mapper-workflow",
        slug: "mybatis-mapper-workflow",
        title: "MyBatis Mapper Workflow",
        description: "Connect typed mapper methods to safe XML SQL, result maps, dynamic conditions, generated keys, batches, transactions, and query-level tests.",
        level: 5,
        category: "spring",
        type: "guide",
        technologies: ["MyBatis 3", "Spring Boot 3.5", "PostgreSQL", "Oracle"],
        keywords: ["mapper interface", "XML mapper", "dynamic SQL", "resultMap", "parameter binding", "batch"],
        prerequisiteIds: ["backend-spring-boot-layered-architecture", "backend-postgresql-schema-indexing-fundamentals"],
        relatedIds: ["backend-spring-transaction-fundamentals", "backend-testing-strategy", "backend-spring-boot-task-api-lab"],
        learningObjectives: ["Trace a MyBatis mapper call from Java method to prepared statement and result mapping", "Use dynamic SQL and identifier allowlists without injection"],
        difficulty: "intermediate",
        estimatedMinutes: 50,
        featured: true,
        status: "published",
        updatedAt,
        versionScope: "MyBatis 3.5; starter 3.x for Spring Boot 3.2–3.5 and Java 17+",
        sources: [s.mybatis, s.mybatisDynamic, s.mybatisStarter],
        sections: createNarrativeSections({
            whatItIs: "MyBatis maps Java method calls to explicit SQL statements and maps result sets back to Java objects. The Spring Boot starter wires a DataSource, SqlSessionFactory, SqlSessionTemplate, and mapper proxies; your code still owns SQL correctness and shape.",
            whyItMatters: "Enterprise systems often need transparent SQL, database-specific tuning, complex joins, and exact affected-row behavior. MyBatis provides that control, but weak parameter binding, unbounded dynamic SQL, accidental N+1 queries, or untested result maps can turn flexibility into risk.",
            howItWorks: [
                { type: "diagram", title: "Mapper execution path", steps: ["Service method", "Mapper proxy", "Mapped statement ID", "Dynamic SQL nodes", "PreparedStatement", "Database", "ResultMap", "Java result"], textAlternative: "A service calls a generated mapper proxy. MyBatis resolves the mapped statement, renders safe dynamic SQL, binds parameters to a prepared statement, executes it, then uses a result map to create Java results." },
                { type: "callout", tone: "warning", title: "#{...} versus ${...}", text: "#{value} creates a bound prepared-statement parameter. ${value} performs raw string substitution. Use substitution only for trusted metadata chosen from a server-side allowlist, never for direct user input." },
            ],
            simpleExample: [
                { type: "code", language: "java", filename: "TaskMapper.java", code: `@Mapper
public interface TaskMapper {
    Optional<TaskRow> findById(@Param("id") long id);

    List<TaskRow> findPage(@Param("query") TaskPageQuery query);

    int insert(TaskRow row);

    int markDone(@Param("id") long id, @Param("actorId") long actorId);
}` },
                { type: "code", language: "xml", filename: "TaskMapper.xml", code: `<mapper namespace="com.henheang.task.persistence.TaskMapper">
  <resultMap id="taskRow" type="com.henheang.task.persistence.TaskRow">
    <id property="id" column="id"/>
    <result property="ownerId" column="owner_id"/>
    <result property="title" column="title"/>
    <result property="status" column="status"/>
    <result property="createdAt" column="created_at"/>
  </resultMap>

  <select id="findById" resultMap="taskRow">
    SELECT id, owner_id, title, status, created_at
    FROM task
    WHERE id = #{id}
  </select>
</mapper>` },
            ],
            backendExample: [
                { type: "code", language: "xml", filename: "TaskMapper.xml", code: `<select id="findPage" resultMap="taskRow">
  SELECT id, owner_id, title, status, created_at
  FROM task
  <where>
    owner_id = #{query.ownerId}
    <if test="query.status != null">
      AND status = #{query.status}
    </if>
    <if test="query.cursorCreatedAt != null and query.cursorId != null">
      AND (created_at, id) &lt; (#{query.cursorCreatedAt}, #{query.cursorId})
    </if>
  </where>
  ORDER BY created_at DESC, id DESC
  LIMIT #{query.limit}
</select>

<update id="markDone">
  UPDATE task
  SET status = 'DONE', updated_at = now()
  WHERE id = #{id}
    AND owner_id = #{actorId}
    AND status = 'OPEN'
</update>` },
                { type: "paragraph", text: "The atomic UPDATE combines ownership and valid-state checks. The service interprets an affected-row count of zero as not found, not owned, or invalid state according to a deliberate disclosure policy." },
            ],
            productionExample: [
                { type: "table", headers: ["Concern", "Production decision"], rows: [["Result mapping", "Use explicit aliases/resultMap for stable complex queries"], ["Dynamic sort", "Map an enum to fixed SQL fragments; never bind a column name as data"], ["Generated keys", "Use database-appropriate identity/RETURNING/selectKey behavior and test it"], ["Batch", "Measure driver/database behavior; flush deliberately and handle partial failure semantics"], ["N+1", "Prefer a join, set query, or bounded batch fetch when object graphs trigger repeated SQL"], ["Timeout", "Configure statement and transaction deadlines consistent with the request budget"]] },
                { type: "callout", tone: "production", title: "Transaction ownership", text: "With MyBatis-Spring, let Spring own the transaction and SqlSession lifecycle. Do not manually call commit or rollback on a Spring-managed SqlSession." },
            ],
            commonMistakes: ["Using ${userInput} in SQL", "Depending on implicit auto-mapping for fragile joins", "Returning Map instead of a typed result", "Hiding many database round trips behind nested selects", "Assuming batch always improves throughput", "Testing SQL only against an in-memory dialect"],
            bestPractices: ["Use typed parameter objects and @Param names", "Select explicit columns", "Keep mapper methods cohesive and statement IDs aligned", "Use reusable SQL fragments sparingly and visibly", "Interpret affected-row counts", "Test complex queries against the real PostgreSQL or Oracle dialect"],
            tradeOffs: [{ type: "table", headers: ["Approach", "Advantage", "Cost"], rows: [["XML SQL", "Readable complex SQL and dynamic tags", "Java/XML navigation"], ["Annotations", "Compact simple statements", "Complex SQL becomes hard to review"], ["Nested result map", "One query can build an object graph", "Duplicate rows and memory behavior need care"], ["Nested select", "Simple mapping", "N+1 round trips"]] }],
            interviewQuestions: ["How does a mapper interface connect to XML?", "Why is #{} safer than ${}?", "How would you implement allowlisted sorting?", "What does SqlSessionTemplate add in Spring?", "How do you detect and fix N+1 with MyBatis?"],
            handsOnTask: [{ type: "steps", items: [{ title: "Map", text: "Implement Task insert, find, keyset page, and conditional state transition mapper methods." }, { title: "Attack", text: "Try malicious search and sort input and prove no raw text reaches an identifier or predicate." }, { title: "Test", text: "Use PostgreSQL Testcontainers to verify result mapping, generated key, pagination order, affected rows, and rollback." }] }],
            relatedTopics: ["PostgreSQL Indexing", "Spring Transaction Fundamentals", "Backend Testing Strategy", "Task API Lab"],
            sources: [s.mybatis, s.mybatisDynamic, s.mybatisStarter],
        }),
    },
    {
        id: "backend-spring-transaction-fundamentals",
        slug: "spring-transaction-fundamentals",
        title: "Spring Transaction Fundamentals",
        description: "Define short service-layer transaction boundaries and reason about proxy interception, propagation, rollback rules, locks, and external side effects.",
        level: 5,
        category: "spring",
        type: "concept",
        technologies: ["Spring Framework 6.2", "MyBatis", "PostgreSQL"],
        keywords: ["Transactional", "rollback", "propagation", "self invocation", "isolation", "deadlock"],
        prerequisiteIds: ["backend-mybatis-mapper-workflow"],
        relatedIds: ["backend-postgresql-schema-indexing-fundamentals", "backend-voucher-redemption-case-study", "backend-testing-strategy"],
        learningObjectives: ["Explain how Spring applies declarative transactions through a proxy", "Design transaction boundaries that protect data without including remote calls"],
        difficulty: "intermediate",
        estimatedMinutes: 55,
        featured: true,
        status: "published",
        updatedAt,
        versionScope: "Spring Framework 6.2 / Spring Boot 3.5 imperative JDBC transactions",
        sources: [s.springTransactions, s.postgresqlIsolation, s.mybatisStarter],
        sections: createNarrativeSections({
            whatItIs: "A database transaction groups reads and writes into one commit or rollback boundary with an isolation policy. Spring declarative transaction management uses metadata such as @Transactional and an AOP proxy around an externally invoked method to drive a transaction manager.",
            whyItMatters: "Business operations such as order creation, balance movement, or voucher redemption must not expose partial durable state. At the same time, long transactions hold connections and locks, increasing contention and failure impact.",
            howItWorks: [
                { type: "diagram", title: "Declarative transaction call", steps: ["Controller", "Spring service proxy", "Begin / join transaction", "Service method", "MyBatis operations", "Commit or rollback"], textAlternative: "The controller calls the Spring-managed service proxy. The proxy begins or joins a transaction, invokes the service method and its MyBatis operations, then commits on success or rolls back when a configured rollback rule matches." },
                { type: "table", headers: ["Default", "Spring behavior"], rows: [["Propagation", "REQUIRED: join an existing transaction or create one"], ["Isolation", "Use the underlying data source default"], ["Read/write", "Read-write"], ["Rollback", "RuntimeException and Error roll back; checked Exception does not by default"], ["Proxy mode", "Only calls that enter through the proxy are intercepted"]] },
            ],
            simpleExample: [
                { type: "code", language: "java", filename: "OrderService.java", code: `@Service
public class OrderService {
    private final OrderMapper orderMapper;
    private final OutboxMapper outboxMapper;

    public OrderService(OrderMapper orderMapper, OutboxMapper outboxMapper) {
        this.orderMapper = orderMapper;
        this.outboxMapper = outboxMapper;
    }

    @Transactional
    public long create(CreateOrderCommand command) {
        OrderRow order = OrderRow.create(command);
        orderMapper.insert(order);
        outboxMapper.insert(OrderCreatedEvent.from(order));
        return order.id();
    }
}` },
                { type: "paragraph", text: "Order and outbox rows commit together. A separate relay publishes the outbox event later, so a slow or unavailable broker does not keep the database transaction open." },
            ],
            backendExample: [
                { type: "code", language: "java", filename: "VoucherService.java", code: `@Transactional
public RedemptionResponse redeem(long voucherId, String idempotencyKey, long actorId) {
    RedemptionRow existing = redemptionMapper.findByKey(actorId, idempotencyKey);
    if (existing != null) return RedemptionResponse.from(existing);

    int changed = voucherMapper.redeemIfIssued(voucherId, actorId);
    if (changed == 0) throw new VoucherNotRedeemableException(voucherId);

    RedemptionRow created = RedemptionRow.create(voucherId, actorId, idempotencyKey);
    redemptionMapper.insert(created);
    return RedemptionResponse.from(created);
}` },
                { type: "callout", tone: "production", title: "Database arbitration", text: "Back the idempotency key with a UNIQUE constraint and the state transition with an atomic conditional UPDATE. The application pre-check improves the common path, while the constraint handles concurrent races." },
            ],
            productionExample: [
                { type: "steps", items: [{ title: "Before", text: "Validate request syntax and obtain required non-database context before opening the transaction." }, { title: "Inside", text: "Read and write only the data required for one invariant; use stable lock order and explicit affected-row checks." }, { title: "After commit", text: "Perform remote calls or publish via an outbox/after-commit mechanism with its own retry and idempotency policy." }, { title: "Failure", text: "Classify conflicts, deadlocks, timeouts, and infrastructure failures; retry only safe operations with a bounded policy." }] },
                { type: "callout", tone: "warning", title: "Self-invocation", text: "Calling this.otherTransactionalMethod() inside the same instance does not pass through the default proxy, so the inner @Transactional settings are not applied. Move the boundary to another bean or design one public use-case method." },
            ],
            commonMistakes: ["Annotating a private method and expecting proxy interception", "Calling a transactional method from another method on the same object", "Expecting checked exceptions to roll back by default", "Performing email, payment, or HTTP calls while holding database locks", "Using REQUIRES_NEW without analyzing independent commit and pool demand", "Catching an exception and returning success after the transaction is marked rollback-only"],
            bestPractices: ["Put use-case transactions on concrete service methods", "Keep boundaries short and observable", "State rollback rules explicitly for checked business exceptions", "Use database constraints and atomic SQL inside the boundary", "Publish integration events with an outbox where consistency requires it", "Test actual rollback and concurrency, not only annotations"],
            tradeOffs: [{ type: "table", headers: ["Choice", "Use", "Cost"], rows: [["REQUIRED", "One atomic use case", "Inner work shares rollback fate"], ["REQUIRES_NEW", "Truly independent durable work", "Extra connection; outer rollback cannot undo it"], ["Optimistic control", "Conflicts are rare", "Caller must handle retry/conflict"], ["Pessimistic lock", "Short high-value serialization", "Blocking and deadlock risk"]] }],
            interviewQuestions: ["How does @Transactional work?", "Why does self-invocation matter?", "Which exceptions roll back by default?", "Why avoid external HTTP calls inside a transaction?", "How would you prevent a lost balance update?", "What can cause UnexpectedRollbackException?"],
            handsOnTask: [{ type: "steps", items: [{ title: "Rollback", text: "Prove a two-write service rolls back on a runtime failure and document checked-exception behavior." }, { title: "Proxy", text: "Write a self-invocation example, observe the missing boundary, and refactor it." }, { title: "Concurrency", text: "Run simultaneous voucher redemption requests and verify one durable result with a stable response policy." }] }],
            relatedTopics: ["PostgreSQL Isolation and Locks", "MyBatis Transactions", "Idempotency", "Transactional Outbox", "Concurrency Testing"],
            sources: [s.springTransactions, s.postgresqlIsolation, s.mybatisStarter, s.outbox],
        }),
    },
    {
        id: "backend-spring-security-authentication-flow",
        slug: "spring-security-authentication-flow",
        title: "Spring Security Authentication Flow",
        description: "Understand the servlet filter chain, authentication providers, SecurityContext, session and token trade-offs, authorization, and refresh-token reuse detection.",
        level: 6,
        category: "security",
        type: "system",
        technologies: ["Spring Security 6.5", "Java 21", "JWT", "HTTP Cookies"],
        keywords: ["SecurityFilterChain", "AuthenticationManager", "session", "JWT", "refresh token", "authorization"],
        prerequisiteIds: ["backend-rest-api-design-fundamentals", "backend-spring-boot-layered-architecture"],
        relatedIds: ["backend-testing-strategy", "backend-production-readiness-checklist", "backend-voucher-redemption-case-study"],
        learningObjectives: ["Trace credential processing through Spring Security components", "Choose session or token authentication from deployment and threat constraints"],
        difficulty: "intermediate",
        estimatedMinutes: 65,
        featured: true,
        status: "published",
        updatedAt,
        versionScope: "Spring Security 6.5 servlet applications; forward-compatible concepts for Security 7",
        sources: [s.springSecurity, s.springSecurityConfig, s.owaspAsvs, s.jwt, s.jwtBcp, s.oauthBcp],
        sections: createNarrativeSections({
            whatItIs: "Spring Security is a servlet-filter-based security framework. Authentication turns presented credentials into a trusted Authentication; authorization decides whether that principal may perform a specific action. Sessions and bearer tokens are alternative ways to carry authenticated context, not security rankings.",
            whyItMatters: "Security bugs often come from incorrect flow assumptions: a JWT is parsed but not fully validated, CSRF is disabled because an API returns JSON, roles are checked without resource ownership, or logout clears a browser value while a reusable refresh token remains active.",
            howItWorks: [
                { type: "diagram", title: "Username/password authentication", steps: ["Login request", "Security filter", "AuthenticationManager", "AuthenticationProvider", "UserDetailsService", "PasswordEncoder", "Authenticated principal", "SecurityContext", "Session or tokens"], textAlternative: "A login request reaches a security filter, which sends an authentication token to AuthenticationManager and a compatible AuthenticationProvider. UserDetailsService loads identity data and PasswordEncoder verifies the password. On success the authenticated principal enters the SecurityContext and is persisted by a session or represented with tokens." },
                { type: "diagram", title: "Authenticated API request", steps: ["Request credential", "SecurityFilterChain", "Validate session or bearer token", "SecurityContext", "Endpoint authorization", "Method/ownership check", "Controller"], textAlternative: "Each protected request passes through SecurityFilterChain, which validates the session cookie or bearer token, populates SecurityContext, enforces endpoint rules, and then allows method and resource-ownership checks before controller work." },
            ],
            simpleExample: [
                { type: "code", language: "java", filename: "SecurityConfig.java", code: `@Configuration
@EnableMethodSecurity
class SecurityConfig {
    @Bean
    SecurityFilterChain apiSecurity(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.POST, "/v1/auth/login").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .sessionManagement(session -> session
                .sessionFixation(fixation -> fixation.changeSessionId()))
            .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}` },
                { type: "callout", tone: "warning", title: "CSRF decision", text: "Do not copy a blanket csrf.disable() into a cookie-authenticated browser application. CSRF risk depends on whether credentials are sent automatically by the user agent and on the endpoint design; configure protection from the actual client flow." },
            ],
            backendExample: [
                { type: "table", headers: ["Session cookie", "Bearer access token"], rows: [["Server stores authentication state", "Resource server validates token and claims"], ["Browser sends cookie automatically", "Client explicitly supplies Authorization header"], ["Immediate server-side invalidation is straightforward", "Revocation needs short expiry, introspection, or server state"], ["CSRF protection normally required for unsafe browser requests", "Bearer header is not automatically added cross-site, but XSS/token theft remains"], ["Good default for one web application", "Useful across independent clients/services and delegated authorization"]] },
                { type: "paragraph", text: "A JWT is a signed claim container. Verify allowed algorithms, signature, issuer, audience, expiration/not-before, and application authorization claims. Do not place secrets in the payload; base64url encoding is not encryption." },
            ],
            productionExample: [
                { type: "steps", items: [{ title: "Login", text: "Rate-limit by multiple signals, load the account, verify an adaptive password hash, rotate the session identifier or create short-lived access and high-entropy refresh credentials, and emit an audit event." }, { title: "Refresh", text: "Store a hash or identifier for each refresh token family. Rotate on every successful use. If an invalidated token is reused, revoke the active family and require fresh authentication." }, { title: "Authorize", text: "Enforce coarse route permissions, then method-level permission and resource ownership; use database predicates for sensitive ownership where possible." }, { title: "Logout/reset", text: "Invalidate the server session or refresh-token family, clear the client credential safely, and decide whether password change revokes other active sessions." }] },
                { type: "callout", tone: "production", title: "Authorization is contextual", text: "ROLE_ADMIN is not enough for most business endpoints. Include tenant, resource ownership, state transition, amount limits, and separation-of-duty rules where the domain requires them." },
            ],
            commonMistakes: ["Presenting JWT as automatically better than sessions", "Building a custom password hash", "Storing long-lived bearer tokens in browser-readable persistent storage without threat analysis", "Accepting whatever JWT algorithm the header requests", "Returning the same behavior for authentication and authorization failures without deliberate disclosure policy", "Relying only on URL roles and skipping ownership"],
            bestPractices: ["Use SecurityFilterChain and supported framework components", "Use adaptive PasswordEncoder algorithms and upgrade hashes over time", "Keep access tokens short-lived and protect refresh tokens as credentials", "Validate issuer, audience, time, signature, and allowed algorithms", "Apply least privilege and deny by default", "Test 401, 403, ownership, CSRF, session fixation, token reuse, and logout"],
            tradeOffs: [{ type: "table", headers: ["Decision", "Benefit", "Cost"], rows: [["Session", "Simple revocation and compact cookie", "Shared session infrastructure when scaling"], ["Self-contained JWT", "Independent validation", "Revocation and claim staleness"], ["BCrypt", "Widely supported adaptive hash", "Work-factor tuning"], ["Argon2", "Memory-hard design", "Memory tuning and library/operations support"]] }],
            interviewQuestions: ["Walk through Spring Security authentication components", "What is stored in SecurityContext?", "When is CSRF relevant to an API?", "How do 401 and 403 differ?", "How does refresh-token rotation detect reuse?", "Which JWT claims and algorithms must a resource server validate?", "How do you enforce resource ownership?"],
            handsOnTask: [{ type: "steps", items: [{ title: "Session", text: "Implement a session login with Secure, HttpOnly, SameSite policy, CSRF protection, fixation defense, and logout tests." }, { title: "Token", text: "Implement short-lived access tokens and rotating refresh-token families with hashed storage and reuse detection." }, { title: "Authorize", text: "Protect an owner-scoped Task endpoint and an admin endpoint at route, method, and query levels." }, { title: "Attack", text: "Test brute force, missing/expired/wrong-audience token, CSRF, horizontal access, logout, and refresh reuse." }] }],
            relatedTopics: ["HTTP Cookies and CSRF", "JWT BCP", "Password Storage", "Method Security", "Security Testing", "Production Readiness"],
            sources: [s.springSecurity, s.springSecurityConfig, s.owaspAsvs, s.jwt, s.jwtBcp, s.oauthBcp],
        }),
    },
] satisfies BackendNarrativeItem[]
