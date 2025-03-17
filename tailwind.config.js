/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f1fe',
          100: '#e2e4fd',
          200: '#c5c9fb',
          300: '#a7adf9',
          400: '#8a92f7',
          500: '#6d76f5',
          600: '#4F46E5', // Main primary color
          700: '#3f38b7',
          800: '#2f2a89',
          900: '#1f1c5b',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
