import { format, parse } from 'path'
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

  if (frontmatter.slug) {
    return format({
      root: '/',
      dir,
      base: '',
      name: frontmatter.slug,
      ext: ''
    })
  }

  return format({
    root: '/',
    dir,
    base: '',
    name: name === '_index' ? '' : name,
    ext: ''
  })
}

export function url (path: string, frontmatter: Frontmatter, config: Config): string {
  if (frontmatter.url) {
    return frontmatter.url
  }

  return addSlashes(buildUrl(path, frontmatter))
}
