const help = `
  <kmd> <..args>     Execute kmd
  ls                 List available kmd
  help               Display help
  source             Manage kmd sources
  version            List kmd version
  reset              Reset sources and settings
`

module.exports.run = async () => help
