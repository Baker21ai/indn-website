import { test } from '@playwright/test'

test('Visual: Check circular logo appearance', async ({ page }) => {
  await page.goto('http://localhost:3002')

  // Wait for logo to load
  await page.waitForSelector('img[alt="Indigenous Nations Diversity Network"]')

  // Take screenshot of just the hero section
  const heroSection = page.locator('section').first()
  await heroSection.screenshot({
    path: 'test-results/logo-circle-current.png',
    animations: 'disabled'
  })

  console.log('Screenshot saved: test-results/logo-circle-current.png')
})
