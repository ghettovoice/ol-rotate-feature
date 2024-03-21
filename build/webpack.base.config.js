const webpack = require('webpack')
const path = require('path')
const config = require('./config')

const srcPath = path.resolve(__dirname, '../src')
const outPath = path.resolve(__dirname, '../dist')

const plugins = [
  new webpack.DefinePlugin(config.replace),
]

module.exports = {
  entry: {
    bundle: config.input,
  },
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: outPath,
    publicPath: '/',
  },
  resolve: {
    modules: [
      srcPath,
      path.resolve(__dirname, '../node_modules'),
    ],
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      '@': srcPath,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          srcPath,
          path.join(__dirname, '../test'),
          path.join(__dirname, '../node_modules/ol'),
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
    noParse: [/node_modules\/openlayers/],
  },
  plugins,
}
