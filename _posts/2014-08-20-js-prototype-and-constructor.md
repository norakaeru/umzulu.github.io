---
layout: post
title: "javascript的prototype与constructor"
description: "prototype constructor"
keywords: ""
category: javascript
tags: [prototype, constructor]
---

***1.原型对象的constructor***

上一篇 [javascript的\_\_proto\_\_与prototype]({{ page.previous.url }}) 讲到了`__proto__` 与 `prototype`的概念，这一篇接着讲原型对象里的一个重要属性`constructor`。

我们可以用对象的`constructor`方法返回创建该对象的构造函数，需要注意的是：<span class="warning">constructor 并不是该对象自身的属性，而是其构造函数的原型对象的属性<span>。

```javascript
function Person (name) {this.name = name};
var p = new Person("zhangsan");

> p.constructor  // function Person (name) {this.name = name}
> p.hasOwnProperty("constructor")  // false
> Person.prototype.constructor  // function Person (name) {this.name = name}
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
// 父类
function Person(name) {
    this.name = name;
}
Person.prototype.getName = function () {
    console.log("my name is " + this.name);
}
// 子类
function Programmer(name) {
    this.name = name;
}
// 将子类的原型指向父类的一个实例
Programmer.prototype = new Person();

var p = new Programmer("zhangSan");

> p.getName() // "my name is zhangSan" 
```

核心是这句`Programmer.prototype = new Person();`，因为`Person`的实例可以调用`Person`原型中的方法, 所以`Programmer`的实例也可以调用`Person`原型中的方法。

![原型继承]({{site.cdn}}/prototype-inherit.png)

上面关于继承的实现很粗糙，并且存在很多问题：
