import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "extra-dark": "#0E1418",
        dark: "#151A22",
        "mid-dark": "#232A39",
        pink: "#E64188",
        "low-dark": "#38414E",
        orange: "#FB6C4F",
        yellow: "#FEBF28",
      },
    },
  },
  plugins: [],
};
export default config;
