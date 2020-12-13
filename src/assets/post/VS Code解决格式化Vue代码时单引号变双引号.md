---
[title]:VSCode解决格式化Vue代码时单引号变双引号
[time]:2019-01-01
[tags]: Vue.js
---

# 问题描述

习惯于在JS中使用单引号而非双引号来表示字符串，但在VS code中写Vue单文件组件，格式化代码时却发现VS Code会自动把JS代码中的单引号都转变为双引号。

# 问题解决

进入用户设置，找到Vetur扩展插件中的默认格式化设置：

![img](https://s3.ax1x.com/2020/12/13/re7UgA.png)

在setting.json中编辑，增加一个”prettier”属性并把”singleQuote”设置成true：

![img](https://s3.ax1x.com/2020/12/13/re7ajI.png)

这时再对.vue文件格式化时，VS Code就会把双引号格式化成单引号了。