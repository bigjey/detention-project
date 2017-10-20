import axios from 'axios';


export const ACCOUNTS_ADD = 'ACCOUNTS_ADD';
export const ACCOUNTS_UPDATE = 'ACCOUNTS_UPDATE';


export const fetchAccounts = () => dispatch => {
  return axios.get(`http://localhost:1212/api/account`)
    .then(({data}) => {
      if (data.success){
        dispatch(add(data.items));
      }

      return data;
    })
}

export const createAccount = (data) => dispatch => {
  return axios.post(`http://localhost:1212/api/account`, data)
    .then(({data}) => {
      if (data.success){
        dispatch(add([data.item]));
      }

      return data;
    })
}

export const add = (items) => ({
  type: ACCOUNTS_ADD,
  items
})
export const update = (id, data) => ({
  type: ACCOUNTS_UPDATE,
  id,
  data
})