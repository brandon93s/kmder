const ls = (config, instance) => {
  // gather sources
  const sources = initSourceMap(config)

  // gather commands
  for (const [key, value] of instance.commands) {
    if (!sources.has(value.source)) continue

    const commands = sources.get(value.source)
    commands[key] = value
    sources.set(value.source, commands)
  }

  // build output
  let msg = ''
  for (const [key, value] of sources) {
    msg += `${key}:\n`

    for (const command of Object.keys(value).sort()) {
      msg += ` ${command}\n`
    }

    msg += '\n'
  }

  return msg || 'No kmd(s) found'
}

const initSourceMap = config => {
  const map = new Map()
  let sources = Object.keys(config.get('sources')).sort()
  sources = sources.filter(s => s !== 'builtins')

  for (const source of sources) {
    map.set(source, {})
  }

  return map
}

module.exports.run = (args, config, instance) => {
  return ls(config, instance)
}
