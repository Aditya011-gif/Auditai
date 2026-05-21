import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      boxShadow: {
        glow: "0 0 80px rgba(45, 212, 191, 0.18)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.36)"
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 20% 20%, rgba(45,212,191,.18), transparent 30%), radial-gradient(circle at 80% 10%, rgba(129,140,248,.16), transparent 32%), radial-gradient(circle at 50% 80%, rgba(244,114,182,.11), transparent 36%)"
      }
    }
  },
  plugins: [animate]
};

export default config;

