/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: 'rgb(var(--accent-rgb))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  variants: {
    extend: {},
  },
  utilities: {
    '.glass': {
      'background': 'rgba(255, 255, 255, 0.05)',
      'backdrop-filter': 'blur(10px)',
      'border': '1px solid rgba(255, 255, 255, 0.1)',
    },
  },
} 