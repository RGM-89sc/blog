---
[title]:react-router给路由传递props
[time]:2019-04-26
[tags]: JavaScript;React.js
---

有时候我们可能要对子路由的状态进行提升，需要在父路由组件提供方法或变量以props的形式传递到所有子路由组件中，但我们又不能直接把父路由组件的方法或变量传递到\<Route\>中，因为这样将会是\<Route\>接收到父路由组件的方法或变量，并没有继续往下传递到子路由组件，所以在子路由组件中是获取不到父路由组件的这些方法或变量的。

这时候\<Route\>的[render](https://reacttraining.com/react-router/web/api/Route/render-func)属性就派上用场了，它接受一个函数，接收的参数是传递给\<Route\>的参数，返回值是一个新组件：

```javascript
{routes.map((route, index) => {
    const RouteComponent = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        <Component
          {...props}
        parentState={this.state}
        parentFunc={this.parentFunc}
      />
    )} />
  );

      return (
        <RouteComponent
          key={route.name}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
    )
})}
```

上面这个例子中是列表渲染多个\<Route\>使用组件RouteComponent进行包装，RouteComponent是一个函数组件，使用ES6的结构赋值分离传入RouteComponent的component和其他属性，然后利用<Route>的render属性把父组件的方法或变量以及原本该有的props传入到\<Component\>，将其他属性（rest）如path、exact等传给\<Route\>。

这样，在子路由组件中就可以以`this.props['something']`的方式正常访问到父路由组件提供的方法或变量了：

```javascript
console.log(this.props.parentState);
this.props.parentFunc();
```

更简单的例子在[官方文档](https://reacttraining.com/react-router/web/api/Route/render-func)。