import * as execa from 'execa'
import { createReadStream, createWriteStream, mkdtempSync, readFileSync, writeFileSync } from 'fs'
import * as mkdirp from 'mkdirp'
import { tmpdir } from 'os'
import { join } from 'path'

test('Writes index file to published path.', async () => {
  const rootPath = mkdtempSync(join(tmpdir(), `hugo-lunr-index-cli-`))
  const indexFilePath = join(rootPath, 'public', 'lunr.json')
  const fixturesPath = join('test', 'fixtures')

  writeFileSync(join(rootPath, 'config.toml'), '')
  mkdirp.sync(join(rootPath, 'content', 'page'))
  mkdirp.sync(join(rootPath, 'public'))
  createReadStream(join(fixturesPath, 'content', 'page', 'markdown.md'))
    .pipe(createWriteStream(join(rootPath, 'content', 'page', 'markdown.md')))

  const { stdout } = await execa('ts-node', ['./src/index.ts', rootPath])

  const actualIndex = JSON.parse(readFileSync(indexFilePath, 'utf8'))

  expect(stdout).toContain(`Index written to ${indexFilePath}.`)
  expect(actualIndex).toHaveLength(1)
  expect(actualIndex[0].url).toBe('/page/markdown/')
})

test('Outputs error when no config file found.', async () => {
  const { stderr } = await execa('ts-node', ['./src/index.ts', '.'])

  expect(stderr).toContain(`Error: Site configuration not found.`)
})
