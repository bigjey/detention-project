import 'typeface-roboto';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import App from './App';
import reducer from './reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = typeof window === 'object' && devTools
  ? devTools
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);
const store = createStore(reducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);
