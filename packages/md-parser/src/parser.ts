import { MarkdownParser } from './bodyParser'
import { promises as fs } from 'fs'
import { headerParser, headerReg, parse, MarkdownParserOptions } from '.'

export async function getFileContent(path: string) {
  const file = await fs.readFile(path, {
    encoding: 'utf-8',
  })
  return file
}

export async function analyseArticle(
  path: string,
  option?: MarkdownParserOptions
) {
  let fileContent = await getFileContent(path)

  const description = headerParser(fileContent)
  const mainContent = fileContent.replace(headerReg, '')

  const parser = new MarkdownParser(option || {})

  let contentHTML = parser.render(mainContent)
  return { contentHTML, description }
}
