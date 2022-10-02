import { expect, it } from 'vitest'
import { headerParser } from '../src'

const content = `
---
title: 我爱你中国
createTime: 2022-02-17
changeTime: 2022-02-17
---
`

it('haeder interpreter should work', () => {
  expect(headerParser(content)).toMatchInlineSnapshot(`
    {
      "changeTime": "2022-02-17",
      "createTime": "2022-02-17",
      "title": "我爱你中国",
    }
  `)
})

it('test', () => {
  const str = `11111
2222
`
  const reg = /.*(?<=\n)/gs

  expect(str.match(reg)).toMatchInlineSnapshot(`
    [
      "11111
    2222
    ",
      "",
    ]
  `)
  const headerReg = /---\n((.*)\n)\n---/is
  expect(content.match(headerReg)).toMatchInlineSnapshot('null')
})
