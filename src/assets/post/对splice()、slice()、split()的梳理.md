---
[title]:对splice()、slice()、split()的梳理
[time]:2018-03-16
[tags]: JavaScript
---

最近发现自己对splice()、slice()、split()这三个方法有点混淆了，故做个梳理

# splice()

splice()是挂在Array.prototype上的方法，可以用来删除或增加或替换数组元素，splice()的返回值始终为一个数组，是被删除项的集合，如果splice()没有删除项，则返回的是一个空数组

## 删除

如果要让splice()方法实现删除数组元素的功能只需要两个参数，第一个参数为要删除的第一项的位置，第二个参数为要删除的项数，比如：删除数组中的前两项：

```javascript
var arr = [1, 2, 3, 4, 5];
arr.splice(0, 2);
console.log(arr);  //[3, 4, 5]
```

## 插入

如果要让splice()方法实现插入数组元素的功能需要三个参数，第一个参数为要删除的第一项的位置，第二个参数为要删除的项数（此时需为0），第三个参数为要插入的项，如果要插入多个项，则还可以有第四、五、六······个项，比如：在数组的开头插入两项：

```javascript
var arr = [1, 2, 3, 4, 5];
arr.splice(0, 0, -1, 0);
console.log(arr);  //[-1, 0, 1, 2, 3, 4, 5]
```

## 替换

如果要让splice()方法实现替换数组元素的功能也需要三个参数，一个参数为要删除的第一项的位置，第二个参数为要删除的项数，第三个参数为要替换的项，如果要替换成多个项，则还可以有第四、五、六······个项，比如：把数组中第一个元素替换成两项：

```javascript
var arr = [1, 2, 3, 4, 5];
arr.splice(0, 1, -1, 0);
console.log(arr);  //[-1, 0, 2, 3, 4, 5]
```

# slice()

slice()也是挂在Array.prototype上的方法，slice()会返回一个新数组，不改变原数组，这个新数组是原数组从起始位置（第一个参数）到结束位置（第二个参数）的前一个位置的一个浅复制（新数组中的元素地址其实还是与原数组中的相同）

示例：

```javascript
var arr = [1, 2, 3, 4, 5];
var arrcopy = arr.slice(0, 4);
console.log(arrcopy);  //[1, 2, 3, 4]
```

# split()

split()是挂在String.prototype上的方法，作用是利用分隔符对字符串进行分割，该方法有两个参数，第一个参数是分隔符，为正则表达式，第二个参数是可选的，为一个整数，限定返回的分割片段数量

示例（获取一个字符串中的所有单词）：

```javascript
var str = "The arts is a vast subdivision of culture";
var arr = str.split(" ");
console.log(arr);  //['The', 'arts', 'is', 'a', 'vast', 'subdivision', 'of', 'culture']
```

当分隔符为空（第一个参数为””）时，会把所有字符都分割出来：

```javascript
var str = "The arts is a vast subdivision of culture";
var arr = str.split("");
console.log(arr);  //[ 'T', 'h', 'e', ' ', 'a', 'r', 't', 's', ' ', 'i', 's', ' ', 'a', ' ', 'v', 'a', 's', 't', ' ', 's', 'u', 'b', 'd', 'i', 'v', 'i', 's', 'i', 'o', 'n', ' ', 'o', 'f', ' ', 'c', 'u', 'l', 't', 'u', 'r', 'e' ]
```

另外要注意的是，当字符串为空时，split()返回一个包含一个空字符串的数组，而不是一个空数组，如果字符串和分隔符都是空字符串，则返回一个空数组