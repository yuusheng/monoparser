---
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

1. Pritial`<T>` 把 T 的所有属性变为可选。
2. Readonly`<T>` 变只读
3. Record`<K,T>` 生成一个接口，属性为 K 的所有属性，k 的所有属性都有 T 的类型
4. Pick`<T,K>` 抽取 T 里的属性，属性来自 K.
5. Omit`<T,K>`和 Pick 相反（去除属性）
6. Parameters`<T>` T 是 Function，提取函数里返回值为 tuple

| 命令行         | 功能 |
| -------------- | ---- |
| tsc greeter.ts | 编译 |
|                |      |
|                |      |

代码片段

```typescript
let person: [number, string] = [1, 'polaire']
```

引用

> 类型断言：let 声明的 any 类型变量可以在调用时后面加上类型，这样编译器不会进行特殊的数据检查和解构

code: `code`
