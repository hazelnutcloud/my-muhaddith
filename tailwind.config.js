/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: "#606C38",
          blue: "#121B34",
          black: "#000814",
          white: "#F6FFF8",
        },
        secondary: {
          green: "#A3B18A",
          blue: "#124559",
        },
        highlight: "#FFC02C",
      },
    },
  },
  plugins: [],
};
