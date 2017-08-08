import { sep, parse } from 'path'
import { Config } from './config'
import { Frontmatter } from './frontmatter'

function slashAtIndex (s: string, index: number): string {
  return s.length > index && s[index] !== '/' ? '/' : ''
}

function addSlashes (s: string): string {
  return slashAtIndex(s, 0) + s + slashAtIndex(s, s.length - 1)
}

function buildUrl (path: string, frontmatter: Frontmatter): string {
  const { dir, name } = parse(path)
  const slug = frontmatter.slug || name

  return dir.split(sep).concat(slug === '_index' ? [] : slug).join('/')
}

export function url (path: string, frontmatter: Frontmatter, config: Config): string {
  if (frontmatter.url) {
    return frontmatter.url
  }

  return addSlashes(buildUrl(path, frontmatter))
}
