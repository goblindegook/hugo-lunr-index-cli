import { index } from '../../src/lib/index'
import { join } from 'path'
import { statSync } from 'fs'
import { list } from '../../src/lib/index'

test('Scan directory for files', async () => {
  const base = join('.', 'test', 'fixtures', 'content')
  const expected = [
    join('frontmatter', 'toml.md'),
    join('frontmatter', 'yaml.md'),
    join('page', 'markdown.md')
  ]

  expect(await list(base)).toEqual(expected)
})

test('Index a single file', async () => {
  const filepath = join('page', 'markdown.md')
  const base = join('.', 'test', 'fixtures', 'content')
  const config = {}

  const expected = {
    content: 'Heading\nContent.',
    date: new Date('2017-08-08T00:00:00+03:00'),
    title: 'Markdown',
    url: '/page/markdown/'
  }

  expect(await index(filepath, base, config)).toEqual(expected)
})
