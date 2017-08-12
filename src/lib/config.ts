import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import toml from 'toml'
import yaml from 'js-yaml'

export interface Config {
  [key: string]: any
  contentDir: string
  permalinks?: {
    [section: string]: string
  }
}

export function loadConfig (configDir: string): Config {
  const tomlConfig = join(configDir, 'config.toml')
  const yamlConfig = join(configDir, 'config.yaml')
  const jsonConfig = join(configDir, 'config.json')
  let config: Config

  if (existsSync(tomlConfig)) {
    config = toml.parse(readFileSync(tomlConfig, 'utf8'))
  } else if (existsSync(yamlConfig)) {
    config = yaml.safeLoad(readFileSync(yamlConfig, 'utf8'))
  } else if (existsSync(jsonConfig)) {
    config = yaml.safeLoad(readFileSync(jsonConfig, 'utf8'))
  } else {
    throw new Error('Configuration not found')
  }

  return {
    ...config,
    contentDir: join(configDir, config.contentDir || 'content')
  }
}
