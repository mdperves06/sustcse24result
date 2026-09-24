import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sust: {
          dark: "#064E3B",
          forest: "#0A5C36",
          light: "#E8F5E9",
          border: "#1E7E4B",
          gold: "#D97706",
          goldLight: "#FEF3C7",
          goldMuted: "#B45309",
        },
      },
    },
  },
  plugins: [],
};

export default config;
