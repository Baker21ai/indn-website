import { test } from '@playwright/test'

test('capture new icon designs', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.waitForLoadState('networkidle')

  // Scroll to Programs section and capture
  await page.evaluate(() => {
    document.querySelector('h2:has-text("How We Walk Together")')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
  await page.waitForTimeout(1000)
  await page.screenshot({
    path: 'test-results/programs-new-icons.png',
    fullPage: false
  })

  // Scroll to Sponsorship Tiers and capture
  await page.locator('header nav.hidden.lg\\:flex a:has-text("Become a Sponsor")').click()
  await page.waitForTimeout(1500)
  await page.locator('text=Sponsorship Tiers').scrollIntoView()
  await page.waitForTimeout(500)
  await page.screenshot({
    path: 'test-results/tiers-new-icons.png',
    fullPage: false
  })

  // Scroll to Join section and capture
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  })
  await page.waitForTimeout(1500)
  await page.screenshot({
    path: 'test-results/join-new-icons.png',
    fullPage: false
  })
})
