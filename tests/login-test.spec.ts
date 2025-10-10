import { test, expect } from '@playwright/test'

test.describe('Login Test', () => {
  test('should login as admin successfully', async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:3002/login')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Fill in login form
    await page.fill('input[type="email"]', 'admin@indn.org')
    await page.fill('input[type="password"]', 'ChangeMe123!')

    // Click sign in button
    await page.click('button[type="submit"]')

    // Wait for navigation
    await page.waitForURL(/\/portal/, { timeout: 10000 })

    // Verify we're on a portal page
    expect(page.url()).toContain('/portal')

    console.log('✅ Login successful! Redirected to:', page.url())
  })
})
