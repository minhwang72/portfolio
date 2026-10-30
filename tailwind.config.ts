import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', 'var(--font-noto)', 'system-ui', '-apple-system', 'sans-serif'],
      serif: ['var(--font-playfair)', 'serif'],
      mono: ['var(--font-jetbrains)', 'monospace'],
    },
    extend: {
      // 운영 콘솔 테마(2026-10 재구성)
      colors: {
        ink: '#0A0D0C',
        panel: '#101514',
        panel2: '#151B1A',
        line: '#1F2926',
        fg: '#E8EEEB',
        mute: '#93A39E',
        dim: '#5F6F6A',
        live: '#34D399',
        accent: '#2DD4BF',
        down: '#F87171',
      },
    },
  },
  plugins: [],
};

export default config;
