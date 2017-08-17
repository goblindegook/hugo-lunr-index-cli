import { join } from 'path'
import { loadConfig } from '../../src/lib/config'

test('Load TOML configuration file first', () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'toml')
  const expected = { test: true }
  expect(loadConfig(configDir)).toMatchObject(expected)
})

test('Load YAML configuration file if no TOML found', () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'yaml')
  const expected = { test: true }
  expect(loadConfig(configDir)).toMatchObject(expected)
})

test('Load JSON configuration file if no TOML or YAML found', () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'json')
  const expected = { test: true }
  expect(loadConfig(configDir)).toMatchObject(expected)
})

test('Throws an error if no configuration files are found', () => {
  const configDir = join('.', 'test', 'fixtures', 'config')
  expect(() => loadConfig(configDir)).toThrowError('Configuration not found')
})

test('Set default contentDir', () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'empty')
  const expected = { contentDir: join(configDir, 'content') }
  expect(loadConfig(configDir)).toMatchObject(expected)
})

test('Redefine contentDir using config root directory', () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'contentDir')
  const expected = { contentDir: join(configDir, 'custom') }
  expect(loadConfig(configDir)).toMatchObject(expected)
})

test('Set default staticDir', () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'empty')
  const expected = { staticDir: join(configDir, 'static') }
  expect(loadConfig(configDir)).toMatchObject(expected)
})

test('Redefine contentDir using config root directory', () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'staticDir')
  const expected = { staticDir: join(configDir, 'custom') }
  expect(loadConfig(configDir)).toMatchObject(expected)
})

test('Set default index filename', () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'empty')
  const expected = { params: { lunrIndexFile: 'lunr.json' } }
  expect(loadConfig(configDir)).toMatchObject(expected)
})

test('Set default index filename', () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'empty')
  const expected = { params: { lunrIndexDrafts: false } }
  expect(loadConfig(configDir)).toMatchObject(expected)
})
