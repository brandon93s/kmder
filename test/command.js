import test from 'ava'
import Conf from 'conf'
import path from 'path'
import Command from '../src/Command'

test('should load single files', async t => {
  const config = new Conf()
  config.set('sources', {
    a: path.join(__dirname, '/fixtures/sources/source/a.js'),
    b: path.join(__dirname, '/fixtures/sources/source/b.js')
  })

  const c = new Command({ config, command: '', args: [] })
  await c._init()

  t.is(c.commands.size, 2)
  t.true(c.commands.has('a'))
  t.true(c.commands.has('b'))
})

test('should load directories', async t => {
  const config = new Conf()
  config.set('sources', {
    a: path.join(__dirname, '/fixtures/sources/source')
  })

  const c = new Command({ config, command: '', args: [] })
  await c._init()

  t.is(c.commands.size, 2)
  t.true(c.commands.has('a'))
  t.true(c.commands.has('b'))
})

test('should recurse directories', async t => {
  const config = new Conf()
  config.set('sources', {
    a: path.join(__dirname, '/fixtures/sources/')
  })

  const c = new Command({ config, command: '', args: [] })
  await c._init()

  t.is(c.commands.size, 2)
  t.true(c.commands.has('a'))
  t.true(c.commands.has('b'))
})

test('should remove sources that no longer exist', async t => {
  const config = new Conf()
  config.set('sources', {
    a: path.join(__dirname, '/not/found/directory')
  })

  const c = new Command({ config, command: '', args: [] })
  await c._init()

  t.true(config.get('sources').a === undefined)
})

test('should lowercase command names', async t => {
  const config = new Conf()
  config.set('sources', {
    a: path.join(__dirname, '/fixtures/kmds/UPPERCASE.js')
  })

  const c = new Command({ config, command: '', args: [] })
  await c._init()

  t.is(c.commands.size, 1)
  t.true(c.commands.has('uppercase'))
  t.false(c.commands.has('UPPERCASE'))
})

test('should throw on kmd not found', async t => {
  const config = new Conf()
  config.set('sources', {})

  const c = new Command({ config, command: 'unicorn', args: [] })

  try {
    await c.run()
  } catch (err) {
    t.true(err.message.includes(`No kmd found matching 'unicorn'`))
  }
})

test('should run init on run', async t => {
  class Run extends Command {
    _init () { t.pass() }
  }

  const r = new Run({ config: '', command: '', args: [] })
  try { await r.run() } catch (err) {}
})
