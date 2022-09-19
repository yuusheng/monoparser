# A markdown parser based on marked

We provide YAML front matter handler and toc support(_WIP_)

## Install

```bash
npm install @monoparser/md-parser
```

## Usage

You can use it as follows:

```js
import { analyseArticle } from '@monoparser/md-parser'

const content = `# Monoparser`

const html = analyseArticle(content)
```

analyseArticle will return a html with our default class:
`<h1 class="mono-heading" >Monoparser</h1>`

if you want customize your render style, you can run:

```js
import { analyseArticle, defineOptions } from '@monoparser/md-parser'

const options = defineOptions({
  ...your own options
})

// or you can pass a function like this
const options = defineOptions(() => {
  ...your own options
})

analyseArticle(content, options)
```

If you want toc support(WIP)

```js
const { html, toc } = analyseArticle(content, options, true)
```

If you want to use our default settings you can run

```js
import '@monoparser/md-parser/default.css'
```
