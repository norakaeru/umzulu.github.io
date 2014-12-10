---
layout: post
title:  "javascript的数据类型"
keywords: "js数据类型"
description: "值类型存储在栈中，引用类型存储在堆中"
category: "javascript"
tags: ["值类型", "引用类型"]
---

**1.数据类型**

值类型：`undefined`、`null`、`boolean`、`number`和`string`

引用类型：`object`和`function`

**2.如何理解值类型和引用类型**

如果在内存中存储的是数据本身，则它是值类型；如果存储的是指向内存中其他位置的数据的指针，则它是引用类型。

还有一种说法称**值类型存储在栈中，引用类型存储在堆中**，不是很好理解。

**3.typeof运算符**

typeof检测数据的类型，返回的值只可能有6种：`undefined`、`boolean`、`number`、`string`、`object`、`function`

```javascript
typeof(123)
typeof("123")
typeof(NaN) // "number"
typeof(null)  // "object"
typeof([])  // "object"
typeof(Array)  // "function"
typeof(Object)  // "function"
typeof(undefined)  // "undefined"
```
