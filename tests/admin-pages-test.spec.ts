import { test, expect } from '@playwright/test'

test.describe('Admin Pages Test', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('http://localhost:3002/login')
    await page.waitForLoadState('networkidle')

    await page.fill('input[type="email"]', 'admin@indn.org')
    await page.fill('input[type="password"]', 'ChangeMe123!')

    await page.click('button[type="submit"]')
    await page.waitForURL(/\/portal/, { timeout: 10000 })
  })

  test('should load admin dashboard without errors', async ({ page }) => {
    await page.goto('http://localhost:3002/portal/admin/dashboard')
    await page.waitForLoadState('networkidle')

    // Check for dashboard title
    await expect(page.locator('h1')).toContainText('Admin Dashboard')

    console.log('✅ Admin dashboard loaded successfully')
  })

  test('should load users page without errors', async ({ page }) => {
    await page.goto('http://localhost:3002/portal/admin/users')
    await page.waitForLoadState('networkidle')

    // Check for page title
    await expect(page.locator('h1')).toContainText('User Management')

    console.log('✅ Users page loaded successfully')
  })

  test('should load donors page without errors', async ({ page }) => {
    await page.goto('http://localhost:3002/portal/admin/donors')
    await page.waitForLoadState('networkidle')

    // Check for page title
    await expect(page.locator('h1')).toContainText('Manage Donors')

    console.log('✅ Donors page loaded successfully')
  })

  test('should load public donor wall without errors', async ({ page }) => {
    await page.goto('http://localhost:3002/donor-wall')
    await page.waitForLoadState('networkidle')

    // Check for page title
    await expect(page.locator('h1')).toContainText('Our Generous Supporters')

    console.log('✅ Donor wall page loaded successfully')
  })
})
