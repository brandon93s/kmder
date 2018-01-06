const pkg = require('../../package.json')

module.exports.run = () => `v${pkg.version}`
