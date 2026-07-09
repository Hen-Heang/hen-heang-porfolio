import type { CommandCategory } from "@/src/lib/types/devops-lab"

export const commandCategories: CommandCategory[] = [
    {
        category: "Git",
        commands: [
            { name: "git status", description: "Show changed, staged, and untracked files.", syntax: "git status", example: "git status" },
            { name: "git add", description: "Stage changes for the next commit.", syntax: "git add <path>", example: "git add src/main/java/AutoPayController.java" },
            { name: "git commit", description: "Record staged changes as a new commit.", syntax: "git commit -m \"<message>\"", example: "git commit -m \"fix: null pointer on empty cart\"" },
            { name: "git checkout -b", description: "Create and switch to a new branch.", syntax: "git checkout -b <branch>", example: "git checkout -b feature/jwt-refresh-token" },
            { name: "git log", description: "View commit history.", syntax: "git log --oneline -n <count>", example: "git log --oneline -n 10" },
            { name: "git stash", description: "Temporarily shelve uncommitted changes.", syntax: "git stash", example: "git stash && git checkout main" },
            { name: "git rebase", description: "Replay commits from one branch onto another for a linear history.", syntax: "git rebase <branch>", example: "git rebase main" },
        ],
    },
    {
        category: "Docker",
        commands: [
            { name: "docker build", description: "Build an image from a Dockerfile.", syntax: "docker build -t <name>:<tag> <context>", example: "docker build -t myapp:1.0 ." },
            { name: "docker run", description: "Start a new container from an image.", syntax: "docker run -p <host>:<container> <image>", example: "docker run -p 8080:8080 myapp:1.0" },
            { name: "docker ps", description: "List running containers.", syntax: "docker ps", example: "docker ps -a" },
            { name: "docker logs", description: "View a container's logs.", syntax: "docker logs -f <container>", example: "docker logs -f myapp" },
            { name: "docker exec", description: "Run a command inside a running container.", syntax: "docker exec -it <container> <command>", example: "docker exec -it myapp sh" },
            { name: "docker image prune", description: "Remove unused images to free disk space.", syntax: "docker image prune -a", example: "docker image prune -a" },
        ],
    },
    {
        category: "Docker Compose",
        commands: [
            { name: "docker compose up", description: "Create and start all services defined in compose.yml.", syntax: "docker compose up -d", example: "docker compose up -d --build" },
            { name: "docker compose down", description: "Stop and remove containers and networks.", syntax: "docker compose down", example: "docker compose down -v" },
            { name: "docker compose logs", description: "View output from all services.", syntax: "docker compose logs -f", example: "docker compose logs -f api" },
            { name: "docker compose exec", description: "Run a command inside a running service.", syntax: "docker compose exec <service> <command>", example: "docker compose exec db psql -U postgres" },
            { name: "docker compose ps", description: "List the status of services in the stack.", syntax: "docker compose ps", example: "docker compose ps" },
        ],
    },
    {
        category: "Linux",
        commands: [
            { name: "systemctl status", description: "Check whether a service is running.", syntax: "systemctl status <service>", example: "systemctl status nginx" },
            { name: "journalctl", description: "View systemd service logs.", syntax: "journalctl -u <service> -f", example: "journalctl -u myapp -f" },
            { name: "df -h", description: "Show disk usage in human-readable form.", syntax: "df -h", example: "df -h" },
            { name: "top / htop", description: "View running processes and resource usage.", syntax: "top", example: "htop" },
            { name: "chmod", description: "Change file permissions.", syntax: "chmod <mode> <file>", example: "chmod +x deploy.sh" },
            { name: "grep", description: "Search text by pattern.", syntax: "grep -r \"<pattern>\" <path>", example: "grep -r \"TODO\" src/" },
        ],
    },
    {
        category: "Maven",
        commands: [
            { name: "mvn clean install", description: "Clean, compile, run tests, and install the artifact locally.", syntax: "mvn clean install", example: "mvn clean install -DskipTests" },
            { name: "mvn test", description: "Run the test suite.", syntax: "mvn test", example: "mvn test" },
            { name: "mvn spring-boot:run", description: "Run the app directly without packaging a JAR first.", syntax: "mvn spring-boot:run", example: "mvn spring-boot:run -Dspring-boot.run.profiles=dev" },
            { name: "mvn package", description: "Compile and package into a JAR/WAR without installing.", syntax: "mvn package", example: "mvn package -DskipTests" },
            { name: "mvn dependency:tree", description: "Print the full dependency tree, useful for finding version conflicts.", syntax: "mvn dependency:tree", example: "mvn dependency:tree" },
        ],
    },
    {
        category: "PostgreSQL",
        commands: [
            { name: "psql", description: "Open an interactive PostgreSQL shell.", syntax: "psql -U <user> -d <database>", example: "psql -U postgres -d appdb" },
            { name: "pg_dump", description: "Back up a database to a SQL file.", syntax: "pg_dump -U <user> <database> > backup.sql", example: "pg_dump -U postgres appdb > backup.sql" },
            { name: "pg_restore / psql <", description: "Restore a database from a backup file.", syntax: "psql -U <user> -d <database> < backup.sql", example: "psql -U postgres -d appdb < backup.sql" },
            { name: "\\dt", description: "List tables (inside psql).", syntax: "\\dt", example: "\\dt" },
            { name: "\\d <table>", description: "Describe a table's columns and indexes (inside psql).", syntax: "\\d <table>", example: "\\d users" },
        ],
    },
    {
        category: "npm",
        commands: [
            { name: "npm install", description: "Install dependencies from package.json.", syntax: "npm install", example: "npm install" },
            { name: "npm run build", description: "Run the build script (production build for Next.js).", syntax: "npm run build", example: "npm run build" },
            { name: "npm run dev", description: "Run the local dev server.", syntax: "npm run dev", example: "npm run dev" },
            { name: "npx", description: "Run a package binary without installing it globally.", syntax: "npx <package> <args>", example: "npx vercel --prod" },
        ],
    },
]
