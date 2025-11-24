import { test } from '@playwright/test'

test('demonstrate smooth scroll navigation', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.waitForLoadState('networkidle')

  // Take screenshot of hero/home section
  await page.screenshot({
    path: 'test-results/01-home-hero.png',
    fullPage: false
  })

  // Scroll to Board section
  await page.locator('header nav.hidden.lg\\:flex a:has-text("Board")').click()
  await page.waitForTimeout(1500)
  await page.screenshot({
    path: 'test-results/02-board-section.png',
    fullPage: false
  })

  // Scroll to Events section
  await page.locator('header nav.hidden.lg\\:flex a:has-text("Events")').click()
  await page.waitForTimeout(1500)
  await page.screenshot({
    path: 'test-results/03-events-section.png',
    fullPage: false
  })

  // Scroll to Sponsors section
  await page.locator('header nav.hidden.lg\\:flex a:has-text("Sponsors")').click()
  await page.waitForTimeout(1500)
  await page.screenshot({
    path: 'test-results/04-sponsors-section.png',
    fullPage: false
  })

  // Scroll to Become a Sponsor section
  await page.locator('header nav.hidden.lg\\:flex a:has-text("Become a Sponsor")').click()
  await page.waitForTimeout(1500)
  await page.screenshot({
    path: 'test-results/05-become-sponsor-section.png',
    fullPage: false
  })

  // Scroll back to top via logo
  await page.locator('header a[href="/"]').first().click()
  await page.waitForTimeout(1500)
  await page.screenshot({
    path: 'test-results/06-back-to-home.png',
    fullPage: false
  })

  // Show navigation highlighting
  await page.locator('header nav.hidden.lg\\:flex a:has-text("Board")').click()
  await page.waitForTimeout(1000)
  await page.locator('header nav.hidden.lg\\:flex').screenshot({
    path: 'test-results/07-nav-active-board.png'
  })
})
