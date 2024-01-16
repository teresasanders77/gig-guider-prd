import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gg-blue": {
          50: "#E8F5FD",
          100: "#C6E3FA",
          200: "#A4D0F7",
          300: "#82BDF4",
          400: "#60AAF1",
          500: "#3E97EE",
          600: "#1C84EB",
          700: "#006FD4",
          800: "#0055A0",
          900: "#001c50",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
