/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      screens: {
         xs: "475px",
         ...defaultTheme.screens,
      },
      fontSize: {
         // "2xs": "0.625rem",
         "2xs": ["0.625rem", "0.75rem"],
         ...defaultTheme.fontSize,
      },
   },

   plugins: [require("@tailwindcss/line-clamp")],
   darkMode: "class",
};
