const path = require('path')
const packageJson = require('../package.json')

const env = process.env.NODE_ENV || 'development'
const banner = `/*!
${packageJson.description}

@package ${packageJson.name}
@author ${packageJson.author}
@version ${packageJson.version}
@licence ${packageJson.license}
@copyright (c) 2016-${new Date().getFullYear()}, ${packageJson.author}
*/`

module.exports = {
  name: packageJson.name,
  fullname: 'RotateFeatureInteraction',
  env,
  version: packageJson.version,
  input: path.join(__dirname, '../src/index.js'),
  banner,
  replace: {
    'process.env.NODE_ENV': `'${env}'`,
    PKG_VERSION: `'${packageJson.version}'`,
  },
  dependencies: Object.keys(packageJson.dependencies).concat(
    ...Object.keys(packageJson.peerDependencies),
  ),
}
