/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte, js, svelte.js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: ['SpaceGrotesk', 'sans-serif'],
      },
      colors: {
        darkPurple: '#5C2DD5',
        mainPurple: '#7945FF',
        mainRed: '#FD6687',
        mainYellow: '#FFCE67',
      },
      gridTemplateColumns: {
        'rules-grid': '1fr 9fr'
      }
    },
  },
  plugins: [],
}

