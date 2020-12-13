---
[title]:React+TypeScript+Antd+CSS Modules项目搭建
[time]:2019-08-04
[tags]: JavaScript;React.js;TypeScript
---

基本环境：

> node版本：10.16.1
>
> yarn版本：1.17.3



# 新建TypeScript-React项目

安装CRA

```bash
npm install -g create-react-app
```

创建typescript-react项目

```bash
create-react-app my-app --typescript
```

# 安装Antd

```bash
yarn add antd
```

# Antd按需加载

```diff
yarn add react-app-rewired customize-cra babel-plugin-import
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

然后在项目根目录创建一个 `config-overrides.js` 用于修改默认配置。

```javascript
// config-overrides.js

const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
);
```

把`App.tsx`修改为如下内容：

```typescript
import React from 'react';
import { Button } from 'antd';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Button type="primary">Button</Button>
    </div>
  );
}

export default App;
```

让项目跑起来测试下：

```bash
yarn start
```

# Antd自定义主题

安装less、less-loader

```bash
yarn add less less-loader
```

修改`config-overrides.js`文件的内容：

```diff
// config-overrides.js

- const { override, fixBabelImports } = require('customize-cra');
+ const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
-   style: 'css',
+   style: true,
  }),
+ addLessLoader({
+   javascriptEnabled: true,
+   modifyVars: { '@primary-color': '#1DA57A' },
+ }),
);
```

详细的主题配置可以查看 [配置主题](https://ant.design/docs/react/customize-theme-cn) 文档。

让项目跑起来：

```bash
yarn start
```

# 添加对Sass的支持

```bash
yarn add node-sass
```

# CSS Modules

## 原生css

参考https://rgm-89sc.github.io/2019/04/201904250926/

## scss

1、把`App.css`文件重命名为`App.module.scss`

2、同目录下新建`App.module.scss.d.ts`，并写入以下内容：

```bash
export const App: string;
```

3、把`App.tsx`文件的内容改为：

```typescript
import React from 'react';
import { Button } from 'antd';
import * as styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles['App']}>
      <Button type="primary">Button</Button>
    </div>
  );
}

export default App;
```

但上面的使用方法由于变量名不支持`-`符号，所以像`foo-bar`这样的css类名就无法被支持，不过我们可以把这些类名封装在一个对象里面：

修改`App.module.scss.d.ts`：

```typescript
export default {
  ['App']: string,
  ['App-header']: string
};
```

在`App.tsx`中引入`App.module.scss`的方式改为：

```typescript
import styles from './App.module.scss';
```

使用方式：

```html
<div className={styles['App-header']}></div>
```

如果不想每个组件或者页面都创建一个`.d.ts`文件、列出每个要导出的css类名，那可以直接在`react-app-env.d.ts`中添加声明，而在`.ts`文件中的使用方式不变：

```typescript
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}
```

## less

在`react-app-env.d.ts`中添加声明：

```typescript
declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}
```

`config-overrides.js`增加3行：

```diff
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#1DA57A'
    },

+   strictMath: true,
+   noIeCompat: true,
+   localIdentName: "[local]--[hash:base64:5]"
  }),
);
```

在`.tsx`文件中的使用方式与scss的一致。