import { Frontmatter } from './frontmatter'

export interface Page extends Frontmatter {
  date: Date
  path: string
  title: string
}
