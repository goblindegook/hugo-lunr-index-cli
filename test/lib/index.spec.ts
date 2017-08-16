import { mkdtempSync, readFileSync } from 'fs'
import { join, sep } from 'path'
import { tmpdir } from 'os'
import { index } from '../../src/lib/index'

const tmp = mkdtempSync(tmpdir() + sep + 'hugo-lunr-index-cli-')

function jsonNormalize (data: any): any {
  return JSON.parse(JSON.stringify(data))
}

test('Index all files', async () => {
  const config = {
    contentDir: join('.', 'test', 'fixtures', 'content'),
    staticDir: tmp
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

  await index(config)

  const actual = JSON.parse(readFileSync(join(config.staticDir, 'lunr.json'), 'utf8'))

  expect(actual).toEqual(jsonNormalize(expected))
})
