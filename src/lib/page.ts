import marked from 'marked'
import S from 'string'
import toml from 'toml'
import yaml from 'js-yaml'

export interface Frontmatter {
  [key: string]: any
  date: Date
  slug?: string
  title: string
  url?: string
}

export interface Page extends Frontmatter {
  content: string
}

function parseYaml (content: string): Frontmatter {
  const match = content.match(/^((---|= yaml =)$([\s\S]*?)^(?:\2)(?:\r?\n)?)/m)
  return yaml.safeLoad(match && match[3] || '')
}

function parseToml (content: string): Frontmatter {
  const match = content.match(/^((\+\+\+)$([\s\S]*?)^(?:\2)(?:\r?\n)?)/m)
  return toml.parse(match && match[3] || '')
}

function parseFrontmatter (content: string): Frontmatter {
  const firstLine = content.split(/\r?\n/)[0]

  if (firstLine === '---' || firstLine === '= yaml =') {
    return parseYaml(content)
  }

  if (firstLine === '+++') {
    return parseToml(content)
  }

  return {
    date: new Date(),
    title: ''
  }
}

function parseContent (content: string): string {
  const match = content.match(/^((---|= yaml =|\+\+\+)$[\s\S]*?^(?:\2)(?:\r?\n)?)([\s\S]*)/m)
  const rawContent = match && match[3] || ''
  return S(marked(rawContent)).stripTags().s.trim()
}

export function parse (content: string): Page {
  return {
    ...parseFrontmatter(content),
    content: parseContent(content)
  }
}
