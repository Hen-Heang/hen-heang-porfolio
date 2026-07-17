import { test, expect } from "@playwright/test"

test.describe("Engineering Lab homepage", () => {
    test("renders hero, navigation, and featured work server-side, in the approved order", async ({ page }) => {
        const response = await page.request.get("/lab")
        const html = await response.text()

        const positions = ["Engineering Lab</h1>", "Browse the lab", "Featured engineering work", "Core stack", "System status", "Lab metrics"]
            .map((marker) => html.indexOf(marker))
        for (const pos of positions) expect(pos).toBeGreaterThan(-1)
        // Each marker appears strictly after the previous one in the raw HTML
        // (i.e. before any client JS runs) — confirms both presence and order.
        for (let i = 1; i < positions.length; i++) {
            expect(positions[i]).toBeGreaterThan(positions[i - 1])
        }
    })

    test("search stays interactive and swaps only the dashboard-style sections", async ({ page }) => {
        await page.goto("/lab")
        await expect(page.getByRole("heading", { name: "Core stack", exact: true })).toBeVisible()

        const search = page.getByRole("textbox", { name: "Search Engineering Lab" })
        await search.fill("docker")
        // Category nav and featured work sit above search and stay visible while searching.
        await expect(page.getByText("Browse the lab", { exact: true })).toBeVisible()
        await expect(page.getByRole("heading", { name: "Core stack", exact: true })).toHaveCount(0)
        await expect(page.getByText(/\d+ results?$/)).toBeVisible()

        await search.fill("")
        await expect(page.getByRole("heading", { name: "Core stack", exact: true })).toBeVisible()
    })
})
