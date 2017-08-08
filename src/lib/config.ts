export interface Config {
  [key: string]: any
  permalinks?: {
    [section: string]: string
  }
}
