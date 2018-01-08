const sql = process.platform === 'win32' ? require('mssql/msnodesqlv8') : require('mssql')
const Strategy = require('../Strategy')
const format = require('../utils/format')

class MSSQL extends Strategy {
  async run () {
    const pool = await sql.connect(this.command.connection)

    let result
    try {
      result = await new sql.Request().query(this.query())
    } finally {
      pool.close()
    }

    return result.recordset
  }

  async log (Reporter, value) {
    Reporter.table(value)
  }

  query () {
    return format(this.command.query, this.args)
  }
}

module.exports = MSSQL
