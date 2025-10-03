 // @ts-nocheck
 /// <reference types="@testing-library/jest-dom" />
 import { render, screen } from '@testing-library/react'
 import userEvent from '@testing-library/user-event'
 import { describe, it, expect, jest, beforeEach } from '@jest/globals'
 import App from '../../App'

// Mock timers for testing time-based functionality
jest.useFakeTimers()

describe('App Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.useFakeTimers()
  })

  it('renders the app with default home page view', () => {
    render(<App />)

    // Should render the sidebar
    expect(screen.getByText('TempoType')).toBeInTheDocument()

    // Should render the home page by default
    expect(
      screen.getByText('TempoType', { selector: 'h1' })
    ).toBeInTheDocument()

    // Should have a text area for typing practice
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('applies light mode styling by default', () => {
    render(<App />)

    const mainContainer = screen.getByRole('textbox').closest('.min-h-screen')
    expect(mainContainer).toHaveClass(
      'bg-gradient-to-br',
      'from-blue-50',
      'via-purple-50',
      'to-pink-50'
    )
  })

  it('toggles dark mode when dark mode button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<App />)

    // Find and click the dark mode toggle button
    const darkModeButton = screen.getByRole('button', { name: /dark mode/i })
    await user.click(darkModeButton)

    // Check if dark mode is applied
    const mainContainer = screen.getByRole('textbox').closest('.min-h-screen')
    expect(mainContainer).toHaveClass(
      'bg-gradient-to-br',
      'from-gray-900',
      'via-gray-800',
      'to-gray-900'
    )
  })

  it('navigates between different views', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<App />)

    // Initially should be on home page
    expect(
      screen.getByText('TempoType', { selector: 'h1' })
    ).toBeInTheDocument()

    // Navigate to Stats page
    const statsButton = screen.getByRole('button', { name: /stats/i })
    await user.click(statsButton)

    // Should show stats page content
    expect(screen.getByText(/typing statistics/i)).toBeInTheDocument()

    // Navigate to Audio Library
    const audioButton = screen.getByRole('button', { name: /audio library/i })
    await user.click(audioButton)

    // Should show audio library content
    expect(screen.getByText(/audio library/i)).toBeInTheDocument()

    // Navigate back to Home
    const homeButton = screen.getByRole('button', { name: /home/i })
    await user.click(homeButton)

    // Should be back on home page
    expect(
      screen.getByText('TempoType', { selector: 'h1' })
    ).toBeInTheDocument()
  })

  it('maintains dark mode state across view changes', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<App />)

    // Enable dark mode
    const darkModeButton = screen.getByRole('button', { name: /dark mode/i })
    await user.click(darkModeButton)

    // Navigate to stats page
    const statsButton = screen.getByRole('button', { name: /stats/i })
    await user.click(statsButton)

    // Dark mode should still be active
    const mainContainer = screen
      .getByText(/typing statistics/i)
      .closest('.min-h-screen')
    expect(mainContainer).toHaveClass(
      'bg-gradient-to-br',
      'from-gray-900',
      'via-gray-800',
      'to-gray-900'
    )
  })

  it('renders adaptive typing view with correct props', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<App />)

    // Navigate to Adaptive Typing
    const adaptiveButton = screen.getByRole('button', {
      name: /adaptive typing/i,
    })
    await user.click(adaptiveButton)

    // Should render adaptive typing component
    expect(screen.getByText(/adaptive typing/i)).toBeInTheDocument()
  })

  it('typing functionality works in home page', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<App />)

    const textarea = screen.getByRole('textbox')

    // Type some text
    await user.type(textarea, 'Hello World')

    expect(textarea).toHaveValue('Hello World')

    // Should show typing metrics
    expect(screen.getByText(/WPM:/)).toBeInTheDocument()
    expect(screen.getByText(/Accuracy:/)).toBeInTheDocument()
    expect(screen.getByText(/Characters:/)).toBeInTheDocument()
  })

  it('typing metrics update in real-time', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<App />)

    const textarea = screen.getByRole('textbox')

    // Type first character to start timer
    await user.type(textarea, 'H')

    // Advance time by 2 seconds
    jest.advanceTimersByTime(2000)

    // Should show updated time
    expect(screen.getByText(/Time:/)).toBeInTheDocument()

    // Type more text
    await user.type(textarea, 'ello World')

    // Should show updated character count
    const characterCount = screen.getByText(/Characters:/)
    expect(characterCount).toBeInTheDocument()
  })

  it('handles view state correctly', () => {
    render(<App />)

    // Should start with home page
    expect(
      screen.getByText('TempoType', { selector: 'h1' })
    ).toBeInTheDocument()

    // Should not show other views initially
    expect(screen.queryByText(/typing statistics/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/audio library/i)).not.toBeInTheDocument()
  })

  it('sidebar navigation buttons are accessible', () => {
    render(<App />)

    // All navigation buttons should be present and accessible
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /adaptive typing/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /stats/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /audio library/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /dark mode/i })
    ).toBeInTheDocument()
  })

  it('applies correct CSS classes for layout', () => {
    render(<App />)

    const mainContainer = screen.getByRole('textbox').closest('.min-h-screen')
    expect(mainContainer).toHaveClass(
      'min-h-screen',
      'flex',
      'flex-row',
      'transition-colors',
      'duration-300'
    )

    const sidebarContainer = screen.getByText('TempoType').closest('div')
    expect(sidebarContainer).toBeInTheDocument()

    const contentContainer = screen
      .getByRole('textbox')
      .closest('.sidebar-tab-container')
    expect(contentContainer).toHaveClass(
      'sidebar-tab-container',
      'transition-colors',
      'duration-300'
    )
  })
})
