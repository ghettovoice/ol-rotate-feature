const path = require('path')
const replace = require('rollup-plugin-replace')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const cjs = require('rollup-plugin-commonjs')
const uglify = require('rollup-plugin-uglify')
const config = require('./config')

const plugins = [
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
]

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
    external: id => /(babel-runtime|openlayers|ol\/.+)/i.test(id),
    plugins,
    output,
  },
  {
    input: config.input,
    external: id => /(babel-runtime|openlayers|ol\/.+)/i.test(id),
    plugins: [
      ...plugins,
      uglify({
        mangle: true,
        sourceMap: true,
        compress: {
          warnings: false,
        },
        output: {
          comments: (node, comment) => {
            let text = comment.value
            let type = comment.type
            if (type === 'comment2') {
              // multiline comment
              return /@preserve|@license|@cc_on/i.test(text)
            }
          },
        },
      }),
    ],
    output: Object.assign({}, output, {
      file: path.join(__dirname, `../dist/bundle.min.js`),
    }),
  },
]
