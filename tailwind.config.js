/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'terminal-green': '#4ade80',
        'terminal-red': '#f87171',
        'terminal-blue': '#60a5fa',
        'rusty-900': '#1a1512',
        'rusty-800': '#2d241f',
        'rusty-700': '#42322a',
        'hud-bg': '#2d372b',
        'hud-border': '#495845'
      },
      fontFamily: {
        'mono': ['Courier New', 'Courier', 'monospace'],
        'caveat': ['Caveat', 'cursive']
      }
    },
  },
  plugins: [],
}
