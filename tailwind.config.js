/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      orange: "#faba42",
      dark: "#252538",
      slate: "#343434",
      white: "#FFF",
      red: "#ff0033",
      gray: "#F5F5F5",
    },
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        widescreen: { raw: "(min-aspect-ratio: 3/2)" },
        // tallscreen: { raw: "(min-aspect-ratio: 1/2)" },
      },
      container: {
        center: true,
        padding: "2rem",
      },

      backgroundImage: {
        hero: "url('./img/hero.jpg')",
      },
    },
  },
  plugins: [],
};
