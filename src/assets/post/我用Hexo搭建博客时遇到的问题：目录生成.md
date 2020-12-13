---
[title]:我用Hexo搭建博客时遇到的问题：目录生成
[time]:2018-01-23
[tags]: JavaScript;Hexo
---

hexo自带了生成目录的辅助函数[toc](https://hexo.io/zh-cn/docs/helpers.html#toc)

我们可以在layout/_partial/中创建文件toc.ejs

```ejs
<div class="toc-article">
    <h2 class="toc-article-title">目录</h2>
    <%- toc(page.content) %>
</div>
```

在文章详情页post.ejs中的适当位置引入toc.ejs

```ejs
<%- partial('_partial/toc') %>
```

使用

```bash
$ hexo clean
$ hexo g
$ hexo s --debug
```

三个命令刷新后可以发现，目录列表都正确生成出来了，然而这些a标签的href属性值都为#undefined

![img](https://s3.ax1x.com/2020/12/13/reOmOs.png)

各层标题的id都已经生成了，怎么a标签的href属性就没有获取到其id值呢？
一开始我想到是不是中文才会出现这样的问题？所以我新建了一篇文章，使用英文的标题名称，这样id就是英文的了，结果是id确实变为了英文，可目录中a标签的href属性值依然是#undefined。之后又经过几番周折，终于在[这里](https://github.com/YenYuHsuan/hexo-theme-beantech/issues/11/#issuecomment-351266490)找到了解决办法
按照解决方案提供者的说法，新版本的hexo-toc会把标题诸如## title编译成

```html
<h2><span id="title">title</span></h2>
```

而旧版本则会编译成

```html
<h2 id="title">title</h2>
```

h2没有定义id属性的值，目录中a标签的href属性值也就变成undefined了
解决办法就是找到/node_modules/hexo-toc/lib/filter.js，把被注释掉的第28行取消注释，然后把第29~31注释掉
修改完成后：

```javascript
$title.attr('id', id);
// $title.children('a').remove();
// $title.html( '<span id="' + id + '">' + $title.html() + '</span>' );
// $title.removeAttr('id');
```

这样就就可以恢复到旧版本，正确获取到目录中a标签href属性值了
![img](https://s3.ax1x.com/2020/12/13/reOMT0.png)