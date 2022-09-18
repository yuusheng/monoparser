import { marked, Renderer } from 'marked'

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
  heading(text, level, raw) {
    // let anchor = tocObj.add(text, level)
    return `<h${level} class="mb-3 ${
      level >= 2 ? 'font-bold scroll-mt-1' : ''
    }" >${text}</h${level}>\n`
  },
  table(header, body) {
    return `<div class="relative my-3 overflow-x-auto shadow-md shadow-gray-100 sm:rounded-lg">
      <table class="w-full text-left text-gray-500">
        <thead class="bg-gray-50 uppercase text-gray-900 dark:bg-gray-700 dark:text-gray-400">
          ${header}
        </thead>
        ${body}
      </table>
    </div>`
  },
  blockquote(quote) {
    return `<blockquote  class="p-4 italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-400 quote mb-3">${quote}</blockquote>`
  },
  paragraph(text) {
    return `<p class="w-full">${text}</p>`
  },
  strong(text) {
    return `<strong class="font-bold mx-[0.1rem]">${text}</strong>`
  },
  listitem(text) {
    return `<li class="list-disc list-inside mb-2">${text}</li>`
  },
  codespan(text) {
    return `<code class="bg-gray-100 text-indigo-700 p-1 mx-1 rounded">${text}</code>`
  },
})

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

  render(content: string) {
    return marked(content)
  }
}
