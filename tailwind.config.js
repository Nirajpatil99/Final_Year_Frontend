/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      accent: "#4527a0",
      white: "#fff",
      green: "#388e3c",
      red: "#b71c1c",
    },
    extend: {},
  },
  plugins: [],
};
