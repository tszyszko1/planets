import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import thunk from 'redux-thunk'

import './App.css'
import reducers from './reducers'

import PlanetList from './containers/PlanetList'
import PlanetDetail from './containers/PlanetDetail'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/planet/:id" component={PlanetDetail} />
            <Route path="/" component={PlanetList} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
