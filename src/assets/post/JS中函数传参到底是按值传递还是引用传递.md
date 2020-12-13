---
[title]:JS中函数传参到底是按值传递还是引用传递
[time]:2019-01-22
[tags]: JavaScript
---

当传入的参数是引用类型（比如一个对象）的值时我们可以发现在函数中修改对象属性是生效的，而且在函数外也可以看到相应的变化（非引用类型（基本类型）：Number、String、Boolean、Null、Undefined、Symbol，引用类型：Object、Array、Map、Set、WeakMap、WeakSet、Date、JSON等）：

```javascript
function func(obj) {
  obj.a = 1;
}

let myObj = {};
func(myObj);
console.log(myObj.a);  // 1
```

那么，是不是就可以证明在JS中是引用传递呢？不能，因为其实在JS中非引用类型的参数也是按值传递的，这里的值是指数据的地址，在函数中对这个传进来的地址进行操作也就等于对源数据进行操作，所以才有这个引用传递的假象。实际上，我们可以对上面的代码进行改造：

```javascript
function func(obj) {
  obj.a = 1;
  obj = new Object();  // 或者直接把字面量{}赋值给obj
  obj.b = 1;
}

let myObj = {};
func(myObj);
console.log(myObj.a);  // 1
console.log(myObj.b);  // undefined
```

可以看到，在函数中对obj进行重新赋值一个新对象，属性a依然存在，此时obj的值指向了一个新对象，所以给obj新增的属性b并没有在函数外体现出来，因为新增属性a和b是分别在不同的对象上操作的。

总之，在JS中，函数传参无论是基本类型的值还是引用类型的值，都是按值传递的，不存在引用传递，只不过引用类型的“值”是地址的值而已。