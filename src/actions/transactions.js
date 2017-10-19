import axios from 'axios';


export const TRANSACTIONS_CREATE = 'TRANSACTIONS_CREATE';
export const TRANSACTIONS_ADD = 'TRANSACTIONS_ADD';
export const TRANSACTIONS_DELETE = 'TRANSACTIONS_DELETE';
export const TRANSACTIONS_RESTORE = 'TRANSACTIONS_RESTORE';



export const fetchTransactions = () => dispatch => {
  return axios.get(`http://localhost:1212/api/transaction`)
    .then(({data}) => {
      if (data.success){
        dispatch(add(data.items));
      }

      return data;
    })
}

export const create = (data) => dispatch => {
  return axios.post(`http://localhost:1212/api/transaction`, data)
    .then(({data}) => {
      if (data.success){
        dispatch(add([data.item]));
      }

      return data;
    })
}

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