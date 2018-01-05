import test from 'ava'
import path from 'path'
import CommandFactory from '../src/CommandFactory'

test('should register builtin strategies in constructor', async t => {
  const cf = new CommandFactory()
  t.is(Object.keys(cf.types).length, 5)
})

test('should default to custom strategy', async t => {
  const cf = new CommandFactory()
  const strategy = cf.findStrategy('🦄unicorns🦄')
  const custom = require('../src/strategies/Custom')

  t.true(strategy === custom)
})

test('should support registering strategies', async t => {
  const cf = new CommandFactory()
  const p = path.join(__dirname, './fixtures/strategies/Unicorn')
  cf.registerType('unicorn', p)
  const unicorn = cf.findStrategy('unicorn')

  t.true(unicorn === require(p))
})

test('should support overriding registered strategies', async t => {
  const cf = new CommandFactory()
  const up = path.join(__dirname, './fixtures/strategies/Unicorn')
  const ap = path.join(__dirname, './fixtures/strategies/Alien')
  cf.registerType('unicorn', up)
  cf.registerType('unicorn', ap)
  const unicorn = cf.findStrategy('unicorn')

  t.true(unicorn === require(ap))
})
