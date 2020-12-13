---
[title]:JS事件冒泡
[time]:2018-02-11
[tags]: JavaScript
---

事件冒泡是指当在一个元素上触发了某一类型事件，那么这一类型事件就会逐级向上传播，其父元素、其父元素的父元素······body元素、html元素、document直至window对象（在IE8中只传播到document为止）

示例：

html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style type="text/css">
        .box{
            width: 100px;
            height: 100px;
            background-color: #00a0ff;
        }
    </style>
</head>
<body>
<div class="box"></div>
<script src="bubbling.js"></script>
</body>
</html>
```

js:

```javascript
// bubbling.js
(function () {
    var box = document.getElementsByClassName("box")[0],
        body = document.body,
        html = document.documentElement;

    box.addEventListener("click", function () {
        console.log("box was clicked");
    }, false);

    body.addEventListener("click", function(){
        console.log("body was clicked");
    }, false);

    html.addEventListener("click", function(){
        console.log("html was clicked");
    }, false);

    document.addEventListener("click", function(){
        console.log("document was clicked");
    }, false);

    window.addEventListener("click", function(){
        console.log("window was clicked");
    }, false);
})();
```

我们现在分别给className为box的div元素、body元素、html元素、document、window对象绑定了onclick事件，下面是单击className为box的div元素的效果：

![img](https://s3.ax1x.com/2020/12/13/reqBHx.png)

可以看到，最先被触发的是className为box的div元素，接着依次是body元素、html元素、document、window对象，这体现了完整的一次冒泡过程

那className为box的div元素是不是第一个知道onclick事件发生的呢？
事实上，根据DOM2级事件规定([Document Object Model (DOM) Level 2 Events Specification](https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html))中的事件流描述([Description of event flow](https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-flow-capture))，事件流包括三个阶段：捕获阶段、目标阶段、冒泡阶段
当我们单击className为box的div元素后，document捕获到onclick事件，接着是html元素捕获到了，到className为box的div元素的父元素捕获到后，捕获阶段停止，进入目标阶段，onclick事件在className为box的div元素上发生，并在事件处理中被看成冒泡阶段的一部分，接着其父元素发生onclick事件，直至冒泡到document

在DOM3级的UI事件草案([UI Events](https://www.w3.org/TR/2016/WD-uievents-20160804/))中的[Event dispatch and DOM event flow](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)还把window对象增加进事件流的描述中

![img](https://s3.ax1x.com/2020/12/13/reqsUK.png)

事件冒泡有时会捣乱了我们的预期效果，触发了不该触发的事件，这时就需要去阻止事件冒泡了，而stopPropagation()方法就是用来停止事件在DOM层次中的传播的

还是上一个例子，我们对绑定到className为box的div元素上的事件处理函数进行改动，其他代码均保存原样：

```javascript
box.addEventListener("click", function (event) {
    console.log("box was clicked");
    event.stopPropagation();
}, false);
```

这次，我们依然单击className为box的div元素，使其触发onclick事件，结果：

![img](https://s3.ax1x.com/2020/12/13/reqy4O.png)

可以看到，事件冒泡到className为box的div元素就停止了