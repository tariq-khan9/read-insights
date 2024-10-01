/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        barlow: ['Barlow', 'sans-serif'], 
        montserrat: ['Montserrat', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}