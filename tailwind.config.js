/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1976D2",
        secondary: "#424242",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        danger: "#FF5252",
        light: "#F5F5F5",
        dark: "#212121",
      },
    },
  },
  plugins: [],
  // Element Plus 與 Tailwind 相容性好，可以啟用 preflight
  corePlugins: {
    preflight: true,
  },
}