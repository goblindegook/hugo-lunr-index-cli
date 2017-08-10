import { join } from 'path'
import { url } from '../../src/lib/url'
import { Page } from '../../src/lib/page'

const path = join('path', 'to', 'page.md')

function createPage (overrides = {}): Page {
  return {
    content: '',
    date: new Date(),
    title: 'Page Title',
    ...overrides
  }
}

test('Generate a URL from the file path', () => {
  const page = createPage()

  const expected = '/path/to/page/'

  expect(url(path, page, {})).toBe(expected)
})

test('Generate a URL from the file path for _index.md files', () => {
  const indexPath = join('path', 'to', '_index.md')
  const page = createPage({})

  const expected = '/path/to/'

  expect(url(indexPath, page, {})).toBe(expected)
})

test('Generate a URL from the file path with a frontmatter "slug" override', () => {
  const page = createPage({ slug: 'slug' })

  const expected = '/path/to/slug/'

  expect(url(path, page, {})).toBe(expected)
})

test('Generate a URL from the permalinks configuration', () => {
  const page = createPage()
  const config = { permalinks: { path: 'test' } }

  const expected = '/test/'

  expect(url(path, page, config)).toBe(expected)
})

test('Generate a URL from the permalinks configuration, replacing :year from page date', () => {
  const page = createPage({ date: new Date(2017, 7) })
  const config = { permalinks: { path: '/:year/' } }

  const expected = '/2017/'

  expect(url(path, page, config)).toBe(expected)
})

test('Generate a URL from the permalinks configuration, replacing :month from page date', () => {
  const page = createPage({ date: new Date(2017, 7) })
  const config = { permalinks: { path: '/:month/' } }

  const expected = '/08/'

  expect(url(path, page, config)).toBe(expected)
})

test('Generate a URL from the permalinks configuration, replacing :monthname from page date', () => {
  const page = createPage({ date: new Date(2017, 7) })
  const config = { permalinks: { path: '/:monthname/' } }

  const expected = '/August/'

  expect(url(path, page, config)).toBe(expected)
})

test('Generate a URL from the permalinks configuration, replacing :day from page date', () => {
  const page = createPage({ date: new Date(2017, 7, 9) })
  const config = { permalinks: { path: '/:day/' } }

  const expected = '/09/'

  expect(url(path, page, config)).toBe(expected)
})

test('Generate a URL from the permalinks configuration, replacing :weekday from page date', () => {
  const page = createPage({ date: new Date(2017, 7, 9) })
  const config = { permalinks: { path: '/:weekday/' } }

  const expected = '/3/'

  expect(url(path, page, config)).toBe(expected)
})

test('Generate a URL from the permalinks configuration, replacing :weekday from page date', () => {
  const page = createPage({ date: new Date(2017, 7, 9) })
  const config = { permalinks: { path: '/:weekdayname/' } }

  const expected = '/Wednesday/'

  expect(url(path, page, config)).toBe(expected)
})

test('Generate a URL from the permalinks configuration, replacing :yearday from page date', () => {
  const page = createPage({ date: new Date(2017, 7, 9) })
  const config = { permalinks: { path: '/:yearday/' } }

  const expected = '/221/'

  expect(url(path, page, config)).toBe(expected)
})

test('Generate a URL from the permalinks configuration, replacing :section from page section', () => {
  const page = createPage({})
  const config = { permalinks: { path: '/:section/' } }

  const expected = '/path/'

  expect(url(path, page, config)).toBe(expected)
})

test('Generate a URL from the permalinks configuration, replacing :slug from page slug', () => {
  const page = createPage({ slug: 'slug' })
  const config = { permalinks: { path: '/:slug/' } }

  const expected = '/slug/'

  expect(url(path, page, config)).toBe(expected)
})

test('Generate a URL from the permalinks configuration, replacing :title from page title', () => {
  const page = createPage()
  const config = { permalinks: { path: '/:title/' } }

  const expected = '/page-title/'

  expect(url(path, page, config)).toBe(expected)
})

test('Generate a URL from the permalinks configuration, replacing :slug from page title if slug undefined', () => {
  const page = createPage()
  const config = { permalinks: { path: '/:slug/' } }

  const expected = '/page-title/'

  expect(url(path, page, config)).toBe(expected)
})

test('Generate a URL from the permalinks configuration, replacing :filename from page filename', () => {
  const page = createPage()
  const config = { permalinks: { path: '/:filename/' } }

  const expected = '/page/'

  expect(url(path, page, config)).toBe(expected)
})

test('Generate a URL taken from the frontmatter "url" field', () => {
  const page = createPage({ url: 'test-url' })

  const expected = page.url

  expect(url(path, page, {})).toBe(expected)
})
