const got = require('got')
const jp = require('jsonpath')
const Strategy = require('../Strategy')
const format = require('../utils/format')

class HTTP extends Strategy {
  async run () {
    const response = await got(this.url(), this.options())
    let value = response.body

    // Extract `value` with JSON-Path
    if (this.command.jp) {
      value = jp.query(value, format(this.command.jp, this.args))
    }

    return value
  }

  options () {
    return Object.assign({ json: true }, this.command.options)
  }

  url () {
    return format(this.command.url, this.args)
  }
}

module.exports = HTTP
