const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const entryPointList = require(__dirname + '/entryPoints.js');
const ESLintPlugin = require('eslint-webpack-plugin');

const JS_DIR = path.resolve(__dirname, 'javascript');

module.exports = {
  mode: 'production',
  bail: true, // Don't attempt to continue if there are any errors
  devtool: 'source-map',
  entry: entryPointList.entryPoints,
  output: {
    path: path.join(JS_DIR, 'dist'),
    filename: '[name].[chunkhash:8].min.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    publicPath: 'javascript/dist/',
    clean: true
  },
  externals: {
    jquery: '$'
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
