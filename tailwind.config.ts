import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#10121d",
        mist: "#eef2ff",
        cream: "#fff9ef",
        coral: "#ff7a59",
        teal: "#2a9d8f",
        gold: "#f4a261",
      },
      boxShadow: {
        panel: "0 10px 30px rgba(26, 26, 24, 0.04)",
      },
      fontFamily: {
        sans: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
