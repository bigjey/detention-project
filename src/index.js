import 'typeface-roboto'
import './index.css'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import reducer from './reducers';


const store = createStore(reducer, applyMiddleware(logger), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);
