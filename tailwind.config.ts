import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('/assets/images/utb.webp')",
      },
      fontFamily: {
        'nunito': ["Nunito Sans", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: {
          50: "#E8F6FF",
          100: "#D5EDFF",
          200: "#B3DCFF",
          300: "#86C4FF",
          400: "#569BFF",
          500: "#3072FF",
          600: "#0D45FF",
          700: "#043BFE",
          800: "#0737D5",
          900: "#10359F",
          950: "#0A1D5C",
        },

        black: {
          50: "#F6F6F6",
          100: "#E7E7E7",
          200: "#D1D1D1",
          300: "#B0B0B0",
          400: "#888888",
          500: "#6D6D6D",
          600: "#5D5D5D",
          700: "#4D4D4D",
          800: "#454545",
          900: "#3D3D3D",
          950: "#262626",
        },

        white: {
          50: "#FFFFFF",
          100: "#EFEFEF",
          200: "#DCDCDC",
          300: "#BDBDBD",
          400: "#989898",
          500: "#7C7C7C",
          600: "#656565",
          700: "#525252",
          800: "#464646",
          900: "#3D3D3D",
          950: "#292929",
        },

        dark: {
          50: "#F5F7FA",
          100: "#EAEEF4",
          200: "#CFDAE8",
          300: "#A6BCD3",
          400: "#7598BB",
          500: "#547BA3",
          600: "#416288",
          700: "#364F6E",
          800: "#2F445D",
          900: "#2B3B4F",
          950: "#1B2431",
        },

        action: {
          success: "#00B69B",
          warning: "#FFA756",
          error: "#EF3826",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
