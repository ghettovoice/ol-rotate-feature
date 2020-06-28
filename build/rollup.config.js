const { escapeRegExp } = require('lodash')
const path = require('path')
const config = require('./config')
const util = require('./util')

let ol = {}
const baseConf = {
  input: config.input,
  external: (function () {
    const deps = config.dependencies.map(dep => escapeRegExp(dep)).join('|')
    const re = new RegExp(`^(?:${deps})(?:/.+)?$`, 'i')
    return (id, parentId, resolved) => {
      if (!resolved && /^ol(?:\/.+)?$/.test(id)) {
        ol[id] = id.replace(/\//g, '.')
      }
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

module.exports = [
  // es
  baseConf,
  // umd
  (function () {
    ol = {}
    return {
      ...baseConf,
      output: {
        ...baseConf.output,
        file: path.join(__dirname, `../dist/${config.name}.umd.js`),
        format: 'umd',
        globals: id => {
          if (ol[id] != null) return ol[id]
        },
      },
    }
  }()),
  // umd min
  (function () {
    ol = {}
    return {
      ...baseConf,
      plugins: util.plugins({
        replace: config.replace,
        banner: config.banner,
        min: true,
      }),
      output: {
        ...baseConf.output,
        file: path.join(__dirname, `../dist/${config.name}.umd.min.js`),
        format: 'umd',
        globals: id => {
          if (ol[id] != null) return ol[id]
        },
      },
    }
  }()),
]
