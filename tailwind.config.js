/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#f49b33", // PRIMARY
        secondary: "#2b2b2b", // SECONDARY
        light: {
          text: "#11181C",
          background: "#ffffff",
          tint: "#0a7ea4",
          icon: "#687076",
          tabIconDefault: "#687076",
          tabIconSelected: "#0a7ea4",
        },
        dark: {
          text: "#ecedee",
          background: "#151718",
          tint: "#ffffff",
          icon: "#9ba1a6",
          tabIconDefault: "#9ba1a6",
          tabIconSelected: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
