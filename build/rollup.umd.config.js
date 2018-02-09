const path = require('path')
const config = require('./config')
const util = require('./util')

const output = {
  format: 'umd',
  file: path.join(__dirname, `../dist/bundle.js`),
  sourcemap: true,
  banner: config.banner,
  name: config.name,
  globals: {
    openlayers: 'ol',
  },
  amd: {
    id: config.amdName,
  },
}

module.exports = [
  {
    input: config.input,
    external: config.external,
    plugins: util.plugins({
      replace: config.replace,
      banner: config.banner,
    }),
    output,
  },
  {
    input: config.input,
    external: config.external,
    plugins: util.plugins({
      min: true,
      replace: config.replace,
      banner: config.banner,
    }),
    output: Object.assign({}, output, {
      file: path.join(__dirname, `../dist/bundle.min.js`),
    }),
  },
]
