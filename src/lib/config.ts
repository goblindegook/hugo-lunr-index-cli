import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import toml from 'toml'
import yaml from 'js-yaml'

export interface Config {
  [key: string]: any
  contentDir: string
  params: {
    [param: string]: any
    lunrIndexDrafts: boolean
    lunrIndexFile: string
  }
  permalinks?: {
    [section: string]: string
  }
  staticDir: string
}

type Parser = (path: string) => any

const parsers: { [filename: string]: Parser } = {
  'config.toml': toml.parse,
  'config.yaml': yaml.safeLoad,
  'config.json': JSON.parse
}

export function loadConfig (configDir: string): Config {
  const filename = Object.keys(parsers).find(f => existsSync(join(configDir, f)))

  if (!filename) {
    throw new Error('Configuration not found')
  }

  const config = parsers[filename].call(null, readFileSync(join(configDir, filename), 'utf8'))

  return {
    ...config,
    contentDir: join(configDir, config.contentDir || 'content'),
    params: {
      ...config.params,
      lunrIndexDrafts: false,
      lunrIndexFile: 'lunr.json'
    },
    staticDir: join(configDir, config.staticDir || 'static')
  }
}
