import { promises as fs } from 'fs'
import path from 'path'
import { it, expect } from 'vitest'
import { analyseArticle, getMdFile } from '../src/index'
import { headerInterpreter } from '../src/headerParser'

const content = `
---
title: 我爱你中国
createTime: 2022-02-17
changeTime: 2022-02-17
---
`

it('haeder interpreter should work', () => {
  expect(headerInterpreter(content)).toMatchInlineSnapshot(`
    {
      "changeTime": "2022-02-17",
      "createTime": "2022-02-17",
      "title": "我爱你中国",
    }
  `)
})

it('should have md file', async () => {
  expect(await getMdFile(path.resolve(__dirname, './test.md')))
    .toMatchInlineSnapshot(`
      "---
      title: TypeScript 高级指南
      ---

      # TypeScript

      - 动态类型语言(Dynamically Typed Language)

        运行期间自动分析变量类型

      - 静态类型语言(Statically Typed Language)

      - 数据变量类型在编译阶段

      TypeScript: JavaScript that scales

      优点:

      - 程序更容易理解
      - 效率更高
      - 更少的错误
      - 兼容性很好

      ## 命令行

      | 命令行         | 功能 |
      | -------------- | ---- |
      | tsc greeter.ts | 编译 |
      |                |      |
      |                |      |

      ## 数据类型

      - boolean
      - null
      - undefined
      - number
      - string
      - any

      ### 数组

      同类型数据

      ### 元组

      \`\`\`typescript
      let person: [number, string] = [1, 'polaire']
      \`\`\`

      ### interface

      对对象的形状(shape)进行描述

      Duck Typing：只要长得像鸭子，不管是什么东西，可以用它来描述各种概念上毫不相干的内容

      \`\`\`typescript
      interface IPerson {
        readonly id: number //只读
        name: string
        age?: number //  可选
      }
      let polaire: IPerson = {
        id: 1,
        name: 'polaire',
        age: 1,
      }
      polaire.id = 123 //无法分配到 \\"id\\" ，因为它是只读属性
      \`\`\`

      描述函数类型

      \`\`\`typescript
      const add = (x: number = 1, y: number, z?: number) => {
        if (typeof z === 'number') {
          return x + y + z
        } else return x + y
      }

      interface ISum {
        (x: number, y: number, z?: number): number
      }
      let add2: ISum = add
      \`\`\`

      描述类的属性和方法

      \`\`\`typescript
      interface IRadio {
        switchRadio(trigger: boolean): void
      }
      interface IBattery {
        checkBatteryStatus(): void
      }
      interface IRadioWithBattery extends IRadio, IBattery {}
      class Car implements IRadio {
        switchRadio(trigger: boolean): void {}
      }
      class Cellphone implements IRadioWithBattery {
        switchRadio(trigger: boolean): void {}
        checkBatteryStatus(): void {}
      }
      \`\`\`

      ### 函数

      js 中函数是一等公民

      ts 中冒号后面都是在声明类型,和函数逻辑无关

      ### 类型推论 联合类型和类型断言

      \`\`\`typescript
      // 声明联合类型
      let numberOrString: number | string
      \`\`\`

      联合类型只能调用两者共有的方法或者属性，当我们必须要访问某个类型的方法时，我们要采用类型断言或者 type guard。

      \`\`\`typescript
      // 类型断言
      function getLength(input: string | number): number {
        const str = input as string // 类型断言
        if (str.length) {
          return str.length
        } else {
          const number = input as number
          return number.toString().length
        }
      }

      // type guard  条件语句可以自动缩小类型范围  typeof
      function getLength(input: string | number): number {
        if (typeof input === 'string') {
          return input.length
        } else {
          return input.toString().length
        }
      }
      \`\`\`

      ### enum

      \`\`\`typescript
      enum Direction {
        Up,
        Down,
        Left,
        Right,
      }
      console.log(Direction.Up)
      console.log(Direction[0])
      \`\`\`

      ### 泛型

      在使用时才规定类型

      \`\`\`typescript
      function echo<T>(arg: T): T {
        return arg
      }
      const result = echo('str') // const result: \\"str\\"
      const result: string = echo('str')

      function swap<T, U>(tuple: [T, U]): [U, T] {
        return [tuple[1], tuple[0]]
      }
      const result = swap(['polaire', 11]) // const result: [number, string]
      \`\`\`

      约束泛型（用 extends 继承接口满足含有某个特定的属性）

      \`\`\`typescript
      interface IWithLength {
        length: number
      }
      function echoWithArr<T extends IWithLength>(arg: T): T {
        console.log(arg.length)
        return arg
      }
      \`\`\`

      泛型在类和接口的使用

      泛型会指定在容器中的数据类型

      \`\`\`typescript
      class Queue<T> {
        private data = []
        push(item: T) {
          return this.data.push(item)
        }
        pop(): T {
          return this.data.shift()
        }
      }

      const queue = new Queue<number>()
      queue.push(1)
      console.log(queue.pop().toFixed())

      interface KeyPair<T, U> {
        key: T
        value: U
      }

      let kp1: KeyPair<number, string> = { key: 1, value: 'polaire' }
      \`\`\`

      ### 类型别名 type aliase

      \`\`\`typescript
      type StrOrNumber = string | number
      let result: StrOrNumber = '123'
      result = true // 不能将类型“boolean”分配给类型“StrOrNumber”。
      \`\`\`

      字面量：const str: 'name' = 'name' 新建一个 str 只能等于 name

      \`\`\`typescript
      type Directions = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
      let toWhere: Directions = 'UP'
      \`\`\`

      交叉类型

      \`\`\`typescript
      interface IName {
        name: string
      }
      type IPerson = IName & { age: number }
      let person: IPerson = { name: '123', age: 123 }
      \`\`\`

      ### 声明文件

      ## TypeScript 变量声明

      ### 变量声明

      - let 与 JavaScript 中 var 类似，但使用了\`词法作用域\`或\`块作用域\`，仅能在作用域内访问且不能在声明之前读或写（声明之前称为暂时性死区）。

        > 类型断言：let 声明的 any 类型变量可以在调用时后面加上类型，这样编译器不会进行特殊的数据检查和解构

      - const 声明之后不能再更改数值

      ### 解构

      1. 数组解构

      \`\`\`typescript
      let input = [1, 2]
      let [first, second] = input
      js
      console.log(first) // outputs 1
      console.log(second) // outputs 2
      \`\`\`

      \`\`\`typescript
      // 传统键值对类型的对象
      { [key: string]: unknown }
      \`\`\`

      ## typescript utility types

      1. Pritial<T> 把 T 的所有属性变为可选。
      2. Readonly<T> 变只读
      3. Record<K,T> 生成一个接口，属性为 K 的所有属性，k 的所有属性都有 T 的类型
      4. Pick<T,K> 抽取 T 里的属性，属性来自 K.
      5. Omit<T,K>和 Pick 相反（去除属性）
      6. Parameters<T> T 是 Function，提取函数里返回值为 tuple
      "
    `)
})

it('should have the discription of the md file', async () => {
  expect(await analyseArticle(path.resolve(__dirname, './test.md')))
    .toMatchInlineSnapshot(`
      "<h1 id=\\"typescript\\">TypeScript</h1>
      <ul>
      <li><p>动态类型语言(Dynamically Typed Language)</p>
      <p>运行期间自动分析变量类型</p>
      </li>
      <li><p>静态类型语言(Statically Typed Language)</p>
      </li>
      <li><p>数据变量类型在编译阶段</p>
      </li>
      </ul>
      <p>TypeScript: JavaScript that scales</p>
      <p>优点:</p>
      <ul>
      <li>程序更容易理解</li>
      <li>效率更高</li>
      <li>更少的错误</li>
      <li>兼容性很好</li>
      </ul>
      <h2 id=\\"命令行\\">命令行</h2>
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
      <h2 id=\\"数据类型\\">数据类型</h2>
      <ul>
      <li>boolean</li>
      <li>null</li>
      <li>undefined</li>
      <li>number</li>
      <li>string</li>
      <li>any</li>
      </ul>
      <h3 id=\\"数组\\">数组</h3>
      <p>同类型数据</p>
      <h3 id=\\"元组\\">元组</h3>
      <pre><code class=\\"language-typescript\\">let person: [number, string] = [1, &#39;polaire&#39;]
      </code></pre>
      <h3 id=\\"interface\\">interface</h3>
      <p>对对象的形状(shape)进行描述</p>
      <p>Duck Typing：只要长得像鸭子，不管是什么东西，可以用它来描述各种概念上毫不相干的内容</p>
      <pre><code class=\\"language-typescript\\">interface IPerson {
        readonly id: number //只读
        name: string
        age?: number //  可选
      }
      let polaire: IPerson = {
        id: 1,
        name: &#39;polaire&#39;,
        age: 1,
      }
      polaire.id = 123 //无法分配到 &quot;id&quot; ，因为它是只读属性
      </code></pre>
      <p>描述函数类型</p>
      <pre><code class=\\"language-typescript\\">const add = (x: number = 1, y: number, z?: number) =&gt; {
        if (typeof z === &#39;number&#39;) {
          return x + y + z
        } else return x + y
      }

      interface ISum {
        (x: number, y: number, z?: number): number
      }
      let add2: ISum = add
      </code></pre>
      <p>描述类的属性和方法</p>
      <pre><code class=\\"language-typescript\\">interface IRadio {
        switchRadio(trigger: boolean): void
      }
      interface IBattery {
        checkBatteryStatus(): void
      }
      interface IRadioWithBattery extends IRadio, IBattery {}
      class Car implements IRadio {
        switchRadio(trigger: boolean): void {}
      }
      class Cellphone implements IRadioWithBattery {
        switchRadio(trigger: boolean): void {}
        checkBatteryStatus(): void {}
      }
      </code></pre>
      <h3 id=\\"函数\\">函数</h3>
      <p>js 中函数是一等公民</p>
      <p>ts 中冒号后面都是在声明类型,和函数逻辑无关</p>
      <h3 id=\\"类型推论-联合类型和类型断言\\">类型推论 联合类型和类型断言</h3>
      <pre><code class=\\"language-typescript\\">// 声明联合类型
      let numberOrString: number | string
      </code></pre>
      <p>联合类型只能调用两者共有的方法或者属性，当我们必须要访问某个类型的方法时，我们要采用类型断言或者 type guard。</p>
      <pre><code class=\\"language-typescript\\">// 类型断言
      function getLength(input: string | number): number {
        const str = input as string // 类型断言
        if (str.length) {
          return str.length
        } else {
          const number = input as number
          return number.toString().length
        }
      }

      // type guard  条件语句可以自动缩小类型范围  typeof
      function getLength(input: string | number): number {
        if (typeof input === &#39;string&#39;) {
          return input.length
        } else {
          return input.toString().length
        }
      }
      </code></pre>
      <h3 id=\\"enum\\">enum</h3>
      <pre><code class=\\"language-typescript\\">enum Direction {
        Up,
        Down,
        Left,
        Right,
      }
      console.log(Direction.Up)
      console.log(Direction[0])
      </code></pre>
      <h3 id=\\"泛型\\">泛型</h3>
      <p>在使用时才规定类型</p>
      <pre><code class=\\"language-typescript\\">function echo&lt;T&gt;(arg: T): T {
        return arg
      }
      const result = echo(&#39;str&#39;) // const result: &quot;str&quot;
      const result: string = echo(&#39;str&#39;)

      function swap&lt;T, U&gt;(tuple: [T, U]): [U, T] {
        return [tuple[1], tuple[0]]
      }
      const result = swap([&#39;polaire&#39;, 11]) // const result: [number, string]
      </code></pre>
      <p>约束泛型（用 extends 继承接口满足含有某个特定的属性）</p>
      <pre><code class=\\"language-typescript\\">interface IWithLength {
        length: number
      }
      function echoWithArr&lt;T extends IWithLength&gt;(arg: T): T {
        console.log(arg.length)
        return arg
      }
      </code></pre>
      <p>泛型在类和接口的使用</p>
      <p>泛型会指定在容器中的数据类型</p>
      <pre><code class=\\"language-typescript\\">class Queue&lt;T&gt; {
        private data = []
        push(item: T) {
          return this.data.push(item)
        }
        pop(): T {
          return this.data.shift()
        }
      }

      const queue = new Queue&lt;number&gt;()
      queue.push(1)
      console.log(queue.pop().toFixed())

      interface KeyPair&lt;T, U&gt; {
        key: T
        value: U
      }

      let kp1: KeyPair&lt;number, string&gt; = { key: 1, value: &#39;polaire&#39; }
      </code></pre>
      <h3 id=\\"类型别名-type-aliase\\">类型别名 type aliase</h3>
      <pre><code class=\\"language-typescript\\">type StrOrNumber = string | number
      let result: StrOrNumber = &#39;123&#39;
      result = true // 不能将类型“boolean”分配给类型“StrOrNumber”。
      </code></pre>
      <p>字面量：const str: &#39;name&#39; = &#39;name&#39; 新建一个 str 只能等于 name</p>
      <pre><code class=\\"language-typescript\\">type Directions = &#39;UP&#39; | &#39;DOWN&#39; | &#39;LEFT&#39; | &#39;RIGHT&#39;
      let toWhere: Directions = &#39;UP&#39;
      </code></pre>
      <p>交叉类型</p>
      <pre><code class=\\"language-typescript\\">interface IName {
        name: string
      }
      type IPerson = IName &amp; { age: number }
      let person: IPerson = { name: &#39;123&#39;, age: 123 }
      </code></pre>
      <h3 id=\\"声明文件\\">声明文件</h3>
      <h2 id=\\"typescript-变量声明\\">TypeScript 变量声明</h2>
      <h3 id=\\"变量声明\\">变量声明</h3>
      <ul>
      <li><p>let 与 JavaScript 中 var 类似，但使用了<code>词法作用域</code>或<code>块作用域</code>，仅能在作用域内访问且不能在声明之前读或写（声明之前称为暂时性死区）。</p>
      <blockquote>
      <p>类型断言：let 声明的 any 类型变量可以在调用时后面加上类型，这样编译器不会进行特殊的数据检查和解构</p>
      </blockquote>
      </li>
      <li><p>const 声明之后不能再更改数值</p>
      </li>
      </ul>
      <h3 id=\\"解构\\">解构</h3>
      <ol>
      <li>数组解构</li>
      </ol>
      <pre><code class=\\"language-typescript\\">let input = [1, 2]
      let [first, second] = input
      js
      console.log(first) // outputs 1
      console.log(second) // outputs 2
      </code></pre>
      <pre><code class=\\"language-typescript\\">// 传统键值对类型的对象
      { [key: string]: unknown }
      </code></pre>
      <h2 id=\\"typescript-utility-types\\">typescript utility types</h2>
      <ol>
      <li>Pritial<T> 把 T 的所有属性变为可选。</li>
      <li>Readonly<T> 变只读</li>
      <li>Record&lt;K,T&gt; 生成一个接口，属性为 K 的所有属性，k 的所有属性都有 T 的类型</li>
      <li>Pick&lt;T,K&gt; 抽取 T 里的属性，属性来自 K.</li>
      <li>Omit&lt;T,K&gt;和 Pick 相反（去除属性）</li>
      <li>Parameters<T> T 是 Function，提取函数里返回值为 tuple</li>
      </ol>
      "
    `)
})

it('test', () => {
  let str = `11111
2222
`
  const reg = /.*(?<=\n)/gs

  expect(str.match(reg)).toMatchInlineSnapshot(`
    [
      "11111
    2222
    ",
      "",
    ]
  `)
  const headerReg = /---\n((.*)\n)\n---/is
  expect(content.match(headerReg)).toMatchInlineSnapshot('null')
})
