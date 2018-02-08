const path = require('path')
const replace = require('rollup-plugin-replace')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const cjs = require('rollup-plugin-commonjs')
const config = require('./config')

module.exports = {
  input: config.input,
  external: id => /(babel-runtime|openlayers|ol\/.+)/i.test(id),
  plugins: [
    replace(config.replace),
    babel({
      runtimeHelpers: true,
      sourceMap: true,
      include: [
        'src/**/*',
      ],
    }),
    resolve({
      main: true,
      module: true,
      jsnext: true,
      browser: true,
    }),
    cjs(),
  ],
  output: {
    format: 'es',
    file: path.join(__dirname, `../dist/bundle.es.js`),
    sourcemap: true,
    banner: config.banner,
    name: config.name,
  },
}
