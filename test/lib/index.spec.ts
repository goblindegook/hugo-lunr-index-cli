import { join } from 'path'
import { index } from '../../src/lib/index'

test('Index all files', async () => {
  const config = {
    contentDir: join('.', 'test', 'fixtures', 'content')
  }

  const expected = [
    {
      content: 'Content.',
      date: new Date('2017-08-08T00:00:00+03:00'),
      tags: [ 'toml', 'frontmatter', 'test' ],
      title: 'TOML Frontmatter',
      url: '/frontmatter/toml/'
    },
    {
      content: 'Content.',
      date: new Date('2017-08-08T00:00:00+03:00'),
      tags: [ 'yaml', 'frontmatter', 'test' ],
      title: 'YAML Frontmatter',
      url: '/frontmatter/yaml/'
    },
    {
      content: 'Heading\nContent.',
      date: new Date('2017-08-08T00:00:00+03:00'),
      title: 'Markdown',
      url: '/page/markdown/'
    }
  ]

  expect(await index(config)).toEqual(expected)
})
