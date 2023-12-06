/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        'my-dark-blue': '#182D88',
        'my-light-blue': '#5FCBE1',
        'my-purple': '#6946DD',
        'my-grey': '#A4A4A4',
      },
      fontFamily: {
        poppins: ["Poppins", "cursive"],
        neueMachina: ["NeueMachina", "cursive"],
        gotham: ["Gotham", "cursive"],
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}

