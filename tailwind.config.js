/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/sharedComponents/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        slideLeft: "slideLeft 1s ease-in-out",
        slideRight: "slideRight 1s ease-in-out",
        movieMenuCardUp: "movieCardUp 3s linear",
        movieMenuCardDown: "movieCardDown 3s linear",
        headerMenuUp: "headerMenuUp .15s linear",
        headerMenuDown: "headerMenuDown .15s linear",
      },
      keyframes: {
        movieMenuCardUp: {
          "0%": {
            top: "100%",
          },
          "100%": {
            top: "0%",
          },
        },
        movieMenuCardDown: {
          "0%": {
            top: "0%",
          },
          "100%": {
            top: "100%",
          },
        },
        headerMenuDown: {
          "0%": {
            transform: "translateY(0%)",
          },
          "100%": {
            transform: "translateY(100%)",
          },
        },
        headerMenuUp: {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
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
        smPoster: "93px",
        profile: "185px",
        smProfile: "45px",
      },
      maxWidth: {
        poster: "185px",
        smPoster: "93px",
        profile: "185px",
        smProfile: "45px",
      },
      height: {
        poster: "278px",
        smPoster: "139px",
        profile: "278px",
        smProfile: "68px",
      },
      maxHeight: {
        poster: "278px",
        smPoster: "139px",
        profile: "278px",
        smProfile: "68px",
      },
    },
  },
  plugins: [],
};
