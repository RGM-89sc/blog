---
[title]:className的操作
[time]:2019-01-27
[tags]: JavaScript
---

# className

在元素上的className属性可以直接以字符串形式输出所有类名，类名与类名之间用一个空格连接，该属性可读可写，兼容性良好：

```javascript
element.className  // 读
element.className = 'classname'  // 写
```

但className这个属性有较大局限性，读取类名的时候只能一次性读取全部类名，写操作的时候也只能一次性重写。

# classList

classList与className不一样，是个只读属性，返回值是一个元素的类属性的实时DOMTokenList集合，该集合类似数组，可以使用数组下标或者element.classList.item()进行获取集合中的在某个位置上的类名，另外还有add()、remove()、toggle()、replace()、contains()方法，使得对类名的操作对于className属性更加方便、标准了

## add()

给元素添加类名

```javascript
element.classList.add('classname');
element.classList.add(...classNameArray);  // add()可以传入多参数，但就算IE11也有兼容性问题
```

## remove()

删除元素的指定类名

```javascript
element.classList.remove('classname');
element.classList.remove(...classNameArray);  // add()可以传入多参数，但就算IE11也有兼容性问题
```

## toggle()

当只传入一个参数时，这个参数即需要添加/删除的类名，如果类名原先不存在则添加，否则删除之

```javascript
element.classList.toggle('classname');
```

当传入两个参数时，如果第二个参数的计算结果为true，则添加指定的类值，如果计算结果为false，则删除它

## replace()

把指定的旧类名替换为新类名，第一个参数为旧类名，第二个参数为新类名

```javascript
element.classList.replace('oldClassName', 'newClassName');
```

## contains()

检查元素是否存在某个类名，返回值为布尔值

```javascript
element.classList.contains('classname');
```

classList的兼容性方面，从IE10才开始被IE支持，但也仅仅支持基本功能，IE11也一样，所以如果想要兼容这些浏览器那只能使用polyfill或者手动利用正则表达式等方式扩展className的功能，封装成方法进行使用