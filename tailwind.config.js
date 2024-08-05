/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  // media: true,
  theme: {
    extend: {
      colors: {
        // sky: {
        // sky
        //   50: "#f0f9ff",
        //   100: "#e0f2fe",
        //   200: "#bae6fd",
        //   300: "#7dd3fc",
        //   400: "#38bdf8",
        //   500: "#0ea5e9",
        //   600: "#0284c7",
        //   700: "#0369a1",
        //   800: "#075985",
        //   900: "#0c4a6e",
        //   950: "#082f49",
        // },
        sky: {
          // slate
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        // cyan: {
        // cyan
        //   50: "#ecfeff",
        //   100: "#cffafe",
        //   200: "#a5f3fc",
        //   300: "#67e8f9",
        //   400: "#22d3ee",
        //   500: "#06b6d4",
        //   600: "#0891b2",
        //   700: "#0e7490",
        //   800: "#155e75",
        //   900: "#164e63",
        //   950: "#083344",
        // },

        // white: "#0d121d",
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
