import * as yaml from 'js-yaml'
import * as marked from 'marked'
import * as S from 'string'
import * as toml from 'toml'

interface Frontmatter {
  [key: string]: any
  date: Date
  draft?: boolean
  slug?: string
  title: string
  url?: string
}

export interface Page extends Frontmatter {
  content: string
}

function parseYaml (content: string): Frontmatter {
  const match = content.match(/^((---|= yaml =)$([\s\S]*?)^(?:\2|\.\.\.)(?:\r?\n)?)/m)
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

function stripMarkup (text: string): string {
  return S(marked(text)).stripTags().s.trim()
}

function parseContent (content: string): string {
  const match = content.match(/^((---|= yaml =|\+\+\+)$[\s\S]*?^(?:\2|\.\.\.)(?:\r?\n)?)([\s\S]*)/m)
  const rawContent = match && match[3] || ''
  return stripMarkup(rawContent)
}

export function parsePage (content: string): Page {
  return {
    ...parseFrontmatter(content),
    content: parseContent(content)
  }
}
