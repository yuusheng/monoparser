import { HeaderContent } from './types'

export const headerReg = /---\r?\n(.*?)\r?\n---/is

export function getLineBreakerReg(option?: string) {
  return new RegExp('\r?\n', option)
}

export function headerParser(content: string) {
  if (!headerReg.test(content)) return {}
  const matchArr = content.match(headerReg)![1].split(getLineBreakerReg())

  return matchArr.reduce((pre, cur) => {
    const [key, value] = cur.split(':').map((v) => v.replace(/\s/g, ''))
    pre[key] = value
    return pre
  }, {}) as HeaderContent
}
