import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3002'

test.describe('Authentication Flow', () => {
  const testUser = {
    name: 'Test Volunteer',
    email: `test-${Date.now()}@example.com`,
    password: 'TestPassword123!',
    phone: '555-1234',
  }

  test('should register a new volunteer account', async ({ page }) => {
    // Navigate to registration page
    await page.goto(`${BASE_URL}/register`)
    await expect(page).toHaveTitle(/Join INDN|INDN/)

    // Check if we're on the registration page
    await expect(page.locator('text=Join INDN')).toBeVisible()

    // Fill out registration form
    await page.fill('input[name="name"]', testUser.name)
    await page.fill('input[type="email"]', testUser.email)
    await page.fill('input[name="phone"]', testUser.phone)

    // Fill password fields
    const passwordFields = page.locator('input[type="password"]')
    await passwordFields.nth(0).fill(testUser.password)
    await passwordFields.nth(1).fill(testUser.password)

    // Select volunteer role (click the label, not the hidden input)
    await page.click('label[for="volunteer"]')

    // Submit the form
    await page.click('button[type="submit"]')

    // Wait for success message
    await expect(page.locator('text=Registration Successful')).toBeVisible({ timeout: 10000 })

    // Should redirect to login page
    await page.waitForURL(`${BASE_URL}/login`, { timeout: 5000 })
  })

  test('should login with newly created account', async ({ page }) => {
    // First register the account
    await page.goto(`${BASE_URL}/register`)
    await page.fill('input[name="name"]', testUser.name)
    await page.fill('input[type="email"]', testUser.email)
    await page.fill('input[name="phone"]', testUser.phone)
    const passwordFields = page.locator('input[type="password"]')
    await passwordFields.nth(0).fill(testUser.password)
    await passwordFields.nth(1).fill(testUser.password)
    await page.click('label[for="volunteer"]')
    await page.click('button[type="submit"]')

    // Wait for redirect to login
    await page.waitForURL(`${BASE_URL}/login`, { timeout: 5000 })

    // Now test login
    await page.fill('input[type="email"]', testUser.email)
    await page.fill('input[type="password"]', testUser.password)
    await page.click('button[type="submit"]')

    // Should redirect to volunteer dashboard
    await page.waitForURL(`${BASE_URL}/portal/volunteer/dashboard`, { timeout: 10000 })

    // Check dashboard loaded correctly
    await expect(page.locator(`text=Welcome back, ${testUser.name}`)).toBeVisible({ timeout: 5000 })
  })

  test('should show volunteer dashboard stats', async ({ page }) => {
    // Register and login
    await page.goto(`${BASE_URL}/register`)
    await page.fill('input[name="name"]', testUser.name)
    await page.fill('input[type="email"]', testUser.email)
    await page.fill('input[name="phone"]', testUser.phone)
    const passwordFields = page.locator('input[type="password"]')
    await passwordFields.nth(0).fill(testUser.password)
    await passwordFields.nth(1).fill(testUser.password)
    await page.click('label[for="volunteer"]')
    await page.click('button[type="submit"]')
    await page.waitForURL(`${BASE_URL}/login`)
    await page.fill('input[type="email"]', testUser.email)
    await page.fill('input[type="password"]', testUser.password)
    await page.click('button[type="submit"]')
    await page.waitForURL(`${BASE_URL}/portal/volunteer/dashboard`)

    // Check stats cards are present
    await expect(page.locator('text=Hours Contributed')).toBeVisible()
    await expect(page.locator('text=Upcoming Events')).toBeVisible()
    await expect(page.locator('text=Member Since')).toBeVisible()

    // Check quick action cards
    await expect(page.locator('text=Browse Events')).toBeVisible()
    await expect(page.locator('text=My Profile')).toBeVisible()
    await expect(page.locator('text=All Announcements')).toBeVisible()
  })

  test('should prevent login with wrong password', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`)

    await page.fill('input[type="email"]', 'yamenmkbz@gmail.com')
    await page.fill('input[type="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')

    // Should show error message
    await expect(page.locator('text=Invalid email or password')).toBeVisible({ timeout: 5000 })

    // Should stay on login page
    await expect(page).toHaveURL(`${BASE_URL}/login`)
  })

  test('should prevent duplicate email registration', async ({ page }) => {
    const duplicateEmail = `duplicate-${Date.now()}@example.com`

    // Register first time
    await page.goto(`${BASE_URL}/register`)
    await page.fill('input[name="name"]', 'First User')
    await page.fill('input[type="email"]', duplicateEmail)
    const passwordFields1 = page.locator('input[type="password"]')
    await passwordFields1.nth(0).fill(testUser.password)
    await passwordFields1.nth(1).fill(testUser.password)
    await page.click('label[for="volunteer"]')
    await page.click('button[type="submit"]')
    await page.waitForURL(`${BASE_URL}/login`)

    // Try to register again with same email
    await page.goto(`${BASE_URL}/register`)
    await page.fill('input[name="name"]', 'Second User')
    await page.fill('input[type="email"]', duplicateEmail)
    const passwordFields2 = page.locator('input[type="password"]')
    await passwordFields2.nth(0).fill(testUser.password)
    await passwordFields2.nth(1).fill(testUser.password)
    await page.click('label[for="volunteer"]')
    await page.click('button[type="submit"]')

    // Should show error message
    await expect(page.locator('text=Email already registered')).toBeVisible({ timeout: 5000 })
  })

  test('admin should access admin dashboard', async ({ page }) => {
    // Login as admin
    await page.goto(`${BASE_URL}/login`)
    await page.fill('input[type="email"]', 'yamenmkbz@gmail.com')
    await page.fill('input[type="password"]', 'ch3ckm4t3***')
    await page.click('button[type="submit"]')

    // Should redirect to admin dashboard
    await page.waitForURL(`${BASE_URL}/portal/admin/dashboard`, { timeout: 10000 })

    // Check admin dashboard elements
    await expect(page.locator('text=Admin Dashboard')).toBeVisible()
    await expect(page.locator('text=Total Donations')).toBeVisible()
    await expect(page.locator('text=Total Donors')).toBeVisible()
    await expect(page.locator('text=Volunteers')).toBeVisible()
  })
})
