import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#00eeff",
        "secondary": "#d946ef",
        "background-light": "#f5f8f8",
        "background-dark": "#0f2223",
      },
      fontFamily: {
        "display": ["Outfit", "sans-serif"],
        "sans": ["Outfit", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(circle at 50% 0%, #2e1065 0%, #0f2223 50%, #000000 100%)',
      },
      animation: {
        'neon-pulse': 'neon-pulse 3s infinite ease-in-out',
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 10s ease-in-out infinite 2s',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(0, 238, 255, 0.2), inset 0 0 5px rgba(0, 238, 255, 0.1)', 
            borderColor: 'rgba(0, 238, 255, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 25px rgba(0, 238, 255, 0.4), inset 0 0 10px rgba(0, 238, 255, 0.1)', 
            borderColor: 'rgba(0, 238, 255, 0.8)' 
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
