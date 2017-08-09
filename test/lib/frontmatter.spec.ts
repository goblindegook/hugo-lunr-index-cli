import { frontmatter } from '../../src/lib/frontmatter'

test('parse content with no frontmatter', () => {
  const nothing = `no frontmatter`
  const expected = {}

  expect(frontmatter(nothing)).toEqual(expected)
})

test('parse YAML frontmatter with --- separators', () => {
  const yaml = `---
date: 2017-08-08T00:00:00+03:00
tags: [ "yaml", "frontmatter", "test" ]
title: YAML Frontmatter
---`
  const expected = {
    date: new Date('2017-08-08T00:00:00+03:00'),
    tags: [ 'yaml', 'frontmatter', 'test' ],
    title: 'YAML Frontmatter'
  }

  expect(frontmatter(yaml)).toEqual(expected)
})

test('parse YAML frontmatter with = yaml = separators', () => {
  const yaml = `= yaml =
date: 2017-08-08T00:00:00+03:00
tags: [ "yaml", "frontmatter", "test" ]
title: YAML Frontmatter
= yaml =`
  const expected = {
    date: new Date('2017-08-08T00:00:00+03:00'),
    tags: [ 'yaml', 'frontmatter', 'test' ],
    title: 'YAML Frontmatter'
  }

  expect(frontmatter(yaml)).toEqual(expected)
})

test('parse TOML frontmatter with +++ separators', () => {
  const toml = `+++
date = 2017-08-08T00:00:00+03:00
tags = [ "toml", "frontmatter", "test" ]
title = "TOML Frontmatter"
+++`
  const expected = {
    date: new Date('2017-08-08T00:00:00+03:00'),
    tags: [ 'toml', 'frontmatter', 'test' ],
    title: 'TOML Frontmatter'
  }

  expect(frontmatter(toml)).toEqual(expected)
})
