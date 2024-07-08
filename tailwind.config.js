/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './src/**/*.css'
  ],
  theme: {
    extend: {
      colors: {
        darkblue: '#1A365D',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif']
      },
    },
  },
}
