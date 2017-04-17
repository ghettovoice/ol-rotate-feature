const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.config')

const webpackCofnig = merge(baseConfig, {
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    publicPath: baseConfig.output.publicPath,
    host: 'localhost',
    port: 8080,
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'test/index.html',
      inject: true
    })
  ]
})

webpackCofnig.entry = {
  app: path.join(__dirname, '../test/app.js')
}

module.exports = webpackCofnig
