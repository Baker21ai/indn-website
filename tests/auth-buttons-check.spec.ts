import { test, expect } from '@playwright/test'

test.describe('Auth Buttons Investigation', () => {
  test('check Sign In button behavior', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.waitForLoadState('networkidle')

    // Take screenshot before clicking
    await page.screenshot({ path: 'test-results/before-signin-click.png' })

    // Listen for downloads
    const downloadPromise = page.waitForEvent('download', { timeout: 5000 }).catch(() => null)

    // Click Sign In button
    console.log('Clicking Sign In button...')
    await page.locator('header').getByRole('link', { name: 'Sign In' }).click()

    // Wait a moment
    await page.waitForTimeout(2000)

    // Check if download occurred
    const download = await downloadPromise
    if (download) {
      console.log('⚠️ DOWNLOAD DETECTED!')
      console.log('Filename:', await download.suggestedFilename())
      console.log('Download path:', await download.path())
    } else {
      console.log('✅ No download occurred')
    }

    // Check current URL
    console.log('Current URL:', page.url())

    // Take screenshot after clicking
    await page.screenshot({ path: 'test-results/after-signin-click.png' })

    // Check what's on the page
    const pageTitle = await page.title()
    console.log('Page title:', pageTitle)
  })

  test('check Sign Up button behavior', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.waitForLoadState('networkidle')

    // Listen for downloads
    const downloadPromise = page.waitForEvent('download', { timeout: 5000 }).catch(() => null)

    // Click Sign Up button
    console.log('Clicking Sign Up button...')
    await page.locator('header').getByRole('link', { name: 'Sign Up' }).click()

    // Wait a moment
    await page.waitForTimeout(2000)

    // Check if download occurred
    const download = await downloadPromise
    if (download) {
      console.log('⚠️ DOWNLOAD DETECTED!')
      console.log('Filename:', await download.suggestedFilename())
      console.log('Download path:', await download.path())
    } else {
      console.log('✅ No download occurred')
    }

    // Check current URL
    console.log('Current URL:', page.url())

    // Take screenshot after clicking
    await page.screenshot({ path: 'test-results/after-signup-click.png' })

    const pageTitle = await page.title()
    console.log('Page title:', pageTitle)
  })

  test('check what Sign In button href attribute is', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.waitForLoadState('networkidle')

    const signInButton = page.locator('header').getByRole('link', { name: 'Sign In' })
    const href = await signInButton.getAttribute('href')
    console.log('Sign In href attribute:', href)

    const signUpButton = page.locator('header').getByRole('link', { name: 'Sign Up' })
    const signUpHref = await signUpButton.getAttribute('href')
    console.log('Sign Up href attribute:', signUpHref)
  })
})
