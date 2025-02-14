/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'valentine-pink': '#ff7eb9',
        'valentine-red': '#ff4d6d',
        'valentine-white': '#fff0f3',
      },
      fontFamily: {
        cute: ['"Indie Flower"', 'cursive'],
        love: ['"Love Light"', 'cursive'],
        charm: ['Charmonman', 'cursive'],
      },
    },
  },
  plugins: [],
}
