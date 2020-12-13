---
[title]:给mand-mobile配置pxtorem
[time]:2019-05-31
[tags]: JavaScript;Vue.js;Webpack
---

由滴滴开发的Vue移动端UI组件库[mand-mobile](https://didi.github.io/mand-mobile/)的产出包`lib`目录中的组件样式默认以`px`为单位，直接使用可能会显得比例很大，有必要的话就可以使用`postcss-pxtorem`来将mand的组件的px单位按比例转换为rem。

在文档中也有配置方法：[https://didi.github.io/mand-mobile/#/zh-CN/docs/started?anchor=%E4%BD%BF%E7%94%A8%E5%89%8D%E5%87%86%E5%A4%87。](https://didi.github.io/mand-mobile/#/zh-CN/docs/started?anchor=使用前准备)

本文记录的是在vue.config.js中配置pxtorem的另外几种方法。

## 方法一：

Vue CLI 内部使用了 PostCSS，我们可以通过`css.loaderOptions.postcss` 配置 [postcss-loader](https://github.com/postcss/postcss-loader)：

```javascript
// vue.config.js
const pxtorem = require('postcss-pxtorem');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 30,
            minPixelValue: 2,
            propList: ['*'],
            selectorBlackList: []
          }),
            ]
      }
    }
  },
};
```

这样是直接作用于全局的，即无论是不是mand的组件，只要带px单位的css属性值都会被转换成rem单位，当然你也可以配置selectorBlackList数组来排除某些选择器，也可以配置propList数组来选择需要转换单位的属性，详细可以看postcss-loader的文档：https://github.com/cuth/postcss-pxtorem。

这种方法还有一个问题：在用了某些同样需要配置postcss的库后可能就无法直接使用这种方法，下面以配置ckeditor主题为例，加入pxtorem的配置。

## 方法二

```javascript
// vue.config.js
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

const postCssConfig = styles.getPostCssConfig({
  themeImporter: {
    themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
  },
  minify: true,
});

module.exports = {
  css: {
    loaderOptions: {
      postcss: postCssConfig
    }
  },
};
```

在对ckeditor5的主题进行配置后我们无法直接像方法一那样加入pxtorem的配置，但其实styles.getPostCssConfig()就返回了

```javascript
{
  plugins: []
}
```

这种结构。

所以我们可以通过`postCssConfig.plugins.push()`来添加pxtorem的配置：

```javascript
// vue.config.js
const pxtorem = require('postcss-pxtorem');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

const postCssConfig = styles.getPostCssConfig({
  themeImporter: {
    themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
  },
  minify: true,
});

postCssConfig.plugins.push(pxtorem({
  rootValue: 30,
  minPixelValue: 2,
  propList: ['*'],
  selectorBlackList: []
}));

module.exports = {
  css: {
    loaderOptions: {
      postcss: postCssConfig
    }
  },
};
```

但这种方法还是无法完全实现pxtorem只作用于mand组件的问题。

## 方法三（推荐）

利用`vue.config.js`中的[chainWebpack](https://cli.vuejs.org/zh/config/#chainwebpack)属性我们可以对内部的 webpack 配置进行更细粒度的修改：

```javascript
// vue.config.js
const pxtorem = require('postcss-pxtorem');

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('md-postcss')  // 新增规则，规则名自定义
      .test(/mand-mobile.*\.css$/)  // 用正则表达式匹配mand-mobile的组件目录下的所有css文件
      .use('css-loader')  // css加载器
      .loader('postcss-loader')  // css处理器
      .options({  // 这里的内容跟方法一中css.loaderOptions一样
        plugins: [
          pxtorem({
            rootValue: 30,
            minPixelValue: 2,
            propList: ['*'],
            selectorBlackList: []
          })
        ]
      });
  }
};
```

这样既不跟其他库发生冲突又能实现pxtorem的处理只作用于mand的组件了。