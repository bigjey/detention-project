import axios from 'axios';

import { fetchData, set } from './app';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const authenticate = (data) => (dispatch, getState) => {
  return axios.post(`http://localhost:1212/auth/login`, data).then((res) => {
    if (res.data.success) {
      localStorage.setItem('authtoken', res.data.token);
      axios.defaults.headers.common['x-access-token'] = res.data.token;
      dispatch(
        login({
          email: data.email,
        })
      );
      dispatch(fetchData());
    }

    return res.data;
  });
};

export const register = (data) => (dispatch) => {
  return axios
    .post('http://localhost:1212/auth/register', data)
    .then(({ data }) => {
      return data;
    });
};

export const validateToken = () => (dispatch) => {
  const token = localStorage.getItem('authtoken');

  if (!token) {
    dispatch(logout());
    return;
  }

  return axios
    .post('http://localhost:1212/auth/validateToken', { token })
    .then(({ data }) => {
      if (data.success) {
        localStorage.setItem('authtoken', data.token);
        axios.defaults.headers.common['x-access-token'] = data.token;
        dispatch(
          login({
            email: 'no email',
          })
        );
        dispatch(fetchData());
      } else {
        dispatch(logout());
      }

      return data;
    });
};

export const login = (data) => {
  return {
    type: LOGIN,
    ...data,
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('authtoken');

  dispatch(set('ready', false));

  dispatch({
    type: LOGOUT,
  });
};
