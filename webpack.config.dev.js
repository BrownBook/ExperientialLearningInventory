var webpack = require("webpack");
var path = require("path");
// var Promise = require("es6-promise").polyfill();
var AssetsPlugin = require("assets-webpack-plugin");
var entryPointList = require(__dirname + "/entryPoints.js");

// TODO
// const ESLintPlugin = require("eslint-webpack-plugin");

var JS_DIR = path.resolve(__dirname, "javascript");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: entryPointList.entryPoints,
  output: {
    path: path.join(JS_DIR, "dist"),
    filename: "[name].dev.js",
    publicPath: "javascript/dist/",
  },
  externals: {
    jquery: "$",
  },
  watchOptions: {
    ignored: ["**/node_modules/**", "**/vendor/**"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: JS_DIR,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new AssetsPlugin({
      filename: "assets.json",
      prettyPrint: true,
    }),
    //new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
    //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
  ],
};
