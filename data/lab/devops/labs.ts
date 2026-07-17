import type { Lab } from "@/src/lib/types/devops-lab"

export const labs: Lab[] = [
    {
        slug: "dockerize-spring-boot",
        title: "Dockerize a Spring Boot App",
        description: "Package a Spring Boot service into a small, production-ready image using a multi-stage build.",
        difficulty: "intermediate",
        estimatedTime: "45 min",
        prerequisites: ["Docker installed and running", "A Spring Boot project with a Maven pom.xml", "Basic familiarity with the terminal"],
        architecture: {
            title: "Build stage vs. runtime stage",
            nodes: [
                { label: "Source + pom.xml", sublabel: "build stage" },
                { label: "Maven build", sublabel: "mvn package" },
                { label: "app.jar", sublabel: "artifact only" },
                { label: "JRE image", sublabel: "runtime stage" },
            ],
        },
        steps: [
            {
                title: "Write a multi-stage Dockerfile",
                description: "Stage one compiles the JAR with Maven; stage two copies only the built artifact into a slim JRE image — the final image never contains Maven, the JDK, or your source code.",
                command: `FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/target/*.jar app.jar
USER app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`,
            },
            {
                title: "Build the image",
                command: "docker build -t myapp:1.0 .",
            },
            {
                title: "Run it locally",
                command: "docker run -p 8080:8080 -e SPRING_PROFILES_ACTIVE=prod myapp:1.0",
            },
            {
                title: "Confirm it's actually responding",
                command: "curl http://localhost:8080/actuator/health",
            },
        ],
        expectedResult:
            "A running container serving the app on port 8080, and an image significantly smaller than a single-stage build would produce — because the final layer never carries Maven or the JDK, only a JRE and one JAR file.",
        lessonsLearned: [
            "COPY pom.xml first, then run dependency:go-offline, before copying src/ — Docker caches layers, so dependency resolution only re-runs when pom.xml actually changes, not on every source edit.",
            "-DskipTests in the Dockerfile is deliberate: tests should run in CI before the image is even built, not slow down every local image build.",
            "The runtime creates and switches to an unprivileged app user; a container intended for production should not run the JVM as root.",
            "eclipse-temurin:21-jre-alpine is readable but mutable. Resolve and pin a reviewed digest for controlled production builds, then use automation to propose digest updates.",
        ],
    },
    {
        slug: "docker-compose-full-stack",
        title: "Docker Compose: Next.js + Spring Boot + PostgreSQL",
        description: "Run the whole stack — frontend, API, and database — with a single command and no manually installed services.",
        difficulty: "intermediate",
        estimatedTime: "1 hr",
        prerequisites: ["Docker and Docker Compose installed", "A Dockerfile for both the Spring Boot API and the Next.js app"],
        architecture: {
            title: "Three services on one Compose network",
            nodes: [
                { label: "frontend", sublabel: "Next.js :3000" },
                { label: "api", sublabel: "Spring Boot :8080" },
                { label: "db", sublabel: "PostgreSQL :5432" },
            ],
        },
        steps: [
            {
                title: "Write docker-compose.yml",
                command: `services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: appdb
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      retries: 5

  api:
    build: ./api
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/appdb
      SPRING_DATASOURCE_PASSWORD: \${DB_PASSWORD}
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "8080:8080"

  frontend:
    build: ./frontend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8080
    depends_on:
      - api
    ports:
      - "3000:3000"

volumes:
  pgdata:`,
            },
            {
                title: "Start every service",
                command: "docker compose up -d --build",
            },
            {
                title: "Watch the logs while it starts",
                command: "docker compose logs -f",
            },
            {
                title: "Confirm the frontend can reach the API",
                command: "curl http://localhost:3000",
            },
        ],
        expectedResult:
            "Three containers running together, the API only starting once the database passes its healthcheck, and the frontend reachable on port 3000 with working API calls to the backend on port 8080.",
        lessonsLearned: [
            "depends_on: condition: service_healthy is what actually prevents the app from racing the database on startup — plain depends_on only waits for the container to start, not for Postgres inside it to be ready to accept connections.",
            "The API connects to db:5432, not localhost:5432 — Compose gives every service a DNS name on the shared network matching the service key in the YAML.",
            "A named volume (pgdata) is what makes data survive docker compose down — without it, every recreate wipes the database.",
        ],
    },
    {
        slug: "nginx-reverse-proxy-https",
        title: "Configure Nginx Reverse Proxy with HTTPS",
        description: "Put Nginx in front of a Spring Boot app, terminate TLS with a free Let's Encrypt certificate, and force HTTPS.",
        difficulty: "intermediate",
        estimatedTime: "1 hr",
        prerequisites: ["A server with a public IP and a domain pointed at it", "Spring Boot app running on an internal port (e.g. 8080)", "Nginx and Certbot installed"],
        architecture: {
            title: "TLS terminates at the proxy, not the app",
            nodes: [
                { label: "Client", sublabel: "HTTPS request" },
                { label: "Nginx :443", sublabel: "TLS termination" },
                { label: "Spring Boot :8080", sublabel: "plain HTTP, localhost only" },
            ],
        },
        steps: [
            {
                title: "Write the base reverse proxy config",
                command: `server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
            },
            {
                title: "Test the config, then reload Nginx",
                command: "nginx -t && nginx -s reload",
            },
            {
                title: "Provision a free certificate and auto-configure HTTPS",
                description: "Certbot rewrites the config to listen on 443 with the certificate, and adds an HTTP→HTTPS redirect for the existing server block.",
                command: "certbot --nginx -d api.example.com",
            },
            {
                title: "Verify auto-renewal actually works",
                command: "certbot renew --dry-run",
            },
        ],
        expectedResult:
            "https://api.example.com reaches the Spring Boot app, http://api.example.com redirects to HTTPS automatically, and the certificate renews itself before it expires.",
        lessonsLearned: [
            "The app itself never needs to know about TLS at all — it just serves plain HTTP on localhost, and Nginx handles encryption entirely at the edge.",
            "X-Forwarded-Proto is what lets the app correctly detect the original request was HTTPS, even though Nginx talks to it over plain HTTP internally — without it, redirect logic and secure-cookie logic in the app can misbehave.",
            "Certbot's renewal is a scheduled job (cron or systemd timer) installed automatically — the dry-run is how you confirm it'll actually fire before you find out the hard way at 2am when a cert expires.",
        ],
    },
    {
        slug: "github-actions-cicd-pipeline",
        title: "Set Up a GitHub Actions CI/CD Pipeline",
        description: "Run tests on every pull request, and build + push a Docker image automatically on every merge to main.",
        difficulty: "intermediate",
        estimatedTime: "1 hr",
        prerequisites: ["A GitHub repository with a Spring Boot project", "A container registry to push to (Docker Hub or GHCR)"],
        architecture: {
            title: "Two workflows, two triggers",
            nodes: [
                { label: "Pull Request", sublabel: "trigger" },
                { label: "Run Tests", sublabel: "mvn test" },
                { label: "Merge to main", sublabel: "trigger" },
                { label: "Build + Push Image", sublabel: "tagged by commit SHA" },
            ],
        },
        steps: [
            {
                title: "PR workflow — .github/workflows/test.yml",
                command: `name: Test
on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@08eba0b27e820071cde6df949e0beb9ba4906955 # v4.3.0
      - uses: actions/setup-java@c1e323688fd81a25caa38c78aa6df2d33d3e20d9 # v4.8.0
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'
      - run: mvn test`,
            },
            {
                title: "Deploy workflow — .github/workflows/deploy.yml",
                command: `name: Deploy
on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@08eba0b27e820071cde6df949e0beb9ba4906955 # v4.3.0
      - uses: docker/login-action@5e57cd118135c172c3672efd75eb46360885c0ef # v3.6.0
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}
      - uses: docker/build-push-action@ca052bb54ab0790a636c9b5f226502c73d547a25 # v5.4.0
        with:
          push: true
          tags: myorg/myapp:\${{ github.sha }}`,
            },
            {
                title: "Protect main so the test workflow is required",
                description: "Repo Settings → Branches → Branch protection rule → require the Test workflow to pass before merging.",
            },
        ],
        expectedResult:
            "Every pull request automatically runs the test suite and blocks merge on failure. Every merge to main automatically builds and pushes a new image tagged with the exact commit SHA that produced it.",
        lessonsLearned: [
            "cache: 'maven' on setup-java cuts test-workflow time noticeably by reusing the dependency cache between runs instead of re-downloading the whole tree.",
            "Tagging images by commit SHA (not just latest) means any deployed image can be traced back to the exact commit — essential when you need to know exactly what's running in production.",
            "Pin third-party actions to reviewed full commit SHAs and retain a version comment for readability; use dependency automation to propose reviewed updates.",
            "Splitting test and deploy into separate workflow files keeps PR feedback fast — a broken deploy step can't accidentally block or slow down the test run every contributor waits on.",
        ],
    },
]

export function getLab(slug: string) {
    return labs.find((l) => l.slug === slug)
}
