import { expect, test } from "@playwright/test"

test.describe("Homepage current focus", () => {
    test("shows a compact three-item list and links to the journey, without the old four-card layout", async ({ page }) => {
        await page.goto("/")

        const section = page.locator("#current-focus")
        await expect(section.getByRole("heading", { name: "What I’m actively improving" })).toBeVisible()
        await expect(section.getByRole("listitem")).toHaveCount(3)
        await expect(section.getByRole("link", { name: "View learning journey" })).toHaveAttribute("href", "/journey")

        await expect(page.getByRole("heading", { name: "What I’m working on" })).toHaveCount(0)
        await expect(page.getByRole("heading", { name: "What I own on the backend" })).toHaveCount(0)
    })
})
