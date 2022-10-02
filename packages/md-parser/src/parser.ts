import type { renderResult } from './bodyParser'
import { MarkdownParser } from './bodyParser'
import type {
  HeaderContent,
  MarkdownParserOptions,
} from '.'
import {
  headerParser,
  headerReg,
} from '.'

export function analyseArticle(
  fileContent: string,
  option?: MarkdownParserOptions
): {
  contentHTML: string
  description: HeaderContent
}

export function analyseArticle(
  fileContent: string,
  option?: MarkdownParserOptions,
  toc?: boolean
): {
  contentHTML: renderResult
  description: HeaderContent
}

export function analyseArticle(
  fileContent: string,
  option?: MarkdownParserOptions,
  toc = false,
) {
  const description = headerParser(fileContent)
  const mainContent = fileContent.replace(headerReg, '')

  const parser = new MarkdownParser(option || {})

  const contentHTML = toc
    ? parser.render(mainContent, toc)
    : parser.render(mainContent)
  return { contentHTML, description }
}
