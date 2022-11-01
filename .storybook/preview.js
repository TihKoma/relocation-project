import { ThemeProvider } from '@emotion/react'
import 'modern-normalize/modern-normalize.css'
import '../src/styles/globals.css'
import { LightTheme } from '../src/styles/themes'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={LightTheme}>
      <Story />
    </ThemeProvider>
  ),
]
