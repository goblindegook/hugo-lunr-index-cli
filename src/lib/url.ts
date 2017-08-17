import { format } from 'date-fns'
import { parse, sep } from 'path'
import S from 'string'
import { Config } from './config'
import { Page } from './page'

function slashAtIndex (s: string, index: number): string {
  return s.length > index && s[index] === '/' ? '' : '/'
}

function maybeAddSlashes (s: string): string {
  return slashAtIndex(s, 0) + s + slashAtIndex(s, s.length - 1)
}

function buildPermalink (filepath: string, page: Page, config: Partial<Config>): string {
  const { dir, name } = parse(filepath)
  const section = dir.split(sep)[0]
  const title = S(page.title).slugify().s
  const permalink = config.permalinks && config.permalinks[section] || ''

  return permalink
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
}

function buildUrl (filepath: string, page: Page): string {
  const { dir, name } = parse(filepath)
  const slug = page.slug || name
  return dir.split(sep).concat(slug === '_index' ? [] : slug).join('/')
}

export function url (filepath: string, page: Page, config: Partial<Config>): string {
  return page.url || maybeAddSlashes(buildPermalink(filepath, page, config) || buildUrl(filepath, page))
}
