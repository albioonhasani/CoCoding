import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        brand: { 50: '#eff8ff', 500: '#2471e7', 600: '#155cc7', 700: '#124aa4' },
      },
      boxShadow: { card: '0 8px 30px rgba(23, 32, 51, 0.08)' },
    },
  },
  plugins: [],
} satisfies Config
