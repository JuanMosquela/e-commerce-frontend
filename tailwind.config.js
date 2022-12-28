/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      orange: "#FF7D1B",
      dark: "#1E1F27",
      slate: "#7C7B80",
      white: "#FFF",
      red: "#ff0033",
      gray: "#F5F5F5",
      text: "#808080",
      blue: "#98CAFB",
    },
    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
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
