module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        ubuntu: "'Ubuntu', sans-serif",
      },
      colors: {
        navyblue: "#033758",
        lightblue: "#1f709b",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
