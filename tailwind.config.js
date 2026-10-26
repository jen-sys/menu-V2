/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { burgundy: { DEFAULT: '#6B1D2A', deep: '#4A121D' }, charcoal: '#1A1A1A', gold: { DEFAULT: '#D4A24C', soft: '#E8D5B7' }, cream: '#FAF6F0', ink: '#2B2B2B' },
    fontFamily: { serif: ['"Playfair Display"', 'Georgia', 'serif'], sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
    boxShadow: { soft: '0 10px 30px -12px rgba(107,29,42,.25)' }
  } },
  plugins: []
}
