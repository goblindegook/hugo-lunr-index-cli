import { format } from 'date-fns'
import { parse, sep } from 'path'
import S from 'string'
import { Config } from './config'
import { Page } from './page'

function slashAtIndex (s: string, index: number): string {
  return s.length > index && s[index] !== '/' ? '/' : ''
}

function addSlashes (s: string): string {
  return slashAtIndex(s, 0) + s + slashAtIndex(s, s.length - 1)
}

function buildPermalink (path: string, page: Page, config: Config): string {
  const { dir, name } = parse(path)
  const section = dir.split(sep)[0]
  const permalink = config.permalinks && config.permalinks[section] || ''
  const title = S(page.title).slugify().s
  const date = page.date || new Date() // FIXME: Use file date.

  return permalink
    .replace(':yearday', format(date, 'DDD'))
    .replace(':year', format(date, 'YYYY'))
    .replace(':monthname', format(date, 'MMMM'))
    .replace(':month', format(date, 'MM'))
    .replace(':day', format(date, 'DD'))
    .replace(':weekdayname', format(date, 'dddd'))
    .replace(':weekday', format(date, 'd'))
    .replace(':section', section)
    .replace(':title', title)
    .replace(':slug', page.slug || title)
    .replace(':filename', name)
}

function buildUrl (path: string, page: Page, config: Config): string {
  const { dir, name } = parse(path)
  const slug = page.slug || name
  return dir.split(sep).concat(slug === '_index' ? [] : slug).join('/')
}

export function url (path: string, page: Page, config: Config): string {
  return page.url || addSlashes(buildPermalink(path, page, config) || buildUrl(path, page, config))
}
