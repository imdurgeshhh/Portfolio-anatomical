import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        albert: ['var(--font-albert)', 'sans-serif'],
        fragment: ['var(--font-fragment)', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
