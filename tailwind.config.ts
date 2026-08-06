import type { Config } from 'tailwindcss'

export default {
  // Scan both `app/` (Nuxt 4 source dir) and legacy `components/` paths
  // so classes are not purged if files move between directories.
  content: ['./app/**/*.{vue,ts,js}', './components/**/*.{vue,ts,js}'],

  // Toggled via `document.documentElement.classList` in useDarkMode,
  // not `prefers-color-scheme`, so learners can override system preference.
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Green palette aligned with Vue brand — used for primary actions and progress.
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Blue accent for links, badges, and secondary highlights — contrasts with primary green.
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        // Inter for Latin UI text; Noto Sans TC for Traditional Chinese lesson content.
        sans: ['Inter', 'Noto Sans TC', 'sans-serif'],
        // Fira Code for inline and block code in CodeBlock / LivePreview demos.
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
