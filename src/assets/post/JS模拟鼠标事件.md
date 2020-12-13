---
[title]:JS模拟鼠标事件
[time]:2018-02-13
[tags]: JavaScript
---

在JS中模拟事件需要在document对象上使用createEvent()方法创建event对象，该方法只有一个参数，为字符串，但这个字符串的值非常多，都是事件的种类，比较常用的是鼠标事件

```javascript
var mouseEvent = document.createEvent("MouseEvent");
```

创建事件对象后需要使用不同事件对应的初始化方法进行初始化
模拟鼠标事件的初始化事件对象方法是initMouseEvent()
其参数及含义：
type（字符串）： 表示要触发的事件类型，例如”click”
bubbles（布尔值）： 表示事件是否应该冒泡
cancelable（布尔值）： 表示事件是否可以取消
view（AbstractView）： 与事件关联的视图，几乎总要设置为document.defaultView
detail（整数）： 与事件有关的详细信息，通常设为0
screenX（整数）： 事件相对于屏幕的X坐标
screenY（整数）： 事件相对于屏幕的Y坐标
clientX（整数）： 事件相对于视口的X坐标
clientY（整数）： 事件相对于视口的Y坐标
ctrlKey（布尔值）： 是否按下了Ctrl键，默认值为false
altKey（布尔值）： 是否按下了Alt键，默认值为false
shiftKey（布尔值）： 是否按下了shift键，默认值为false
metaKey（布尔值）： 是否按下了Meta键，默认值为false
button（整数）： 表示按下了哪个鼠标键，默认为0
relatedTarget（对象）：与事件相关的对象，只在模拟mouseover或mouseout时使用

```javascript
mouseEvent.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
```

最后还需要调用dispatchEvent()方法触发事件：

完整代码：

html:

```html
<div class="box"></div>
```

css:

```css
.box{
    width: 100px;
    height: 100px;
    background-color: #00a0ff;
}
```

js:

```javascript
(function () {
    var box = document.getElementsByClassName("box")[0];
    box.addEventListener("click", function(){
        console.log("on click");
    }, false);

    // 创建事件对象
    var mouseEvent = document.createEvent("MouseEvent");

    // 初始化事件对象
    mouseEvent.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    // 触发事件
    box.dispatchEvent(mouseEvent);
})();
```

触发事件后会在控制台输出”on click”，证明click事件成功被模拟并触发