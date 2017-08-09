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
  return safeLoad(match && match[3] || '')
}

function parseToml (content: string): Frontmatter {
  const match = content.match(/^((?:\+\+\+)$([\s\S]*?)^(?:\+\+\+)(?:\r?\n)?)/m)
  return parse(match && match[2] || '')
}

export function frontmatter (content: string): Frontmatter {
  const firstLine = content.split(/\r?\n/)[0]

  switch (firstLine) {
    case '---':
    case '= yaml =':
      return parseYaml(content)

    case '+++':
      return parseToml(content)

    default:
      return {}
  }
}
