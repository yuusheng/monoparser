import { it, expect, describe } from 'vitest'
import { MarkdownParser } from '../src/bodyParser'

describe('markdown parser constructor', () => {
  it('should worked', () => {
    const markdownParser = new MarkdownParser()

    Object.keys({}).forEach((key) => {
      console.log('key', key)
    })
  })
})
