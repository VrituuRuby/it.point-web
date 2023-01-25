/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#5C83D0",
        "dark-blue": "#525888",
        "base-light": "#5E6B83",
        "base-dark": "#39465E",
        "background-light": "#E5EAF4",
        "background-dark": "#C6CDDB",
        "background-white": "#F9FBFF",
      },
      gridTemplateColumns: {
        'table': 'auto auto auto auto 1fr 1fr 1fr' 
      }
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      heading: ["Rubik", "sans-serif"],
    },
  },
  plugins: [],
};
