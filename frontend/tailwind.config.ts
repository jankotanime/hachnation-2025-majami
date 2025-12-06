import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgba(161, 51, 51, 1)",
        "on-primary": "#ffffff",
        secondary: "#000000",
        "on-secondary": "#ffffff",
        background: "#fcf0f0ff",
        "background-nav": "#ffffff",
        "on-background": "#000000",
        surface: "#f7f9fa",
        "on-surface": "#000000",
        error: "#B00020",
        "on-error": "#ffffff",
        "accent-red-50": "#ffe5e5",
        "accent-red-100": "#ffb3b3",
        "accent-red-200": "#ff8080",
        "accent-red-300": "#ff4d4d",
        "accent-red-400": "#ff1a1a",
        "accent-red-500": "#e60000",
      },
    },
  },
  plugins: [],
};

const darkColors = {
  primary: "rgba(161, 51, 51, 1)",
  "on-primary": "#000000",
  secondary: "#ffffff",
  "on-secondary": "#000000",
  background: "#232323ff",
  "background-nav": "#1c1c1cff",
  "on-background": "#ffffff",
  surface: "#171717ff",
  "on-surface": "#ffffff",
  error: "#CF6679",
  "on-error": "#ffffff",
  "accent-red-50": "#330000",
  "accent-red-100": "#660000",
  "accent-red-200": "#990000",
  "accent-red-300": "#CC0000",
  "accent-red-400": "#E60000",
  "accent-red-500": "#FF1A1A",
};

export default config;
