#!/usr/bin/env node

const Conf = require('conf')
const Command = require('./src/Command')
const delay = require('./src/utils/delay')
const path = require('path')
const ora = require('ora')

const config = new Conf({
  defaults: {
    sources: {
      builtins: path.join(__dirname, '/src/builtins')
    }
  }
})

const command = process.argv[2] || 'help'
const args = process.argv.slice(3)

if (command === 'reset') {
  config.clear()
  console.log(`kmd has been reset`)
  process.exit(0)
}

;(async () => {
  const spinner = ora('Running...')
  delay(100).then(() => spinner.start())

  const cli = new Command({ config, command, args })

  try {
    await cli.run()
    spinner.clear()
    await cli.log()
  } catch (err) {
    if (err.message.includes('No kmd found')) {
      spinner.fail(err.message)
    } else {
      spinner.fail('An error occurred')
      throw err
    }
  }

  process.exit()
})()
