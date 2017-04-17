const webpack = require('webpack')
const path = require('path')
const WebpackNotifierPlugin = require('webpack-notifier')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const packageJson = require('../package.json')

const srcPath = path.join(__dirname, '../src')
const outPath = path.join(__dirname, '../dist')

const banner =
  `${packageJson.description}

@package ${packageJson.name}
@author ${packageJson.author}
@version ${packageJson.version}
@licence MIT https://opensource.org/licenses/MIT
@copyright (c) 2016-${new Date().getFullYear()}, ${packageJson.author}`

const nodeEnv = process.env.NODE_ENV || 'development'
const plugins = [
  new WebpackNotifierPlugin({
    title: packageJson.name,
    alwaysNotify: true
  }),
  new webpack.BannerPlugin(banner),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': `'${nodeEnv}'`,
    PKG_VERSION: `'${packageJson.version}'`
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
    // , new BundleAnalyzerPlugin()
  )
}

module.exports = {
  entry: {
    bundle: path.join(srcPath, '../src/index.js')
  },
  devtool: '#source-map',
  output: {
    filename: '[name].js',
    path: outPath,
    publicPath: '/'
  },
  resolve: {
    modules: [
      path.join(__dirname, '../src'),
      path.join(__dirname, '../node_modules')
    ],
    extensions: [ '.jsx', '.js', '.json' ],
    alias: {
      [ packageJson.name ]: srcPath
    }
  },
  module: {
    rules: [ {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: [ srcPath, path.join(__dirname, '../test') ]
    }, {
      test: /\.json$/i,
      loader: 'json-loader'
    }, {
      test: /\.txt$/i,
      loader: 'raw-loader'
    } ],
    noParse: [ /openlayers/ ]
  },
  plugins
}
