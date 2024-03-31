/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "available": "#34C90E",
        "waitlist": "#F5CD3E",
        "full": "#F66242",
        "dates-color": "#E78B53",
        "arrow": "#C0BFBF",
        "main-btn": "#FD9B6C",
        "main-light-orange": "#FFF3E3",
        "orange-form-bg": "#FFF4E5",
        "ticket-orange": "#FF8900"
      },
      colors: {
        "available": "#34C90E",
        "waitlist": "#F5CD3E",
        "full": "#F66242",
        "secondary-gray": "#A6A5A5",
        "heading1": "#A65C06",
        "main-btn-text": "#E54717",
        "main-form-text": "#BB3B3B",
        'custom-orange': '#E54717',
        'custom-yellow': '#F1AB3C',
        "ticket-orange": "#FF8900",
        "gray-checkout": "#6E6C6C",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #E54717, #F57A42 25%, #F1AB3C 50%, #FBD38D 75%)',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}