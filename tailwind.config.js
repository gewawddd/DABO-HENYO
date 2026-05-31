
export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        teamA: {
          DEFAULT: '#2563eb',
          light: '#60a5fa',
          dark: '#1d4ed8',
        },
        teamB: {
          DEFAULT: '#e11d48',
          light: '#fb7185',
          dark: '#be123c',
        },
        accent: {
          DEFAULT: '#facc15',
          dark: '#eab308',
        },
        ink: '#0a1742',
      },
      fontFamily: {
        display: ['"Lilita One"', 'system-ui', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
