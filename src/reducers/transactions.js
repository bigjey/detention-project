import uuid from 'uuid/v4';

import {TRANSACTIONS_DELETE, TRANSACTIONS_RESTORE} from '../actions/transactions';

const defaultState = [
  {
    id: uuid(),
    type: 'income',
    amount: 4000,
    account: 'Salary',
    category: 'Monthly income',
    description: 'Milk, bread, candies',
    deleted: false
  }, {
    id: uuid(),
    type: 'expense',
    amount: 33.15,
    account: 'Salary',
    category: 'Groceries',
    description: 'Milk, bread, candies',
    deleted: false
  }, {
    id: uuid(),
    type: 'transfer',
    amount: 33.15,
    newAmount: 133.15,
    account: 'Salary',
    newAccount: 'Savings',
    category: 'New car',
    deleted: false
  }
]

export default (prevState = defaultState, action) => {
  switch(action.type){

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