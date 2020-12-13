import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '@Store/reducers'

const store = createStore(rootReducer)

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>  
  </HashRouter>,
  document.getElementById('root')
)
