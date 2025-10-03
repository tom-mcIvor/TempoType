import { test, expect } from '@playwright/test'

test.describe('TempoType E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load the homepage correctly', async ({ page }) => {
    // Check if the main title is visible
    await expect(page.getByText('TempoType').first()).toBeVisible()
    
    // Check if the typing area is present
    await expect(page.getByRole('textbox')).toBeVisible()
    
    // Check if sidebar navigation is present
    await expect(page.getByRole('button', { name: /home/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /adaptive typing/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /stats/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /audio library/i })).toBeVisible()
  })

  test('should allow typing in the text area', async ({ page }) => {
    const textArea = page.getByRole('textbox')
    
    // Type some text
    await textArea.fill('Hello World! This is a typing test.')
    
    // Verify the text was entered
    await expect(textArea).toHaveValue('Hello World! This is a typing test.')
    
    // Check if typing metrics are displayed
    await expect(page.getByText(/WPM:/)).toBeVisible()
    await expect(page.getByText(/Accuracy:/)).toBeVisible()
    await expect(page.getByText(/Characters:/)).toBeVisible()
    await expect(page.getByText(/Time:/)).toBeVisible()
  })

  test('should update typing metrics in real-time', async ({ page }) => {
    const textArea = page.getByRole('textbox')
    
    // Type first character
    await textArea.type('H')
    
    // Wait a moment for metrics to update
    await page.waitForTimeout(1000)
    
    // Check that metrics are showing
    await expect(page.getByText(/Characters: 1/)).toBeVisible()
    
    // Type more text
    await textArea.type('ello World')
    
    // Check updated character count
    await expect(page.getByText(/Characters: 11/)).toBeVisible()
  })

  test('should navigate between different views', async ({ page }) => {
    // Start on home page
    await expect(page.getByText('TempoType').first()).toBeVisible()
    
    // Navigate to Stats page
    await page.getByRole('button', { name: /stats/i }).click()
    await expect(page.getByText(/typing statistics/i)).toBeVisible()
    
    // Navigate to Audio Library
    await page.getByRole('button', { name: /audio library/i }).click()
    await expect(page.getByText(/audio library/i)).toBeVisible()
    
    // Navigate to Adaptive Typing
    await page.getByRole('button', { name: /adaptive typing/i }).click()
    await expect(page.getByText(/adaptive typing/i)).toBeVisible()
    
    // Navigate back to Home
    await page.getByRole('button', { name: /home/i }).click()
    await expect(page.getByText('TempoType').first()).toBeVisible()
    await expect(page.getByRole('textbox')).toBeVisible()
  })

  test('should toggle dark mode', async ({ page }) => {
    // Check initial light mode
    const body = page.locator('body')
    await expect(body).toBeVisible()
    
    // Click dark mode toggle
    await page.getByRole('button', { name: /dark mode/i }).click()
    
    // Wait for transition
    await page.waitForTimeout(500)
    
    // Check if dark mode classes are applied
    const mainContainer = page.locator('.min-h-screen').first()
    await expect(mainContainer).toHaveClass(/from-gray-900/)
    
    // Toggle back to light mode
    await page.getByRole('button', { name: /light mode/i }).click()
    
    // Wait for transition
    await page.waitForTimeout(500)
    
    // Check if light mode classes are applied
    await expect(mainContainer).toHaveClass(/from-blue-50/)
  })

  test('should maintain dark mode across navigation', async ({ page }) => {
    // Enable dark mode
    await page.getByRole('button', { name: /dark mode/i }).click()
    await page.waitForTimeout(500)
    
    // Navigate to stats page
    await page.getByRole('button', { name: /stats/i }).click()
    
    // Check that dark mode is still active
    const mainContainer = page.locator('.min-h-screen').first()
    await expect(mainContainer).toHaveClass(/from-gray-900/)
    
    // Navigate to audio library
    await page.getByRole('button', { name: /audio library/i }).click()
    
    // Dark mode should still be active
    await expect(mainContainer).toHaveClass(/from-gray-900/)
  })

  test('should clear typing metrics when text is cleared', async ({ page }) => {
    const textArea = page.getByRole('textbox')
    
    // Type some text
    await textArea.fill('Hello World')
    
    // Wait for metrics to update
    await page.waitForTimeout(1000)
    
    // Verify metrics are showing
    await expect(page.getByText(/Characters: 11/)).toBeVisible()
    
    // Clear the text
    await textArea.fill('')
    
    // Check that metrics are reset
    await expect(page.getByText(/Characters: 0/)).toBeVisible()
    await expect(page.getByText(/WPM: 0/)).toBeVisible()
    await expect(page.getByText(/Accuracy: 100%/)).toBeVisible()
  })

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 })
    await expect(page.getByRole('textbox')).toBeVisible()
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByRole('textbox')).toBeVisible()
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByRole('textbox')).toBeVisible()
  })

  test('should handle keyboard shortcuts and accessibility', async ({ page }) => {
    const textArea = page.getByRole('textbox')
    
    // Focus should be on text area when clicking it
    await textArea.click()
    await expect(textArea).toBeFocused()
    
    // Test keyboard navigation
    await page.keyboard.press('Tab')
    // Should be able to navigate with keyboard
    
    // Test typing with keyboard
    await textArea.focus()
    await page.keyboard.type('Testing keyboard input')
    await expect(textArea).toHaveValue('Testing keyboard input')
  })

  test('should display correct placeholder text', async ({ page }) => {
    const textArea = page.getByRole('textbox')
    
    // Check placeholder text
    await expect(textArea).toHaveAttribute('placeholder', 'Start typing here to practice...')
  })

  test('should handle long text input', async ({ page }) => {
    const textArea = page.getByRole('textbox')
    
    // Type a long text
    const longText = 'This is a very long text that should test the application\'s ability to handle extended typing sessions. '.repeat(10)
    
    await textArea.fill(longText)
    
    // Verify the text was entered
    await expect(textArea).toHaveValue(longText)
    
    // Check that metrics are still updating
    await expect(page.getByText(/Characters:/)).toBeVisible()
    await expect(page.getByText(/WPM:/)).toBeVisible()
  })

  test('should maintain state during rapid navigation', async ({ page }) => {
    const textArea = page.getByRole('textbox')
    
    // Type some text
    await textArea.fill('Test text')
    
    // Rapidly navigate between views
    await page.getByRole('button', { name: /stats/i }).click()
    await page.getByRole('button', { name: /home/i }).click()
    await page.getByRole('button', { name: /audio library/i }).click()
    await page.getByRole('button', { name: /home/i }).click()
    
    // Check that we're back on home page and can still type
    await expect(page.getByRole('textbox')).toBeVisible()
    await expect(page.getByRole('textbox')).toHaveValue('')
  })
})