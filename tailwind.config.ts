import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0b0c12",
          800: "#111320",
          700: "#1a1d2d",
        },
        mint: {
          400: "#7ef5c7",
          300: "#a0ffd9",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(126, 245, 199, 0.25)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
