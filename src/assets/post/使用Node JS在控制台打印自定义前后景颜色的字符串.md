---
[title]:使用NodeJS在控制台打印自定义前/后景颜色的字符串
[time]:2018-12-06
[tags]: Node.js;ASNI
---

今天在用node JS写一个小工具的时候突然觉得在控制台打印文本内容的时候可以试试打印一下不同颜色的字体，所以上网查了一下，发现也不是很复杂

要达到更改颜色的目的需要使用 ANSI转义序列 ，可以更改两种颜色：前景色和背景色，更改的颜色分为3种：3/4位、8位、24位。

首先先来说一下3/4位，这是最初的一个规格，兼容性良好，只有8种颜色+8种亮色（30-37为前景色，40-47为背景色），但在不同终端显示的颜色可能不太一样（具体表现可查看文末参考链接）

使用方法：

```javascript
// 修改前景色
console.log('\x1b[36m %s \x1b[0m %s', 'INFO', 'doing something...');

// 修改背景色
console.log('\x1b[46m %s \x1b[0m %s', 'INFO', 'doing something...');
```

\x1b 表示16进制码1b，1b对应ascii码是ESC；控制码\x1b[0m是重置所有属性，\x1b[36m是更改3/4位前景色为青色，\x1b[46m则是更改3/4位背景色为青色。

8位：

拥有256种颜色，但兼容性欠佳

语法：

ESC[38;5;\<n\>m选择前景色
ESC[48;5;\<n\>m选择背景色

其中n的取值：

0 - 7：标准颜色（同ESC [ 30–37 m）

8 - 15：高强度颜色（同ESC [ 90–97 m）

16 - 231：6 × 6 × 6 立方（216色）: 16 + 36 × r + 6 × g + b (0 ≤ r, g, b ≤ 5)

232 - 255：从黑到白的24阶灰度色

使用方法：

```
console.log('\x1b[38;5;46m %s \x1b[0m %s', 'INFO', 'doing something...');
console.log('\x1b[48;5;46m %s \x1b[0m %s', 'INFO', 'doing something...');
```

24位：

使用rgb定义颜色，语法：

ESC[38;2;\<r\>;\<g\>;\<b\>m选择RGB前景色
ESC[48;2;\<r\>;\<g\>;\<b\>m选择RGB背景色

使用方法：

```
console.log('\x1b[38;2;100;100;255m %s \x1b[0m %s', 'INFO', 'doing something...');
console.log('\x1b[48;2;100;100;255m %s \x1b[0m %s', 'INFO', 'doing something...');
```

以上代码的效果：

![img](https://s3.ax1x.com/2020/12/13/reHnIS.png)

------

参考链接：https://en.wikipedia.org/wiki/ANSI_escape_code#Colors