const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge').merge
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.config')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080

const webpackConfig = merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  devServer: {
    host,
    port,
    hot: true,
    compress: true,
    open: true,
  },
  plugins: [
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../test/index.html'),
      inject: true,
    })
  ]
})

webpackConfig.entry = {
  app: path.join(__dirname, '../test/app.js'),
}

module.exports = webpackConfig
