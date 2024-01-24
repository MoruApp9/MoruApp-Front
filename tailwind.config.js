/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'roboto-slab': ['Roboto Slab', 'serif'],
        'bree-serif': ['Bree Serif', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'purple-moru': "#561db2",
        'purple-moru-medium': '#391376',
        'purple-moru-dark': "#260d4f",
      },
      height: {
        'min1': '1px',
        '102': "450px",
        '100': "400px",
      },
      maxHeight: {
        '100': "400px"
      },
      width: {
        '102': "450px",
        '100': "400px",
        '105': "550px"
      },
    },
  },
  plugins: [],
}

