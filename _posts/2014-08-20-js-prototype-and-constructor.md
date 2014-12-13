---
layout: post
title: "javascript的prototype与constructor"
description: ""
keywords: ""
category: javascript
tags: [prototype, constructor]
---

***1.原型对象的constructor***

上一篇 [javascript的\_\_proto\_\_与prototype]({{ page.previous.url }}) 讲到了`__proto__` 与 `prototype`的概念，这一篇接着讲原型对象里的一个重要属性`constructor`。

我们可以用对象的`constructor`方法返回创建该对象的构造函数，需要注意的是：<span class="warning">constructor 并不是该对象自身的属性，而是其构造函数的原型对象的属性<span>。

```javascript
var Person = function () {this.name = "zhangsan"};
var p = new Person();

> p.constructor  // function () {this.name = "zhangsan"}
> p.hasOwnProperty("constructor")  // false
> Person.prototype.constructor  // function () {this.name = "zhangsan"}
> Person.prototype.hasOwnProperty("constructor")  // true
```

请看图：

![原型对象的constructor]({{site.cdn}}/constructor.jpg)

<!-- more -->

首先`Person`的实例对象`p`的内置属性`__proto__`指向`Person`的原型对象`Person.prototype`；

然后`Person`的原型对象`Person.prototype`有一个`constructor`属性，而这个`constructor`又指回`Person`；

于是`p`很自然地通过原型链取到了属性`constructor`，即是其构造函数`Person`。

```javascript
> p.__proto__ === Person.prototype  // true
> Person.prototype.constructor === Person  // true
> p.constructor === Person  // true
```

上面的例子只是为了说明`constructor`在原型链中的作用，更实际一点的意义在于通过`prototype`和`constructor`来实现继承。

***3.原型继承***

<span class="warning">原型继承是通过把子类的原型对象设置成父类的一个实例对象来实现的。 

```javascript

```