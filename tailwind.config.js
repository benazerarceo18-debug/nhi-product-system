/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1a1f36',
        nred: '#c0392b',
        gold: '#d4a843',
        light: '#f5f6fa',
      },
    },
  },
  plugins: [],
};
