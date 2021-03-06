var webpack = require('webpack');
var WebpackStripLoader = require('strip-loader');
var path = require('path');
var Promise = require('es6-promise').polyfill();
var AssetsPlugin = require('assets-webpack-plugin');
var entryPointList = require(__dirname + '/entryPoints.js');

//var APP_DIR = path.resolve(__dirname, '');
var JS_DIR = path.resolve(__dirname, 'javascript');

module.exports = {
    mode: 'production',
    // Don't attempt to continue if there are any errors
    bail: true,
    devtool: 'source-map',
    entry: entryPointList.entryPoints,
    output: {
        path: path.join(JS_DIR, "dist"),
        filename: "[name].[chunkhash:8].min.js",
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        publicPath: "javascript/dist/"
    },
    externals: {
        "jquery": "$"
    },
    module: {
        rules: [{
            enforce: "pre",
            test: /\.(js|jsx)$/,
            use: [
              {
                loader: "eslint-loader",
                options: {configFile: path.join(__dirname, '.eslintrc.js'),
                          useEslintrc: false}
              }
            ],
            include: JS_DIR
        }, {
            test: /\.(js|jsx)$/,
            include: JS_DIR,
            use: [
              {
                loader: 'babel-loader',
                query: {presets: ['env', 'react']}
              }
            ]

        }, {
            test: [/\.js$/, /\.es6$/, /\.jsx$/],
            exclude: /node_modules/,
            loader: WebpackStripLoader.loader('console.log')
        }, {
            test: /\.css$/,
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader"
              }
            ]
        }]
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.[chunkhash:8].bundle.js"),
        //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.[chunkhash:8].bundle.js' }),
        new AssetsPlugin({
            filename: 'assets.json',
            prettyPrint: true
        })
    ]
}
