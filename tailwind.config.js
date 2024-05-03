/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vologray: {
          100: '#EAECF5',
          200: '#A5A5A5', // text-color
          300: '#979797' // bg-color
        },
        voloblue: {
          100: '#0049FF',
          200: '#0025FF'
        }
      }
    }
  },
  plugins: []
}
