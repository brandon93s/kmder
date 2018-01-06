const fs = require('fs')
const path = require('path')
const Factory = require('./CommandFactory')
const Reporter = require('./Reporter')
const promisify = require('./utils/promisify')
const globby = require('globby')

const stat = promisify(fs.stat)

const lower = str => str && String.prototype.toLowerCase.call(str)

class Command {
  constructor ({ config, command, args }) {
    this.config = config
    this.command = lower(command)
    this.args = args

    this.result = undefined
    this.cmd = undefined

    this.commands = new Map()
    this.factory = new Factory()
  }

  async run () {
    await this._init()

    // Find appropriate strategy for specified command
    const commandConfiguration = this.commands.get(this.command)
    if (!commandConfiguration) {
      throw new Error(`No kmd found matching '${this.command}'`)
    }
    const Strategy = this.factory.findStrategy(commandConfiguration.type)

    // Execute command using strategy
    this.cmd = new Strategy(this.args, commandConfiguration, this.config, this)
    this.result = await this.cmd.run()
  }

  async log () {
    this.cmd.log(Reporter, this.result)
  }

  async _init () {
    await this._loadCommands(this.config.get('sources'))
  }

  async _loadCommands (sources, directory = '') {
    for (const key in sources) {
      const value = sources[key]
      const sourcePath = path.join(directory, value)

      try {
        const fstat = await stat(sourcePath)

        if (fstat.isFile()) {
          await this._addCommand(sourcePath, key)
        } else if (fstat.isDirectory()) {
          const paths = await globby(['**/*{.js,.json}'], {cwd: sourcePath, absolute: true})
          for (const match of paths) {
            this._addCommand(match, key)
          }
        }
      } catch (err) {
        if (err.code === 'ENOENT') {
          this.config.delete(`sources.${key}`)
        } else {
          throw err
        }
      }
    }
  }

  async _addCommand (file, source) {
    const name = path.parse(file).name
    const command = require(file)
    this.commands.set(lower(name), Object.assign({file, source}, command))
  }
}

module.exports = Command
