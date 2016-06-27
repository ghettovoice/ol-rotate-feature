const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const packageJson = require('./package.json');

const RELEASE = _.includes(process.argv, '--release');
const BUILD = _.includes(process.argv, '--build');
const DEBUG = !BUILD && !RELEASE;
const VERBOSE = _.includes(process.argv, '--verbose');
const PROFILE = _.includes(process.argv, '--profile');
const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    __DEV__: DEBUG
};

const nodeModulesDir = path.join(__dirname, 'node_modules');
const srcDir = path.join(__dirname, 'src');
const outDir = path.join(__dirname, 'dist');
const bundleName = RELEASE ? 'bundle.min.js' : 'bundle.js';
const exportName = ['ol', 'interaction', 'RotateFeature'];
const entry = path.join(srcDir, 'index.js');

const banner =
    `OpenLayers 3 rotate interaction.
Allows vector feature rotation.

@package ${packageJson.name}
@author ${packageJson.author}
@version ${packageJson.version}
@licence MIT https://opensource.org/licenses/MIT
         Based on OpenLayers 3. Copyright 2005-2016 OpenLayers Contributors. All rights reserved. http://openlayers.org
@copyright (c) 2016, ${packageJson.author}`;

const plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ProgressBarPlugin({
        format: ' build ' + chalk.magenta.bold('[ol3-rotate-feature]') + ' ' + chalk.cyan.bold('[:bar]') + ' ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    })
];

if (DEBUG) {
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    );
} else {
    plugins.push(
        new webpack.BannerPlugin(banner),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    );

    if (RELEASE) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                comments: false,
                mangle: true,
                compress: {
                    warnings: VERBOSE
                },
                output: {
                    preamble: `/*!\n${banner}\n*/`
                }
            })
        );
    }
}

module.exports = {
    devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
    devServer: {
        contentBase: __dirname,
        hot: true,
        inline: true,
        host: 'localhost',
        port: 8080
    },
    stats: {
        colors: true,
        cached: false,
        cachedAssets: false,
        chunks: false,
        chunkModules: false,
        modules: false
    },
    cache: DEBUG,
    profile: PROFILE,
    debug: DEBUG,
    entry: entry,
    externals: [
        {
            openlayers: {
                root: 'ol',
                amd: 'openlayers',
                commonjs: 'openlayers',
                commonjs2: 'openlayers'
            }
        }
    ],
    output: {
        path: outDir,
        filename: bundleName,
        publicPath: DEBUG ? 'http://localhost:8080/dist/' : '/dist/',
        crossOriginLoading: "anonymous",
        library: exportName,
        libraryTarget: 'umd'
    },
    resolve: {
        root: [nodeModulesDir],
        extensions: ['', '.tsx', '.ts', '.jsx', '.js', '.json']
    },
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: true,
        __filename: "mock",
        __dirname: "mock",
        setImmediate: true,
        fs: "empty"
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            exclude: [outDir],
            loaders: ['ts']
        }, {
            test: /\.jsx?$/,
            exclude: [outDir],
            loaders: ['babel']
        }, {
            test: /\.json$/i,
            exclude: [outDir],
            loader: 'json'
        }, {
            test: /\.txt$/i,
            exclude: [outDir],
            loader: 'raw'
        }]
    },
    plugins: plugins
};
