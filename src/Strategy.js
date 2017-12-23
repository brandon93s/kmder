class Strategy {
  constructor (args, command, config, instance) {
    this.args = args
    this.command = command
    this.config = config
    this.instance = instance

    if (this.command.fromArgs) {
      this.command = this.command.fromArgs(this.args)
    }
  }

  async run () {
    throw new Error('`run` not implemented')
  }

  async log (Reporter, values) {
    Reporter.log(values)
  }
}

module.exports = Strategy
