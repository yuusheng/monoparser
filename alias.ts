import { resolve } from 'path'

const r = (path: string) => resolve(__dirname, path)

export const alias = {
  '@parser/md-parser': r('./packages/md-parser/src/index.ts'),
}
