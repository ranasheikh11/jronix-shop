import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink-dark': '#9D174D', // Premium Maroonish-Pink
        'pink-light': '#FDF2F8', // Very Soft Pink
        'primary-pink': '#DB2777', // Vibrant Deep Pink
      }
    },
  },
  plugins: [],
};
