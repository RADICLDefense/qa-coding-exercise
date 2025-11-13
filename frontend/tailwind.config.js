/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'burnt-orange': {
          DEFAULT: '#FF6B35',
          light: '#FF8A5C',
          dark: '#E55A25',
        },
        'sky-blue': {
          DEFAULT: '#4A90E2',
          light: '#6FA8E8',
          dark: '#3A7AC8',
        },
        'deep-purple': {
          DEFAULT: '#9B51E0',
          light: '#B574E8',
          dark: '#7D3CB8',
        },
        'bright-yellow': {
          DEFAULT: '#FFB547',
          light: '#FFC66E',
          dark: '#E59F30',
        },
        'vibrant-pink': {
          DEFAULT: '#EB5E9C',
          light: '#F081B3',
          dark: '#D24882',
        },
        'dark-grey': {
          900: '#1A1A1D',
          800: '#2E2E32',
          700: '#3A3A40',
          600: '#4A4A50',
          500: '#5A5A60',
          400: '#6A6A70',
          300: '#8A8A90',
        },
        // Cybersecurity severity colors
        'severity-critical': {
          DEFAULT: '#ef4444', // red-500
          light: '#f87171',   // red-400
          dark: '#dc2626',    // red-600
        },
        'severity-high': {
          DEFAULT: '#f97316', // orange-500
          light: '#fb923c',   // orange-400
          dark: '#ea580c',    // orange-600
        },
        'severity-medium': {
          DEFAULT: '#eab308', // yellow-500
          light: '#fbbf24',   // yellow-400
          dark: '#ca8a04',    // yellow-600
        },
        'severity-low': {
          DEFAULT: '#3b82f6', // blue-500
          light: '#60a5fa',   // blue-400
          dark: '#2563eb',    // blue-600
        },
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

