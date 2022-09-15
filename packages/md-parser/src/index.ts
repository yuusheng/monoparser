import { promises as fs } from 'fs'
import { headerInterpreter, headerReg } from './headerParser'
import { parse } from './bodyParser'

export async function getMdFile(path: string) {
  return await fs.readFile(path, {
    encoding: 'utf-8',
  })
}

export async function analyseArticle(path: string) {
  let fileContent = await getMdFile(path)
  const mdDiscription = headerInterpreter(fileContent)
  fileContent = fileContent.replace(headerReg, '')

  return parse(fileContent)
}
