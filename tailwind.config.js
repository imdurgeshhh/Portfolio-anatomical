/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        geist: ['var(--font-geist-sans)', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'monospace'],
        albert: ['var(--font-geist-sans)', 'sans-serif'],
        fragment: ['var(--font-geist-mono)', 'monospace'],
      },
      transitionTimingFunction: {
        'out-spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
  plugins: [],
}
