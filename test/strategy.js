import test from 'ava'
import Strategy from '../src/Strategy'
const s = new Strategy([], {})

test('should support command `fromArgs`', async t => {
  const cmd = { unicorn: '🦄' }
  const s = new Strategy([], { fromArgs: () => cmd })

  t.is(s.command, cmd)
})

test('should call `Reporter.log(values)` by default', async t => {
  const s = new Strategy([], {})
  const value = '🦄'
  const reporter = { log: (v) => t.is(v, value) }

  await s.log(reporter, value)
})

test('should have a run method', async t => {
  t.true(Strategy.prototype.hasOwnProperty('run'))
  t.true(typeof s.run === 'function')
})

test('should have a log method', async t => {
  t.true(Strategy.prototype.hasOwnProperty('log'))
  t.true(typeof s.log === 'function')
})

test('Should throw on default run implementation', async t => {
  try {
    await s.run()
  } catch (err) {
    t.true(err.message.includes('not implemented'))
  }
})
