const help = `
  add <name> <path>  Add new kmd source
  ls                 List current sources
  rm  <name>         Remove kmd source
`

const ls = config => {
  const sources = config.get('sources')
  let msg = ''

  for (const key in sources) {
    if (key !== 'builtins') msg += `${key} \t ${sources[key]} \n`
  }

  return msg || 'No kmd sources found'
}

const add = (args, config) => {
  const name = args[0]
  const path = args[1]

  if (!name || !path) return `<name> and <path> are required`

  const sources = config.get('sources')
  sources[name] = path
  config.set('sources', sources)

  return `${name} source added`
}

const rm = (args, config) => {
  const name = args[0]

  if (!name) return `<name> is required`

  const sources = config.get('sources')
  if (!sources[name]) return `No source '${name}' found`
  delete sources[name]
  config.set('sources', sources)

  return `${name} source removed`
}

module.exports.run = async (args, config) => {
  const subCmd = args[0] || 'help'
  const subArgs = args.slice(1)

  switch (subCmd.toLowerCase()) {
    case 'ls':
    case 'list':
      return ls(config)

    case 'add':
      return add(subArgs, config)

    case 'rm':
    case 'remove':
      return rm(subArgs, config)

    case 'help':
    default:
      return help
  }
}
