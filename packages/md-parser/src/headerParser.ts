import { headerContent } from './types'

export const headerReg = /---\n(.*?)\n---/is
export function headerInterpreter(content: string) {
  const matchArr = content.match(headerReg).splice(1)[0].split('\n')

  return matchArr.reduce((pre, cur) => {
    const [key, value] = cur.split(':').map((v) => v.replace(/\s/g, ''))
    pre[key] = value
    return pre
  }, {}) as headerContent
}
