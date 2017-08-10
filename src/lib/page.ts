import marked from 'marked'
import S from 'string'
import toml from 'toml'
import yaml from 'js-yaml'

export interface Frontmatter {
  [key: string]: any
  date?: Date
  slug?: string
  title?: string
  url?: string
}

export interface Content extends Frontmatter {
  content: string
}

export interface Page extends Content {
  date: Date
}

function parseYaml (content: string): Frontmatter {
  const match = content.match(/^((---|= yaml =)$([\s\S]*?)^(?:\2)(?:\r?\n)?)/m)
  return yaml.safeLoad(match && match[3] || '')
}

function parseToml (content: string): Frontmatter {
  const match = content.match(/^((?:\+\+\+)$([\s\S]*?)^(?:\+\+\+)(?:\r?\n)?)/m)
  return toml.parse(match && match[2] || '')
}

function parseFrontmatter (content: string): Frontmatter {
  const firstLine = content.split(/\r?\n/)[0]

  if (firstLine === '---' || firstLine === '= yaml =') {
    return parseYaml(content)
  }

  if (firstLine === '+++') {
    return parseToml(content)
  }

  return {}
}

function parseContent (content: string): string {
  const match = content.match(/^((---|= yaml =|\+\+\+)$[\s\S]*?^(?:\2)(?:\r?\n)?)?(.*)/m)
  const rawContent = match && match[3] || ''
  return S(marked(rawContent)).stripTags().s.trim()
}

export function parse (content: string): Content {
  return {
    ...parseFrontmatter(content),
    content: parseContent(content)
  }
}
