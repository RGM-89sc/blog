import React from 'react'
import { 
  RouteComponentProps,
  // eslint-disable-next-line
  HashRouter as Router, Route, Switch
} from 'react-router-dom'
import { withRouter } from 'react-router'
import router, { IRouter } from './router/router'
import './App.scss'
import Header from '@Components/header'
import Footer from '@Components/footer'

interface IProps extends RouteComponentProps {}

interface IRouteComponentProps extends IRouter {
  [key: string]: any
}

interface HomePageRef {
  searchArticlesByKeyword: (keyword: string) => void
}

function App(props: IProps) {
  const homePageRef = React.createRef<HomePageRef>()

  function onSearch(keyword: string) {
    homePageRef.current?.searchArticlesByKeyword(keyword)
  }

  return (
    <div id="app">
      <Header {...props} onSearch={onSearch} />

      <div id="content">
        <Switch>
          {router.map((route: IRouter) => {
            const RouteComponent = React.forwardRef<HomePageRef, IRouteComponentProps>(({ component, ...rest }, ref) => {
              const routeComponentRender = (props: any) => {
                // 此处assign自定义props传入页面组件
                let extraProps: { [key: string]: any } = {}
                rest.name === 'homepage' && (extraProps['ref'] = ref)
                return React.createElement(component, Object.assign(props, extraProps))
              }

              return <Route {...rest} render={routeComponentRender} />
            })
  
            return (
              <RouteComponent 
                key={route.name}
                path={route.path}
                title={route.label}
                name={route.name}
                exact={route.exact}
                component={route.component}
                ref={homePageRef}
              />
            )
          })}
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default React.memo(withRouter(App))
