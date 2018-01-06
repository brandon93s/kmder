#!/usr/bin/env node

const Conf = require('conf')
const Command = require('./src/Command')
const path = require('path')

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
  const cli = new Command({ config, command, args })
  try {
    await cli.run()
    await cli.log()
  } catch (err) {
    if (err.message.includes('No kmd found')) { console.error(err.message) } else throw err
  }
})()
