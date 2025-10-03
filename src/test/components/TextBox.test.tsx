/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from '@jest/globals'
import TextBox from '../../components/TextBox'

// Mock timers for testing time-based functionality
jest.useFakeTimers()

describe('TextBox Component', () => {
  const mockOnMetricsChange = jest.fn() as jest.MockedFunction<
    (metrics: any) => void
  >
  const mockOnTextChange = jest.fn() as jest.MockedFunction<
    (text: string) => void
  >

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.useFakeTimers()
  })

  it('renders with default props', () => {
    render(<TextBox />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute(
      'placeholder',
      'Start typing here to practice...'
    )
    expect(textarea).not.toBeDisabled()
  })

  it('renders with custom placeholder', () => {
    const customPlaceholder = 'Custom placeholder text'
    render(<TextBox placeholder={customPlaceholder} />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('placeholder', customPlaceholder)
  })

  it('applies dark mode styling', () => {
    render(<TextBox isDarkMode={true} />)

    const typingArea = screen.getByRole('textbox').parentElement
    expect(typingArea).toHaveClass('bg-gray-800/90')

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('text-gray-100', 'placeholder-gray-400')
  })

  it('applies light mode styling', () => {
    render(<TextBox isDarkMode={false} />)

    const typingArea = screen.getByRole('textbox').parentElement
    expect(typingArea).toHaveClass('bg-white/90')

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('text-gray-900', 'placeholder-gray-500')
  })

  it('can be disabled', () => {
    render(<TextBox disabled={true} />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
  })

  it('handles text input correctly', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<TextBox onTextChange={mockOnTextChange} />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Hello World')

    expect(mockOnTextChange).toHaveBeenCalledWith('Hello World')
    expect(textarea).toHaveValue('Hello World')
  })

  it('starts timer on first character and calculates metrics', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<TextBox onMetricsChange={mockOnMetricsChange} />)

    const textarea = screen.getByRole('textbox')

    // Type first character
    await user.type(textarea, 'H')

    // Advance time by 1 second
    jest.advanceTimersByTime(1000)

    expect(mockOnMetricsChange).toHaveBeenCalled()
    const lastCall = mockOnMetricsChange.mock.calls[
      mockOnMetricsChange.mock.calls.length - 1
    ][0] as any
    expect(lastCall).toMatchObject({
      charactersTyped: 1,
      wordsTyped: 1,
      timeElapsed: expect.any(Number),
      wpm: expect.any(Number),
      accuracy: 100,
      errorsCount: 0,
    })
  })

  it('calculates WPM correctly', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<TextBox onMetricsChange={mockOnMetricsChange} />)

    const textarea = screen.getByRole('textbox')

    // Type multiple words
    await user.type(textarea, 'Hello world test')

    // Advance time by 60 seconds (1 minute)
    jest.advanceTimersByTime(60000)

    expect(mockOnMetricsChange).toHaveBeenCalled()
    const lastCall = mockOnMetricsChange.mock.calls[
      mockOnMetricsChange.mock.calls.length - 1
    ][0] as any
    expect(lastCall.wordsTyped).toBe(3)
    expect(lastCall.wpm).toBeGreaterThan(0)
  })

  it('calculates accuracy with target text', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const targetText = 'Hello world'
    render(
      <TextBox targetText={targetText} onMetricsChange={mockOnMetricsChange} />
    )

    const textarea = screen.getByRole('textbox')

    // Type correct text
    await user.type(textarea, 'Hello')

    expect(mockOnMetricsChange).toHaveBeenCalled()
    const lastCall = mockOnMetricsChange.mock.calls[
      mockOnMetricsChange.mock.calls.length - 1
    ][0] as any
    expect(lastCall.accuracy).toBe(100)
    expect(lastCall.errorsCount).toBe(0)
  })

  it('calculates accuracy with errors', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const targetText = 'Hello world'
    render(
      <TextBox targetText={targetText} onMetricsChange={mockOnMetricsChange} />
    )

    const textarea = screen.getByRole('textbox')

    // Type incorrect text
    await user.type(textarea, 'Hxllo')

    expect(mockOnMetricsChange).toHaveBeenCalled()
    const lastCall = mockOnMetricsChange.mock.calls[
      mockOnMetricsChange.mock.calls.length - 1
    ][0] as any
    expect(lastCall.accuracy).toBeLessThan(100)
    expect(lastCall.errorsCount).toBeGreaterThan(0)
  })

  it('resets metrics when text is cleared', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<TextBox onMetricsChange={mockOnMetricsChange} />)

    const textarea = screen.getByRole('textbox')

    // Type some text
    await user.type(textarea, 'Hello')

    // Clear the text
    await user.clear(textarea)

    expect(mockOnMetricsChange).toHaveBeenCalledWith({
      wpm: 0,
      accuracy: 100,
      charactersTyped: 0,
      wordsTyped: 0,
      timeElapsed: 0,
      errorsCount: 0,
    })
  })

  it('updates metrics every second while typing', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<TextBox onMetricsChange={mockOnMetricsChange} />)

    const textarea = screen.getByRole('textbox')

    // Type first character to start timer
    await user.type(textarea, 'H')

    const initialCallCount = mockOnMetricsChange.mock.calls.length

    // Advance time by 3 seconds
    jest.advanceTimersByTime(3000)

    // Should have been called at least 3 more times (once per second)
    expect(mockOnMetricsChange.mock.calls.length).toBeGreaterThan(
      initialCallCount + 2
    )
  })

  it('applies custom className', () => {
    const customClass = 'custom-textbox-class'
    render(<TextBox className={customClass} />)

    const container = screen.getByRole('textbox').closest('div')
    expect(container).toHaveClass(customClass)
  })

  it('applies custom maxHeight', () => {
    const customHeight = '300px'
    render(<TextBox maxHeight={customHeight} />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveStyle({ maxHeight: customHeight })
  })

  it('has correct textarea attributes', () => {
    render(<TextBox />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('spellCheck', 'false')
    expect(textarea).toHaveAttribute('autoComplete', 'off')
    expect(textarea).toHaveAttribute('autoCorrect', 'off')
    expect(textarea).toHaveAttribute('autoCapitalize', 'off')
  })

  it('cleans up interval on unmount', () => {
    const { unmount } = render(
      <TextBox onMetricsChange={mockOnMetricsChange} />
    )

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Hello' } })

    // Unmount component
    unmount()

    // Advance time - no more calls should be made
    const callCountBeforeUnmount = mockOnMetricsChange.mock.calls.length
    jest.advanceTimersByTime(5000)

    expect(mockOnMetricsChange.mock.calls.length).toBe(callCountBeforeUnmount)
  })
})
