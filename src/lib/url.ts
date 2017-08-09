import { format } from 'date-fns'
import { parse, sep } from 'path'
import S from 'string'
import { Config } from './config'
import { Frontmatter } from './frontmatter'

export interface Page extends Frontmatter {
  date: Date
  path: string
  title: string
}

function slashAtIndex (s: string, index: number): string {
  return s.length > index && s[index] !== '/' ? '/' : ''
}

function addSlashes (s: string): string {
  return slashAtIndex(s, 0) + s + slashAtIndex(s, s.length - 1)
}

function buildPermalink (page: Page, config: Config): string {
  const { dir, name } = parse(page.path)
  const section = dir.split(sep)[0]

  if (section && config.permalinks && config.permalinks[section]) {
    const title = S(page.title).slugify().s

    return config.permalinks[section]
      .replace(':yearday', format(page.date, 'DDD'))
      .replace(':year', format(page.date, 'YYYY'))
      .replace(':monthname', format(page.date, 'MMMM'))
      .replace(':month', format(page.date, 'MM'))
      .replace(':day', format(page.date, 'DD'))
      .replace(':weekdayname', format(page.date, 'dddd'))
      .replace(':weekday', format(page.date, 'd'))
      .replace(':section', section)
      .replace(':title', title)
      .replace(':slug', page.slug || title)
      .replace(':filename', name)
  } else {
    return ''
  }
}

function buildUrl (page: Page, config: Config): string {
  const { dir, name } = parse(page.path)
  const slug = page.slug || name
  return dir.split(sep).concat(slug === '_index' ? [] : slug).join('/')
}

export function url (page: Page, config: Config): string {
  if (page.url) {
    return page.url
  }

  return addSlashes(buildPermalink(page, config) || buildUrl(page, config))
}
