const Strategy = require('../Strategy')

class Custom extends Strategy {
  async run () {
    return this.command.run(this.args, this.config, this.instance)
  }

  async log (Reporter, value) {
    if (this.command.log) {
      this.command.log(Reporter, value)
    } else {
      super.log(Reporter, value)
    }
  }
}

module.exports = Custom
