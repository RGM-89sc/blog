---
[title]:数组重排序方法：reverse()和sort()
[time]:2018-02-04
[tags]: JavaScript
---

# reverse()

resever()方法可以对数组中的元素顺序进行反转，返回的是排序完成后的数组

```javascript
var arr = [1, 2, 3];
console.log(arr.reverse().toString());  //3,2,1
console.log(arr.toString());  //3,2,1
```

但javascript的数组重排序不只是可以使数组元素的顺序反转，还可以使用sort()进行自定义排序

# sort()

sort()方法在默认情况下按升序对数组元素排序，sort()方法首先会对数组中每个元素都调用toString()方法获得该元素的字符串形式，再对获得的这些字符串进行比较，返回的是排序完成后的数组

```javascript
var arr = [11, 2, 13];
console.log(arr.sort().toString());  //11,13,2
console.log(arr.toString());  //11,13,2
```

经过上面这个例子我们可以看到因为默认比较的是字符串，所以排序结果跟我们所期望的正常升序排序不一样，这个问题可以用比较函数解决
sort()可以传入函数作为参数进行自定义排序，这个函数称为比较函数，它接受两个参数，如果第一个参数应该位于第二个参数之前则返回一个负数；如果第一个参数应该位于第二个参数之后则返回一个正数；如果两个参数相等则返回0

|       顺序       | 返回值 |
| :--------------: | :----: |
|  参数1在参数2前  |   -    |
| 参数1与参数2相等 |   0    |
|  参数2在参数1前  |   +    |

比较函数示例：

```javascript
var arr = [11, 2, 13];

function compare(value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}

arr.sort(compare);
console.log(arr.toString());  //2,11,13
```

如上面这个例子，把compare()当作比较函数传入sort()方法进行排序后，数组元素得到了正常的升序排序结果

还可以把compare()中的大于小于号调换一下，就成了降序排序：

```javascript
var arr = [11, 2, 13];

function compare(value1, value2) {
    if (value1 > value2) {
        return -1;
    } else if (value1 < value2) {
        return 1;
    } else {
        return 0;
    }
}

arr.sort(compare);
console.log(arr.toString());  //13,11,2
```

对于纯数值型的数组来说，比较函数的定义还可以更简单：

```javascript
var arr = [11, 2, 13];

// 升序
function ascending (value1, value2) {
    return value1 - value2;
}

// 降序
function descending (value1, value2) {
    return value2 - value1;
}

arr.sort(ascending);
console.log(arr.toString());  //2,11,13

arr.sort(descending);
console.log(arr.toString());  //13,11,2
```