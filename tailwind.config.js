/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colores para el modo claro
        'light-bg': '#ffffff',
        'light-text': '#1a202c',
        'light-border': '#e2e8f0',
        'light-btn-bg': '#4299e1',
        'light-btn-hover': '#3182ce',

        // Colores para el modo oscuro
        'dark-bg': '#1a202c',
        'dark-text': '#f7fafc',
        'dark-border': '#2d3748',
        'dark-btn-bg': '#2b6cb0',
        'dark-btn-hover': '#2c5282',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
      borderColor: ['dark'],
    },
  },
  plugins: [],
}

