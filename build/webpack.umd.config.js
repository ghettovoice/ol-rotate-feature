const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  output: {
    filename: process.env.NODE_ENV === 'production' ? '[name].min.js' : '[name].js',
    library: [ 'ol', 'tileCacheUrlFn' ],
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
