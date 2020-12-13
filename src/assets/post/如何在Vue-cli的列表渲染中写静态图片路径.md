---
[title]:如何在Vue-cli的列表渲染中写静态图片路径
[time]:2018-11-15
[tags]: JavaScript;Vue.js
---

在vue-cli中我们可以通过

```vue
<img src="../assets/img1.jpg">
```

或

```vue
<img src="@img/img.png">
```

或

```vue
<img src="~img/img.png">
```

等这样的方式进行引入本地图片资源，这些都有在[官方文档](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#构建一个多页应用)提到

除此之外，对于列表渲染还可以使用CommonJS规范的require()来引入图片：

```vue
<template>
  <ul>
    <li v-for="(img, index) in imgURL" 
      :key="index" 
      v-show="index === mark" 
      :style="{ backgroundImage: 'url(' + img + ')' }" 
      class="slideitem">
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      imgURL: [
        require("../assets/1305120757455173.jpg"),
        require("../assets/1305120805172589.jpg"),
        require("../assets/H3c.jpg"),
        require("../assets/H3C2.jpg")
      ],
    };
  }
}
</script>
```

在vue-cli中所有诸如 `<img src="...">`、`background: url(...)` 和 CSS `@import` 的资源 URL 都会被解析为一个模块依赖，还有URL以./、@、~开头的都会认为是一个模块请求，即会被转化为 `require(...)`，所以直接使用require()是完全没问题的。

而在public文件夹中的资源就不能用相对路径来引入了，因为public文件夹的中的资源编译时都不会被webpack所处理，在官方文档中不推荐把静态资源都放到public中，public文件夹这一解决方案应当作为应急而使用，关于public文件夹的详细说明可以查看官方文档。