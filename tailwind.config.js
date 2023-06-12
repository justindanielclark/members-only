/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        slideLeft: "slideLeft 1s ease-in-out",
        slideRight: "slideRight 1s linear",
      },
      keyframes: {
        slideLeft: {
          "0%": {
            transform: "translateX(0px)",
          },
          "100%": {
            transform: "translateX(-193px)",
          },
        },
        slideRight: {
          "0%": {
            transform: "translateY(0px)",
          },
          "100%": {
            transform: "translateX(193px)",
          },
        },
      },
      width: {
        poster: "185px",
      },
      maxWidth: {
        poster: "185px",
      },
      height: {
        poster: "278px",
      },
      maxHeight: {
        poster: "278px",
      },
    },
  },
  plugins: [],
};
