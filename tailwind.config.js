/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: "media", // ใช้ prefers-color-scheme: dark
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-blue": "#0ea5e9",
        "accent-darkblue": "#1e3a8a",
      },
      fontFamily: {
        sans: ["Geist Sans", "Arial", "Helvetica", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
