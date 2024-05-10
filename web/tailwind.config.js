/** @type {import('tailwindcss').Config} */
import keepPreset from "keep-react/preset";
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#2563eb',
          200: '#598EF3',
          300: '#D3E6FE',
        },
        accent: {
          100: '#1d4ed8',
          200: '#fae8ff',
        },
        text: {
          100: '#cbd5e1',
          200: '#94a3b8',
        },
        bg: {
          100: '#1e293b',
          200: '#334155',
          300: '#475569',
          400: '#f8fafc'
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
