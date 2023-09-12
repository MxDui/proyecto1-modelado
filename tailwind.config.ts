import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "#f2f7f5",
        headline: "#00473e",
        paragraph: "#475d5b",
        button: "#faae2b",
        "button-text": "#00473e",
        "illustration-stroke": "#00332c",
        "illustration-main": "#f2f7f5",
        "illustration-highlight": "#faae2b",
        "illustration-secondary": "#ffa8ba",
        "illustration-tertiary": "#fa5246",
      },
    },
  },

  plugins: [],
};
export default config;
