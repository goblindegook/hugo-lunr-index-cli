import { parsePage } from '../../src/lib/page'

test('Parse YAML frontmatter with --- separators', () => {
  const content = 'Test'
  const yaml = `---
date: 2017-08-08T00:00:00+03:00
tags: [ "yaml", "frontmatter", "test" ]
title: YAML Frontmatter
---
${content}`
  const expected = {
    content,
    date: new Date('2017-08-08T00:00:00+03:00'),
    tags: [ 'yaml', 'frontmatter', 'test' ],
    title: 'YAML Frontmatter'
  }

  expect(parsePage(yaml)).toEqual(expected)
})

test('Parse YAML frontmatter with = yaml = separators', () => {
  const content = 'Test'
  const yaml = `= yaml =
date: 2017-08-08T00:00:00+03:00
tags: [ "yaml", "frontmatter", "test" ]
title: YAML Frontmatter
= yaml =
${content}`
  const expected = {
    content,
    date: new Date('2017-08-08T00:00:00+03:00'),
    tags: [ 'yaml', 'frontmatter', 'test' ],
    title: 'YAML Frontmatter'
  }

  expect(parsePage(yaml)).toEqual(expected)
})

test('Parse TOML frontmatter with +++ separators', () => {
  const content = 'Test'
  const toml = `+++
date = 2017-08-08T00:00:00+03:00
tags = [ "toml", "frontmatter", "test" ]
title = "TOML Frontmatter"
+++
${content}`
  const expected = {
    content,
    date: new Date('2017-08-08T00:00:00+03:00'),
    tags: [ 'toml', 'frontmatter', 'test' ],
    title: 'TOML Frontmatter'
  }

  expect(parsePage(toml)).toEqual(expected)
})

test('Strip HTML from parsed content', () => {
  const title = 'HTML Content'
  const toml = `+++
title = "${title}"
+++
<div>Test</div>`

  const expected = { content: 'Test', title }

  expect(parsePage(toml)).toEqual(expected)
})

test('Strip Markdown from parsed content', () => {
  const title = 'Markdown Content'
  const toml = `+++
title = "${title}"
+++
*Test*`

  const expected = { content: 'Test', title }

  expect(parsePage(toml)).toEqual(expected)
})
