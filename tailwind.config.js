/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  // media: true,
  theme: {
    extend: {
      colors: {},
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
    screens: {
      sm: "540px",
      md: "840px",
      // => @media (min-width: 640px) { ... }

      xl: "1024px",
      // => @media (min-width: 1024px) { ... }

      xxl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
