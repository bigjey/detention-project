import { LOGIN, LOGOUT } from '../actions/auth';

let defaultState = {
  email: localStorage.getItem('email') || null
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        email: action.email
      }
    case LOGOUT:
      return {
        ...state,
        email: null
      }

    default:
      return state
  }
}