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
        pulse: {
          bg: '#F1EEFF',            // Vibrant soft lavender/periwinkle
          surface: '#FFFFFF',       // Card surface white
          surfaceAlt: '#F9F7FF',    // Light lavender tint surface
          violet: '#5B3CC4',        // Deep violet brand accent
          violetDark: '#4426A5',
          violetLight: '#EDE8FF',
          turquoise: '#12B8B0',     // Electric turquoise (Positive)
          turquoiseLight: '#E2F8F7',
          coral: '#FF5C69',         // Vibrant coral (Negative)
          coralLight: '#FFE9EB',
          yellow: '#FFC857',        // Warm yellow (Neutral)
          yellowLight: '#FFF6DF',
          ink: '#24213A',           // Primary dark text
          muted: '#6F6A85',         // Muted secondary text
          border: '#E3DCFC',        // Soft lavender border
        }
      },
      boxShadow: {
        'card': '0 2px 10px -2px rgba(91, 60, 196, 0.06), 0 1px 3px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 24px -4px rgba(91, 60, 196, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
