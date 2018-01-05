const Command = require('../src/Command')
const Conf = require('conf')
const path = require('path')

const config = new Conf({
  defaults: {
    sources: {
      builtins: path.join(__dirname, '/src/builtins')
    }
  }
})

const command = 'user'
const args = ['bob']

const kmd = new Command({ config, command, args })
kmd.run()
  .then(() => console.log('Done!'))
