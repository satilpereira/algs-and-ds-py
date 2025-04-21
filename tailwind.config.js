/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/templates/**/*.html",
    "./app/templates/**/*.jinja",
    "./app/templates/**/*.jinja2",
    "./app/static/src/**/*.js",
  ],
  theme: {
    extend: {
      container: {
        screens: {
          md: "1248px",
        },
        center: true,
      },
    },
  },
  plugins: [],
};
