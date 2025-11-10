/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',      // Small mobile (iPhone SE, small Android)
        'sm': '640px',      // Mobile large / Phablet
        'md': '768px',      // Tablet portrait
        'lg': '1024px',     // Tablet landscape / Small laptop
        'xl': '1280px',     // Desktop
        '2xl': '1536px',    // Large desktop
      },
      fontFamily: {
        sans: [
          'var(--font-montserrat)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
