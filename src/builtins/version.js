const pkg = require('../../package.json')

module.exports.run = async () => `v${pkg.version}`
