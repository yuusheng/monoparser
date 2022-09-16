import { describe, it, expect } from 'vitest'
import { resolve } from 'path'
import { analyseArticle, getMdFile } from '../src'

describe('parser', () => {
  it('should have the discription of the md file', async () => {
    expect(await analyseArticle(resolve(__dirname, './test.md')))
      .toMatchInlineSnapshot(`
        "<h1 id=\\"h1\\">h1</h1>
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
        "
      `)
  })

  it('should have md file', async () => {
    expect(await getMdFile(resolve(__dirname, './test.md')))
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
