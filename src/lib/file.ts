import { readFile, writeFile } from 'fs'
import * as glob from 'glob'

export async function globFilesP (pattern: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    glob(pattern, { nodir: true, silent: true }, (error, files) => {
      if (error) {
        reject(error)
      } else {
        resolve(files)
      }
    })
  })
}

export async function readFileP (path: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

export async function writeFileP (path: string, data: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    writeFile(path, data, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
