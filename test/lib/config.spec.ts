import { parse } from '../../src/lib/config'

test('Parse empty config', () => {
  expect(parse('')).toEqual({})
})

test('Parse TOML configuration', () => {
  const toml = `array = [ "toml", "config", "test" ]
date = 2017-08-08T00:00:00+03:00
string = "TOML Config"`

  const expected = {
    array: ['toml', 'config', 'test'],
    date: new Date('2017-08-08T00:00:00+03:00'),
    string: 'TOML Config'
  }

  expect(parse(toml)).toEqual(expected)
})
