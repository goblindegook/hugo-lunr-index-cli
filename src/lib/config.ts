import { existsSync } from 'fs'
import { join } from 'path'
import toml from 'toml'
import yaml from 'js-yaml'
import { readFileP } from './file'

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
  publishDir: string
}

type Parser = (path: string) => any

const parsers: { [filename: string]: Parser } = {
  'config.toml': toml.parse,
  'config.yaml': yaml.safeLoad,
  'config.json': JSON.parse
}

export async function loadConfig (configDir: string): Promise<Config> {
  const filename = Object.keys(parsers).find(f => existsSync(join(configDir, f)))

  if (!filename) {
    throw new Error('Configuration not found')
  }

  const config = parsers[filename].call(null, await readFileP(join(configDir, filename)))

  return {
    ...config,
    contentDir: join(configDir, config.contentDir || 'content'),
    publishDir: join(configDir, config.publishDir || 'public'),
    params: {
      lunrIndexDrafts: false,
      lunrIndexFile: 'lunr.json',
      ...config.params
    }
  }
}
