/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pokemon: {
          red: '#FF0000',
          blue: '#0075BE',
          yellow: '#FFDE00',
          electric: '#F7D02C',
          fire: '#F08030',
          water: '#6890F0',
          grass: '#78C850',
          psychic: '#F85888',
          fighting: '#C03028',
          dark: '#705848',
        }
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(255, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
