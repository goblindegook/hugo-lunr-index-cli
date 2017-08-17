import { join, sep } from 'path'
import { Config } from './config'
import { globFilesP, readFileP, writeFileP } from './file'
import { Page, parsePage } from './page'
import { url } from './url'

interface IndexedPage extends Page {
  url: string
}

async function listPages (contentDir: string): Promise<string[]> {
  const files = await globFilesP(join(contentDir, '**', '*'))
  return files.map(f => f.replace(contentDir + sep, ''))
}

async function indexPage (filepath: string, config: Config): Promise<IndexedPage> {
  const content = await readFileP(join(config.contentDir, filepath))
  const page = parsePage(content)
  return {
    url: url(filepath, page, config),
    ...page
  }
}

async function writeIndex (index: IndexedPage[], config: Config): Promise<void> {
  await writeFileP(join(config.publishDir, config.params.lunrIndexFile), JSON.stringify(index))
}

export async function index (config: Config): Promise<void> {
  const pageList = await listPages(config.contentDir)
  const indexedPages = await Promise.all(pageList.map(p => indexPage(p, config)))
  const index = indexedPages.filter(p => config.params.lunrIndexDrafts || !p.draft)
  await writeIndex(index, config)
}
