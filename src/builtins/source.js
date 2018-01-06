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

const add = ([name, path], config) => {
  if (!name || !path) return `<name> and <path> are required`

  config.set(`sources.${name}`, path)

  return `${name} source added`
}

const rm = ([name], config) => {
  if (!name) return `<name> is required`

  config.delete(`sources.${name}`)

  return `${name} source removed`
}

module.exports.run = ([subCmd = 'help', ...subArgs], config) => {
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
