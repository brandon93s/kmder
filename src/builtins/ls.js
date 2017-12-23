const ls = instance => {
  let msg = ''
  for (const [key, value] of instance.commands) {
    if (!value.file.includes('builtins')) msg += `${key} \n`
  }

  return msg || 'No kmd found'
}

module.exports.run = async (args, config, instance) => {
  return ls(instance)
}
