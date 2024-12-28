/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    darkMode: "class",
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: "#ffffff",
        yellow: {
          100: "#FBFBFE",
          200: "#FFFCF0",
          300: "#FFFAE5",
          400: "#FFF5CC",
          500: "#FFEB99",
          600: "#FFE066",
          700: "#FFD633",
          800: "#FFD11A",
        },
        gray: {
          100: "#FCFCFD",
          200: "#F7F7F8",
          300: "#F1F1F3",
          400: "#E4E4E7",
          500: "#CCCCCC",
          600: "#B3B3B3",
          700: "#98989A",
          800: "#7E7E81",
        },
        dark: {
          100: "#666666",
          200: "#595959",
          300: "#4D4D4D",
          400: "#404040",
          500: "#333333",
          600: "#262626",
          700: "#1A1A1A",
          800: "#141414",
        },
      },
    },
  },
  plugins: [],
};
