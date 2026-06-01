/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable class-based dark mode (controlled by next-themes)
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        // Plus Jakarta Sans — our new premium body font
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        // DM Serif Display — for headings
        display: ["DM Serif Display", "Georgia", "serif"],
        mono: ["ui-monospace", "monospace"],
      },
      colors: {
        brand: {
          50:  "#f0f3ff",
          100: "#e0e7ff",
          200: "#c4ceff",
          300: "#a5b4ff",
          400: "#818cff",
          500: "#4a63f5",  // primary brand
          600: "#3a4fd6",
          700: "#2c3bab",
          800: "#1e2880",
          900: "#141a55",
          950: "#0a0e2e",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};