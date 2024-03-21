// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

const webpackConfig = require('../../build/webpack.base.config')
webpackConfig.devtool = 'inline-source-map'
delete webpackConfig.entry

const puppeteer = require('puppeteer')
process.env.CHROME_BIN = puppeteer.executablePath()

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: [ 'ChromeHeadless' ],
    frameworks: [ 'mocha', 'chai', 'sinon', 'sinon-chai', 'es6-shim' ],
    reporters: [ 'spec', 'coverage' ],
    files: [ './index.js' ],
    preprocessors: {
      './index.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
