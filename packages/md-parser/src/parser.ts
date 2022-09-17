import { MarkdownParser } from './bodyParser'
import { headerParser, headerReg, parse, MarkdownParserOptions } from '.'

export function analyseArticle(
  fileContent: string,
  option?: MarkdownParserOptions
) {
  const description = headerParser(fileContent)
  const mainContent = fileContent.replace(headerReg, '')

  const parser = new MarkdownParser(option || {})

  let contentHTML = parser.render(mainContent)
  return { contentHTML, description }
}
