import { test, expect } from '@playwright/test'

test.describe('Sign In and Sign Up Buttons', () => {
  test('Sign In button should navigate to login page', async ({ page, context }) => {
    // Monitor downloads
    let downloadDetected = false
    page.on('download', () => {
      downloadDetected = true
      console.log('⚠️ DOWNLOAD DETECTED ON SIGN IN!')
    })

    await page.goto('http://localhost:3000/')
    await page.waitForLoadState('networkidle')

    console.log('📍 Starting URL:', page.url())

    // Take screenshot before
    await page.screenshot({ path: 'test-results/homepage-signin-button.png' })

    // Click Sign In
    await page.getByRole('link', { name: 'Sign In', exact: true }).first().click()
    await page.waitForLoadState('networkidle')

    console.log('📍 After Sign In click:', page.url())
    console.log('📥 Download detected:', downloadDetected)

    // Take screenshot after
    await page.screenshot({ path: 'test-results/after-signin-navigation.png' })

    // Verify we're on login page
    expect(page.url()).toContain('/login')
    await expect(page.getByRole('heading', { name: /Welcome to INDN/i })).toBeVisible()

    // Should NOT have triggered download
    expect(downloadDetected).toBe(false)
  })

  test('Sign Up button should navigate to register page', async ({ page }) => {
    // Monitor downloads
    let downloadDetected = false
    page.on('download', () => {
      downloadDetected = true
      console.log('⚠️ DOWNLOAD DETECTED ON SIGN UP!')
    })

    await page.goto('http://localhost:3000/')
    await page.waitForLoadState('networkidle')

    console.log('📍 Starting URL:', page.url())

    // Click Sign Up
    await page.getByRole('link', { name: 'Sign Up', exact: true }).first().click()
    await page.waitForLoadState('networkidle')

    console.log('📍 After Sign Up click:', page.url())
    console.log('📥 Download detected:', downloadDetected)

    // Take screenshot after
    await page.screenshot({ path: 'test-results/after-signup-navigation.png' })

    // Verify we're on register page
    expect(page.url()).toContain('/register')

    // Should NOT have triggered download
    expect(downloadDetected).toBe(false)
  })
})
