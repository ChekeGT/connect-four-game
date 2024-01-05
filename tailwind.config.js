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
    },
  },
  plugins: [],
}

