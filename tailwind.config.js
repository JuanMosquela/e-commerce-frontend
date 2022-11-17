/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
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
        padding: "7rem",
      },

      backgroundImage: {
        hero: "url('./img/hero.jpg')",
      },
    },
  },
  plugins: [],
};
