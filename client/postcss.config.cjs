module.exports = {
  plugins: [
    require('postcss-nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],

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
}
