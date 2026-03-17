/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'system-ui', 'sans-serif'],
        jp: ['Noto Sans JP', 'sans-serif'],
      },
      colors: {
        navy: '#1a1f36',
        nred: '#c0392b',
        gold: '#d4a843',
        light: '#f5f6fa',
        // Brand-specific colors
        kazu: {
          green: '#4a7c59',
          cream: '#f5f0e8',
          dark: '#2d3a2f',
        },
        mendo: {
          red: '#8b2500',
          charcoal: '#2d2d2d',
          warm: '#f7f2ed',
        },
        yusho: {
          brown: '#5c3a1e',
          amber: '#c8952e',
          warm: '#faf5ef',
        },
        kazn: {
          red: '#8b0000',
          gold: '#c5a059',
          slate: '#334155',
        },
        maru: {
          charcoal: '#3d3d3d',
          gray: '#666666',
          light: '#f5f5f5',
        },
        ftruck: {
          brown: '#92610a',
          amber: '#c8952e',
          cream: '#fdf8f0',
        },
      },
    },
  },
  plugins: [],
};
