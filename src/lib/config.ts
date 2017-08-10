import toml from 'toml'

export interface Config {
  [key: string]: any
  contentDir: string
  permalinks?: {
    [section: string]: string
  }
}

export function parse (config: string): Config {
  return toml.parse(config)
}
