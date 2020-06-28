const { escapeRegExp } = require('lodash')
const path = require('path')
const config = require('./config')
const util = require('./util')

const baseConf = {
  input: config.input,
  external: (function () {
    const deps = config.dependencies.map(dep => escapeRegExp(dep)).join('|')
    const re = new RegExp(`^(?:${deps})(?:/.+)?$`, 'i')
    return (id, parentId, resolved) => {
      return !!(config.dependencies.includes(id) || (!resolved && re.exec(id)))
    }
  }()),
  plugins: util.plugins({
    replace: config.replace,
    banner: config.banner,
  }),
  output: {
    format: 'es',
    file: path.join(__dirname, `../dist/${config.name}.esm.js`),
    sourcemap: true,
    banner: config.banner,
    name: config.fullname,
    amd: { id: config.name },
  },
}
const baseUmdConf = (function () {
  let ol = {}
  return {
    ...baseConf,
    external: (function () {
      const deps = ['ol'].map(dep => escapeRegExp(dep)).join('|')
      const re = new RegExp(`^(?:${deps})(?:/.+)?$`, 'i')
      return (id, parentId, resolved) => {
        if (!resolved && /^ol(?:\/.+)?$/.test(id)) {
          ol[id] = id.replace(/\//g, '.')
        }
        return !!(!resolved && re.exec(id))
      }
    }()),
    output: {
      ...baseConf.output,
      file: path.join(__dirname, `../dist/${config.name}.umd.js`),
      format: 'umd',
      globals: id => {
        if (ol[id] != null) return ol[id]
      },
    },
  }
}())

module.exports = [
  // es
  baseConf,
  // umd
  baseUmdConf,
  // umd min
  {
    ...baseUmdConf,
    plugins: util.plugins({
      replace: config.replace,
      banner: config.banner,
      min: true,
    }),
    output: {
      ...baseUmdConf.output,
      file: path.join(__dirname, `../dist/${config.name}.umd.min.js`),
    },
  },
]
