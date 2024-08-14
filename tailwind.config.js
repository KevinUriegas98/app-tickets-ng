/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#2D6174',
        primaryHover: '#3A7B8E',
        secondary: '#426E7B',
        danger: '#EF4444'
      },
    },
  },
  plugins: [],
}

