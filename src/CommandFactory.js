class CommandFactory {
  constructor () {
    this.types = {}

    this.registerType('http', './strategies/HTTP')
    this.registerType('mssql', './strategies/MSSQL')
    this.registerType('mysql', './strategies/MySQL')
    this.registerType('elasticsearch', './strategies/Elasticsearch')
    this.registerType('custom', './strategies/Custom')
  }

  registerType (type, path) {
    this.types[type] = path
  }

  findStrategy (type) {
    const strategy = type && this.types[type.toLowerCase()]
    if (strategy) {
      return require(strategy)
    }

    return require(this.types['custom'])
  }
}

module.exports = CommandFactory
