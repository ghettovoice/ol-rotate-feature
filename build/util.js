const replace = require('rollup-plugin-replace')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const cjs = require('rollup-plugin-commonjs')
const terser = require('rollup-plugin-terser').terser

function plugins (options = {}) {
  const plugins = [
    replace(options.replace),
    babel({
      runtimeHelpers: true,
      sourceMap: true,
      include: [
        'src/**/*',
      ],
    }),
    resolve({
      mainFields: ['module', 'main'],
      browser: true,
    }),
    cjs(),
  ]
  if (options.min) {
    plugins.push(terser({
      mangle: true,
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
        preamble: options.banner,
      },
    }))
  }
  return plugins
}

module.exports = {
  plugins,
}
