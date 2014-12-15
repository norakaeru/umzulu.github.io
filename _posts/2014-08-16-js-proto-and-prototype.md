---
layout: post
title:  "javascript的__proto__与prototype"
keywords: "__proto__与prototype"
description: ""
category: javascript
tags: [prototype, 原型链]
---

***1.\_\_proto\_\_ 与 prototype***

所有的js对象都有一个名为`__proto__`的隐藏内置属性，指向其对应的原型对象，原型链正是基于`__proto__`才得以形成的，而不是`prototype`。

而`prototype`是只有函数对象(`function`)才有的显式内置属性，它即是该函数的原型对象。

```javascript
var p = "zhangsan";
> p.__proto__  // String
> p.prototype  // undefined
```

***2.new 的过程***

既然`prototype`是只有函数对象才有的属性，说到`function`，就得先说下`new`：

```javascript
var Person = function () { this.name = "zhangsan" };
var p = new Person();
```

我们把`new`的过程拆分成以下三步：

(1) `var p = {};` --创建了一个对象obj。

(2) `p.__proto__ = Person.prototype;` --将创建的obj的\_\_proto\_\_指向构造函数Person的prototype。

(3) `Person.call(p);` --执行构造函数Person中的代码。

<!-- more -->

***3.\_\_proto\_\_ 与 prototype 的关系***

(1) **所有对象的\_\_proto\_\_都指向其构造器的prototype**

以上new的过程其实已间接证实了`__proto__`与`prototype`的关系，即：

```javascript
> p.__proto__ === Person.prototype; // true
```

再举几个例子：

```javascript
//var str = new String("zhangsan");
var str = "zhangsan";  
//var obj = new Object("zhangsan");
var obj = {name: "zhangsan"};
//var arr = new Array(1,2,3);
var arr= [1,2,3]; 
//var fun = new Function();
var fun = function () {}; 

> str.__proto__ === String.prototype // true
> obj.__proto__ === Object.prototype // true
> arr.__proto__ === Array.prototype // true
> fun.__proto__ === Function.prototype // true
```

(2) **所有构造器/函数的\_\_proto\_\_都指向Function.prototype**

```javascript
> String.__proto__ === Function.prototype // true
> Object.__proto__ === Function.prototype // true
> Array.__proto__ === Function.prototype // true
> Function.__proto__ === Function.prototype // true
```

自定义的函数也是：

```javascript
var Person = function () {};

> Person.__proto__ === Function.prototype // true
```

那么`Function.prototype`是个什么东西？

```javascript
> Function.prototype  // function Empty() {}
```

咦，是个名为`Empty`的 function，上文说过函数的\_\_proto\_\_都指向`Function.prototype`，那么它的\_\_proto\_\_是不是也指向`Function.prototype`?

```javascript
> Function.prototype.__proto__  === Function.prototype  // false
> Function.prototype.__proto__   // Object {}
> Function.prototype.__proto__  === Object.prototype  // true
```

结果证明是错误的，可见名为`Empty`的 function是一个特殊的函数，它的\_\_proto\_\_并不指向`Function.prototype`，而是指向`Object.prototype`。

我们再看看`Object.prototype`又指向什么...

```javascript
> Object.prototype.__proto__  // null
```

OK，这就是原型链的终点了。