import { it, expect, describe } from 'vitest'
import { defineConfig, MarkdownParser } from '../src'

describe('markdown parser constructor', () => {
  it('should worked', () => {
    const options = defineConfig({})
    const markdownParser = new MarkdownParser()
  })
})
