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

// import { colors } from './src/utils/colors.js'

// export default {
//   content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       colors: {
//         vologray: {
//           100: colors.customGray[100],
//           200: colors.customGray[200], // border-color
//           300: colors.customGray[300], // label-text-color
//           400: colors.customGray[400], // text-color
//           500: colors.customGray[500], // bg-color
//           600: colors.customGray[600], // bg-modal
//           700: colors.customGray[700], // table head text / magnifier icon
//           800: colors.customGray[800] // ButtonStandard
//         },
//         voloblue: {
//           100: colors.customBlue[100],
//           200: colors.customBlue[200]
//         }
//       }
//     }
//   },
//   plugins: []
// }
