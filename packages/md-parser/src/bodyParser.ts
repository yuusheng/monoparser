import { Renderer, marked } from 'marked'

export function parse(content: string) {
  return marked.parse(content)
}

export type MarkdownParserOptions = marked.RendererObject

type DefineOptionParamsType =
  | MarkdownParserOptions
  | (() => MarkdownParserOptions)

export const defineOption = (options: DefineOptionParamsType) =>
  typeof options === 'function' ? options() : options

const defaultConfig = defineOption({
  heading(text, level) {
    // let anchor = tocObj.add(text, level)
    return `<h${level} class="mono-heading ${
      level >= 2 ? 'mono-heading__bold' : ''
    }" >${text}</h${level}>\n`
  },
  table(header, body) {
    return `<div class="mono-table__container" >
      <table class="mono-table" >
        <thead class="mono-table__head" >
          ${header}
        </thead>
        ${body}
      </table>
    </div>`
  },
  blockquote(quote) {
    return `<blockquote  class="mono-blockquote" >${quote}</blockquote>`
  },
  paragraph(text) {
    return `<p class="mono-paragraph" >${text}</p>`
  },
  strong(text) {
    return `<strong class="mono-strong" >${text}</strong>`
  },
  list(body, ordered) {
    const type = ordered ? 'ol' : 'ul'
    return `<${type} class="mono-list" >${body}</${type}>`
  },
  listitem(text) {
    return `<li class="mono-listitem" >${text}</li>`
  },
  codespan(text) {
    return `<code class="mono-codespan" >${text}</code>`
  },
})

export interface renderResult {
  content: string
  toc?: Object
}

export class MarkdownParser {
  private renderer: Renderer
  constructor(options = {} as MarkdownParserOptions) {
    this.renderer = new Renderer()

    const curOptions = Object.assign(defaultConfig, options)
    ;(Object.keys(curOptions) as (keyof Renderer<never>)[]).forEach((key) => {
      this.renderer[key] = (curOptions as any)[key]
    })

    marked.setOptions({
      renderer: this.renderer,
      headerIds: false,
      gfm: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    })
  }

  render(content: string): string
  render(content: string, toc: boolean): renderResult
  render(content: any, toc = false): string | renderResult {
    if (!toc)
      return marked(content)
    return { content: marked(content) }
  }
}
