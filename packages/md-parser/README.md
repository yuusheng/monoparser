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

const html = analyseArticle(content)

// or if you want toc support
const { html, toc } = analyseArticle(content, true)
```
