const Table = require('cli-table')
const prettyjson = require('prettyjson')

class Reporter {
  static log (value) {
    if (Array.isArray(value) && value.length === 1) {
      Reporter.value(value[0])
      return
    }

    Reporter.value(value)
  }

  static value (value) {
    console.log(value)
  }

  static table (value) {
    if (!Array.isArray(value) || value.length === 0) {
      console.log('No results')
      return
    }

    const firstRow = value[0]
    const head = Object.keys(firstRow)
    const rows = value.map(v => Object.values(v))

    const table = new Table({head})
    rows.forEach(r => table.push(r))

    console.log(table.toString())
  }

  static prettyJson (value) {
    console.log(prettyjson.render(value))
  }
}

module.exports = Reporter
