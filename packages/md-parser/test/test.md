---
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

```typescript
let person: [number, string] = [1, 'polaire']
```

### interface

对对象的形状(shape)进行描述

Duck Typing：只要长得像鸭子，不管是什么东西，可以用它来描述各种概念上毫不相干的内容

```typescript
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
polaire.id = 123 //无法分配到 "id" ，因为它是只读属性
```

描述函数类型

```typescript
const add = (x: number = 1, y: number, z?: number) => {
  if (typeof z === 'number') {
    return x + y + z
  } else return x + y
}

interface ISum {
  (x: number, y: number, z?: number): number
}
let add2: ISum = add
```

描述类的属性和方法

```typescript
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
```

### 函数

js 中函数是一等公民

ts 中冒号后面都是在声明类型,和函数逻辑无关

### 类型推论 联合类型和类型断言

```typescript
// 声明联合类型
let numberOrString: number | string
```

联合类型只能调用两者共有的方法或者属性，当我们必须要访问某个类型的方法时，我们要采用类型断言或者 type guard。

```typescript
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
```

### enum

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
console.log(Direction.Up)
console.log(Direction[0])
```

### 泛型

在使用时才规定类型

```typescript
function echo<T>(arg: T): T {
  return arg
}
const result = echo('str') // const result: "str"
const result: string = echo('str')

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
const result = swap(['polaire', 11]) // const result: [number, string]
```

约束泛型（用 extends 继承接口满足含有某个特定的属性）

```typescript
interface IWithLength {
  length: number
}
function echoWithArr<T extends IWithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

泛型在类和接口的使用

泛型会指定在容器中的数据类型

```typescript
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
```

### 类型别名 type aliase

```typescript
type StrOrNumber = string | number
let result: StrOrNumber = '123'
result = true // 不能将类型“boolean”分配给类型“StrOrNumber”。
```

字面量：const str: 'name' = 'name' 新建一个 str 只能等于 name

```typescript
type Directions = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
let toWhere: Directions = 'UP'
```

交叉类型

```typescript
interface IName {
  name: string
}
type IPerson = IName & { age: number }
let person: IPerson = { name: '123', age: 123 }
```

### 声明文件

## TypeScript 变量声明

### 变量声明

- let 与 JavaScript 中 var 类似，但使用了`词法作用域`或`块作用域`，仅能在作用域内访问且不能在声明之前读或写（声明之前称为暂时性死区）。

  > 类型断言：let 声明的 any 类型变量可以在调用时后面加上类型，这样编译器不会进行特殊的数据检查和解构

- const 声明之后不能再更改数值

### 解构

1. 数组解构

```typescript
let input = [1, 2]
let [first, second] = input
js
console.log(first) // outputs 1
console.log(second) // outputs 2
```

```typescript
// 传统键值对类型的对象
{ [key: string]: unknown }
```

## typescript utility types

1. Pritial<T> 把 T 的所有属性变为可选。
2. Readonly<T> 变只读
3. Record<K,T> 生成一个接口，属性为 K 的所有属性，k 的所有属性都有 T 的类型
4. Pick<T,K> 抽取 T 里的属性，属性来自 K.
5. Omit<T,K>和 Pick 相反（去除属性）
6. Parameters<T> T 是 Function，提取函数里返回值为 tuple
