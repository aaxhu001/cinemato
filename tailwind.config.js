/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          midnight: "#090D16",
          slate: "#0E1524",
          card: "#131B2C",
          input: "#182236",
          border: "#1E293B",
          gold: "#FFB800",
          "gold-light": "#FFE082",
          "gold-hover": "#E6A600",
          crimson: "#E50914",
          "crimson-glow": "#FF334B",
          emerald: "#10B981",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(255, 184, 0, 0.25)",
        "crimson-glow": "0 0 25px -5px rgba(229, 9, 20, 0.3)",
      },
    },
  },
  plugins: [],
};
