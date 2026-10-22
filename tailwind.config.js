/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FAF9F6",
          100: "#F7F6F2",
          200: "#EFECE6",
          300: "#E2E0D8",
          400: "#C9C6BD",
        },
        ink: {
          900: "#171717",
          800: "#262626",
          700: "#404040",
          600: "#525252",
          500: "#737373",
        },
        cobalt: {
          600: "#1e3a8a",
          700: "#1d4ed8",
          800: "#1e40af",
        },
        jade: {
          600: "#059669",
          700: "#047857",
        },
        amber: {
          500: "#f59e0b",
          600: "#d97706",
        }
      },
      fontFamily: {
        serif: ["Newsreader", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
