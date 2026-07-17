import { fileURLToPath } from "node:url"
import { configDefaults, defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [tsconfigPaths()],
    resolve: {
        alias: {
            // Next's bundler aliases this to a no-op for server-side code;
            // under plain Node (this test env) it always throws, so stub it
            // the same way — every test here runs in a server-equivalent context.
            "server-only": fileURLToPath(new URL("./test/server-only-stub.ts", import.meta.url)),
        },
    },
    test: {
        environment: "node",
        globals: false,
        exclude: [...configDefaults.exclude, "e2e/**"],
    },
})
