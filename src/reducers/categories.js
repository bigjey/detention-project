import uuid from 'uuid/v4';

import {
  CATEGORY_ADD,
  CATEGORY_SET,
  CATEGORY_REMOVE,
  CATEGORY_RESTORE,
  CATEGORY_EDIT
} from '../actions/categories';

const defaultState = [];

export default (prevState = defaultState, action) => {
  switch(action.type) {
    case CATEGORY_SET:
      return action.items;

    case CATEGORY_ADD:
      return prevState.concat(action.items)

    case CATEGORY_REMOVE: {
      const {id} = action;
      return prevState.map((el) => {
        if(el._id === id) {
          return {
            ...el,
            deleted: true
          }
        }
        return el
      })
    }

    case CATEGORY_RESTORE: {
      const {id} = action;
      return prevState.map((el) => {
        if(el._id === id) {
          return {
            ...el,
            deleted: false
          }
        }
        return el
      })
    }

    case CATEGORY_EDIT: {
      const {id} = action;
      return prevState.map(el => {
        if (el._id === id) {
          return {
            ...el,
            ...action.data
          };
        }

        return el;
      })
    }

    default:
      return prevState;
  }
}