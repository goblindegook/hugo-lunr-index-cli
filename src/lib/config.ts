import { existsSync } from 'fs'
import yaml from 'js-yaml'
import { join } from 'path'
import toml from 'toml'
import { readFileP } from './file'

interface Params {
  [param: string]: any
  lunrIndexDrafts: boolean
  lunrIndexFile: string
}

export interface Permalinks {
  [section: string]: string
}

export interface Config {
  [key: string]: any
  contentDir: string
  params: Params
  permalinks?: Permalinks
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
