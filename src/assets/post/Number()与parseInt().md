---
[title]:Number()与parseInt()
[time]:2018-02-03
[tags]: JavaScript
---

Number()与parseInt()都是把非数值转换为数值的函数，其中，Number()的参数可以是任何类型，而parseInt()则只接受字符串类型

# Number()

由于Number()所接受的参数类型没有限制，所以Number()对参数有多种处理方式：
1、如果是布尔值，则true转换为1，false转换为0
2、如果是数字值，则原样返回
3、如果是null，则转换为0
4、如果是undefined，则转换为NaN
5、如果是字符串：
（1）如果字符串中只包含数字（包括前面带正负号的），则将其转换为十进制数值，即”1”转换成1，”011”转换成11
（2）如果字符串中包含有效的浮点格式，如”1.1”，则将其转换为对应的浮点数字（会忽略前导0）
（3）如果字符串中包含有效的十六进制格式，例如”0xf”，则将其转换成相同大小的十进制整数值
（4）如果字符串为空（””），则将其转换为0
（5）如果字符串中上述格式以外的字符，则将其转换为NaN
6、如果是对象，则调用对象中的valueof()方法，然后依照前面带规则转换返回的值，如果转换出来的值是NaN，则调用对象的toString()方法，然后再依照前面的规则转换返回的值

示例：

```javascript
console.log(Number("str"));  //NaN
console.log(Number("012"));  //12
console.log(Number(true));  //1
console.log(Number(""));  //0
console.log(Number(null));  //0
console.log(Number(undefined));  //NaN
console.log(Number(NaN));  // NaN
```

# parseInt()

parseInt()会忽略字符串前面的空格，当遇到不是空格的第一个字符不是数字字符或者负号，就会返回NaN，如果遇到的第一个非空格字符是数字字符，那么剩下的字符串中只要遇到非数字字符，剩下的字符都会被忽略

```javascript
console.log(parseInt("str"));  //NaN
console.log(parseInt("012"));  //12
console.log(parseInt(""));  //NaN
console.log(parseInt("  2"));  //2
console.log(parseInt("12str3"));  //12
```

另外，parseInt()还可以传入第二个参数，为数字类型，表示按多少进制去解析字符串（第一个参数）：

```javascript
console.log(parseInt("010101", 2));  //21
console.log(parseInt("AF", 16));  //175
console.log(parseInt("70", 8));  //56
```

# parseFloat()

parseFloat()与parseInt()十分相似，只不过parseFloat()可以解析出浮点数，而parseInt()则不可以，但parseFloat()只能解析十进制值，对于十六进制的始终返回0，因此也没有第二个参数

示例：

```javascript
console.log(parseFloat("11.2"));  //11.2
console.log(parseFloat("11.2.2"));  //11.2
console.log(parseFloat(".2"));  //0.2
console.log(parseFloat("..2"));  //NaN
console.log(parseFloat("012.1"));  //12.1
console.log(parseFloat("0xAF"));  //0
console.log(parseFloat("4.0"));  //4
console.log(parseFloat("12str3"));  //12
```

parseFloat()还实现了部分parseInt()的功能，当需要解析的字符串是一个整数的字符串时，返回的也是整数

```javascript
console.log(parseFloat("123"));  //123
console.log(parseFloat("00123"));  //123
```