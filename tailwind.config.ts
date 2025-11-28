import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './entities/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './widgets/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        'noto-thai': ['var(--font-noto-thai)'],
        sans: ['var(--font-pretendard)', 'var(--font-noto-thai)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-pulse': 'fadePulse 0.9s ease-in-out infinite',
      },
      keyframes: {
        fadePulse: {
          '0%': { opacity: '0' },
          '10%': { opacity: '0.5' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '90%': { opacity: '0.5' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
