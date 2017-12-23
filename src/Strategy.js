class Strategy {
  constructor (args, command, config, instance) {
    this.args = args
    this.command = command
    this.config = config
    this.instance = instance
  }

  async run () {
    throw new Error('`run` not implemented')
  }

  async log (Reporter, values) {
    Reporter.log(values)
  }
}

module.exports = Strategy
