const path = require('path')
const replace = require('rollup-plugin-replace')
const babel = require('rollup-plugin-babel')
const packageJson = require('../package.json')

const nodeEnv = process.env.NODE_ENV || 'development'
const banner =
  `/*!
${packageJson.description}

@package ${packageJson.name}
@author ${packageJson.author}
@version ${packageJson.version}
@licence MIT https://opensource.org/licenses/MIT
@copyright (c) 2016-${new Date().getFullYear()}, ${packageJson.author}
*/`

module.exports = {
  format: 'es',
  entry: path.join(__dirname, '../src/index.js'),
  dest: path.join(__dirname, '../dist/bundle.es.js'),
  banner,
  plugins: [
    replace({
      'process.env.NODE_ENV': `'${nodeEnv}'`,
      PKG_VERSION: `'${packageJson.version}'`
    }),
    babel()
  ],
  external (id) {
    return /^(openlayers|ol.*)$/i.test(id)
  },
  sourceMap: true
}
