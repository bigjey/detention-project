import axios from 'axios';

import { update as updateAccount } from './accounts';

export const TRANSACTIONS_CREATE = 'TRANSACTIONS_CREATE';
export const TRANSACTIONS_ADD = 'TRANSACTIONS_ADD';
export const TRANSACTIONS_SET = 'TRANSACTIONS_SET';
export const TRANSACTIONS_DELETE = 'TRANSACTIONS_DELETE';
export const TRANSACTIONS_RESTORE = 'TRANSACTIONS_RESTORE';



export const fetchTransactions = () => dispatch => {
  return axios.get(`http://localhost:1212/api/transaction`)
    .then(({data}) => {
      if (data.success){
        dispatch(set(data.items));
      }

      return data;
    })
}

export const create = (data) => dispatch => {
  return axios.post(`http://localhost:1212/api/transaction`, data)
    .then(({data}) => {
      if (data.success){
        dispatch(add([data.item]));
        data.accounts.forEach((account) => {
          dispatch(updateAccount(account._id, account));
        })
      }

      return data;
    })
}

export const removeTransaction = (id) => dispatch => {
  return axios.delete(`http://localhost:1212/api/transaction/${id}`)
    .then(({data}) => {
      if (data.success){
        dispatch(remove(id));
        data.accounts.forEach((account) => {
          dispatch(updateAccount(account._id, account));
        })
      }

      return data;
    })
}

export const set = (items) => ({
  type: TRANSACTIONS_SET,
  items
})

export const add = (items) => ({
  type: TRANSACTIONS_ADD,
  items
})

export const remove = (id) => ({
  type: TRANSACTIONS_DELETE,
  id
})

export const restore = (id) => ({
  type: TRANSACTIONS_RESTORE,
  id
})