import { LOGIN, LOGOUT } from '../actions/auth';

let defaultState = {
  loggedIn: false,
  validatingToken: true,
  email: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        validatingToken: false,
        email: action.email,
      };

    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        validatingToken: false,
        email: null,
      };

    default:
      return state;
  }
};
