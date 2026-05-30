/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tell Tailwind which files to scan for class names
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom fonts imported in globals.css
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-display)", "serif"],
      },
      // Brand colors for Ramiorix
      colors: {
        brand: {
          50: "#f0f4ff",
          100: "#dde7ff",
          200: "#c2d2ff",
          300: "#9ab4ff",
          400: "#708bff",
          500: "#4a63f5",   // primary brand color
          600: "#3347d6",
          700: "#2836ad",
          800: "#252e8a",
          900: "#1e256b",
          950: "#12163d",
        },
        // Neutral slate palette for text and surfaces
        neutral: {
          50: "#f8f9fb",
          100: "#f1f3f7",
          200: "#e5e8ef",
          300: "#d0d5e0",
          400: "#9fa6ba",
          500: "#6b7590",
          600: "#4d5568",
          700: "#374154",
          800: "#1f2937",
          900: "#111827",
          950: "#080c14",
        },
      },
      // Smooth animation timing
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
