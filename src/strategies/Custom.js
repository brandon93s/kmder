const Strategy = require('../Strategy')

class Custom extends Strategy {
  async run () {
    return this.command.run(this.args, this.config, this.instance)
  }
}

module.exports = Custom
