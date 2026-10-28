/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        sage: {
          bg: '#EEF3EE',
          surface: '#F7F8F2',
          sidebar: '#DCE7DF',
          border: '#D8E2D9',
          borderSubtle: '#E4ECE5',
          hover: '#E8F0EA',
          faint: '#E2EBE4',
        },
        brand: {
          primary: '#176B5B',
          light: '#DCEDE6',
          dark: '#0E4B3F',
          hover: '#13594B',
        },
        ink: {
          main: '#26332F',
          muted: '#68756F',
          faint: '#8E9C95',
          border: '#D8E2D9',
        },
        sentiment: {
          pos: '#1F9D72',
          neg: '#D95757',
          neu: '#7A8793',
        }
      }
    },
  },
  plugins: [],
}
