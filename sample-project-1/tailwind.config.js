/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         xs: "475px",
         ...defaultTheme,
      },
   },
   plugins: [],
   darkMode: "class",
};
