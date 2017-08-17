import { join } from 'path'
import { loadConfig } from '../../src/lib/config'

test('Load TOML configuration file first', async () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'toml')
  const expected = { test: true }
  expect(await loadConfig(configDir)).toMatchObject(expected)
})

test('Load YAML configuration file if no TOML found', async () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'yaml')
  const expected = { test: true }
  expect(await loadConfig(configDir)).toMatchObject(expected)
})

test('Load JSON configuration file if no TOML or YAML found', async () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'json')
  const expected = { test: true }
  expect(await loadConfig(configDir)).toMatchObject(expected)
})

test('Throws an error if no configuration files are found', async () => {
  const configDir = join('.', 'test', 'fixtures', 'config')
  try {
    await loadConfig(configDir)
    fail()
  } catch (e) {
    expect(e).toEqual(new Error('Configuration not found'))
  }
})

test('Set default contentDir', async () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'empty')
  const expected = { contentDir: join(configDir, 'content') }
  expect(await loadConfig(configDir)).toMatchObject(expected)
})

test('Redefine contentDir using config root directory', async () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'contentDir')
  const expected = { contentDir: join(configDir, 'custom') }
  expect(await loadConfig(configDir)).toMatchObject(expected)
})

test('Set default publishDir', async () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'empty')
  const expected = { publishDir: join(configDir, 'public') }
  expect(await loadConfig(configDir)).toMatchObject(expected)
})

test('Redefine contentDir using config root directory', async () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'publishDir')
  const expected = { publishDir: join(configDir, 'custom') }
  expect(await loadConfig(configDir)).toMatchObject(expected)
})

test('Set default index filename', async () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'empty')
  const expected = { params: { lunrIndexFile: 'lunr.json' } }
  expect(await loadConfig(configDir)).toMatchObject(expected)
})

test('Set default index filename', async () => {
  const configDir = join('.', 'test', 'fixtures', 'config', 'empty')
  const expected = { params: { lunrIndexDrafts: false } }
  expect(await loadConfig(configDir)).toMatchObject(expected)
})
