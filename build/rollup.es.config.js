const path = require('path')
const replace = require('rollup-plugin-replace')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const cjs = require('rollup-plugin-commonjs')
const packageJson = require('../package.json')

const nodeEnv = process.env.NODE_ENV || 'development'
const banner =
  `/*!
${packageJson.description}

@package ${packageJson.name}
@author ${packageJson.author}
@version ${packageJson.version}
@licence MIT
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
    babel({
      runtimeHelpers: true,
      sourceMap: true,
      include: [
        'src/**/*'
      ]
    }),
    resolve({
      main: true,
      module: true,
      jsnext: true,
      browser: true
    }),
    cjs()
  ],
  external (id) {
    return /node_modules\/.*$/i.test(id)
  },
  sourceMap: true
}
