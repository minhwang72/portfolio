import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        text: {
          DEFAULT: 'var(--text-color)',
          light: 'var(--text-color)',
          dark: 'var(--text-color)',
        },
        background: {
          DEFAULT: 'var(--background-color)',
          light: 'var(--background-color)',
          dark: 'var(--background-color)',
        },
      },
    },
  },
  plugins: [],
};

export default config; 