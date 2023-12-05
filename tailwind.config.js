/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: {
          100: "#FFF",
          99: "#FBFFF0",
          97: "#F7F7F8",
          95: "#F1F1F3",
          90: "#E4E4E7",
        },
        black: "#000",
        secondary: {
          100: "#191919",
          150: "#1C1C1C",
          200: "#262626",
          300: "#4C4C4D",
          400: "#59595A",
          500: "#98989A",
          600: "#BFBFBF",
        },
        primary: {
          100: "#CAFF33",
          200: "#D1FF4C",
          300: "#D8FF66",
          400: "#E5FF99",
          450: "#F2FFCC",
          500: "#FBFFF0",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { transform: "translate(-100px, 0)" },
          "20%": { transform: "translate(-80px, 0)" },
          "40%": { transform: "translate(-60px, 0)" },
          "60%": { transform: "translate(-40px, 0)" },
          "80%": { transform: "translate(-20px, 0)" },
          "100%": { transform: "translate(0px, 0)" },
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.7s linear",
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
      },
    },
  },
  plugins: [],
};
