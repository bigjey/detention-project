import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'

import {ACCOUNTS_ADD, ACCOUNTS_UPDATE} from '../actions/accounts';

const defaultState = [];

export default (prevState = defaultState, action) => {
  switch(action.type){

    case ACCOUNTS_ADD:
      return prevState.concat(action.items);

    case ACCOUNTS_UPDATE:
      const {id} = action;

      return prevState.map(item => {
        if (item._id === id) {
          return {
            ...action.data
          };
        }

        return item;
      })

    default:
      return prevState;
  }
}
