---
[title]:JS正则的lastIndex属性
[time]:2018-05-06
[tags]: JavaScript
---

先来看看以下代码：

```javascript
var re = /.*/g;
var s1 = "test string";
var s2 = "teststring";
console.log(re.test(s1));  // true
console.log(re.test(s2));  // false
```

可以看到，第二次在正则表达式re上使用test()方法时原本该输出true却输出了false
这是因为正则表达式的下一次匹配起始位置即lastIndex属性大于第二次要匹配的字符串的长度，这个属性只由正则表达式的exec()和test()两个方法产生，且在全局匹配模式下才有效
所以可以取消全局匹配模式来解决这个问题：

```javascript
var re = /.*/;
var s1 = "test string";
var s2 = "teststring";
console.log(re.test(s1));  // true
console.log(re.test(s2));  // true
```

但有时候需要全局匹配模式，不能取消怎么办？
还有办法，lastIndex属性是可读可写的，所以可以通过修改lastIndex属性的值来解决：

```javascript
var re = /.*/g;
var s1 = "test string";
var s2 = "teststring";
console.log(re.test(s1));  // true
re.lastIndex = 0;
console.log(re.test(s2));  // true
```

另外，lastIndex属性还有其他特性：
当匹配失败后，lastIndex属性的值会被设置成0

