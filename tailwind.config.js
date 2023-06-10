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
        slideLeft: "slideLeft 5s linear infinite",
        slideRight: "slideRight 5s linear infinite",
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
    },
  },
  plugins: [],
};
