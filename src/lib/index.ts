import { readFile } from 'fs'
import glob from 'glob'
import { join, sep } from 'path'
import { Config } from './config'
import { Page, parse } from './page'
import { url } from './url'

export interface IndexedPage extends Page {
  url: string
}

export async function list (path: string): Promise<string[]> {
  const options: glob.IOptions = {
    nodir: true,
    silent: true
  }

  const pattern = join(path, '**', '*')

  return new Promise<string[]>((resolve, reject) => {
    glob(pattern, options, (error, files) => {
      if (error) {
        reject(error)
      } else {
        resolve(files.map(f => f.replace(path + sep, '')))
      }
    })
  })
}

export async function index (path: string, base: string, config: Config): Promise<IndexedPage> {
  return new Promise<IndexedPage>((resolve, reject) => {
    readFile(join(base, path), 'utf8', (error, content) => {
      if (error) {
        reject(error)
      } else {
        const page = parse(content)
        const pageUrl = url(path, page, config)

        resolve({ url: pageUrl, ...page })
      }
    })
  })
}
