import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#071F33',
        atlantic: '#0D3B55',
        ocean: '#165D7A',
        mist: '#B7CDD8',
        pearl: '#F5F2EB',
        champagne: '#B9A16B',
        'midnight-ocean': '#071F33',
        'deep-atlantic': '#0D3B55',
        'ocean-blue': '#165D7A',
        'blue-mist': '#B7CDD8',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.22em',
        luxury: '0.3em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
