/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'roboto-slab': ['Roboto Slab', 'serif'],
      },
      colors: {
        'purple-moru': "#280a50"
      }
    },
  },
  plugins: [],
}

