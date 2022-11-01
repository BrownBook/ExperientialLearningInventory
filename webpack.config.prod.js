var webpack = require("webpack");
var path = require("path");
var AssetsPlugin = require("assets-webpack-plugin");
var entryPointList = require(__dirname + "/entryPoints.js");

// TODO
// const ESLintPlugin = require("eslint-webpack-plugin");

//var APP_DIR = path.resolve(__dirname, '');
var JS_DIR = path.resolve(__dirname, "javascript");

module.exports = {
  mode: "production",
  // Don't attempt to continue if there are any errors
  bail: true,
  devtool: "source-map",
  entry: entryPointList.entryPoints,
  output: {
    path: path.join(JS_DIR, "dist"),
    filename: "[name].[chunkhash:8].min.js",
    chunkFilename: "[name].[chunkhash:8].chunk.js",
    publicPath: "javascript/dist/",
    clean: true,
  },
  externals: {
    jquery: "$",
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
    //new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.[chunkhash:8].bundle.js"),
    //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.[chunkhash:8].bundle.js' }),
    // new ESLintPlugin(),
    new AssetsPlugin({
      filename: "assets.json",
      prettyPrint: true,
    }),
  ],
};
