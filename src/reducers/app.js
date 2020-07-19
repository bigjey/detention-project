import { SET } from '../actions/app';

const defaultState = {
  ready: false,
  showTransactionModal: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET: {
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    default:
      return state;
  }
};
