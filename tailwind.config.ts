/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Include the app directory for Next.js App Router
    './pages/**/*.{js,ts,jsx,tsx}', // Include pages if you're using Pages Router
    './components/**/*.{js,ts,jsx,tsx}', // Include components
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Add Inter font for consistency
      },
    },
  },
  plugins: [],
};