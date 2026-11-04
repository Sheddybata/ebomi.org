import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F6F1E8',
        ink: '#1C1917',
        muted: '#57534E',
        navy: {
          DEFAULT: '#DC2626',
          light: '#EF4444',
          dark: '#B91C1C',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C158',
          dark: '#B8941F',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
        arabic: ['var(--font-arabic)', 'var(--font-sans)', 'sans-serif'],
        hebrew: ['var(--font-hebrew)', 'var(--font-sans)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config

