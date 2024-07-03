/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vologray: {
          100: '#EAECF5',
          200: '#EAEAEA', // border-color
          300: '#B5B5B5', // label-text-color
          400: '#A5A5A5', // text-color
          500: '#979797', // bg-color
          600: '#7B7F8E', // bg-modal
          700: '#8C97AF', // table head text / magnifier icon
          800: '#6E6E6E' // ButtonStandard
        },
        voloblue: {
          100: '#0049FF',
          200: '#0025FF'
        },
        voloyellow: {
          100: '#FCD12E'
        }
      }
    }
  },
  plugins: []
}
