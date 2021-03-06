module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./component/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode:"class", //media
  plugins: [require("@tailwindcss/forms")],
};
