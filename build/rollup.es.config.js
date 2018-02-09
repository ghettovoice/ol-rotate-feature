const path = require('path')
const config = require('./config')
const util = require('./util')

module.exports = {
  input: config.input,
  external: config.external,
  plugins: util.plugins({
    replace: config.replace,
    banner: config.banner,
  }),
  output: {
    format: 'es',
    file: path.join(__dirname, `../dist/bundle.es.js`),
    sourcemap: true,
    banner: config.banner,
    name: config.name,
  },
}
