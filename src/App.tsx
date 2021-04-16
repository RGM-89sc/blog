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

function App(props: IProps) {
  return (
    <div id="app">
      <Header />
      <div id="content">
        <Switch>
          {router.map((route: IRouter) => {
            const RouteComponent = ({ component, ...rest }: any) => {
              const routeComponentRender = (props: any) => {
                // 此处assign自定义props传入页面组件
                const extraProps = {}
                return React.createElement(component, Object.assign(props, extraProps))
              }

              return <Route {...rest} render={routeComponentRender} />
            }
  
            return (
              <RouteComponent 
                key={route.name}
                path={route.path}
                name={route.label}
                exact={route.exact}
                component={route.component}
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
