import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        e3blue: '#2B8CFF',
        e5orange: '#FF7A1C',
        ink: '#0B0E14',
        paper: '#F6F3EE'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(43, 140, 255, 0.35)'
      }
    },
  },
  plugins: [],
} satisfies Config;
