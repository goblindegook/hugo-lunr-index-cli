import glob from 'glob'
import { join, sep } from 'path'
import { Page } from './page'

export interface IndexedPage extends Page {
  url: string
}

export async function list (basepath: string): Promise<string[]> {
  const options: glob.IOptions = {
    nodir: true,
    silent: true
  }

  const pattern = join(basepath, '**', '*')

  return new Promise<string[]>((resolve, reject) => {
    glob(pattern, options, (error, files) => {
      if (error) {
        reject(error)
      } else {
        resolve(files.map(f => f.replace(basepath + sep, '')))
      }
    })
  })
}
