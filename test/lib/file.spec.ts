import { readFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { globFilesP, readFileP, writeFileP } from '../../src/lib/file'

test('globFilesP returns an empty list when pattern matches no files', async () => {
  const actual = await globFilesP(join('test', 'fixtures', 'file', 'none-*'))
  expect(actual).toEqual([])
})

test('globFilesP returns a list of files that match a pattern', async () => {
  const actual = await globFilesP(join('test', 'fixtures', 'file', '**', '*'))
  expect(actual).toEqual([
    join('test', 'fixtures', 'file', 'hello.txt')
  ])
})

test('readFileP reads and returns data from the filesystem', async () => {
  const actual = await readFileP(join('test', 'fixtures', 'file', 'hello.txt'))
  expect(actual).toContain('Hello, world!')
})

test('writeFileP writes data to the filesystem', async () => {
  const path = join(tmpdir(), `hugo-lunr-index-cli-${Date.now()}.txt`)
  const data = 'Hello, world!'
  await writeFileP(path, data)
  expect(readFileSync(path, 'utf8')).toBe(data)
})
