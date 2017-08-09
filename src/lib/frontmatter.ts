import { safeLoad } from 'js-yaml'
import { parse } from 'toml'

export interface Frontmatter {
  [key: string]: any
  date?: Date
  slug?: string
  title?: string
  url?: string
}

function parseYaml (content: string): Frontmatter {
  const match = content.match(/^((---|= yaml =)$([\s\S]*?)^(?:\2)(?:\r?\n)?)/m)
  const yaml = match && match[3] && match[3].replace(/^\s+|\s+$/, '') || ''
  return safeLoad(yaml)
}

function parseToml (content: string): Frontmatter {
  const match = content.match(/^((?:\+\+\+)$([\s\S]*?)^(?:\+\+\+)(?:\r?\n)?)/m)
  const toml = match && match[2] && match[2].replace(/^\s+|\s+$/, '') || ''
  return parse(toml)
}

export function frontmatter (content: string): Frontmatter {
  const firstLine = content.split(/\r?\n/)[0]

  if (firstLine === '---' || firstLine === '= yaml =') {
    return parseYaml(content)
  }

  if (firstLine === '+++') {
    return parseToml(content)
  }

  return {}
}
