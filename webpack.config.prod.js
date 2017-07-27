var webpack = require('webpack');
var WebpackStripLoader = require('strip-loader');
var path = require('path');
var Promise = require('es6-promise').polyfill();
var AssetsPlugin = require('assets-webpack-plugin');
var entryPointList = require(__dirname + '/entryPoints.js');

//var APP_DIR = path.resolve(__dirname, '');
var JS_DIR = path.resolve(__dirname, 'javascript');

module.exports = {
    // Don't attempt to continue if there are any errors
    bail: true,
    devtool: 'source-map',
<<<<<<< ae6c8f2440d8e4d0a5688e4c9911a646bd2b7749
    entry: entryPointList.entryPoints,
=======
    entry: {
        createInterface: JS_DIR + '/createInterface/CreateInternshipInterface.jsx',
        searchInterface: JS_DIR + '/searchInterface/SearchInterface.jsx',
        editAdmin: JS_DIR + '/editAdmin/editAdmin.jsx',
        editDepartment: JS_DIR + '/editDepartment/deptEditor.jsx',
        stateList: JS_DIR + '/stateList/StateList.jsx',
        emergencyContact: JS_DIR + '/emergencyContact/EmgContactList.jsx',
        facultyEdit: JS_DIR + '/facultyEdit/FacultyEdit.jsx',
        editMajor: JS_DIR + '/editMajor/editMajor.jsx',
        editGrad: JS_DIR + '/editGrad/editGrad.jsx',
        affiliationDepartments: JS_DIR + '/affiliationAgreement/AffiliationDepartments.jsx',
        affiliateList: JS_DIR + '/affiliationAgreement/AffiliateList.jsx',
        affiliationLocation: JS_DIR + '/affiliationAgreement/AffiliationLocation.jsx',
        affiliationTerminate: JS_DIR + '/affiliationAgreement/AffiliationTerminate.jsx',
        editExpectedCourses: JS_DIR + '/editCourses/courseEditor.jsx',
        majorSelector: JS_DIR + '/majorSelector/MajorSelector.jsx',
        adminSettings: JS_DIR + '/settings/settings.jsx',
        vendor: ['jquery', 'react', 'react-dom', 'react-bootstrap']
    },
>>>>>>> Render for settings.jsx
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
                query: {presets: ['es2015', 'react']}
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
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        //new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.[chunkhash:8].bundle.js"),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.[chunkhash:8].bundle.js' }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // React doesn't support IE8 anyway
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new AssetsPlugin({
            filename: 'assets.json',
            prettyPrint: true
        })    ]
}
