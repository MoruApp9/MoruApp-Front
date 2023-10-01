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
        'purple-moru-dark': "#1F0638",
      },
      height: {
        '102': "450px"
      },
    },
  },
  plugins: [],
}

