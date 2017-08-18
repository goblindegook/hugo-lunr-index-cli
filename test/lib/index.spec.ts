import { mkdtempSync, readFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { Config } from '../../src/lib/config'
import { index } from '../../src/lib/index'

const tmp = mkdtempSync(join(tmpdir(), 'hugo-lunr-index-cli-'))

function jsonNormalize (data: any): any {
  return JSON.parse(JSON.stringify(data))
}

function createConfig (lunrIndexDrafts = false): Config {
  return {
    contentDir: join('.', 'test', 'fixtures', 'content'),
    params: {
      lunrIndexDrafts,
      lunrIndexFile: 'foo.json'
    },
    permalinks: {
      page: '/permalink/:filename/'
    },
    publishDir: tmp
  }
}

test('Index all pages to foo.json, excluding drafts', async () => {
  const config = createConfig()

  const expected = [
    {
      content: 'Heading\nContent.',
      date: new Date('2017-08-08T00:00:00+03:00'),
      title: 'Markdown',
      url: '/permalink/markdown/'
    }
  ]

  await index(config)

  const actual = JSON.parse(readFileSync(join(config.publishDir, config.params.lunrIndexFile), 'utf8'))

  expect(actual).toEqual(jsonNormalize(expected))
})

test('Index all pages to foo.json, including drafts', async () => {
  const config = createConfig(true)

  const expected = [
    {
      content: 'This is a draft.',
      date: new Date('2017-08-08T00:00:00+03:00'),
      draft: true,
      title: 'Draft',
      url: '/permalink/draft/'
    },
    {
      content: 'Heading\nContent.',
      date: new Date('2017-08-08T00:00:00+03:00'),
      title: 'Markdown',
      url: '/permalink/markdown/'
    }
  ]

  await index(config)

  const actual = JSON.parse(readFileSync(join(config.publishDir, config.params.lunrIndexFile), 'utf8'))

  expect(actual).toEqual(jsonNormalize(expected))
})
