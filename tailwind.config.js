/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "header-bg": "#292929",
        "inside-input": "#D6FFCC",
      },
    },
    fontFamily: {
      outfit: ["Outfit"],
      geo: ["Geo"],
    },
  },
  plugins: [],
};
