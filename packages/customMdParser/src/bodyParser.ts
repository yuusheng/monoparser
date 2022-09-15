import { marked } from 'marked'

export function parse(content: string) {
  return marked.parse(content)
}

class MarkdownParser {
  constructor() {}
}
