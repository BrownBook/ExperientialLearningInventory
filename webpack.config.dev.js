const webpack = require('webpack');
const path = require('path');
// var Promise = require("es6-promise").polyfill();
const AssetsPlugin = require('assets-webpack-plugin');
const entryPointList = require(path.join(__dirname, '/entryPoints.js'));
const ESLintPlugin = require('eslint-webpack-plugin');

const JS_DIR = path.resolve(__dirname, 'javascript');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: entryPointList.entryPoints,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.wasm']
  },
  output: {
    path: path.join(JS_DIR, 'dist'),
    filename: '[name].dev.js',
    publicPath: 'javascript/dist/'
  },
  externals: {
    jquery: '$'
  },
  watchOptions: {
    ignored: ['**/node_modules/**', '**/vendor/**']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: JS_DIR,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new ESLintPlugin({ files: 'javascript/**/*.jsx' }),
    new AssetsPlugin({
      filename: 'assets.json',
      prettyPrint: true
    })
  ]
};
