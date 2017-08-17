import { mkdtempSync, readFileSync } from 'fs'
import { join, sep } from 'path'
import { tmpdir } from 'os'
import { index } from '../../src/lib/index'

const tmp = mkdtempSync(tmpdir() + sep + 'hugo-lunr-index-cli-')

function jsonNormalize (data: any): any {
  return JSON.parse(JSON.stringify(data))
}

test('Index all pages to foo.json, excluding drafts', async () => {
  const config = {
    contentDir: join('.', 'test', 'fixtures', 'content'),
    params: {
      lunrIndexDrafts: false,
      lunrIndexFile: 'foo.json'
    },
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

  const actual = JSON.parse(readFileSync(join(config.staticDir, config.params.lunrIndexFile), 'utf8'))

  expect(actual).toEqual(jsonNormalize(expected))
})

test('Index all pages to foo.json, including drafts', async () => {
  const config = {
    contentDir: join('.', 'test', 'fixtures', 'content'),
    params: {
      lunrIndexDrafts: true,
      lunrIndexFile: 'foo.json'
    },
    staticDir: tmp
  }

  const expected = {
    content: 'This is a draft.',
    date: new Date('2017-08-08T00:00:00+03:00'),
    draft: true,
    title: 'Draft',
    url: '/page/draft/'
  }

  await index(config)

  const actual = JSON.parse(readFileSync(join(config.staticDir, config.params.lunrIndexFile), 'utf8'))

  expect(actual).toContainEqual(jsonNormalize(expected))
})
