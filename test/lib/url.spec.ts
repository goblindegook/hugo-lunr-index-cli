import { url } from '../../src/lib/url'

describe('url()', () => {
  it ('generates a URL from the file path', () => {
    const path = 'path/to/content.md'
    const expected = '/path/to/content/'

    expect(url(path, {}, {})).toBe(expected)
  })

  it ('generates a URL from the file path for _index.md files', () => {
    const path = 'path/to/_index.md'
    const expected = '/path/to/'

    expect(url(path, {}, {})).toBe(expected)
  })

  it ('generates a URL from the file path with a frontmatter "slug" override', () => {
    const path = 'path/to/content.md'
    const frontmatter = { slug: 'slug' }
    const expected = '/path/to/slug/'

    expect(url(path, frontmatter, {})).toBe(expected)
  })

  it('generates a URL taken from the frontmatter "url" field', () => {
    const frontmatter = { url: 'test-url' }
    const expected = frontmatter.url

    expect(url('', frontmatter, {})).toBe(expected)
  })
})
