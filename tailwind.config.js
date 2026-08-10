/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          maroon: "#5c0617",
          deepMaroon: "#3b020c",
          royalRed: "#8b0000",
          gold: "#d4af37",
          goldLight: "#f3e5ab",
          goldDark: "#997b19",
          cream: "#fbf8f2",
          parchment: "#f5eee6",
          sand: "#eaddcf",
          emerald: "#1b4332",
          haldiYellow: "#f59e0b",
          mehndiGreen: "#2d6a4f",
          sangeetPurple: "#6b21a8"
        }
      },
      fontFamily: {
        poppins: ['"Poppins"', 'ui-sans-serif', 'system-ui'],
        montserrat: ['"Montserrat"', 'ui-sans-serif', 'system-ui'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel Decorative"', '"Cinzel"', 'serif'],
        greatvibes: ['"Great Vibes"', 'cursive'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', '"Inter"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
