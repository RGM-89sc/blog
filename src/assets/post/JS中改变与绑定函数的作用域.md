---
[title]:JS中改变与绑定函数的作用域
[time]:2018-02-05
[tags]: JavaScript
---

每个函数都包含两个非继承得来的方法：apply()和call()，这两个方法的作用一摸一样，都是在特定的作用域中调用函数，扩充作用域，第一个参数都是运行函数的作用域，不一样的地方在于，apply()所接受的第二个参数为一个数组或者是arguments对象，而call()则要求除运行函数的作用域作为第一个参数外的其余参数都要直接逐个传入

# apply()

```javascript
window.str = "global";

var obj = {
    str: "obj",
    getStr: function(){
        return this.str;
    }
};

console.log(obj.getStr());  //obj
console.log(obj.getStr.apply(window));  //global
```

像上面这个例子这样，对象obj中已存在了一个方法返回str的值，但在obj中返回的是obj中的str，而在全局中可以不必再定义一个方法来返回全局中的同名变量str，这时就可以通过apply()并传入全局环境window来使用obj中的这个方法，此时由于this指向了window，所以返回的并不是obj中的str，而是全局中的str

再来看个例子：

```javascript
var obj1 = {
    sum1: function (propertyname, x, y){
        this[propertyname] =  x + y;
    }
};

var obj2 = {};

var obj3 = {};

function sum2 (propertyname, num1, num2){
    return obj1.sum1.apply(obj2, arguments);
}
function sum3 (propertyname, num1, num2) {
    return obj1.sum1.apply(obj3, [propertyname, num1, num2]);
}

obj1.sum1("obj1SumResult", 1, 1);
sum2("obj2SumResult", 1, 2);
sum3("obj3SumResult", 1, 3);

console.log(obj1.obj1SumResult);  //2
console.log(obj2.obj2SumResult);  //3
console.log(obj3.obj3SumResult);  //4
```

在上面这个例子中，有3个对象，分别是obj1，obj2，obj3，在obj1中有一个可以把两个数相加，把结果存与本对象的一个自定义名字的变量下，而obj2和obj3是空对象。现在有两个函数，其中第一个函数sum2()在执行obj1中的sum1()时this值为obj2对象，把sum2中的num1和num2两个参数相加，并存到obj2的一个自定义属性名下；第二个函数sum3()与sum2()大体相同，只是传参方式不一样，一个是传入arguments对象，一个是传入数组，这都是apply()方法所支持的传参方式

# call()

call()和apply()的作用都是一样的，没有差别，差别只在于传参方式而已，call()必须把参数逐个传进去

可以对上一个例子进行改造：

```javascript
var obj1 = {
    sum1: function (propertyname, x, y){
        this[propertyname] =  x + y;
    }
};

var obj2 = {};

var obj3 = {};

function sum2 (propertyname, num1, num2){
    return obj1.sum1.apply(obj2, arguments);
}
function sum3 (propertyname, num1, num2) {
    return obj1.sum1.call(obj3, propertyname, num1, num2);
}

sum2("obj2SumResult", 1, 2);
sum3("obj3SumResult", 1, 2);

console.log(obj2.obj2SumResult);  //3
console.log(obj3.obj3SumResult);  //3
```

可以看到第15行，使用了call()，并传入了与apply()相同的参数（传参方式不同），函数执行后，和的结果是相同的

# bind()

还有一个方法是bind()，这个方法会创建一个函数实例（不会马上执行），其this值会被绑定到传给bind()方法的值

示例：

```javascript
var obj1 = {
    sum1: function (propertyname, x, y){
        this[propertyname] =  x + y;
    }
};

var obj2 = {};

var sum2 =  obj1.sum1.bind(obj2);

obj1.sum1("obj1SumResult", 1, 1);
sum2("obj2SumResult", 1, 2);

console.log(obj1.obj1SumResult);  //2
console.log(obj2.obj2SumResult);  //3
```

在上面这个例子中，obj1.sum1()通过bind()方法被绑定了obj2对象，创建出了一个函数实例被赋值给sum2，这时就可以通过调用sum2()来给obj2添加一个属性，其值为2个数的和，而obj1中的sum1()不会被改变，依然可以正常执行