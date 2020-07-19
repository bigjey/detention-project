import axios from 'axios';

export const ACCOUNTS_ADD = 'ACCOUNTS_ADD';
export const ACCOUNTS_SET = 'ACCOUNTS_SET';
export const ACCOUNTS_UPDATE = 'ACCOUNTS_UPDATE';
export const ACCOUNTS_REMOVE = 'ACCOUNTS_REMOVE';

export const fetchAccounts = () => (dispatch, getState) => {
  return axios.get(`http://localhost:1212/api/account`).then(({ data }) => {
    if (data.success) {
      dispatch(set(data.items));
    }

    return data;
  });
};

export const createAccount = (data) => (dispatch) => {
  return axios
    .post(`http://localhost:1212/api/account`, data)
    .then(({ data }) => {
      if (data.success) {
        dispatch(add([data.item]));
      }

      return data;
    });
};

export const updateAccount = (id, data) => (dispatch) => {
  return axios
    .put(`http://localhost:1212/api/account/${id}`, data)
    .then(({ data }) => {
      if (data.success) {
        dispatch(update(id, data.item));
      }

      return data;
    });
};

export const deleteAccount = (id) => (dispatch) => {
  return axios
    .delete(`http://localhost:1212/api/account/${id}`)
    .then(({ data }) => {
      if (data.success) {
        dispatch(remove(id));
      }

      return data;
    });
};

export const set = (items) => ({
  type: ACCOUNTS_SET,
  items,
});

export const add = (items) => ({
  type: ACCOUNTS_ADD,
  items,
});

export const update = (id, data) => ({
  type: ACCOUNTS_UPDATE,
  id,
  data,
});

export const remove = (id) => ({
  type: ACCOUNTS_REMOVE,
  id,
});
