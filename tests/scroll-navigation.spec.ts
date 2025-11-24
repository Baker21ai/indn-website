import { test, expect } from '@playwright/test'

test.describe('Homepage Smooth Scroll Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.waitForLoadState('networkidle')
  })

  test('should have all navigation links with correct anchors', async ({ page }) => {
    const navLinks = [
      { text: 'Home', href: '#home' },
      { text: 'Board', href: '#board' },
      { text: 'Events', href: '#events' },
      { text: 'Sponsors', href: '#sponsors' },
      { text: 'Become a Sponsor', href: '#become-sponsor' }
    ]

    for (const link of navLinks) {
      const navLink = page.locator('header nav.hidden.lg\\:flex').locator(`a:has-text("${link.text}")`)
      await expect(navLink).toBeVisible()
      await expect(navLink).toHaveAttribute('href', link.href)
    }
  })

  test('should have all section IDs present on page', async ({ page }) => {
    const sections = ['home', 'board', 'events', 'sponsors', 'become-sponsor']

    for (const sectionId of sections) {
      const section = page.locator(`#${sectionId}`)
      await expect(section).toBeVisible()
    }
  })

  test('should scroll to Board section when clicking Board nav link', async ({ page }) => {
    // Click Board link in desktop nav
    await page.locator('header nav.hidden.lg\\:flex a:has-text("Board")').click()

    // Wait for scroll animation
    await page.waitForTimeout(1000)

    // Check that Board section is in viewport
    const boardSection = page.locator('#board')
    await expect(boardSection).toBeInViewport()

    // Verify we see the board heading
    await expect(page.locator('text=Meet Our')).toBeVisible()
  })

  test('should scroll to Events section when clicking Events nav link', async ({ page }) => {
    await page.locator('header nav.hidden.lg\\:flex a:has-text("Events")').click()
    await page.waitForTimeout(1000)

    const eventsSection = page.locator('#events')
    await expect(eventsSection).toBeInViewport()
    await expect(page.locator('text=Upcoming Events')).toBeVisible()
  })

  test('should scroll to Sponsors section when clicking Sponsors nav link', async ({ page }) => {
    await page.locator('header nav.hidden.lg\\:flex a:has-text("Sponsors")').click()
    await page.waitForTimeout(1000)

    const sponsorsSection = page.locator('#sponsors')
    await expect(sponsorsSection).toBeInViewport()
    await expect(sponsorsSection.locator('text=Our Generous')).toBeVisible()
  })

  test('should scroll to Become a Sponsor section', async ({ page }) => {
    await page.locator('header nav.hidden.lg\\:flex a:has-text("Become a Sponsor")').click()
    await page.waitForTimeout(1000)

    const becomeSection = page.locator('#become-sponsor')
    await expect(becomeSection).toBeInViewport()
    await expect(page.locator('text=Make an Impact Today')).toBeVisible()
  })

  test('should scroll to top when clicking logo', async ({ page }) => {
    // First scroll down to Board section
    await page.locator('header nav.hidden.lg\\:flex a:has-text("Board")').click()
    await page.waitForTimeout(1000)

    // Verify we scrolled down
    const scrollY1 = await page.evaluate(() => window.scrollY)
    expect(scrollY1).toBeGreaterThan(100)

    // Click logo
    await page.locator('header a[href="/"]').first().click()
    await page.waitForTimeout(1000)

    // Verify we're back at top
    const scrollY2 = await page.evaluate(() => window.scrollY)
    expect(scrollY2).toBeLessThan(50)
  })

  test('should display board members in Board section', async ({ page }) => {
    await page.locator('header nav.hidden.lg\\:flex a:has-text("Board")').click()
    await page.waitForTimeout(1000)

    const boardSection = page.locator('#board')
    // Check for board member names as headings within board section
    await expect(boardSection.getByRole('heading', { name: 'Elvira Zaragoza Robinson' })).toBeVisible()
    await expect(boardSection.getByRole('heading', { name: 'Charles Wall' })).toBeVisible()
    await expect(boardSection.getByRole('heading', { name: /James White Bear Connor/ })).toBeVisible()
  })

  test('should display powwow information in Events section', async ({ page }) => {
    await page.locator('header nav.hidden.lg\\:flex a:has-text("Events")').click()
    await page.waitForTimeout(1000)

    const eventsSection = page.locator('#events')
    // Check for event details within events section
    await expect(eventsSection.locator('text=November 7-9, 2025')).toBeVisible()
    await expect(eventsSection.locator('text=Bolado Park')).toBeVisible()
    await expect(eventsSection.getByText('FREE', { exact: true })).toBeVisible()
  })

  test('should display sponsorship tiers in Become a Sponsor section', async ({ page }) => {
    await page.locator('header nav.hidden.lg\\:flex a:has-text("Become a Sponsor")').click()
    await page.waitForTimeout(1000)

    // Check for tier names
    await expect(page.locator('text=Turtle Tier')).toBeVisible()
    await expect(page.locator('text=Wolf Tier')).toBeVisible()
    await expect(page.locator('text=Bear Tier')).toBeVisible()
    await expect(page.locator('text=Eagle Tier')).toBeVisible()
  })

  test('mobile navigation should work with smooth scroll', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Open mobile menu
    await page.locator('button[aria-label="Toggle menu"]').click()
    await page.waitForTimeout(500)

    // Click Board link in mobile menu
    await page.locator('div.lg\\:hidden a:has-text("Board")').click()
    await page.waitForTimeout(1000)

    // Check that Board section is visible
    const boardSection = page.locator('#board')
    await expect(boardSection).toBeInViewport()

    // Verify mobile menu closed after navigation
    const drawer = page.locator('div.fixed.right-0.w-\\[280px\\]')
    await expect(drawer).not.toHaveClass(/translate-x-0/)
  })
})
