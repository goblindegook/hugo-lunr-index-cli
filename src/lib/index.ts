import { readFile, writeFile } from 'fs'
import glob from 'glob'
import { join, sep } from 'path'
import { Config } from './config'
import { Page, parsePage } from './page'
import { url } from './url'

interface IndexedPage extends Page {
  url: string
}

async function listPages (contentDir: string): Promise<string[]> {
  const options: glob.IOptions = {
    nodir: true,
    silent: true
  }

  const pattern = join(contentDir, '**', '*')

  return new Promise<string[]>((resolve, reject) => {
    glob(pattern, options, (error, files) => {
      if (error) {
        reject(error)
      } else {
        resolve(files.map(f => f.replace(contentDir + sep, '')))
      }
    })
  })
}

async function indexPage (filepath: string, config: Config): Promise<IndexedPage> {
  return new Promise<IndexedPage>((resolve, reject) => {
    readFile(join(config.contentDir, filepath), 'utf8', (error, content) => {
      if (error) {
        reject(error)
      } else {
        const page = parsePage(content)

        resolve({
          url: url(filepath, page, config),
          ...page
        })
      }
    })
  })
}

async function writeIndex (index: IndexedPage[], config: Config): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    writeFile(join(config.staticDir, config.params.lunrIndexFile), JSON.stringify(index), (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

export async function index (config: Config): Promise<void> {
  const pageList = await listPages(config.contentDir)
  const indexedPages = await Promise.all(pageList.map(p => indexPage(p, config)))
  const index = indexedPages.filter(p => config.params.lunrIndexDrafts || !p.draft)
  await writeIndex(index, config)
}
