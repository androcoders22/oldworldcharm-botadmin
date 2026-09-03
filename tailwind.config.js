/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#36abf7',
          500: '#0c90eb',
          600: '#0171c8',
          700: '#025aa2',
          800: '#064d85',
          900: '#0b406e',
          950: '#072949',
        },
        gold: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f4ebd8',
          300: '#ebd8b6',
          400: '#e0c08d',
          500: '#d4a86a',
          600: '#c59253',
          700: '#a47441',
          800: '#845c38',
          900: '#6c4b31',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
