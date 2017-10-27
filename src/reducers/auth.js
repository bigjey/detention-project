import { LOGIN, LOGOUT } from '../actions/auth';

let defaultState = {
  loggedIn: false,
  email: null
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        email: action.email
      }
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        email: null
      }

    default:
      return state
  }
}