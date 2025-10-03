/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom'

declare global {
  namespace jest {
    // Matchers signature uses two generics in @types/jest v30+.
    // Provide compatible augmentation for jest-dom matchers.
    interface Matchers<R, T = unknown> {
      toBeInTheDocument(): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveClass(...classNames: string[]): R
      toHaveStyle(style: string | Record<string, unknown>): R
      toHaveValue(value: string | string[] | number): R
      toBeDisabled(): R
      toBeEnabled(): R
      toHaveFocus(): R
      toBeVisible(): R
      toBeEmptyDOMElement(): R
      toContainElement(element: HTMLElement | null): R
      toContainHTML(htmlText: string): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toHaveFormValues(expectedValues: Record<string, unknown>): R
      toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R
      toBeChecked(): R
      toBePartiallyChecked(): R
      toHaveDescription(text?: string | RegExp): R
      toHaveAccessibleDescription(text?: string | RegExp): R
      toHaveAccessibleName(text?: string | RegExp): R
      toBeRequired(): R
      toBeInvalid(): R
      toBeValid(): R
    }
  }
}
