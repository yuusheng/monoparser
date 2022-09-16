import { promises as fs } from 'fs'
import { headerParser, headerReg } from './headerParser'
import { parse } from './bodyParser'

export async function getMdFile(path: string) {
  const file = await fs.readFile(path, {
    encoding: 'utf-8',
  })
  return file
}

export async function analyseArticle(path: string) {
  let fileContent = await getMdFile(path)
  const mdDiscription = headerParser(fileContent)
  fileContent = fileContent.replace(headerReg, '')

  return parse(fileContent)
}
