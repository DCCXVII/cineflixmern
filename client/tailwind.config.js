/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "ebony-clay": {
        50: "#f3f7f8",
        100: "#e1e8ec",
        200: "#c5d3dc",
        300: "#9eb4c2",
        400: "#6e8ca2",
        500: "#537087",
        600: "#475e73",
        700: "#3f4f5f",
        800: "#394451",
        900: "#333c46",
        950: "#202730",
      },
      "curious-blue": {
        50: "#f1f8fe",
        100: "#e2effc",
        200: "#bfdef8",
        300: "#86c4f3",
        400: "#46a6ea",
        500: "#1e8bdb",
        600: "#106cb9",
        700: "#0e5796",
        800: "#104a7c",
        900: "#133f67",
        950: "#0d2844",
      },
      "medium-purple": {
        50: "#f6f4fe",
        100: "#eeebfc",
        200: "#e0dafa",
        300: "#c9bbf7",
        400: "#ad95f0",
        500: "#875ae6",
        600: "#824add",
        700: "#7238c9",
        800: "#602ea9",
        900: "#50288a",
        950: "#31185d",
      },
      white: {
        50: "#ffffff",
        100: "#efefef",
        200: "#dcdcdc",
        300: "#bdbdbd",
        400: "#989898",
        500: "#7c7c7c",
        600: "#656565",
        700: "#525252",
        800: "#464646",
        900: "#3d3d3d",
        950: "#292929",
      },'buttercup': {
        '50': '#fefcec',
        '100': '#fcf4c9',
        '200': '#fae88d',
        '300': '#f7d652',
        '400': '#f4c01e',
        '500': '#eea412',
        '600': '#d37e0c',
        '700': '#af5a0e',
        '800': '#8e4512',
        '900': '#753a12',
        '950': '#431d05',
    },'red': {
      '50': '#fff0f3',
      '100': '#ffe2e9',
      '200': '#ffc9d8',
      '300': '#ff9cb8',
      '400': '#ff6594',
      '500': '#ff2f74',
      '600': '#e30b5c',
      '700': '#cd0353',
      '800': '#ab064d',
      '900': '#920948',
      '950': '#520023',
  },
  
    
    },
    fontFamily: {
      blinker: ["Blinker", "sans-serif"],
      sans: ['Source Sans 3', 'sans-serif'],
      Sen : ['Sen ', 'sans-serif'],
      Alber_Sans : ['Albert Sans', 'sans-serif'],
    },
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
};