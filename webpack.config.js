const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "carousel.css"
});

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './carousel.js',
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'carousel.js',
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: { presets: ['es2015'] },
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/,
        loader: extractSass.extract({
          use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }],
          // use style-loader in development
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    extractSass
  ]
};