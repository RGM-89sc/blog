---
[title]:Electron与React结合下引入Node模块
[time]:2019-04-24
[tags]: JavaScript;React.js;Electron.js;Node.js
---

# 问题描述

electron与react结合后在react js文件中引入Node.js模块报错：TypeError: fs.existsSync is not a function

引入方式：

```javascript
const child_process = require('child_process');
// 或
import child_process from 'child_process';
```

package.json中主要依赖项：

```json
{
  "react": "^16.8.6",
  "react-app-rewired": "^2.1.1",
  "react-dom": "^16.8.6",
  "react-router-dom": "^5.0.0",
  "react-scripts": "2.1.8",
  "electron": "^4.1.4"
}
```

# 解决方式

React中是无法直接使用Node.js的原生模块以及electron模块的（当然，有些模块是可以使用`import ... from ...`的方式引入的，比如uuid）

这种情况可以通过使用window.require的方式引入：

```javascript
const child_process = window.require('child_process');
```

而在主进程中，就可以直接使用了

```javascript
const child_process = require('child_process');
```