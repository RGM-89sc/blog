---
[title]:typeof与instanceof
[time]:2018-02-03
[tags]: JavaScript
---

typeof和instanceof都是用于检测数据类型的操作符，但它们的作用并不相同

# typeof

typeof是一元操作符，求得一个变量或字面量的类型，使用方法：

```javascript
typeof a;  // 求得a的类型
```

在ES5标准中，typeof可能返回以下六种类型的字符串形式：
“undefined” —–如果这个值未定义
“boolean” ——-如果这个值是布尔值
“string” ——–如果这个值是字符串
“number” ——–如果这个值是数值
“object” ——–如果这个值是对象或null
“function” ——如果这个值是函数

示例：

```javascript
console.log(typeof 1);  // number
console.log(typeof "str");  // string
console.log(typeof true);  // boolean
console.log(typeof function func(){});  // function
console.log(typeof var1);  // undefined，var1未定义
console.log(typeof undefined);  // undefined
console.log(typeof NaN);  // number
console.log(typeof null);  // object，null表示一个空对象指针
console.log(typeof Math);  // object
console.log(typeof Array);  // function
```

NaN虽然表示“非数值”，但它也是一个特殊的数字值，typeof并不能判断一个值是否是NaN，应当使用isNaN函数：

```javascript
console.log(isNaN(NaN));  // true
console.log(isNaN(1));  // false
```

typeof Array返回的是function，故typeof无法判断一个值是否为数组，应当使用isArray函数：

```javascript
var arr = [], notArr = 1;
console.log(Array.isArray(arr));  // true
console.log(Array.isArray(notArr));  // false
```

# instanceof

instanceof是二元操作符，instanceof的左边放需要检测的值，右边放类型，返回的是一个布尔值，若需要检测的值类型为操作符右边的类型时返回true，反之返回false，使用方法

```javascript
a instanceof b;
```

示例：

```javascript
 var o = {},
    arr = [];
console.log(o instanceof Object);  // true
console.log(arr instanceof Array);  // true
```

# 总结

typeof更适合用来检测基本类型（Undefined、Null、Boolean、Number、String），而instanceof适合用来检测引用类型（Object、Array、Function、RegExp）