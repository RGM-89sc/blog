---
[title]:img标签onerror属性的使用
[time]:2021-03-11
[tags]: JavaScript
---

在开发过程中我们可能会碰上需要动态加载图片，在没有图片的时候显示特定的默认图片这样的需求，一般情况下我们会选择给src属性带上一个默认图片路径作为备用值，比如下面这样：

```vue
<img :src="imgURL || defauleImgURL">
```

但如果需要根据img标签会带上特定且不唯一的自定义数据来显示不同的默认图片就会比较麻烦，虽然仍然可以用提前设置好默认路径的方法实现，但代码可能会显得杂乱一些，可读性可维护性可能都不会很好，这时我们就可以利用onerror属性来实现。

onerror会在图片加载过程中发生错误时触发，需要注意的是如果img标签没有src属性，onerror是不会被触发的，比如：

```vue
<img :src="imgURL" onerror="console.log('onerror')">
<!-- imgURL为undefined，onerror中的JavaScript逻辑不会被执行 -->
<!-- 可以至少让imgURL的备用值为空字符串来使得onerror被触发 -->
```

onerror中的JavaScript逻辑可以通过this.dataset来访问需要的自定义属性值：

```vue
<img :src="" data-options="something" onerror="console.log(this.dataset.options)">
```

为了实现需求，不能每个onerror都写一遍逻辑，将onerror属性的内容抽离，实现一个方法

```vue
<template>
	<img :src="imgURL" data-options="something" :onerror="handler">
</template>

<script>
export default {
    methods: {
        handler() {
            return 'console.log(this.dataset.options)'
        }
    }
}
</script>
```



