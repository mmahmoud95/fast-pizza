/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: { sans: "Roboto Mono, monospace" },
    extend: {
      colors: { pizza: "#ddd" },
      height: {
        screen: "100dvh",//dvh for mobile
      },
    },
  },
  plugins: [],
};
