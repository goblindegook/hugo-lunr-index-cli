import toml from 'toml'

export interface Config {
  [key: string]: any
  permalinks?: {
    [section: string]: string
  }
}

export function parse (config: string): Config {
  return toml.parse(config)
}
