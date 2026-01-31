import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        slate: "#1f2937",
        muted: "#64748b",
        surface: "#f8fafc",
        accent: "#1d4ed8",
        accentSoft: "#dbeafe"
      },
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        body: ["IBM Plex Sans", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 12px 30px rgba(15, 23, 42, 0.12)",
        glow: "0 12px 30px rgba(29, 78, 216, 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
