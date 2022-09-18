import { MarkdownParser, renderResult } from './bodyParser'
import {
  HeaderContent,
  headerParser,
  headerReg,
  MarkdownParserOptions,
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
  toc = false
) {
  const description = headerParser(fileContent)
  const mainContent = fileContent.replace(headerReg, '')

  const parser = new MarkdownParser(option || {})

  let contentHTML = toc
    ? parser.render(mainContent, toc)
    : parser.render(mainContent)
  return { contentHTML, description }
}
