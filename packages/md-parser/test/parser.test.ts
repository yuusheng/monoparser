import { resolve } from 'path'
import { promises as fs } from 'fs'
import { describe, expect, it } from 'vitest'
import { analyseArticle } from '../src'

export async function getFileContent(path: string) {
  const file = await fs.readFile(path, {
    encoding: 'utf-8',
  })
  return file
}

const path = resolve(__dirname, './test.md')
const fileContent = await getFileContent(path)

describe('parser', () => {
  it.skip('should be called like this', () => {
    expect(analyseArticle(fileContent, {})).toMatchInlineSnapshot(`
      {
        "contentHTML": "<h1 class=\\"mb-3 \\" >h1</h1>
      <h2 class=\\"mb-3 font-bold scroll-mt-1\\" >h2</h2>
      <h3 class=\\"mb-3 font-bold scroll-mt-1\\" >h3</h3>
      <h4 class=\\"mb-3 font-bold scroll-mt-1\\" >h4</h4>
      <h5 class=\\"mb-3 font-bold scroll-mt-1\\" >h5</h5>
      <h6 class=\\"mb-3 font-bold scroll-mt-1\\" >h6</h6>
      <ul>
      <li class=\\"list-disc list-inside mb-2\\">无序列表 1</li><li class=\\"list-disc list-inside mb-2\\">无序列表 2</li><li class=\\"list-disc list-inside mb-2\\">无序列表 3</li></ul>
      <p class=\\"w-full\\">有序列表</p><ol>
      <li class=\\"list-disc list-inside mb-2\\">Pritial<code class=\\"bg-gray-100 text-indigo-700 p-1 mx-1 rounded\\">&lt;T&gt;</code> 把 T 的所有属性变为可选。</li><li class=\\"list-disc list-inside mb-2\\">Readonly<code class=\\"bg-gray-100 text-indigo-700 p-1 mx-1 rounded\\">&lt;T&gt;</code> 变只读</li><li class=\\"list-disc list-inside mb-2\\">Record<code class=\\"bg-gray-100 text-indigo-700 p-1 mx-1 rounded\\">&lt;K,T&gt;</code> 生成一个接口，属性为 K 的所有属性，k 的所有属性都有 T 的类型</li><li class=\\"list-disc list-inside mb-2\\">Pick<code class=\\"bg-gray-100 text-indigo-700 p-1 mx-1 rounded\\">&lt;T,K&gt;</code> 抽取 T 里的属性，属性来自 K.</li><li class=\\"list-disc list-inside mb-2\\">Omit<code class=\\"bg-gray-100 text-indigo-700 p-1 mx-1 rounded\\">&lt;T,K&gt;</code>和 Pick 相反（去除属性）</li><li class=\\"list-disc list-inside mb-2\\">Parameters<code class=\\"bg-gray-100 text-indigo-700 p-1 mx-1 rounded\\">&lt;T&gt;</code> T 是 Function，提取函数里返回值为 tuple</li></ol>
      <div class=\\"relative my-3 overflow-x-auto shadow-md shadow-gray-100 sm:rounded-lg\\">
            <table class=\\"w-full text-left text-gray-500\\">
              <thead class=\\"bg-gray-50 uppercase text-gray-900 dark:bg-gray-700 dark:text-gray-400\\">
                <tr>
      <th>命令行</th>
      <th>功能</th>
      </tr>

              </thead>
              <tr>
      <td>tsc greeter.ts</td>
      <td>编译</td>
      </tr>
      <tr>
      <td></td>
      <td></td>
      </tr>
      <tr>
      <td></td>
      <td></td>
      </tr>

            </table>
          </div><p class=\\"w-full\\">代码片段</p><pre><code class=\\"language-typescript\\">let person: [number, string] = [1, &#39;polaire&#39;]
      </code></pre>
      <p class=\\"w-full\\">引用</p><blockquote  class=\\"p-4 italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-400 quote mb-3\\"><p class=\\"w-full\\">类型断言：let 声明的 any 类型变量可以在调用时后面加上类型，这样编译器不会进行特殊的数据检查和解构</p></blockquote><p class=\\"w-full\\">code: <code class=\\"bg-gray-100 text-indigo-700 p-1 mx-1 rounded\\">code</code></p>",
        "description": {
          "title": "TypeScript高级指南",
        },
      }
    `)
  })

  it('different param return different result', () => {
    const oneParam = analyseArticle(fileContent)
    const threeParams = analyseArticle(fileContent, undefined, true)
    expect(typeof oneParam.contentHTML).toBe('string')
    expect(threeParams.contentHTML).toHaveProperty('content')
  })

  it.skip('should have the discription of the md file', () => {
    expect(analyseArticle(resolve(__dirname, './test.md')))
      .toMatchInlineSnapshot(`
        {
          "contentHTML": "<h1 id=\\"h1\\">h1</h1>
        <h2 id=\\"h2\\">h2</h2>
        <h3 id=\\"h3\\">h3</h3>
        <h4 id=\\"h4\\">h4</h4>
        <h5 id=\\"h5\\">h5</h5>
        <h6 id=\\"h6\\">h6</h6>
        <ul>
        <li>无序列表 1</li>
        <li>无序列表 2</li>
        <li>无序列表 3</li>
        </ul>
        <p>有序列表</p>
        <ol>
        <li>Pritial<T> 把 T 的所有属性变为可选。</li>
        <li>Readonly<T> 变只读</li>
        <li>Record&lt;K,T&gt; 生成一个接口，属性为 K 的所有属性，k 的所有属性都有 T 的类型</li>
        <li>Pick&lt;T,K&gt; 抽取 T 里的属性，属性来自 K.</li>
        <li>Omit&lt;T,K&gt;和 Pick 相反（去除属性）</li>
        <li>Parameters<T> T 是 Function，提取函数里返回值为 tuple</li>
        </ol>
        <table>
        <thead>
        <tr>
        <th>命令行</th>
        <th>功能</th>
        </tr>
        </thead>
        <tbody><tr>
        <td>tsc greeter.ts</td>
        <td>编译</td>
        </tr>
        <tr>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td></td>
        <td></td>
        </tr>
        </tbody></table>
        <p>代码片段</p>
        <pre><code class=\\"language-typescript\\">let person: [number, string] = [1, &#39;polaire&#39;]
        </code></pre>
        <p>引用</p>
        <blockquote>
        <p>类型断言：let 声明的 any 类型变量可以在调用时后面加上类型，这样编译器不会进行特殊的数据检查和解构</p>
        </blockquote>
        <p>code: <code>code</code></p>
        ",
          "description": {
            "title": "TypeScript高级指南",
          },
        }
      `)
  })

  it.skip('should have md file', async () => {
    expect(await getFileContent(resolve(__dirname, './test.md')))
      .toMatchInlineSnapshot(`
        "---
        title: TypeScript 高级指南
        ---

        # h1

        ## h2

        ### h3

        #### h4

        ##### h5

        ###### h6

        - 无序列表 1
        - 无序列表 2
        - 无序列表 3

        有序列表

        1. Pritial<T> 把 T 的所有属性变为可选。
        2. Readonly<T> 变只读
        3. Record<K,T> 生成一个接口，属性为 K 的所有属性，k 的所有属性都有 T 的类型
        4. Pick<T,K> 抽取 T 里的属性，属性来自 K.
        5. Omit<T,K>和 Pick 相反（去除属性）
        6. Parameters<T> T 是 Function，提取函数里返回值为 tuple

        | 命令行         | 功能 |
        | -------------- | ---- |
        | tsc greeter.ts | 编译 |
        |                |      |
        |                |      |

        代码片段

        \`\`\`typescript
        let person: [number, string] = [1, 'polaire']
        \`\`\`

        引用

        > 类型断言：let 声明的 any 类型变量可以在调用时后面加上类型，这样编译器不会进行特殊的数据检查和解构

        code: \`code\`
        "
      `)
  })
})
