import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      rotate: {
        "x-180": "180deg",
        "y-180": "180deg",
      },
      perspective: {
        1000: "1000px", // Add perspective for depth effect
      },
    },
  },
  plugins: [],
} satisfies Config;
