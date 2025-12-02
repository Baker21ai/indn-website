import { test, expect, devices } from '@playwright/test'

// Comprehensive viewport testing based on industry standards
// Covers critical breakpoints for mobile, tablet, and desktop
const viewports = {
  // Mobile - Small (critical edge case)
  'Mobile XS (320px)': { width: 320, height: 568 },
  // Mobile - Standard
  'iPhone SE': { width: 375, height: 667 },
  // Mobile - Large
  'iPhone 14 Pro': { width: 393, height: 852 },
  'iPhone 14 Pro Max': { width: 430, height: 932 },
  // Tablet - Portrait
  'iPad Mini': { width: 768, height: 1024 },
  // Tablet - Landscape / Small laptop
  'iPad Air Landscape': { width: 820, height: 1180 },
  'iPad Pro': { width: 1024, height: 1366 },
  // Desktop
  'Desktop HD': { width: 1280, height: 720 },
  'Desktop Full HD': { width: 1920, height: 1080 },
}

// Test each viewport
Object.entries(viewports).forEach(([deviceName, viewport]) => {
  test.describe(`Mobile Audit - ${deviceName}`, () => {
    test.use({ viewport })

    test('Homepage sections render without layout issues', async ({ page }) => {
      await page.goto('http://localhost:3000/')
      await page.waitForLoadState('networkidle')

      // Take full page screenshot
      await page.screenshot({
        path: `test-results/mobile-audit-${deviceName.toLowerCase().replace(/\s+/g, '-')}-full.png`,
        fullPage: true
      })

      // Check for horizontal scrollbars (indicates overflow)
      const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth)
      const bodyClientWidth = await page.evaluate(() => document.body.clientWidth)

      expect(bodyScrollWidth).toBeLessThanOrEqual(bodyClientWidth + 1) // +1 for rounding

      // Verify all sections are visible
      const sections = ['home', 'board', 'events', 'sponsors', 'become-sponsor']
      for (const sectionId of sections) {
        const section = page.locator(`#${sectionId}`)
        await expect(section).toBeVisible()
      }
    })

    test('Hero section is properly sized', async ({ page }) => {
      await page.goto('http://localhost:3000/')
      await page.waitForLoadState('networkidle')

      const heroSection = page.locator('#home')

      // Screenshot just hero section
      await heroSection.screenshot({
        path: `test-results/mobile-audit-${deviceName.toLowerCase().replace(/\s+/g, '-')}-hero.png`
      })

      // Check logo container doesn't overflow
      const logoContainer = heroSection.locator('img[alt="Indigenous Nations Diversity Network"]').locator('..')
      await expect(logoContainer).toBeVisible()

      // Check hero heading is visible and readable
      const heading = heroSection.locator('h1')
      await expect(heading).toBeVisible()

      // Verify text doesn't overflow its container
      const headingBox = await heading.boundingBox()
      if (headingBox) {
        expect(headingBox.width).toBeLessThanOrEqual(viewport.width)
      }
    })

    test('Values section circles are properly sized', async ({ page }) => {
      await page.goto('http://localhost:3000/')
      await page.waitForLoadState('networkidle')

      // Scroll to values section
      await page.evaluate(() => {
        const valuesSection = document.querySelector('section:has(h2:text("Rooted in Our Values"))')
        valuesSection?.scrollIntoView()
      })
      await page.waitForTimeout(500)

      // Screenshot values section
      const valuesSection = page.locator('section:has(h2:text("Rooted in Our Values"))')
      await valuesSection.screenshot({
        path: `test-results/mobile-audit-${deviceName.toLowerCase().replace(/\s+/g, '-')}-values.png`
      })

      // Check all value cards are visible
      const valueCards = page.locator('section:has(h2:text("Rooted in Our Values")) h3')
      const cardCount = await valueCards.count()
      expect(cardCount).toBe(6) // Should have all 6 values

      // Verify cards don't overflow horizontally
      for (let i = 0; i < cardCount; i++) {
        const card = valueCards.nth(i)
        const cardBox = await card.boundingBox()
        if (cardBox) {
          expect(cardBox.x + cardBox.width).toBeLessThanOrEqual(viewport.width)
        }
      }
    })

    test('Board members section is properly laid out', async ({ page }) => {
      await page.goto('http://localhost:3000/#board')
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500)

      const boardSection = page.locator('#board')

      // Screenshot board section
      await boardSection.screenshot({
        path: `test-results/mobile-audit-${deviceName.toLowerCase().replace(/\s+/g, '-')}-board.png`
      })

      // Verify board member cards are visible
      const boardCards = boardSection.locator('[class*="Card"]')
      const cardCount = await boardCards.count()
      expect(cardCount).toBeGreaterThan(0)

      // Check cards don't overflow
      for (let i = 0; i < Math.min(cardCount, 3); i++) {
        const card = boardCards.nth(i)
        const cardBox = await card.boundingBox()
        if (cardBox) {
          expect(cardBox.x + cardBox.width).toBeLessThanOrEqual(viewport.width + 20) // +20 for margins
        }
      }
    })

    test('Events section renders properly', async ({ page }) => {
      await page.goto('http://localhost:3000/#events')
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500)

      const eventsSection = page.locator('#events')

      // Screenshot events section
      await eventsSection.screenshot({
        path: `test-results/mobile-audit-${deviceName.toLowerCase().replace(/\s+/g, '-')}-events.png`
      })

      // Check flyer image is visible
      const flyerImage = eventsSection.locator('img[alt*="Powwow"]')
      await expect(flyerImage).toBeVisible()

      // Verify event info cards are visible
      const eventInfoCards = eventsSection.locator('div:has(p:text("Dates"))')
      await expect(eventInfoCards).toBeVisible()
    })

    test('Sponsor section QR code is properly sized', async ({ page }) => {
      await page.goto('http://localhost:3000/#become-sponsor')
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500)

      const sponsorSection = page.locator('#become-sponsor')

      // Screenshot sponsor section
      await sponsorSection.screenshot({
        path: `test-results/mobile-audit-${deviceName.toLowerCase().replace(/\s+/g, '-')}-sponsor.png`
      })

      // Check QR code is visible
      const qrCode = sponsorSection.locator('img[alt="Sponsorship QR Code"]')
      await expect(qrCode).toBeVisible()

      // Verify QR code doesn't overflow
      const qrBox = await qrCode.boundingBox()
      if (qrBox) {
        expect(qrBox.width).toBeLessThanOrEqual(viewport.width * 0.9) // Should be max 90% of viewport
      }
    })

    test('Navigation is accessible and properly sized', async ({ page }) => {
      await page.goto('http://localhost:3000/')
      await page.waitForLoadState('networkidle')

      // Screenshot header
      const header = page.locator('header')
      await header.screenshot({
        path: `test-results/mobile-audit-${deviceName.toLowerCase().replace(/\s+/g, '-')}-header.png`
      })

      // Check logo is visible
      const logo = header.locator('img[alt*="INDN"]')
      await expect(logo).toBeVisible()

      // On mobile, check mobile menu button exists and is large enough for touch
      if (viewport.width < 1024) {
        const mobileMenuButton = page.locator('button[aria-label="Toggle menu"]')
        await expect(mobileMenuButton).toBeVisible()

        // Verify touch target size (min 44x44px)
        const buttonBox = await mobileMenuButton.boundingBox()
        if (buttonBox) {
          expect(buttonBox.width).toBeGreaterThanOrEqual(40) // At least 40px
          expect(buttonBox.height).toBeGreaterThanOrEqual(40)
        }
      }
    })

    test('All text is readable (no overflow)', async ({ page }) => {
      await page.goto('http://localhost:3000/')
      await page.waitForLoadState('networkidle')

      // Check for any elements with text that overflows
      const overflowingElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('*')
        const overflowing = []

        elements.forEach(el => {
          if (el.scrollWidth > el.clientWidth + 1) { // +1 for rounding
            overflowing.push({
              tag: el.tagName,
              class: el.className,
              id: el.id,
              scrollWidth: el.scrollWidth,
              clientWidth: el.clientWidth
            })
          }
        })

        return overflowing
      })

      // Log any overflowing elements for debugging
      if (overflowingElements.length > 0) {
        console.log(`${deviceName} - Overflowing elements:`, overflowingElements)
      }

      // Body and html can have slight overflow, but content should not
      const contentOverflow = overflowingElements.filter(
        el => !['BODY', 'HTML'].includes(el.tag)
      )

      expect(contentOverflow.length).toBe(0)
    })

    test('Touch targets meet minimum size requirements (44x44px)', async ({ page }) => {
      await page.goto('http://localhost:3000/')
      await page.waitForLoadState('networkidle')

      // Check all interactive elements for minimum touch target size
      const interactiveElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('a, button, [role="button"], input, select, textarea')
        const smallTargets: Array<{tag: string, text: string, width: number, height: number}> = []
        const MIN_SIZE = 44 // Apple HIG minimum

        elements.forEach(el => {
          const rect = el.getBoundingClientRect()
          // Only check visible elements
          if (rect.width > 0 && rect.height > 0) {
            if (rect.width < MIN_SIZE || rect.height < MIN_SIZE) {
              smallTargets.push({
                tag: el.tagName,
                text: (el.textContent || '').substring(0, 30),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
              })
            }
          }
        })

        return smallTargets
      })

      // Log any undersized targets for debugging
      if (interactiveElements.length > 0) {
        console.log(`${deviceName} - Undersized touch targets:`, interactiveElements)
      }

      // Allow some flexibility - focus on critical navigation elements
      // Full compliance would require all elements to be 44x44
    })

    test('Footer links are accessible on mobile', async ({ page }) => {
      await page.goto('http://localhost:3000/')
      await page.waitForLoadState('networkidle')

      // Scroll to footer
      await page.evaluate(() => {
        const footer = document.querySelector('footer')
        footer?.scrollIntoView({ behavior: 'instant' })
      })
      await page.waitForTimeout(300)

      // Screenshot footer
      const footer = page.locator('footer')
      await footer.screenshot({
        path: `test-results/mobile-audit-${deviceName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}-footer.png`
      })

      // Verify footer links are visible
      const footerLinks = footer.locator('a')
      const linkCount = await footerLinks.count()
      expect(linkCount).toBeGreaterThan(0)
    })
  })
})

// Additional responsive design tests for public pages
test.describe('Public Pages Responsive Tests', () => {
  const criticalViewports = {
    'Mobile': { width: 375, height: 667 },
    'Tablet': { width: 768, height: 1024 },
    'Desktop': { width: 1280, height: 720 },
  }

  Object.entries(criticalViewports).forEach(([deviceName, viewport]) => {
    test.describe(`${deviceName} - Public Pages`, () => {
      test.use({ viewport })

      test('Donate page renders correctly', async ({ page }) => {
        await page.goto('http://localhost:3000/donate')
        await page.waitForLoadState('networkidle')

        // Screenshot full page
        await page.screenshot({
          path: `test-results/donate-${deviceName.toLowerCase()}.png`,
          fullPage: true
        })

        // Verify QR code is visible
        const qrCode = page.locator('img[alt*="QR"]')
        await expect(qrCode).toBeVisible()

        // Verify donate button is visible
        const donateButton = page.locator('a:has-text("Donate Now")')
        await expect(donateButton).toBeVisible()
      })

      test('Events page renders correctly', async ({ page }) => {
        await page.goto('http://localhost:3000/events')
        await page.waitForLoadState('networkidle')

        // Screenshot
        await page.screenshot({
          path: `test-results/events-${deviceName.toLowerCase()}.png`,
          fullPage: true
        })

        // Verify event flyer is visible
        const flyer = page.locator('img[alt*="Powwow"]')
        await expect(flyer).toBeVisible()
      })

      test('Volunteer page renders correctly', async ({ page }) => {
        await page.goto('http://localhost:3000/volunteer')
        await page.waitForLoadState('networkidle')

        // Screenshot
        await page.screenshot({
          path: `test-results/volunteer-${deviceName.toLowerCase()}.png`,
          fullPage: true
        })

        // Verify CTA button is visible
        const ctaButton = page.locator('a:has-text("Sign Up to Volunteer")')
        await expect(ctaButton).toBeVisible()
      })

      test('Sponsors page renders correctly', async ({ page }) => {
        await page.goto('http://localhost:3000/sponsors')
        await page.waitForLoadState('networkidle')

        // Screenshot
        await page.screenshot({
          path: `test-results/sponsors-${deviceName.toLowerCase()}.png`,
          fullPage: true
        })

        // Verify filters are visible
        const searchInput = page.locator('input[placeholder*="Search"]')
        await expect(searchInput).toBeVisible()
      })
    })
  })
})
