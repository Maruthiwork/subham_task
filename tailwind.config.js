/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1200px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      backgroundImage: {
        'drop-down-arrow': "url('/src/lib/assets/images/arrow-down.svg')",
      }
    }
  },
  plugins: []
};