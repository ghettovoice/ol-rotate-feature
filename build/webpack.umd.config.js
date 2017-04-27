const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  entry: {
    bundle: path.join(__dirname, '../src/index.cjs.js')

  },
  output: {
    filename: process.env.NODE_ENV === 'production' ? '[name].min.js' : '[name].js',
    library: ['ol', 'interaction', 'RotateFeature'],
    libraryTarget: 'umd'
  },
  externals: [{
    openlayers: {
      root: 'ol',
      amd: 'openlayers',
      commonjs: 'openlayers',
      commonjs2: 'openlayers'
    }
  }]
})
