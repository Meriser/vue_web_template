/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 全大寫 DEFAULT 作為預設值，使用時僅需 text-primary 即可
        primary: {
          DEFAULT: "#1976D2",
        },
        secondary: {
          DEFAULT: "#424242",
        },
        info: {
          DEFAULT: "#2196F3",
        },
        success: {
          DEFAULT: "#4CAF50",
        },
        warning: {
          DEFAULT: "#FFC107",
        },
        danger: {
          DEFAULT: "#FF5252",
        },
        light: {
          DEFAULT: "#F5F5F5",
        },
        dark: {
          DEFAULT: "#212121",
        },
      },
    },
  },
  plugins: [],
  // Element Plus 與 Tailwind 相容性好，可以啟用 preflight
  corePlugins: {
    preflight: true,
  },
};
