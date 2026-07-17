import { expect, test } from "@playwright/test"

test.describe("Homepage current progress", () => {
    test("shows four focus cards and links to the journey without the duplicate capabilities section", async ({ page }) => {
        await page.goto("/")

        const progress = page.locator("#current-progress")
        await expect(progress.getByRole("heading", { name: "What I’m working on" })).toBeVisible()
        await expect(progress.getByRole("article")).toHaveCount(4)
        await expect(progress.getByRole("link", { name: "View my journey" })).toHaveAttribute("href", "/journey")

        await expect(page.getByRole("heading", { name: "What I own on the backend" })).toHaveCount(0)
    })
})
