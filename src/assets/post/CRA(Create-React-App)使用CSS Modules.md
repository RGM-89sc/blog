---
[title]:CRA(Create-React-App)使用CSSModules
[time]:2019-04-25
[tags]: JavaScript;React.js;CSS
---

在vue单文件组件中，我们可以在style标签上添加scoped属性来实现把标签内定义的css规则绑定到组件上而不是直接暴露到全局中：

```vue
<style lang="scss" scoped>
  .span {
    font-size: 1.2rem;
  }
</style>
```

上面定义的css规则只会作用于style标签所在的单文件组件上

但在react中并没有vue这种语法，怎么把css规则作用于局部呢？

[CSS Modules](https://github.com/css-modules/css-modules)就是一个很好的选择

以下方法只在`react-scripts@2.0.0`或以上的版本中有效：

create-react-app自带了对CSS Modules的支持，比自己配置使用CSS Modules要来得方便很多，在create-react-app的官方文档中也有说明：[Adding a CSS Modules Stylesheet](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet)

首先，我们需要为一个component新建一个[name].module.css的css文件（[name]是你自定义的名称），然后在component中引入：

```javascript
import styles from './[name].module.css';
```

例如，在/src/scencs/中有页面Setting，那么/src/scencs/中有./Setting/index.js和./Setting/index.module.css，在./Setting/index.js中这么引入：

```javascript
import styles from './index.module.css';
```

/src/scencs/Setting/index.module.css的内容：

```css
.span {
  font-size: 1.2rem;
}
```

然后在index.js中就可以正常使用CSS Modules了：

```html
<span className={styles.span}>
```

如果类名是使用`-`符号连接两个英文单词的形式，如：`plan-id`，那就可以使用方括号访问对象属性的方式：

```html
<span className={styles['plan-id']}>
```