import uuid from 'uuid/v4';

import {CATEGORY_FORM_LOADER, CATEGORY_FORM_ERROR} from '../actions/categories';

const defaultState = {
  loading: false,
  errors: null
};

export default (prevState = defaultState, action) => {
  switch(action.type) {
    case CATEGORY_FORM_LOADER:
      return {
        ...prevState,
        loading: action.loading
      }

    case CATEGORY_FORM_ERROR:
      return {
        ...prevState,
        errors: action.errors
      }

    default:
      return prevState;
  }
}