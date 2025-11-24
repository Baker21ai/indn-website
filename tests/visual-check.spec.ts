import { test } from '@playwright/test'

test('capture updated logo designs', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.waitForLoadState('networkidle')

  // Capture hero section with new gray rounded logo container
  await page.screenshot({
    path: 'test-results/hero-new-logo-design.png',
    fullPage: false
  })

  // Capture just the header with new Indigenous Nations / Diversity Network text
  await page.locator('header').screenshot({
    path: 'test-results/header-new-logo-text.png'
  })
})
