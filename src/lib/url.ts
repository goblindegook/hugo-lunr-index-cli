import { format } from 'date-fns'
import { parse, sep } from 'path'
import * as S from 'string'
import { Permalinks } from './config'
import { Page } from './page'

function ensureSlashes (s: string): string {
  return S(s).ensureLeft('/').ensureRight('/').s
}

function buildPermalink (filepath: string, page: Page, permalinks: Permalinks): string {
  const title = S(page.title).slugify().s
  const { dir, name } = parse(filepath)
  const section = dir.split(sep)[0]
  const sectionPermalink = permalinks[section] || ''

  return sectionPermalink
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

export function url (filepath: string, page: Page, permalinks: Permalinks = {}): string {
  return page.url || ensureSlashes(buildPermalink(filepath, page, permalinks) || buildUrl(filepath, page))
}
