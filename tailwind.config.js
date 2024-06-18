/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#a7f3d0", // Light Mint Green
          DEFAULT: "#34d399", // Mint Green
          dark: "#065f46", // Dark Green
          main: "#dbeafe", // Light Sky Blue
        },
        secondary: {
          light: "#ffedd5", // Light Peach
          DEFAULT: "#fb923c", // Peach
          dark: "#c2410c", // Dark Orange
        },
        accent: {
          light: "#dbeafe", // Light Sky Blue
          DEFAULT: "#3b82f6", // Sky Blue
          dark: "#1e3a8a", // Dark Blue
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
