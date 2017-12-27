const Strategy = require('../Strategy')
const elasticsearch = require('elasticsearch')
const format = require('../utils/format')

class Elasticsearch extends Strategy {
  async run () {
    const client = new elasticsearch.Client(this.command.connection)
    const resp = await client.search(this.query())

    return resp.hits.hits
  }

  async log (Reporter, value) {
    Reporter.prettyJson(value)
  }

  query () {
    const query = format(JSON.stringify(this.command.query), this.args)
    return JSON.parse(query)
  }
}

module.exports = Elasticsearch
