import uuid from 'uuid/v4';

import {TRANSACTIONS_ADD, TRANSACTIONS_DELETE, TRANSACTIONS_RESTORE} from '../actions/transactions';

const defaultState = []

export default (prevState = defaultState, action) => {
  switch(action.type){

    case TRANSACTIONS_ADD:
      return prevState.concat(action.items);

    case TRANSACTIONS_DELETE:
      const {id} = action;
      return prevState.map((el) => {
        if(el.id === id) {
          return {
            ...el,
            deleted: true
          }
        }
        return el
      })

    case TRANSACTIONS_RESTORE:
      {const {id} = action;
      return prevState.map((el) => {
        if(el.id === id) {
          return {
            ...el,
            deleted: false
          }
        }
        return el
      })}

    default:
      return prevState;
  }
}