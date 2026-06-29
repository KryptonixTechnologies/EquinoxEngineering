/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        graphite: "#172026",
        lagoon: "#0f766e",
        mineral: "#e8f4f1",
        copper: "#b76e35",
      },
    },
  },
  plugins: [],
};
