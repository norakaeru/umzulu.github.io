---
layout: post
title: "javascript的prototype与constructor"
description: ""
keywords: ""
category: javascript
tags: [prototype, constructor]
---

***1.原型对象的constructor***

上一篇 [javascript的原型链]({{ page.previous.url }}) 讲到了`__proto__` 与 `prototype`的概念，这一篇接着说原型对象里的一个重要属性`constructor`。

我们可以用对象的`constructor`方法返回创建该对象的构造函数，需要注意的是：<span class="warning">constructor 并不是该对象自身的属性，而是其构造函数的原型对象的属性<span>。

```javascript
var Person = function () {this.name = "zhangsan"};
var p = new Person();

> p.constructor  // function () {this.name = "zhangsan"}
> p.hasOwnProperty("constructor")  // false
> Person.prototype.constructor  // function () {this.name = "zhangsan"}
> Person.prototype.hasOwnProperty("constructor")  // true
```


