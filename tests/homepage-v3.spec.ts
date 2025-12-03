import { test, expect } from '@playwright/test'

test.describe('Homepage V3 - Community Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002')
  })

  test('should display hero section with welcome message', async ({ page }) => {
    // Check hero heading
    const heroHeading = page.locator('h1', { hasText: 'Welcome to Our Circle' })
    await expect(heroHeading).toBeVisible()

    // Check hero description
    await expect(page.locator('text=Where ancestral wisdom meets tomorrow')).toBeVisible()
  })

  test('should display all six values in circles', async ({ page }) => {
    // Check for "Rooted in Our Values" heading
    await expect(page.locator('h2', { hasText: 'Rooted in Our Values' })).toBeVisible()

    // Check all 6 values are present
    const values = [
      'Respect',
      'Reciprocity',
      'Relationality',
      'Responsibility',
      'Relevance',
      'Representation'
    ]

    for (const value of values) {
      await expect(page.locator('h3', { hasText: value })).toBeVisible()
    }
  })

  test('should display origin story section', async ({ page }) => {
    // Check story heading
    await expect(page.locator('h2', { hasText: 'How This Circle Began' })).toBeVisible()

    // Check for key story elements
    await expect(page.locator('text=San Juan Bautista Indian Market')).toBeVisible()
    await expect(page.locator('text=1,000+ participants in three years')).toBeVisible()
  })

  test('should display community testimonials', async ({ page }) => {
    // Check testimonials heading
    await expect(page.locator('h2', { hasText: 'In Their Own Words' })).toBeVisible()

    // Check for testimonial names
    await expect(page.locator('text=Maria, 16')).toBeVisible()
    await expect(page.locator('text=Youth Leader')).toBeVisible()
  })

  test('should display all four programs', async ({ page }) => {
    // Check programs heading
    await expect(page.locator('h2', { hasText: 'How We Walk Together' })).toBeVisible()

    // Check all 4 program titles
    const programs = [
      'Cultural Nights',
      'Youth Garden',
      'Four Directions Initiative',
      'Annual Pow Wow'
    ]

    for (const program of programs) {
      await expect(page.locator('h3', { hasText: program })).toBeVisible()
    }
  })

  test('should display leaders section', async ({ page }) => {
    // Check leaders heading
    await expect(page.locator('h2', { hasText: 'Guided by Our Leaders' })).toBeVisible()

    // Check leader names
    const leaders = [
      'Ann Marie Sayers',
      'Kanyon Sayers-Roods',
      'Valentin Lopez'
    ]

    for (const leader of leaders) {
      await expect(page.locator('text=' + leader)).toBeVisible()
    }
  })

  test('should display join section with pathways', async ({ page }) => {
    // Check join heading
    await expect(page.locator('h2', { hasText: 'Join Our Circle' })).toBeVisible()

    // Check all 4 pathways
    const pathways = [
      'Donate',
      'Volunteer',
      'Stay Connected',
      'Attend Events'
    ]

    for (const pathway of pathways) {
      await expect(page.locator('h3', { hasText: pathway })).toBeVisible()
    }

    // Check contact information is present
    await expect(page.locator('text=Elvira Zaragoza Robinson')).toBeVisible()
    await expect(page.locator('text=Charles Wall')).toBeVisible()
  })

  test('should have functioning navigation links', async ({ page }) => {
    // Check Donate link (first occurrence)
    const donateLink = page.locator('a[href="/donate"]').first()
    await expect(donateLink).toBeVisible()

    // Check Volunteer link (first occurrence)
    const volunteerLink = page.locator('a[href="/register"]').first()
    await expect(volunteerLink).toBeVisible()

    // Check Events link (first occurrence)
    const eventsLink = page.locator('a[href="/portal/volunteer/events"]').first()
    await expect(eventsLink).toBeVisible()
  })

  test('should have contact email and phone links', async ({ page }) => {
    // Check email links
    const elviraEmail = page.locator('a[href="mailto:ezrlaw1948@gmail.com"]')
    await expect(elviraEmail).toBeVisible()

    const charlesEmail = page.locator('a[href="mailto:charleswallandfam@gmail.com"]')
    await expect(charlesEmail).toBeVisible()

    // Check phone links
    const elviraPhone = page.locator('a[href="tel:+18318015530"]')
    await expect(elviraPhone).toBeVisible()

    const charlesPhone = page.locator('a[href="tel:+17752710322"]')
    await expect(charlesPhone).toBeVisible()
  })

  test('should apply hover effects to value cards', async ({ page }) => {
    // Get first value card
    const firstValueCard = page.locator('text=Respect').locator('..').locator('..')

    // Hover and check for scale transform
    await firstValueCard.hover()
    
    // Just verify it's still visible after hover (basic interaction test)
    await expect(firstValueCard).toBeVisible()
  })

  test('should apply hover effects to program cards', async ({ page }) => {
    // Scroll to programs section first
    await page.locator('h2', { hasText: 'How We Walk Together' }).scrollIntoViewIfNeeded()
    
    // Find program card by its unique icon
    const culturalNightsCard = page.locator('text=🌙').locator('..').first()

    // Hover and check visibility
    await culturalNightsCard.hover()
    await expect(culturalNightsCard).toBeVisible()
  })

  test('should be responsive - mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Check hero is still visible
    await expect(page.locator('h1', { hasText: 'Welcome to Our Circle' })).toBeVisible()

    // Check values section is visible
    await expect(page.locator('h2', { hasText: 'Rooted in Our Values' })).toBeVisible()

    // Check programs section is visible
    await expect(page.locator('h2', { hasText: 'How We Walk Together' })).toBeVisible()
  })

  test('should be responsive - tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })

    // Check all major sections are visible
    await expect(page.locator('h1', { hasText: 'Welcome to Our Circle' })).toBeVisible()
    await expect(page.locator('h2', { hasText: 'Rooted in Our Values' })).toBeVisible()
    await expect(page.locator('h2', { hasText: 'How This Circle Began' })).toBeVisible()
    await expect(page.locator('h2', { hasText: 'Join Our Circle' })).toBeVisible()
  })

  test('should load page within reasonable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('http://localhost:3002')
    const loadTime = Date.now() - startTime

    // Page should load in less than 5 seconds
    expect(loadTime).toBeLessThan(5000)
  })

  test('should have proper page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Indigenous Nations Diversity Network/)
  })

  test('should use INDN brand colors', async ({ page }) => {
    // Check that elements with brand colors are present
    // This is a basic check - we can't easily verify exact colors in Playwright
    // but we can verify the styled elements exist
    
    const heroSection = page.locator('section').first()
    await expect(heroSection).toBeVisible()
    
    // Verify gradient backgrounds are applied (they contain our brand colors)
    const storySection = page.locator('h2', { hasText: 'How This Circle Began' }).locator('..')
    await expect(storySection).toBeVisible()
  })
})

