/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FD2D01',
        secondary: '#FFD7D7',
        tertiary: '#4E5166',
        tertiaryLight: '#4E516650',
        backgroundLight: '#F9F9FC',
        backgroundDark: '#4F4C6B',
      },
      boxShadow: {
        'boxShadowForm': '0 1px 2px  rgba(0, 0, 0, 0.3)',
      }
    },
    plugins: [],
  }
};
