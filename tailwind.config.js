/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'roboto-slab': ['Roboto Slab', 'serif'],
      },
      colors: {
        'purple-moru': "#280a50",
        'purple-moru-dark': "#361365",
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

