/** @type {import('tailwindcss').Config} */

// Colours are CSS variables (see src/index.css) so every surface flows from one place.
const token = name => `rgb(var(--${name}) / <alpha-value>)`

export default {
  // `hover:` only applies on devices that can actually hover (no sticky taps on touch).
  future: { hoverOnlyWhenSupported: true },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: token('paper'),
        ink: token('ink'),
        night: token('night'),
        stone: token('stone'),
        muted: token('muted'),
        accent: token('accent'),
      },
      fontFamily: {
        // SF Pro on Apple devices (it can't be self-hosted, but every Apple device has it),
        // Inter everywhere else. system-ui is left out on purpose: on Windows and Android
        // it would pick Segoe UI or Roboto before reaching Inter.
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Inter Variable"', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', '"SF Mono"', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      // Apple-style type scale: weight, leading and tracking move together.
      // Large sizes get tight leading and negative tracking; small sizes open up.
      fontSize: {
        hero: ['clamp(3rem, 5.4vw, 5.75rem)', { lineHeight: '0.95', letterSpacing: '-0.045em', fontWeight: '600' }],
        huge: ['clamp(2.75rem, 7.5vw, 7rem)', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '600' }],
        big: ['clamp(2.25rem, 5.5vw, 5rem)', { lineHeight: '1.04', letterSpacing: '-0.035em', fontWeight: '600' }],
        title: ['clamp(1.75rem, 2.6vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.025em', fontWeight: '600' }],
        statement: ['clamp(1.5rem, 2.6vw, 2.35rem)', { lineHeight: '1.25', letterSpacing: '-0.022em', fontWeight: '500' }],
        lead: ['clamp(1.0625rem, 1.3vw, 1.3125rem)', { lineHeight: '1.45', letterSpacing: '-0.012em' }],
        label: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.06em', fontWeight: '500' }],
      },
      maxWidth: {
        page: '90rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
}
