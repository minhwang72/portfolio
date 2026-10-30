import type { Config } from 'tailwindcss';

// 색은 globals.css 의 CSS 변수(RGB 세 숫자)로 정의해 라이트/다크를 한 번에 바꾼다
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },
    extend: {
      colors: {
        bg: v('bg'),
        surface: v('surface'),
        fg: v('fg'),
        sub: v('sub'),
        line: v('line'),
        accent: v('accent'),
        live: v('live'),
        down: v('down'),
      },
    },
  },
  plugins: [],
};

export default config;
