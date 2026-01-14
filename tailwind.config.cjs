/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        tenney: {
          bg: "var(--tenney-bg)",
          cyan: "var(--tenney-cyan)",
          blue: "var(--tenney-blue)",
          orange: "var(--tenney-orange)",
          amber: "var(--tenney-amber)",
          yellow: "var(--tenney-yellow)",
          line: "var(--tenney-line)",
        },
      },
      borderRadius: {
        card: "12px",
        button: "10px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
        softer: "0 24px 60px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};
