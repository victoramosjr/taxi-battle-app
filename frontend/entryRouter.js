import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import App from './components/app';
import Search from './components/search';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Search} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
