import type { LearningCard } from "@/src/lib/types/devops-lab"

export const learningCards: LearningCard[] = [
    {
        topicSlug: "git",
        overview:
            "Git tracks every change to your code as a series of commits, letting you move between versions, branch off to try something risky, and merge work back together without losing history.",
        whyItMatters:
            "Every other tool on this roadmap assumes a Git repository exists: CI/CD triggers on a push, deployments build from a commit, code review happens on a branch. Git isn't optional infrastructure — it's the substrate everything else is built on.",
        howBackendDevsUseIt:
            "Feature branches per unit of work, small commits that each represent one logical change, and pull requests as the review gate before anything reaches main. For a backend service specifically: never commit application.properties with real credentials in it — that's what environment variables and .gitignore are for.",
        commonMistakes: [
            "Committing secrets (API keys, database passwords) directly into the repository — even one commit in history means the secret is compromised forever, rotation required.",
            "One giant commit for an entire feature, making code review and git blame nearly useless.",
            "Force-pushing to a shared branch, silently discarding a teammate's commits.",
            "Never using .gitignore, so build artifacts (target/, node_modules/, .env) end up tracked and bloat the repo.",
        ],
        exampleCommands: [
            { description: "Stage and commit a change", command: "git add . && git commit -m \"feat: add idempotency check to payment endpoint\"" },
            { description: "Create and switch to a new branch", command: "git checkout -b feature/payment-idempotency" },
            { description: "See what changed before committing", command: "git diff" },
            { description: "Undo a commit but keep the changes staged", command: "git reset --soft HEAD~1" },
            { description: "Temporarily shelve uncommitted changes", command: "git stash" },
        ],
        resources: [
            { label: "Pro Git (free book)", url: "https://git-scm.com/book/en/v2" },
            { label: "Conventional Commits spec", url: "https://www.conventionalcommits.org/" },
        ],
    },
    {
        topicSlug: "docker",
        overview:
            "Docker packages an application together with everything it needs to run — the runtime, dependencies, and configuration — into a single image that behaves identically on your laptop, a CI runner, and a production server.",
        whyItMatters:
            "\"It works on my machine\" stops being a valid excuse once the machine is a container image. Docker eliminates an entire class of environment-mismatch bugs (wrong Java version, missing native library) by shipping the exact runtime the app was tested against.",
        howBackendDevsUseIt:
            "A multi-stage Dockerfile for a Spring Boot service: one stage compiles the JAR with Maven, a second stage copies only the built JAR into a slim JRE base image. This keeps the final image small — you don't ship the Maven build tool or source code to production, just the runnable artifact.",
        commonMistakes: [
            "Single-stage builds that ship the full JDK, build tools, and source code in the production image — often 3-4x larger than necessary.",
            "Running the container process as root instead of a dedicated non-root user, widening the blast radius if the container is ever compromised.",
            "Not pinning a base image version (FROM eclipse-temurin:latest) — \"latest\" changes underneath you and breaks reproducible builds.",
            "Baking secrets into the image with ENV or ARG instead of injecting them at runtime — anyone who can pull the image can read them.",
        ],
        exampleCommands: [
            { description: "Build an image from the Dockerfile in the current directory", command: "docker build -t myapp:1.0 ." },
            { description: "Run a container, mapping host port 8080 to container port 8080", command: "docker run -p 8080:8080 myapp:1.0" },
            { description: "See what's running", command: "docker ps" },
            { description: "Tail logs from a running container", command: "docker logs -f <container_id>" },
            { description: "Shell into a running container to debug", command: "docker exec -it <container_id> sh" },
        ],
        resources: [
            { label: "Docker's official Java getting-started guide", url: "https://docs.docker.com/language/java/" },
            { label: "Multi-stage builds documentation", url: "https://docs.docker.com/build/building/multi-stage/" },
        ],
    },
    {
        topicSlug: "docker-compose",
        overview:
            "Docker Compose defines multiple containers — your app, a PostgreSQL database, maybe Redis — in one YAML file, and starts them all together as a coordinated stack with a single command.",
        whyItMatters:
            "A real backend service is never just the app — it needs a database at minimum. Compose means a new developer can clone the repo and run one command to get the app and database running together, instead of manually installing PostgreSQL locally and hoping the version matches.",
        howBackendDevsUseIt:
            "A local dev docker-compose.yml with the Spring Boot service, a postgres service with a named volume for persistence, and environment variables wiring the app's datasource URL to the database container's service name (Compose gives each service a DNS name on its internal network, so the app connects to db:5432, not localhost).",
        commonMistakes: [
            "Forgetting depends_on, so the app container starts and tries to connect to a database that isn't ready yet — the fix is depends_on with a healthcheck condition, not a sleep hack.",
            "Not using a named volume for the database, so all data is lost every time the container is recreated.",
            "Connecting to localhost instead of the service name from inside another container — containers on the same Compose network resolve each other by service name, not localhost.",
            "Committing a docker-compose.yml with real production credentials instead of reading them from a .env file that's gitignored.",
        ],
        exampleCommands: [
            { description: "Start every service in the background", command: "docker compose up -d" },
            { description: "Rebuild images and restart", command: "docker compose up -d --build" },
            { description: "View logs from all services", command: "docker compose logs -f" },
            { description: "Stop and remove containers, keep volumes", command: "docker compose down" },
            { description: "Stop and remove containers and volumes (wipes the database)", command: "docker compose down -v" },
        ],
        resources: [{ label: "Compose file reference", url: "https://docs.docker.com/compose/compose-file/" }],
    },
    {
        topicSlug: "nginx",
        overview:
            "Nginx sits in front of your application as a reverse proxy — it receives every incoming request first, then forwards it to your Spring Boot or Next.js process running on an internal port.",
        whyItMatters:
            "Your application server usually shouldn't be exposed to the internet directly. Nginx terminates TLS, can serve static files without waking up your app, and gives you one place to configure things like rate limiting and gzip compression instead of building them into every service.",
        howBackendDevsUseIt:
            "A reverse proxy config that listens on 443, terminates HTTPS, and forwards to the Spring Boot app running on 127.0.0.1:8080 — the app itself only needs to bind to localhost, never directly reachable from outside the server.",
        commonMistakes: [
            "Forwarding the request without setting X-Forwarded-For / X-Forwarded-Proto headers, so the app sees every request as coming from Nginx's IP over plain HTTP, breaking things like audit logs and \"detect HTTPS\" logic.",
            "No timeout configuration, so one slow backend request can hold a worker connection open indefinitely.",
            "Serving static assets through the app server instead of directly from Nginx, wasting the app's threads on work Nginx does faster.",
            "Editing nginx.conf directly on a production server with no version control — config drift with no way to know what changed or roll it back.",
        ],
        exampleCommands: [
            { description: "Test config syntax before reloading", command: "nginx -t" },
            { description: "Reload config without dropping connections", command: "nginx -s reload" },
            { description: "Basic reverse proxy block", command: "location / { proxy_pass http://127.0.0.1:8080; proxy_set_header Host $host; }" },
        ],
        resources: [{ label: "Nginx reverse proxy guide", url: "https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/" }],
    },
    {
        topicSlug: "https",
        overview:
            "HTTPS encrypts traffic between the client and your server using a TLS certificate. Without it, anything sent to your API — including auth tokens and passwords — travels as plain, readable text over the network.",
        whyItMatters:
            "Browsers actively warn users off HTTP-only sites now, and modern web features (secure cookies, service workers, HTTP/2) simply require HTTPS to function at all. It's not an optional hardening step anymore — it's baseline.",
        howBackendDevsUseIt:
            "Let's Encrypt via Certbot for a free, auto-renewing certificate on a self-managed server behind Nginx; platforms like Railway and Vercel provision and renew certificates automatically for any domain you attach, so most of the time this is zero-config once DNS is pointed correctly.",
        commonMistakes: [
            "Letting a certificate expire because renewal wasn't automated — Certbot's cron job or systemd timer needs to actually be verified as running, not assumed.",
            "Mixed content: an HTTPS page loading an image or script over plain HTTP, which browsers block or warn on.",
            "Not redirecting HTTP to HTTPS at the server level, leaving an unencrypted path still reachable.",
            "Treating an expired-certificate warning as cosmetic instead of a blocking incident — an expired cert breaks every client that validates certificates, which is nearly all of them.",
        ],
        exampleCommands: [
            { description: "Get a free certificate via Certbot for an Nginx site", command: "certbot --nginx -d api.example.com" },
            { description: "Dry-run a renewal to confirm it'll work", command: "certbot renew --dry-run" },
            { description: "Check a certificate's expiry from the command line", command: "openssl s_client -connect api.example.com:443 -servername api.example.com | openssl x509 -noout -dates" },
        ],
        resources: [{ label: "Let's Encrypt / Certbot", url: "https://certbot.eff.org/" }],
    },
    {
        topicSlug: "cicd",
        overview:
            "Continuous Integration/Continuous Deployment automates what used to be manual: every push runs the test suite, a merge to main builds the app, and a successful build deploys automatically — no one runs those steps by hand.",
        whyItMatters:
            "Manual deployment is where mistakes live — forgetting to run migrations, deploying an untested branch, skipping a step under time pressure. A pipeline runs the same steps, in the same order, every single time, and refuses to deploy if tests fail.",
        howBackendDevsUseIt:
            "A pipeline that runs on every pull request (compile, run unit tests, run integration tests against a throwaway Postgres container) and a separate pipeline that runs only on merge to main (build the Docker image, push it, trigger a deploy) — PR feedback stays fast because it doesn't wait for a deploy.",
        commonMistakes: [
            "Deploying directly from a developer's laptop \"just this once\" — the one time it bypasses the pipeline is usually the time something untested ships.",
            "A pipeline with no test stage, so it becomes Continuous Deployment of whatever compiles, tested or not.",
            "Secrets hardcoded into the workflow file instead of the CI platform's secret store — the workflow file is usually visible to anyone with repo read access.",
            "No rollback plan — the pipeline can deploy forward but nobody has practiced deploying the previous version back.",
        ],
        exampleCommands: [
            { description: "Check the status of the last workflow run", command: "gh run list --limit 5" },
            { description: "Watch a running workflow live", command: "gh run watch" },
        ],
        resources: [{ label: "GitHub Actions documentation", url: "https://docs.github.com/en/actions" }],
    },
    {
        topicSlug: "github-actions",
        overview:
            "GitHub Actions runs workflows defined in YAML files under .github/workflows/ — triggered by events like a push or pull request, running jobs made of steps on GitHub-hosted (or your own) runners.",
        whyItMatters:
            "It's already wired into the repo you're using for version control, with no separate CI server to provision or maintain. For a portfolio or a small team, that's the entire CI/CD setup cost, versus standing up Jenkins.",
        howBackendDevsUseIt:
            "A workflow triggered on push to main: checkout code, set up the JDK, run mvn test, and only on success build and push a Docker image tagged with the commit SHA — the tag makes every deployed image traceable back to an exact commit.",
        commonMistakes: [
            "Not caching dependencies (Maven's ~/.m2, npm's node_modules), so every run re-downloads the entire dependency tree and CI takes minutes longer than it needs to.",
            "One giant workflow file instead of separate workflows for PR checks vs. deploy — a typo in the deploy logic then blocks every PR's test run too.",
            "Using repository secrets for a value that changes per environment (staging vs. production) instead of GitHub Environments, which scope secrets and require approval gates per environment.",
            "No branch protection rule requiring the workflow to pass before merge — the pipeline exists but nothing enforces it.",
        ],
        exampleCommands: [
            {
                description: "Minimal workflow: test on every push",
                command:
                    "name: CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-java@v4\n        with:\n          java-version: '21'\n          distribution: 'temurin'\n      - run: mvn test",
            },
        ],
        resources: [{ label: "GitHub Actions workflow syntax", url: "https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions" }],
    },
    {
        topicSlug: "environment-variables",
        overview:
            "Environment variables inject configuration (database URLs, API keys, feature flags) into an application at runtime, keeping it out of the source code and letting the same build behave differently in dev, staging, and production.",
        whyItMatters:
            "A Docker image or a compiled JAR should be identical across environments — what changes is configuration, not code. Environment variables are how you achieve that without rebuilding the app per environment.",
        howBackendDevsUseIt:
            "Spring Boot reads application.properties with ${VAR_NAME} placeholders, so spring.datasource.password=${DB_PASSWORD} pulls from the environment at startup instead of being hardcoded. Locally, a .env file (gitignored) holds development values; in CI and production, the platform's secret manager injects the real ones.",
        commonMistakes: [
            "Committing a .env file with real values — .env.example with placeholder keys and no real secrets is what belongs in the repo.",
            "Reading a required variable without validating it exists, so a missing env var fails silently deep in application logic instead of at startup with a clear error.",
            "Storing a secret in a variable name that suggests it's not sensitive (API_URL when it actually embeds a key) — name the sensitive ones obviously.",
            "The same database URL environment variable pointing at production, accidentally, from a developer's local .env — always double-check which environment a connection string actually points to before running anything destructive.",
        ],
        exampleCommands: [
            { description: "Reference an env var in application.properties", command: "spring.datasource.password=${DB_PASSWORD}" },
            { description: "Set a variable for one command (shell)", command: "DB_PASSWORD=secret ./mvnw spring-boot:run" },
            { description: "Load variables from a .env file (Compose)", command: "env_file:\n  - .env" },
        ],
        resources: [{ label: "The Twelve-Factor App: Config", url: "https://12factor.net/config" }],
    },
    {
        topicSlug: "deployment",
        overview:
            "Deployment is the process of taking a built artifact — a Docker image, a compiled JAR, a Next.js build — and making it a running, reachable service in production, with a domain, TLS, and the correct environment configuration.",
        whyItMatters:
            "Code that only runs on your laptop delivers zero value. Understanding deployment is what separates \"I built a feature\" from \"I shipped a feature a user can actually reach.\"",
        howBackendDevsUseIt:
            "A typical split for a Java/Next.js stack: the Spring Boot API and its PostgreSQL database deploy together on a platform like Railway (which handles the database, environment variables, and HTTPS for you), while the Next.js frontend deploys separately on Vercel and calls the API's public URL — two independently deployable pieces connected by one environment variable (the API's base URL).",
        commonMistakes: [
            "Deploying a debug build with verbose logging and stack traces exposed to the client — production builds should never leak internals in error responses.",
            "No health check endpoint, so the platform can't tell the difference between \"starting up\" and \"crashed\" and routes traffic to a dead instance.",
            "CORS configured for localhost only, so the deployed frontend can't call the deployed API until someone remembers to update the allowed origins.",
            "Treating the first successful deploy as \"done\" with no plan for what happens when the next deploy breaks something — always know how to roll back before you need to.",
        ],
        exampleCommands: [
            { description: "Deploy the current directory to Vercel", command: "vercel --prod" },
            { description: "Deploy via the Railway CLI", command: "railway up" },
        ],
        resources: [
            { label: "Railway docs", url: "https://docs.railway.app/" },
            { label: "Vercel docs", url: "https://vercel.com/docs" },
        ],
    },
]

export function getLearningCard(slug: string) {
    return learningCards.find((c) => c.topicSlug === slug)
}
