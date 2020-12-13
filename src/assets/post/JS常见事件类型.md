---
[title]:JS常见事件类型
[time]:2018-02-12
[tags]: JavaScript
---

# UI事件

## load事件

load事件是在页面/图像/某些元素加载完成后触发的事件

### 页面加载完成时

当页面加载完成后会在window对象上触发load事件：

```javascript
window.addEventListener("load", function(){
    console.log("loaded");
}, false)
```

### 图像加载完成时

当图片加载完成时会在img元素上触发load事件：

```javascript
var img = document.getElementsByClassName("img")[0];
img.addEventListener("load", function(){
    console.log("loaded");
}, false);
```

### script与link元素

script与link元素也可以触发load事件:

```javascript
var script = document.getElementsByTagName("script")[0];
script.addEventListener("load", function(){
    console.log("loaded");
}, false);

var link = document.getElementsByTagName("link")[0];
link.addEventListener("load", function(){
    console.log("loaded");
}, false);
```

## resize事件

resize事件是当页面被调整到一个新的高度或宽度时在window对象上触发的：

```javascript
window.addEventListener("resize", function(){
    console.log("resized");
}, false);
```

## scroll事件

scroll事件在页面滚动后发生在window对象上：

```javascript
window.addEventListener("scroll", function(){
    // 页面垂直滚动后输出垂直滚动的位置
    console.log(document.documentElement.scrollTop);
}, false);
```

# 焦点事件

焦点事件是在页面内元素获得/失去焦点时触发

## blus事件

在元素失去焦点时触发，不会冒泡：

html:

```html
<div class="box" tabindex="0"></div>
<!-- div在不添加tabindex属性时无法获得焦点 -->
```

js:

```javascript
var box = document.getElementsByClassName("box")[0];
box.focus();
box.addEventListener("blur", function(){
    console.log("lose focus");
}, false);
```

## focus事件

focus事件是在元素获得焦点时触发，不会冒泡

html:

```html
<div class="box" tabindex="0"></div>
<!-- div在不添加tabindex属性时无法获得焦点 -->
```

js:

```javascript
var box = document.getElementsByClassName("box")[0];
box.addEventListener("focus", function(){
    console.log("on focus");
}, false);
box.focus();
```

## focusin事件

focusin事件与focus事件等同，但它冒泡

html:

```html
<body>
    <div class="box" tabindex="0"></div>
    <!-- div在不添加tabindex属性时无法获得焦点 -->
</body>
```

js:

```javascript
var box = document.getElementsByClassName("box")[0],
    body = document.body;
body.addEventListener("focusin", function(){
    console.log("on focus");
}, false);
box.addEventListener("focusin", function(){
    console.log("on focus");
}, false);
box.focus();
```

## focusout事件

focusout事件与blus事件等同，但它冒泡

html:

```html
<body>
    <div class="box" tabindex="0"></div>
    <!-- div在不添加tabindex属性时无法获得焦点 -->
</body>
```

js:

```javascript
var box = document.getElementsByClassName("box")[0],
    body = document.body;
body.addEventListener("focusout", function(){
    console.log("lose focus");
}, false);
box.addEventListener("focusout", function(){
    console.log("lose focus");
}, false);
box.focus();
```

# 鼠标事件

## click事件

当主鼠标按钮被按下时被触发，冒泡

```javascript
var box = document.getElementsByClassName("box")[0];
box.addEventListener("click", function(){
    console.log("on clock");
}, false);
```

所有鼠标事件被触发时都有鼠标的位置信息被存储在事件对象event中，包括客户区坐标（页面区域，但不计算页面滚动距离）、页面坐标位置（计算了页面滚动的距离）、屏幕坐标位置

由于IE8中不支持事件对象上的页面坐标，所以要通过客户区坐标和滚动信息计算出来

```java
var box = document.getElementsByClassName("box")[0];
box.addEventListener("click", function(event){
    var pageX =  event.pageX,
        pageY = event.pageY;
    if(pageX === undefined){
        pageX = event.clientX + document.documentElement.scrollLeft;
        pageY = event.clientY + document.documentElement.scrollTop
    }
    console.log("鼠标相对于客户区的坐标：" + event.clientX + ", " + event.clientY);
    console.log("鼠标相对于页面的坐标：" + pageX + "," + pageY);
    console.log("鼠标相对于屏幕的坐标：" + event.screenX + ", " + event.screenY)
}, false);
```

事件对象event中还存有几个键，分别是Shift、Ctrl、Alt和Meta（在Windows中是Windows键，在Mac OS中是Cmd键），他们在event中分别是shiftKey、ctrlKey、altKey和metaKey，对应的值都是布尔值，true为按下，false反之。这些键被称为修改键，当按下这些键后触发鼠标事件可以影响鼠标事件

比如：当按下Ctrl键后触发click事件输出”click”：

```javascript
var box = document.getElementsByClassName("box")[0];
box.addEventListener("click", function(event){
    if(event.ctrlKey){
        console.log("click");
    }
}, false);
```

## dblclick事件

当双击主鼠标按钮时被触发，冒泡

```javascript
var box = document.getElementsByClassName("box")[0];
box.addEventListener("dblclick", function(){
    console.log("dblclock");
}, false);
```

## mousedown事件

当按下了任意鼠标按钮时被触发，冒泡

```javascript
var box = document.getElementsByClassName("box")[0];
box.addEventListener("mousedown", function(){
    console.log("mousedown");
}, false);
```

## mouseup事件

当释放鼠标按钮时被触发，冒泡

```javascript
var box = document.getElementsByClassName("box")[0];
box.addEventListener("mouseup", function(){
    console.log("mouseup");
}, false);
```

对于mousedown和mouseup事件，事件对象event中都有一个button属性，这个属性有3个值，0表示主鼠标按钮，1表示鼠标中键，2表示次鼠标按钮

示例（当主鼠标按钮触发mouseup事件时输出”mouseup”）：

```javascript
    var box = document.getElementsByClassName("box")[0];
    box.addEventListener("mouseup", function(event){
        if(event.button === 0){
            console.log("mouseup");
        }
    }, false);
```

如果要兼容IE8，则要注意IE8中的button属性值与DOM中的button属性值不一样：
0：表示没有按下按钮
1：表示按下了主鼠标按钮
2：表示按下了次鼠标按钮
3：表示同时按下了主次鼠标按钮
4：表示按下了鼠标中键
5：表示同时按下了主中鼠标按钮
6：表示同时按下了次中鼠标按钮
7：表示同时按下了主中次鼠标按钮

## mouseout事件

当鼠标指针位于一个元素上方，被移入另一个元素（可能是其子元素，也可能是其父元素及其他外部元素）时被触发，冒泡

```javascript
var box = document.getElementsByClassName("box")[0];
box.addEventListener("mouseout", function(){
    console.log("mouseout");
}, false);
```

## mouseover事件

当鼠标指针位于一个元素外部，被移入另一个元素内时被触发，冒泡

```javascript
var box = document.getElementsByClassName("box")[0];
box.addEventListener("mouseover", function(){
    console.log("mouseover");
}, false);
```

## mousemove事件

当鼠标指针位于一个元素内部移动时被重复触发，冒泡

```javascript
var box = document.getElementsByClassName("box")[0];
box.addEventListener("mousemove", function(){
    console.log("mousemove");
}, false);
```

## mouseenter事件

当鼠标指针从元素外部移动到元素范围之内时被触发，不冒泡

```javascript
var box = document.getElementsByClassName("box")[0];
box.addEventListener("mouseenter", function(){
    console.log("mouseenter");
}, false);
```

## mouseleave事件

当位于元素上方的鼠标指针移出元素以外（移动到其后代元素不触发）时被触发，不冒泡

```javascript
var box = document.getElementsByClassName("box")[0];
box.addEventListener("mouseleave", function(){
    console.log("mouseleave");
}, false);
```

## contextmenu事件

鼠标右键调出上下文菜单的事件，冒泡，所以可以冒泡到document处再处理事件

示例（自定义上下文菜单）：

html:

```html
<ul id="menu">
    <li>菜单1</li>
    <li>菜单2</li>
    <li>菜单3</li>
</ul>
```

css:

```css
#menu{
    display: none;
    position: absolute;
    padding: 5px 10px;
    width: 100px;
    list-style: none;
    background-color: #f5f5f5;
}
```

js:

```javascript
document.addEventListener("contextmenu", function(event){
    event.preventDefault();  // 取消默认行为

    var menu = document.getElementById("menu");
    menu.style.left = event.clientX + "px";
    menu.style.top = event.clientY + "px";
    menu.style.display = "block";
}, false);

// 取消菜单显示
document.addEventListener("click", function(){
    var menu = document.getElementById("menu");
    menu.style.display = "none";
}, false);
```

# 鼠标滚轮事件

## mousewheel事件

当使用鼠标滚轮在页面滚动（无论是向上还是向下）就会触发，冒泡
事件对象event中会存在一个wheelDelta属性，这个属性的值在向前滚动鼠标滚轮时为120的倍数，在向后滚动鼠标滚轮时为-120的倍数

```javascript
document.addEventListener("mousewheel", function(event){
    console.log(event.wheelDelta);
}, false);
```

但火狐浏览器并不支持这一事件，火狐浏览器支持的是DOMMouseScroll事件，与mousewheel事件类似，但有关鼠标滚轮的信息保存在了事件对象event的detail属性中，当向前滚动鼠标滚轮时其值为-3的倍数，向后滚动鼠标滚轮时其值为3的倍数

```javascript
document.addEventListener("DOMMouseScroll", function(event){
    console.log(event.detail);
}, false);
```

# 键盘事件

## keydown事件

当按下键盘上任意键时触发，如果按住不放则重复触发

```javascript
document.addEventListener("keydown", function(event){
    console.log(event.key);
}, false);
```

事件对象event中的key属性存储了被按下的键名，但这个属性对旧浏览器兼容性并不是太好，而keyCode属性则新旧浏览器都可以使用，其值是键的ASII码（要注意的是分号键在不同浏览器中可能有不同的值，可能为59，也可能为186）

此外，键盘事件中事件对象event里也有修改键属性

## keyup事件

当按下的键被释放时触发

```javascript
document.addEventListener("keyup", function(event){
    console.log(event.key);
}, false);
```

## keypress事件

当按下键盘上的任意键时触发，如果按住不放则重复触发

```javascript
document.addEventListener("keypress", function(event){
    console.log(event.key);
}, false);
```

# 文本事件

## textInput事件

在可编辑区域中输入字符时触发

html:

```html
<form action="">
    <label for="textBox">input: </label>
    <input type="text" id="textBox">
</form>
```

js:

```javascript
var textBox = document.getElementById("textBox");
textBox.addEventListener("textInput", function(event){
    console.log(event.data);
}, false);
```

事件对象event中的data属性存有输入的字符串