/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E5FFB8',
          100: '#D3FF85',
          200: '#C0FF52',
          300: '#AEFF1F',
          400: '#96EB00',
          500: '#76B900',
          600: '#558500'
        },

        background: {
          50: '#DBDCDC',
          100: '#C1C2C3',
          200: '#8C9091',
          300: '#5A5D5D',
          400: '#414344',
          500: '#28292A'
        }
      }
    },
  },
  plugins: [],
}