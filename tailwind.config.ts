import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBF8F2",      // Warm White
        forest: "#1E3A2C",     // Forest Green
        pine: "#14291F",       // Deep pine (dark surfaces)
        sage: "#A7BCA1",       // Sage Green
        sagedeep: "#6E8A6B",
        gold: "#C2A14D",       // Warm Gold
        golddeep: "#A58433",
        charcoal: "#2A2A26",   // Charcoal
        mist: "#EDEAE1",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "72rem" },
      boxShadow: {
        soft: "0 6px 30px -8px rgba(30,58,44,0.14)",
        lift: "0 16px 50px -16px rgba(30,58,44,0.25)",
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};
export default config;
