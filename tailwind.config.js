/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/templates/**/*.html", "./app/static/src/**/*.js"],
  theme: {
    extend: {
      container: {
        screens: {
          md: "1280px",
        },
        center: true,
      },
    },
  },
  plugins: [],
};
