import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Thunk from "redux-thunk";

import "./App.css";
import reducers from "./reducers";

import PlanetList from "./containers/PlanetList";
import PlanetDetail from "./containers/PlanetDetail";
const createStoreWithMiddleware = applyMiddleware(Thunk)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <Switch>
            <Route path="/planet/:id" component={PlanetDetail} />
            <Route path="/" component={PlanetList} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
