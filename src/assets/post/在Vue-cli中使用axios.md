---
[title]:在Vue-cli中使用axios
[time]:2018-10-18
[tags]: JavaScript;Vue.js
---

在Vue-cli中安装使用axios并非使用Vue add和Vue.use()，那怎么在Vue-cli中正确安装使用呢？

首先使用npm安装axios：

```bash
npm install --save axios
```

在main.js中导入axios并把axios挂到Vue的原型上去：

```javascript
// main.js
import axios from 'axios';

Vue.prototype.$axios = axios;
```

这里我使用了$axios作为变量名，是因为这样能避免在组件中使用时会把axios错认成是组件的$data中的变量

接下来就可以在组件中使用axios了：

```javascript
this.$axios({
  method: 'post',
  url: '{{url}}',
  /* Some code */
}).then((res) => {
  /* Some code */
}).catch((err) => {
  /* Some code */
});
```