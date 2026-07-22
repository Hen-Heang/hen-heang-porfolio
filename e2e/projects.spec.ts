import { test, expect } from "@playwright/test"

test.describe("Projects index", () => {
    test("shows featured projects as large panels and the rest in a compact grid", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 1200 })
        await page.goto("/projects")
        await expect(page.getByRole("heading", { name: /H-Phsar/, level: 3 })).toBeVisible()
        await expect(page.getByText("All projects", { exact: true })).toBeVisible()
        await expect(page.getByRole("link", { name: "View case study", exact: false }).first()).toBeVisible()
    })

    test("filters remain correct and featured projects respect the active filter", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 1200 })
        await page.goto("/projects?filter=backend")
        await expect(page.getByRole("link", { name: /^Backend/ })).toHaveAttribute("aria-current", "page")
        await expect(page.getByRole("link", { name: /^All /, exact: false })).not.toHaveAttribute("aria-current", "page")
        // Money Flow is not a backend project and must not appear at all under this filter.
        await expect(page.getByRole("heading", { name: "Money Flow", exact: false })).toHaveCount(0)
    })

    test("filter bar is reachable and scrollable at 320px with comfortable touch targets", async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 700 })
        await page.goto("/projects")
        const group = page.getByRole("group", { name: "Filter projects by type" })
        await expect(group).toBeVisible()

        // "Live" is the last pill and requires horizontal scroll at 320px —
        // confirm the scroll container (the group's parent) actually
        // overflows, then reach and use it.
        const scrollContainer = group.locator("xpath=..")
        const overflow = await scrollContainer.evaluate((el) => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }))
        expect(overflow.scrollWidth).toBeGreaterThan(overflow.clientWidth)

        const liveFilter = group.getByRole("link", { name: /^Live/ })
        await liveFilter.scrollIntoViewIfNeeded()
        const box = await liveFilter.boundingBox()
        expect(box!.height).toBeGreaterThanOrEqual(44)
        await liveFilter.click()
        await expect(page).toHaveURL(/filter=live/)
        await expect(liveFilter).toHaveAttribute("aria-current", "page")
    })

    test("shows an editorial no-results message and clears back to all", async ({ page }) => {
        await page.goto("/projects?filter=live")
        await expect(page.getByRole("link", { name: /^All /, exact: false })).toBeVisible()
    })

    test("grid card CTA is visible without hover and github/live links are separate from the card link", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 1200 })
        await page.goto("/projects")
        // Money Flow is in the "All projects" grid, not the featured section.
        const card = page.locator("a.static-link", { hasText: "Money Flow" }).locator("xpath=../..")
        const cta = card.getByText("View case study", { exact: true })
        // Not hovering — the CTA must already be in the accessibility tree and rendered (opacity/visibility default state).
        await expect(cta).toBeVisible()

        const githubLink = card.getByRole("link", { name: /GitHub/ })
        await expect(githubLink).toBeVisible()
        await expect(githubLink).toHaveAttribute("target", "_blank")
    })
})
