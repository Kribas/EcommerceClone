/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    // colors: {
    //   paymentContainer: "rgb(234,237,237)",
    // },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
