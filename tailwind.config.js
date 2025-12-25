/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
      theme: {
        screens: {
          sm: "640px",
          md: "768px", // iPad portrait
          ipad: "820px", // iPad Air / Pro
          lg: "1024px", // iPad landscape
          xl: "1280px",
        },
      },
    },
  },
  plugins: [],
};
