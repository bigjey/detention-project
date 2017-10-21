import {ACCOUNTS_ADD, ACCOUNTS_UPDATE} from '../actions/accounts';
import {TRANSACTIONS_CREATE} from '../actions/transactions';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'


const defaultState = [];

export default (prevState = defaultState, action) => {
  switch(action.type){

    case ACCOUNTS_ADD:
      return prevState.concat(action.items);

    case ACCOUNTS_UPDATE:
      const {id} = action;
      return prevState.map(item => {
        if (item.id === id) {
          return {
            ...action.data,
            id: item.id
          };
        }

        return item;
      })

    default:
      return prevState;
  }
}
