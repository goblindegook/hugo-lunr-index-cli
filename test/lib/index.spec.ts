import { list } from '../../src/lib/index'
import { join } from 'path'

test('Scan directory for files', async () => {
  const base = join('.', 'test', 'fixtures')
  const expected = [
    join('frontmatter', 'toml.md'),
    join('frontmatter', 'yaml.md'),
    join('page', 'markdown.md')
  ]

  expect(await list(base)).toEqual(expected)
})
