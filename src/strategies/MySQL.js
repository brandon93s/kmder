const mysql = require('mysql2/promise')
const Strategy = require('../Strategy')
const format = require('../utils/format')

class MySQL extends Strategy {
  async run () {
    const connection = await mysql.createConnection(this.command.connection)

    let rows, fields
    try {
      [rows, fields] = await connection.query(this.query())
    } finally {
      connection.destroy()
    }

    return rows
  }

  async log (Reporter, value) {
    Reporter.table(value)
  }

  query () {
    return format(this.command.query, this.args)
  }
}

module.exports = MySQL
